import Eleventy from '@11ty/eleventy';

import copy from 'recursive-copy';

import chalk from 'chalk';
import { deleteAsync } from 'del';
import { getCdnDir, getDocsDir, getEleventyConfigPath, getSiteDir } from './utils.js';
import { join } from 'path';



// 11ty
export async function createEleventy(options = {}) {
  let { isIncremental, isDeveloping, rootDir } = options

  isDeveloping ??= process.argv.includes('--develop');
  isIncremental ??= process.argv.includes('--incremental');

  const eleventy = new Eleventy(rootDir || getDocsDir(), getSiteDir(), {
    quietMode: true,
    configPath: getEleventyConfigPath(),
    config: eleventyConfig => {
      if (isDeveloping || isIncremental) {
        eleventyConfig.setUseTemplateCache(false);
      }
    },
    source: 'script',
    runMode: isIncremental ? 'watch' : 'build',
  });
  eleventy.setIncrementalBuild(isIncremental);

  await eleventy.init();

  if (isIncremental) {
    await eleventy.watch();

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
  let { spinner, isIncremental, isDeveloping } = options

  isDeveloping ??= process.argv.includes('--develop');
  isIncremental ??= process.argv.includes('--incremental');

  let eleventy = globalThis.eleventy
  /**
    * Used by the webawesome-app to skip doc generation since it will do its own.
    */
  if (process.env.SKIP_ELEVENTY === 'true') {
    return;
  }

  spinner?.start('Writing the docs');

  if (isIncremental) {
  } else {
  }


  const output = []

  try {
    if (isIncremental) {
      // no-op.
      globalThis.eleventy ||= await createEleventy(options);
    } else {
      // Cleanup
      await deleteAsync(getSiteDir());

      globalThis.eleventy = await createEleventy(options);
      const eleventy = globalThis.eleventy

      // Write it
      await eleventy.write();
    }

    // Copy dist (production only)
    if (!isDeveloping) {
      await copy(getCdnDir(), join(getSiteDir(), 'dist'));
    }

    spinner?.succeed(`Writing the docs ${chalk.gray(`(${output}`)})`);
  } catch (error) {
    console.error('\n\n' + chalk.red(error) + '\n');

    spinner?.fail(chalk.red(`Error while writing the docs.`));
    if (!isDeveloping) {
      process.exit(1);
    }
  }
}

