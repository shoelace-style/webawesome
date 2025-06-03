import Eleventy from '@11ty/eleventy';
import { deleteAsync } from 'del';
import { join } from 'path';
import { getDocsDir, getEleventyConfigPath, getSiteDir } from './utils.js';

const elev = new Eleventy(getDocsDir(), getSiteDir(), {
  quietMode: true,
  configPath: getEleventyConfigPath(),
});

// Cleanup
await deleteAsync(getSiteDir());

// Write it
await elev.write();
