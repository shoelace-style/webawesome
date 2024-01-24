import { deleteAsync } from 'del';
import { exec, spawn } from 'child_process';
import { globby } from 'globby';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import commandLineArgs from 'command-line-args';
import copy from 'recursive-copy';
import esbuild from 'esbuild';
import fs from 'fs/promises';
import getPort, { portNumbers } from 'get-port';
import util from 'util';
import * as path from 'path';
import { readFileSync } from 'fs';
import { replace } from 'esbuild-plugin-replace';
import { dev, build } from 'astro';
import chokidar from 'chokidar';

const { serve } = commandLineArgs([{ name: 'serve', type: Boolean }]);
const outdir = 'dist';
const cdndir = 'cdn';
const sitedir = '_site';
const execPromise = util.promisify(exec);
let buildResults = [];

const bundleDirectories = [cdndir, outdir];
let packageData = JSON.parse(readFileSync(path.join(process.cwd(), 'package.json'), 'utf-8'));
const shoelaceVersion = JSON.stringify(packageData.version.toString());

//
// Runs 11ty and builds the docs. The returned promise resolves after the initial publish has completed. The child
// process and an array of strings containing any output are included in the resolved promise.
//
async function buildTheDocs(watch = false) {
  let args = ['astro', 'build'];

  if (watch) {
    args.pop();
    args.push('dev');

    console.log(process.cwd());

    // Rebuild and reload when source files change
    chokidar.watch('src/**/!(*.test).*').on('change', async filename => {
      console.log('[build] File changed: ', filename);

      try {
        const isTheme = /^src\/themes/.test(filename);
        const isStylesheet = /(\.css|\.styles\.ts)$/.test(filename);

        // Rebuild the source
        const rebuildResults = buildResults.map(result => result.rebuild());
        await Promise.all(rebuildResults);

        // Rebuild stylesheets when a theme file changes
        if (isTheme) {
          await Promise.all(
            bundleDirectories.map(dir => {
              return execPromise(`node scripts/make-themes.js --outdir "${dir}"`, { stdio: 'inherit' });
            })
          );
        }

        // Rebuild metadata (but not when styles are changed)
        if (!isStylesheet) {
          await Promise.all(
            bundleDirectories.map(dir => {
              return execPromise(`node scripts/make-metadata.js --outdir "${dir}"`, { stdio: 'inherit' });
            })
          );
        }

        const siteDistDir = path.join(process.cwd(), 'docs', 'public', 'dist');
        // await deleteAsync(siteDistDir);

        // We copy the CDN build because that has everything bundled. Yes this looks weird.
        // But if we do "/cdn" it requires changes all the docs to do /cdn instead of /dist.
        console.log(`COPYING ${cdndir} to ${siteDistDir}`);
        await copy(cdndir, siteDistDir, { overwrite: true });
      } catch (err) {
        console.error(chalk.red(err), '\n');
      }
    });
  }

  return new Promise(async (resolve, reject) => {
    const child = spawn('npx', args, {
      stdio: 'pipe',
      cwd: 'docs',
      shell: true // for Windows
    });

    child.stdout.setEncoding('utf8');
    child.stderr.setEncoding('utf8');
    child.stdout.on('data', data => {
      console.log(data);
    });
    child.stderr.on('data', data => {
      console.error(data);
    });
    child.on('error', error => reject(error));
    child.on('close', () => resolve());
  });
}

