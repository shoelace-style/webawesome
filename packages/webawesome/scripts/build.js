import browserSync from 'browser-sync';
import chalk from 'chalk';
import { execSync } from 'child_process';
import { deleteAsync } from 'del';
import esbuild from 'esbuild';
import { replace } from 'esbuild-plugin-replace';
import { mkdir, readFile } from 'fs/promises';
import getPort, { portNumbers } from 'get-port';
import { globby } from 'globby';
import { dirname, extname, join, posix, relative } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ora from 'ora';
import copy from 'recursive-copy';
import { SimulateWebAwesomeApp } from '../docs/_utils/simulate-webawesome-app.js';
import { generateDocs } from './docs.js';
import { getCdnDir, getDistDir, getDocsDir, getRootDir, getSiteDir } from './utils.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const currentYear = new Date().getFullYear();
const spinner = ora({ text: 'Web Awesome', color: 'cyan' }).start();
const getPackageData = async () => JSON.parse(await readFile(join(getRootDir(), 'package.json'), 'utf-8'));
const getVersion = async () => JSON.stringify((await getPackageData()).version.toString());
let buildContexts = {
  bundledContext: {},
  unbundledContext: {},
};

const debugPerf = process.env.DEBUG_PERFORMANCE === '1';

const isDeveloping = process.argv.includes('--develop');

/**
 * @typedef {Object} BuildOptions
 * @property {Array<string>} [watchedSrcDirectories]
 * @property {Array<string>} [watchedDocsDirectories]
 * @property {(eventName: "change" | "add" | "unlink", filePath: string) => unknown} [beforeWatchEvent]
 * @property {(eventName: "change" | "add" | "unlink", filePath: string) => unknown} [afterWatchEvent]
 */

/**
 * @param {BuildOptions} [options={}]
 */
