import { deleteAsync } from 'del';
import { dirname, join, relative } from 'path';
import { distDir, docsDir, cdnDir, rootDir, runScript, siteDir } from './utils.js';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { globby } from 'globby';
import { mkdir, readFile } from 'fs/promises';
import { replace } from 'esbuild-plugin-replace';
import browserSync from 'browser-sync';
import chalk from 'chalk';
import copy from 'recursive-copy';
import esbuild from 'esbuild';
import getPort, { portNumbers } from 'get-port';
import ora from 'ora';
import process from 'process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDeveloping = process.argv.includes('--develop');
const isAlpha = process.argv.includes('--alpha');
const spinner = ora({ text: 'Web Awesome', color: 'cyan' }).start();
const packageData = JSON.parse(await readFile(join(rootDir, 'package.json'), 'utf-8'));
const version = JSON.stringify(packageData.version.toString());
let buildContexts = {
  bundledContext: {},
  unbundledContext: {}
};

/**
 * Runs the full build.
 */
async function buildAll() {
  const start = Date.now();

  try {
    await cleanup();
    await generateManifest();
    await generateReactWrappers();
    await generateTypes();
    await generateStyles();

    // copy everything to unbundled before we generate bundles.
    await copy(cdnDir, distDir, { overwrite: true });

    await generateBundle();
    await generateDocs();

    const time = (Date.now() - start) / 1000 + 's';
    spinner.succeed(`The build is complete ${chalk.gray(`(finished in ${time})`)}`);
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(`\n${err}`));
  }
}

/** Empties the dist directory. */
async function cleanup() {
  spinner.start('Cleaning up dist');

  await deleteAsync(distDir);
  await deleteAsync(cdnDir);
  await mkdir(distDir, { recursive: true });
  await mkdir(cdnDir, { recursive: true });

  spinner.succeed();
}

/**
 * Analyzes components and generates the custom elements manifest file.
 */
