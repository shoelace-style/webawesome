import Eleventy from '@11ty/eleventy';
import { deleteAsync } from 'del';
import { join } from 'path';
import { docsDir, siteDir } from './utils.js';

const elev = new Eleventy(docsDir, siteDir, {
  quietMode: true,
  configPath: join(docsDir, '.eleventy.js'),
});

// Cleanup
await deleteAsync(siteDir);

// Write it
await elev.write();
