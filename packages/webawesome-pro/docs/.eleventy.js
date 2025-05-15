import * as path from "node:path";
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


export default async function (eleventyConfig) {
  const webawesomeDir = path.resolve(path.join(__dirname, "..", "..", "..", "webawesome"))
  const baseConfig = (await import(path.join(webawesomeDir, "docs", ".eleventy.js"))).default
  process.env.UNBUNDLED_DIST_DIRECTORY = path.join("dist")

  /**
   * This ENV variable is what gets pass through copying working.
   */
  process.env.BASE_DIR = "_bundle_/pages/docs"

  baseConfig(eleventyConfig)

  // _bundle_ is a gitignored file because it combines webawesome docs and webawesome-app pages.
  // https://www.11ty.dev/docs/ignores/#opt-out-of-using-gitignore
  eleventyConfig.setUseGitIgnore(false);
}

export const config = {
  markdownTemplateEngine: 'njk',
  dir: {
    input: '_bundle_/pages',
    includes: '_includes',
    layouts: '_layouts',
  },
  templateFormats: ['njk', 'md'],
};