function generateManifest() {
  spinner.start('Generating CEM');

  try {
    execSync('cem analyze --config "custom-elements-manifest.js"');
  } catch (error) {
    console.error(`\n\n${error.message}`);
  }

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Generates React wrappers for all components.
 */
function generateReactWrappers() {
  spinner.start('Generating React wrappers');

  try {
    execSync(`node scripts/make-react.js --outdir "${cdnDir}"`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`\n\n${error.message}`);
  }
  spinner.succeed();

  return Promise.resolve();
}

/**
 * Copies theme stylesheets to the dist.
 */
async function generateStyles() {
  spinner.start('Copying stylesheets');

  // NOTE - alpha setting omits all stylesheets except for these because we use them in the docs
  if (isAlpha) {
    await copy(join(rootDir, 'src/themes/applied.css'), join(cdnDir, 'themes/applied.css'), { overwrite: true });
    await copy(join(rootDir, 'src/themes/color_standard.css'), join(cdnDir, 'themes/color_standard.css'), {
      overwrite: true
    });
    await copy(join(rootDir, 'src/themes/default.css'), join(cdnDir, 'themes/default.css'), { overwrite: true });
  } else {
    await copy(join(rootDir, 'src/themes'), join(cdnDir, 'themes'), { overwrite: true });
  }

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Runs TypeScript to generate types.
 */
async function generateTypes() {
  spinner.start('Running the TypeScript compiler');

  try {
    execSync(`tsc --project ./tsconfig.prod.json --outdir "${cdnDir}"`);
  } catch (error) {
    return Promise.reject(error.stdout);
  }

  spinner.succeed();

  return Promise.resolve();
}

/**
 * Runs esbuild to generate the final dist.
 */
async function generateBundle() {
  spinner.start('Bundling with esbuild');

  // Bundled config
  const config = {
    format: 'esm',
    target: 'es2020',
    entryPoints: [
      //
      // IMPORTANT: Entry points MUST be mapped in package.json => exports
      //
      // Utilities
      './src/webawesome.ts',
      // Autoloader + utilities
      './src/webawesome.loader.ts',
      './src/webawesome.ssr-loader.ts',
      // Individual components
      ...(await globby('./src/components/**/!(*.(style|test)).ts')),
      // Translations
      ...(await globby('./src/translations/**/*.ts')),
      // React wrappers
      ...(await globby('./src/react/**/*.ts'))
    ],
    outdir: cdnDir,
    chunkNames: 'chunks/[name].[hash]',
    define: {
      'process.env.NODE_ENV': '"production"' // required by Floating UI
    },
    bundle: true,
    splitting: true,
    minify: false,
    plugins: [replace({ __WEBAWESOME_VERSION__: version })]
  };

  const unbundledConfig = {
    ...config,
    splitting: true,
    treeShaking: true,
    // Don't inline libraries like Lit etc.
    packages: 'external',
    outdir: distDir
  };

  try {
    if (isDeveloping) {
      buildContexts.bundledContext = await esbuild.context(config);
      buildContexts.unbundledContext = await esbuild.context(unbundledConfig);

      await buildContexts.bundledContext.rebuild();
      await buildContexts.unbundledContext.rebuild();
    } else {
      // One-time build for production
      await esbuild.build(config);
      await esbuild.build(unbundledConfig);
    }
  } catch (error) {
    spinner.fail();
    console.log(chalk.red(`\n${error}`));
  }

  spinner.succeed();
}

/**
 * Incrementally rebuilds the source files. Must be called only after `generateBundle()` has been called.
 */
async function regenerateBundle() {
  try {
    spinner.start('Re-bundling with esbuild');
    await buildContexts.bundledContext.rebuild();
    await buildContexts.unbundledContext.rebuild();
  } catch (error) {
    spinner.fail();
    console.log(chalk.red(`\n${error}`));
  }

  spinner.succeed();
}

/**
 * Generates the documentation site.
 */
async function generateDocs() {
  spinner.start('Writing the docs');

  const args = [];
  if (isAlpha) args.push('--alpha');
  if (isDeveloping) args.push('--develop');

  // 11ty
  const output = (await runScript(join(__dirname, 'docs.js'), args))
    // Cleanup the output
    .replace('[11ty]', '')
    .replace(' seconds', 's')
    .replace(/\(.*?\)/, '')
    .toLowerCase()
    .trim();

  // Copy assets
  await copy(join(docsDir, 'assets'), join(siteDir, 'assets'), { overwrite: true });

  // Copy dist (production only)
  if (!isDeveloping) {
    await copy(cdnDir, join(siteDir, 'dist'));
  }

  spinner.succeed(`Writing the docs ${chalk.gray(`(${output}`)})`);
}

// Initial build
await buildAll();

if (!isDeveloping) {
  console.log(); // just a newline for readability
}

// Launch the dev server
if (isDeveloping) {
  spinner.start('Launching the dev server');

  const bs = browserSync.create();
  const port = await getPort({ port: portNumbers(4000, 4999) });
  const url = `http://localhost:${port}/`;
  const reload = () => {
    spinner.start('Reloading browser');
    bs.reload();
    spinner.succeed();
  };

  // Launch browser sync
  bs.init(
    {
      startPath: '/',
      port,
      logLevel: 'silent',
      logPrefix: '[webawesome]',
      logFileChanges: true,
      notify: false,
      single: false,
      ghostMode: false,
      server: {
        baseDir: siteDir,
        routes: {
          '/dist/': './dist-cdn/'
        }
      },
      callbacks: {
        ready: (_err, instance) => {
          // 404 errors
          instance.addMiddleware('*', (req, res) => {
            if (req.url.toLowerCase().endsWith('.svg')) {
              // Make sure SVGs error out in dev instead of serve the 404 page
              res.writeHead(404);
            } else {
              res.writeHead(302, { location: '/404.html' });
            }

            res.end();
          });
        }
      }
    },
    () => {
      spinner.succeed();
      console.log(`\nThe dev server is running at ${chalk.cyan(url)}\n`);
    }
  );

  // Rebuild and reload when source files change
  bs.watch('src/**/!(*.test).*').on('change', async filename => {
    spinner.info(`File modified ${chalk.gray(`(${relative(rootDir, filename)})`)}`);

    try {
      const isTestFile = filename.includes('.test.ts');
      const isCssStylesheet = filename.includes('.css');
      const isComponent =
        filename.includes('components/') && filename.includes('.ts') && !isCssStylesheet && !isTestFile;

      // Re-bundle when relevant files change
      if (!isTestFile && !isCssStylesheet) {
        await regenerateBundle();
      }

      // Copy stylesheets when CSS files change
      if (isCssStylesheet) {
        await generateStyles();
      }

      // Regenerate metadata when components change
      if (isComponent) {
        await generateManifest();
        await generateDocs();
      }

      reload();
    } catch (err) {
      console.error(chalk.red(err));
    }
  });

  // Rebuild the docs and reload when the docs change
  bs.watch(`${docsDir}/**/*.*`).on('change', async filename => {
    spinner.info(`File modified ${chalk.gray(`(${relative(rootDir, filename)})`)}`);
    await generateDocs();
    reload();
  });
}

//
// Cleanup everything when the process terminates
//
function terminate() {
  // dispose of contexts.
  Object.values(buildContexts).forEach(context => context?.dispose?.());

  if (spinner) {
    spinner.stop();
  }

  process.exit();
}

process.on('SIGINT', terminate);
process.on('SIGTERM', terminate);
