import * as path from 'node:path';
import nunjucks from 'nunjucks';

const baseDir = process.env.BASE_DIR || 'docs';

const views = [path.join(baseDir), path.join(baseDir, '_layouts'), path.join(baseDir, '_includes')];

const nunjucksEnv = new nunjucks.Environment(new nunjucks.FileSystemLoader(views), {
  autoescape: true,
  noCache: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test',
});

/**
 * This function simulates what a server would do running "on top" of eleventy.
 */
export function SimulateWebAwesomeApp(str) {
  return nunjucksEnv.renderString(str, {
    // Stub the server EJS shortcodes.
    currentUser: {
      hasPro: false,
    },
    server: {
      head: '',
      flashes: '',
    },
  });
}