//
// Builds the source with esbuild.
//
async function buildTheSource() {
  const alwaysExternal = ['@lit/react', 'react'];

  const cdnConfig = {
    format: 'esm',
    target: 'es2017',
    entryPoints: [
      //
      // NOTE: Entry points must be mapped in package.json > exports, otherwise users won't be able to import them!
      //
      // The whole shebang
      './src/webawesome.ts',
      // The auto-loader
      './src/autoloader.ts',
      // Components
      ...(await globby('./src/components/**/!(*.(style|test)).ts')),
      // Translations
      ...(await globby('./src/translations/**/*.ts')),
      // Public utilities
      ...(await globby('./src/utilities/**/!(*.(style|test)).ts')),
      // Theme stylesheets
      ...(await globby('./src/themes/**/!(*.test).ts')),
      // React wrappers
      ...(await globby('./src/react/**/*.ts'))
    ],
    outdir: cdndir,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      // Floating UI requires this to be set
      'process.env.NODE_ENV': '"production"'
    },
    bundle: true,
    //
    // We don't bundle certain dependencies in the unbundled build. This ensures we ship bare module specifiers,
    // allowing end users to better optimize when using a bundler. (Only packages that ship ESM can be external.)
    //
    // We never bundle React or @lit/react though!
    //
    external: alwaysExternal,
    splitting: true,
    plugins: [
      replace({
        __WEBAWESOME_VERSION__: shoelaceVersion
      })
    ]
  };

  const npmConfig = {
    ...cdnConfig,
    external: undefined,
    minify: false,
    packages: 'external',
    outdir
  };

  if (serve) {
    // Use the context API to allow incremental dev builds
    const contexts = await Promise.all([esbuild.context(cdnConfig), esbuild.context(npmConfig)]);
    await Promise.all(contexts.map(context => context.rebuild()));
    return contexts;
  } else {
    // Use the standard API for production builds
    return await Promise.all([esbuild.build(cdnConfig), esbuild.build(npmConfig)]);
  }
}

//
// Called on SIGINT or SIGTERM to cleanup the build and child processes.
//
function exit() {
  buildResults.forEach(result => {
    if (result.dispose) {
      result.dispose();
    }
  });

  process.exit(1);
}

//
// Helper function to cleanly log tasks
//
async function nextTask(label, action) {
  function clearLine() {
    if (process.stdout.isTTY) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
    } else {
      process.stdout.write('\n');
    }
  }

  try {
    process.stdout.write(`${chalk.yellow('•')} ${label}`);
    await action();
    clearLine();
    process.stdout.write(`${chalk.green('✔')} ${label}\n`);
  } catch (err) {
    clearLine();
    process.stdout.write(`${chalk.red('✘')} ${label}\n\n`);
    if (err.stdout) process.stdout.write(`${chalk.red(err.stdout)}\n`);
    if (err.stderr) process.stderr.write(`${chalk.red(err.stderr)}\n`);
    exit();
  }
}

await nextTask('Cleaning up the previous build', async () => {
  await Promise.all([deleteAsync(sitedir), ...bundleDirectories.map(dir => deleteAsync(dir))]);
  await fs.mkdir(outdir, { recursive: true });
});

await nextTask('Generating component metadata', () => {
  return Promise.all(
    bundleDirectories.map(dir => {
      return execPromise(`node scripts/make-metadata.js --outdir "${dir}"`, { stdio: 'inherit' });
    })
  );
});

await nextTask('Wrapping components for React', () => {
  return execPromise(`node scripts/make-react.js --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Generating themes', () => {
  return execPromise(`node scripts/make-themes.js --outdir "${outdir}"`, { stdio: 'inherit' });
});

await nextTask('Running the TypeScript compiler', () => {
  return execPromise(`tsc --project ./tsconfig.prod.json --outdir "${outdir}"`, { stdio: 'inherit' });
});

// Copy the above steps to the CDN directory directly so we don't need to twice the work for nothing
await nextTask(`Copying CDN files to "${cdndir}"`, async () => {
  await deleteAsync(cdndir);
  await copy(outdir, cdndir);
});

await nextTask('Building source files', async () => {
  buildResults = await buildTheSource();
});

// Copy the CDN build to the docs (prod only; we use a virtual directory in dev)
await nextTask(`Copying the build to "${sitedir}"`, async () => {
  const siteDistDir = path.join('docs', 'public', 'dist');
  await deleteAsync(siteDistDir);

  // We copy the CDN build because that has everything bundled. Yes this looks weird.
  // But if we do "/cdn" it requires changes all the docs to do /cdn instead of /dist.
  await copy(cdndir, siteDistDir);
});

// Launch the dev server
if (serve) {
  // Spin up Eleventy and Wait for the search index to appear before proceeding. The search index is generated during
  // eleventy.after, so it appears after the docs are fully published. This is kinda hacky, but here we are.
  // Kick off the Eleventy dev server with --watch and --incremental
  await nextTask('Building docs', async () => await buildTheDocs(true));
}

// Build for production
if (!serve) {
  await nextTask('Building the docs', async () => {
    await buildTheDocs();
  });
}

// Cleanup on exit
process.on('SIGINT', exit);
process.on('SIGTERM', exit);
process.on('uncaughtException', function (err) {
  console.error(err);
  exit();
});
