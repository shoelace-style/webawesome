import Eleventy from '@11ty/eleventy';

import copy from 'recursive-copy';

import chalk from 'chalk';
import { deleteAsync } from 'del';
import { join } from 'path';
import { getCdnDir, getDocsDir, getEleventyConfigPath, getSiteDir } from './utils.js';

let eleventyBuildResolver;
let eleventyBuildPromise;

function queueBuild() {
  eleventyBuildPromise = new Promise(resolve => {
    eleventyBuildResolver = resolve;
  });
}

// 11ty
export async function createEleventy(options = {}) {
  let { isIncremental, isDeveloping, rootDir } = options;

  isDeveloping ??= process.argv.includes('--develop');
  isIncremental ??= isDeveloping && !process.argv.includes('--no-incremental');

  const eleventy = new Eleventy(rootDir || getDocsDir(), getSiteDir(), {
    quietMode: true,
    configPath: getEleventyConfigPath(),
    config: eleventyConfig => {
      if (isDeveloping || isIncremental) {
        eleventyConfig.setUseTemplateCache(false);

        eleventyConfig.on('eleventy.before', function () {
          queueBuild();
        });
        eleventyConfig.on('eleventy.beforeWatch', async function () {
          queueBuild();
        });
        eleventyConfig.on('eleventy.after', async function () {
          eleventyBuildResolver();
        });
      }
    },
    source: 'script',
    runMode: isIncremental ? 'watch' : 'build',
  });
  eleventy.setIncrementalBuild(isIncremental);

  await eleventy.init();

  eleventy.logger.isChalkEnabled = false;
  eleventy.logger.overrideLogger(new CustomLogger());

  if (isIncremental) {
    // For some reason, removing the await here fixes incremental loading?
    eleventy.watch();

    process.on('SIGINT', async () => {
      await eleventy.stopWatch();
      process.exitCode = 0;
    });
  }

  return eleventy;
}

/**
 * Generates the documentation site.
 */
export async function generateDocs(options = {}) {
  let { spinner, isIncremental, isDeveloping } = options;

  isDeveloping ??= process.argv.includes('--develop');
  isIncremental ??= isDeveloping && !process.argv.includes('--no-incremental');

  /**
   * Used by the webawesome-app to skip doc generation since it will do its own.
   */
  if (process.env.SKIP_ELEVENTY === 'true') {
    return;
  }

  let eleventy = globalThis.eleventy;

  spinner?.start?.('Writing the docs');

  const outputs = {
    warn: [],
  };

  function stubConsole(key) {
    const originalFn = console[key];
    console[key] = function (...args) {
      outputs[key].push(...args);
    };
    return originalFn;
  }

  // Works around a bug in 11ty where it still prints warnings despite the logger being overriden and in quietMode.
  const originalWarn = stubConsole('warn');

  let output = '';

  try {
    if (isIncremental) {
      if (!globalThis.eleventy) {
        // First run
        globalThis.eleventy = await createEleventy(options);
        eleventy = globalThis.eleventy;
        output = chalk.gray(`(${eleventy.logFinished()})`);
      } else {
        // eleventy incremental does its own writing, so we just kinda trust it for right now.
        eleventy = globalThis.eleventy;

        await eleventyBuildPromise;
        let info = eleventy.logger.logger.outputs.log;

        // TODO: The first write with incremental seems to be 1 behind. Not sure why. But its good enough for now.
        info = info.filter(line => {
          return !line.includes('Watching');
        });
        const lastLine = info[info.length - 1];
        output = chalk.gray(`(${info.join('')})`);
        eleventy.logger.logger.reset();
      }
    } else {
      // Cleanup
      await deleteAsync(getSiteDir());

      globalThis.eleventy = await createEleventy(options);
      eleventy = globalThis.eleventy;

      // Write it
      await eleventy.write();
      output = chalk.gray(`(${eleventy.logFinished()})`);
    }

    // Copy dist (production only)
    if (!isDeveloping) {
      await copy(getCdnDir(), join(getSiteDir(), 'dist'));
    }

    if (spinner) {
      spinner.succeed(`Writing the docs ${output}`);
    } else {
      console.log(`Writing the docs ${output}`);
    }
  } catch (error) {
    console.warn = originalWarn;

    console.error('\n\n' + chalk.red(error) + '\n');

    if (spinner) {
      spinner.fail(chalk.red(`Error while writing the docs.`));
    } else {
      console.error(chalk.red(`Error while writing the docs.`));
    }

    if (!isDeveloping) {
      process.exit(1);
    }
  }
}

/**
 * Much of this code is taken from 11ty's ConsoleLogger here:
 * https://github.com/11ty/eleventy/blob/main/src/Util/ConsoleLogger.js
 *
 * Patches 11ty logger so it doesnt log everything, but we can still use its output for our own build.
 * @typedef {'error'|'log'|'warn'|'info'} LogType
 */
class CustomLogger {
  #outputStream;

  constructor() {
    this.reset();
  }

  flush() {
    Object.keys(this.outputs).forEach(outputType => {
      console[outputType](this.outputs[outputType].join(''));
    });
    this.reset();
  }

  reset() {
    this.outputs = {
      log: [],
      info: [],
      warn: [],
      error: [],
    };
  }

  /** @param {string} msg */
  log(msg) {
    this.message(msg);
  }

  /**
   * @typedef LogOptions
   * @property {string} message
   * @property {string=} prefix
   * @property {LogType=} type
   * @property {string=} color
   * @property {boolean=} force
   * @param {LogOptions} options
   */
  logWithOptions({ message, type, prefix, color, force }) {
    this.message(message, type, color, force, prefix);
  }

  /** @param {string} msg */
  forceLog(msg) {
    this.message(msg, undefined, undefined, true);
  }

  /** @param {string} msg */
  info(msg) {
    this.message(msg, 'info', 'blue');
  }

  /** @param {string} msg */
  warn(msg) {
    this.message(msg, 'warn', 'yellow');
  }

  /** @param {string} msg */
  error(msg) {
    this.message(msg, 'error', 'red');
  }

  get outputStream() {
    if (!this.#outputStream) {
      this.#outputStream = new Readable({
        read() {},
      });
    }
    return this.#outputStream;
  }

  /** @param {string} msg */
  toStream(msg) {
    this.outputStream.push(msg);
  }

  closeStream() {
    this.outputStream.push(null);
    return this.outputStream;
  }

  /**
   * Formats the message to log.
   *
   * @param {string} message - The raw message to log.
   * @param {LogType} [type='log'] - The error level to log.
   * @param {string|undefined} [chalkColor=undefined] - Color name or falsy to disable
   * @param {boolean} [forceToConsole=false] - Enforce a log on console instead of specified target.
   */
  message(message, type = 'log', chalkColor = undefined, _forceToConsole = false, prefix = '') {
    // if (chalkColor && this.isChalkEnabled) {
    //   message = `${chalk.gray(prefix)} ${message.split("\n").join(`\n${chalk.gray(prefix)} `)}`;
    // 	this.outputs[type].push(chalk[chalkColor](message));
    // } else {
    message = `${prefix}${message.split('\n').join(`\n${prefix}`)}`;
    this.outputs[type].push(message);
    // }
  }
}