export async function build(options = {}) {
  if (!options.watchedSrcDirectories) {
    options.watchedSrcDirectories = ['src'];
  }

  if (!options.watchedDocsDirectories) {
    options.watchedDocsDirectories = [getDocsDir()];
  }

  /**
   * Runs the full build.
   */
  async function buildAll() {
    const start = Date.now();

    try {
      const steps = [cleanup, generateManifest, generateReactWrappers, generateTypes, generateStyles];

      for (const step of steps) {
        if (debugPerf) {
          const stepStart = Date.now();
          await step();
          const elapsedTime = (Date.now() - stepStart) / 1000 + 's';
          spinner.succeed(`${step.name}: ${elapsedTime}`);
        } else {
          await step();
        }
      }

      // copy everything to unbundled before we generate bundles.
      await copy(getCdnDir(), getDistDir(), { overwrite: true });

      await generateBundle();
      await generateDocs({ spinner });

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

    await deleteAsync(getDistDir());
    await deleteAsync(getCdnDir());
    await mkdir(getDistDir(), { recursive: true });
    await mkdir(getCdnDir(), { recursive: true });

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

      if (!isDeveloping) {
        process.exit(1);
      }
    }

    spinner.succeed();

    return Promise.resolve();
  }

  /**
   * Generates React wrappers for all components.
   */
  function generateReactWrappers() {
    // Used by webawesome-app to make re-rendering not miserable with extra React file generation.
    if (process.env.SKIP_SLOW_STEPS === 'true') {
      spinner.info('Skipping React Wrapper generation.');
      return Promise.resolve();
    }

    spinner.start('Generating React wrappers');

    try {
      // need to run  make-react from this directories.
      execSync(`node ${join(__dirname, 'make-react.js')} --outdir "${getCdnDir()}"`, { stdio: 'inherit' });
    } catch (error) {
      console.error(`\n\n${error.message}`);

      if (!isDeveloping) {
        process.exit(1);
      }
    }
    spinner.succeed();

    return Promise.resolve();
  }

  /**
   * Copies theme stylesheets to the dist.
   */
  async function generateStyles() {
    spinner.start('Copying stylesheets');

    await copy(join(getRootDir(), 'src/styles'), join(getCdnDir(), 'styles'), { overwrite: true });

    spinner.succeed();

    return Promise.resolve();
  }

  /**
   * Runs TypeScript to generate types.
   */
  async function generateTypes() {
    // Used by webawesome-app to make re-rendering not miserable with extra TS compilations.
    if (process.env.SKIP_SLOW_STEPS === 'true') {
      spinner.info('Skipping TypeScript compiler.');
      return Promise.resolve();
    }

    spinner.start('Running the TypeScript compiler');

    const cwd = process.cwd();
    try {
      if (process.env.ROOT_DIR) {
        process.chdir(process.env.ROOT_DIR);
      }
      execSync(`tsc --project ./tsconfig.prod.json --outdir "${getCdnDir()}"`, { stdio: 'inherit' });
      process.chdir(cwd);
    } catch (error) {
      process.chdir(cwd);
      if (!isDeveloping) {
        process.exit(1);
      }

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

    const rootDir = process.env.ROOT_DIR || '.';
    // Bundled config
    const config = {
      format: 'esm',
      target: 'es2020',
      entryPoints: [
        //
        // IMPORTANT: Entry points MUST be mapped in package.json => exports
        //
        // Utilities
        join(rootDir, 'src/webawesome.ts'),
        // Autoloader + utilities
        join(rootDir, 'src/webawesome.loader.ts'),
        join(rootDir, 'src/webawesome.ssr-loader.ts'),
        // Individual components
        ...(await globby(posix.join(rootDir, 'src/components/**/!(*.(style|test)).ts'))),
        // Translations
        ...(await globby(posix.join(rootDir, 'src/translations/**/*.ts'))),
        // Utilities
        ...(await globby(posix.join(rootDir, 'src/utilities/**/*.ts'))),
        // Events
        ...(await globby(posix.join(rootDir, 'src/events/**/*.ts'))),
        // TODO: Should `src/internal` be included?
        // React wrappers
        ...(await globby(posix.join(rootDir, 'src/react/**/*.ts'))),
      ],
      outdir: getCdnDir(),
      chunkNames: 'chunks/[name].[hash]',
      define: {
        'process.env.NODE_ENV': '"production"', // required by Floating UI
      },
      bundle: true,
      splitting: true,
      minify: false,
      banner: {
        js: `/*! Copyright ${currentYear} Fonticons, Inc. - https://webawesome.com/license */`,
      },
      plugins: [replace({ __WEBAWESOME_VERSION__: await getVersion() })],
    };

    const unbundledConfig = {
      ...config,
      splitting: true,
      treeShaking: true,
      // Don't inline libraries like Lit etc.
      packages: 'external',
      outdir: getDistDir(),
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
      if (!isDeveloping) {
        process.exit(1);
      }
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

      if (!isDeveloping) {
        process.exit(1);
      }
    }

    spinner.succeed();
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
          baseDir: getSiteDir(),
          routes: {
            '/dist/': './dist-cdn/',
          },
        },
        middleware: [
          function simulateWebawesomeApp(req, res, next) {
            // Accumulator for strings so we can pass them through nunjucks a second time similar to how the webawesome-app
            // will be running nunjucks twice.
            const finalString = [];
            const encoding = 'utf-8';

            if (!next) {
              return;
            }

            if (!req.url) {
              next();
              return;
            }

            const extension = extname(req.url);
            if (extension !== '' && extension !== '.html') {
              // Assume its something like .svg / .png / .css etc. that we don't want to transform.
              next();
              return;
            }

            const _write = res.write;

            res.write = function (chunk, encoding) {
              // Buffer chunks into an array so that we do a single transform.
              finalString.push(chunk.toString());
            };

            const _end = res.end;
            res.end = function (...args) {
              const transformedStr = SimulateWebAwesomeApp(finalString.join(''));
              _write.call(res, transformedStr, encoding);
              _end.call(res, ...args);
            };

            next();
          },
        ],
        callbacks: {
          ready: (_err, instance) => {
            // 404 errors
            instance.addMiddleware('*', async (req, res) => {
              if (req.url.toLowerCase().endsWith('.svg')) {
                // Make sure SVGs error out in dev instead of serve the 404 page
                res.writeHead(404);
              } else {
                try {
                  const notFoundTemplate = await readFile(join(getSiteDir(), '404.html'), 'utf-8');
                  res.writeHead(404);
                  res.write(notFoundTemplate || 'Page Not Found');
                } catch {
                  // We're probably disconnected for some reason, so fail gracefully
                }
              }

              res.end();
            });
          },
        },
      },
      () => {
        spinner.succeed();
        console.log(`\nThe dev server is running at ${chalk.cyan(url)}\n`);
      },
    );

    const watchEvents = ['change', 'unlink', 'add'];
    // Rebuild and reload when source files change
    options.watchedSrcDirectories.forEach(dir => {
      const watcher = bs.watch(join(dir, '**', '!(*.test).*'), { ignoreInitial: true });

      watchEvents.forEach(evt => {
        watcher.on(evt, handleWatchEvent(evt));
      });
      function handleWatchEvent(evt) {
        return async filename => {
          const changedFile = relative(getRootDir(), filename);

          if (evt === 'change') {
            spinner.info(`File modified ${chalk.gray(`(${changedFile})`)}`);
          } else if (evt === 'unlink') {
            spinner.info(`File deleted ${chalk.gray(`(${changedFile})`)}`);
          } else if (evt === 'add') {
            spinner.info(`File added ${chalk.gray(`(${changedFile})`)}`);
          }

          try {
            const isTestFile = filename.includes('.test.ts');
            const isCssStylesheet = filename.includes('.css');
            const isComponent =
              filename.includes('components/') && filename.includes('.ts') && !isCssStylesheet && !isTestFile;

            // Re-bundle when relevant files change
            if (isTestFile) {
              return;
            }

            if (typeof options.beforeWatchEvent === 'function') {
              await options.beforeWatchEvent(evt, filename);
            }

            // Copy stylesheets when CSS files change
            if (isCssStylesheet) {
              await generateStyles();
            }

            // Regenerate metadata when components change
            if (isComponent) {
              await generateManifest();
            }

            // copy everything to unbundled before we generate bundles.
            // this may cause watcher events to break. if things are broken with file watching, comment this out.
            await copy(getCdnDir(), getDistDir(), { overwrite: true });
            await regenerateBundle();

            // This needs to be outside of "isComponent" check because SSR needs to run on CSS files too.
            await generateDocs({ spinner });

            if (typeof options.afterWatchEvent === 'function') {
              await options.afterWatchEvent(evt, filename);
            }

            reload();
          } catch (err) {
            console.error(chalk.red(err));

            if (!isDeveloping) {
              process.exit(1);
            }
          }
        };
      }
    });

    // Rebuild the docs and reload when the docs change
    options.watchedDocsDirectories.forEach(dir => {
      const watcher = bs.watch(join(dir, '**', '*.*'), { ignoreInitial: true });

      watchEvents.forEach(evt => {
        watcher.on(evt, handleWatchEvent(evt));
      });

      function handleWatchEvent(evt) {
        return async filename => {
          const changedFile = relative(getRootDir(), filename);

          let message = '';
          if (evt === 'change') {
            message = chalk.blue(`File modified ${chalk.gray(`(${changedFile})`)}`);
          } else if (evt === 'unlink') {
            message = chalk.red(`File deleted ${chalk.gray(`(${changedFile})`)}`);
          } else if (evt === 'add') {
            message = chalk.green(`File added ${chalk.gray(`(${changedFile})`)}`);
          }

          if (message) {
            if (spinner) {
              spinner.info(message);
            } else {
              console.log(message);
            }
          }

          if (typeof options.beforeWatchEvent === 'function') {
            await options.beforeWatchEvent(evt, filename);
          }
          await generateDocs({ spinner });

          if (typeof options.afterWatchEvent === 'function') {
            await options.afterWatchEvent(evt, filename);
          }
          reload();
        };
      }
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
}

// https://exploringjs.com/nodejs-shell-scripting/ch_nodejs-path.html#detecting-if-module-is-main
// Detects if this was called via node scripts/build.js
function isRunAsMain() {
  if (import.meta.url.startsWith('file:')) {
    // (A)
    const modulePath = fileURLToPath(import.meta.url);
    if (process.argv[1] === modulePath) {
      // (B)
      return true;
    }
  }

  return false;
}

if (isRunAsMain()) {
  await build();
}
