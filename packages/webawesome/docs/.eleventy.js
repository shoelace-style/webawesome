import * as path from 'node:path';
import * as fs from "node:fs"
import { anchorHeadingsPlugin } from './_utils/anchor-headings.js';
import { codeExamplesPlugin } from './_utils/code-examples.js';
import { copyCodePlugin } from './_utils/copy-code.js';
import { currentLink } from './_utils/current-link.js';
import { highlightCodePlugin } from './_utils/highlight-code.js';
import { markdown } from './_utils/markdown.js';
// import { formatCodePlugin } from './_utils/format-code.js';
// import litPlugin from '@lit-labs/eleventy-plugin-lit';
import { readFile } from 'fs/promises';
import nunjucks from 'nunjucks';
// import componentList from './_data/componentList.js';
import * as filters from './_utils/filters.js';
import { outlinePlugin } from './_utils/outline.js';
import { replaceTextPlugin } from './_utils/replace-text.js';
import { searchPlugin } from './_utils/search.js';

import process from 'process';

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const packageData = JSON.parse(await readFile(path.join(__dirname, '..', 'package.json'), 'utf-8'));
const isDev = process.argv.includes('--develop');

const globalData = {
  package: packageData,
  layout: 'page.njk',
  server: {
    head: '',
    loginOrAvatar: '',
    flashes: '',
  },
};

export default async function (eleventyConfig) {
  /**
   * If you plan to add or remove any of these extensions, make sure to let either Konnor or Cory know as these passthrough extensions
   * will also need to be updated in the Web Awesome App.
   */
  const passThroughExtensions = ['js', 'css', 'png', 'svg', 'jpg', 'mp4'];

  const docsDir = path.join(process.env.BASE_DIR || ".", 'docs');
  const passThrough = [...passThroughExtensions.map(ext => path.join(docsDir, '**/*.' + ext))];

  /**
   * This is the guard we use for now to make sure our final built files dont need a 2nd pass by the server. This keeps us able to still deploy the bare HTML files on Vercel until the app is ready.
   */
  const serverBuild = process.env.WEBAWESOME_SERVER === 'true';

  // Add template data
  for (let name in globalData) {
    eleventyConfig.addGlobalData(name, globalData[name]);
  }

  // Template filters - {{ content | filter }}
  eleventyConfig.addFilter('inlineMarkdown', content => markdown.renderInline(content || ''));
  eleventyConfig.addFilter('markdown', content => markdown.render(content || ''));

  for (let name in filters) {
    eleventyConfig.addFilter(name, filters[name]);
  }

  // Shortcodes - {% shortCode arg1, arg2 %}
  eleventyConfig.addShortcode('cdnUrl', location => {
    return `https://early.webawesome.com/webawesome@${packageData.version}/dist/` + (location || '').replace(/^\//, '');
  });

  // Turns `{% server "foo" %} into `{{ server.foo | safe }}` when the WEBAWESOME_SERVER variable is set to "true"
  eleventyConfig.addShortcode('server', function (property) {
    if (serverBuild) {
      return `{{ server.${property} | safe }}`;
    }

    return '';
  });

  eleventyConfig.addTransform('second-nunjucks-transform', function NunjucksTransform(content) {
    // For a server build, we expect a server to run the second transform.
    if (serverBuild) {
      return content;
    }

    // Only run the transform on files nunjucks would transform.
    if (!this.page.inputPath.match(/.(md|html|njk)$/)) {
      return content;
    }

    /** This largely mimics what an app would do and just stubs out what we don't care about. */
    return nunjucks.renderString(content, {
      // Stub the server EJS shortcodes.
      server: {
        head: '',
        loginOrAvatar: '',
        flashes: '',
      },
    });
  });

  // Paired shortcodes - {% shortCode %}content{% endShortCode %}
  eleventyConfig.addPairedShortcode('markdown', content => markdown.render(content || ''));

  // Helpers

  // Use our own markdown instance
  eleventyConfig.setLibrary('md', markdown);

  // Add anchors to headings
  eleventyConfig.addPlugin(anchorHeadingsPlugin({ container: '#content' }));

  // Add an outline to the page
  eleventyConfig.addPlugin(
    outlinePlugin({
      container: '#content',
      target: '.outline-links',
      selector: 'h2, h3',
      ifEmpty: doc => {
        doc.querySelector('#outline')?.remove();
      },
    }),
  );

  // Add current link classes
  eleventyConfig.addPlugin(currentLink());

  // Add code examples for `<code class="example">` blocks
  eleventyConfig.addPlugin(codeExamplesPlugin());

  // Highlight code blocks with Prism
  eleventyConfig.addPlugin(highlightCodePlugin());

  // Add copy code buttons to code blocks
  eleventyConfig.addPlugin(copyCodePlugin);

  // Various text replacements
  eleventyConfig.addPlugin(
    replaceTextPlugin([
      {
        replace: /\[version\]/gs,
        replaceWith: packageData.version,
      },
      // Replace [issue:1234] with a link to the issue on GitHub
      {
        replace: /\[pr:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/pull/$1">#$1</a>',
      },
      // Replace [pr:1234] with a link to the pull request on GitHub
      {
        replace: /\[issue:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/issues/$1">#$1</a>',
      },
      // Replace [discuss:1234] with a link to the discussion on GitHub
      {
        replace: /\[discuss:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/discussions/$1">#$1</a>',
      },
    ]),
  );

  // Build the search index
  eleventyConfig.addPlugin(
    searchPlugin({
      filename: '',
      selectorsToIgnore: ['code.example'],
      getContent: doc => doc.querySelector('#content')?.textContent ?? '',
    }),
  );

  // Production-only plugins
  //
  // TODO - disabled because it takes about a minute to run now
  //
  // if (!isDev) {
  //   // Run Prettier on each file (prod only because it can be slow)
  //   eleventyConfig.addPlugin(formatCodePlugin());
  // }


  let assetsDir = path.join(process.env.BASE_DIR || "docs", "assets")
  fs.cpSync(assetsDir, path.join(eleventyConfig.directories.output, "assets"), { recursive: true })

  for (let glob of passThrough) {
    eleventyConfig.addPassthroughCopy(glob);
  }

  // // SSR plugin
  // // Make sure this is the last thing, we don't want to run the risk of accidentally transforming shadow roots with the nunjucks 2nd transform.
  // if (!isDev) {
  //   //
  //   // Problematic components in SSR land:
  //   //  - animation (breaks on navigation + ssr with Turbo)
  //   //  - mutation-observer (why SSR this?)
  //   //  - resize-observer (why SSR this?)
  //   //  - tooltip (why SSR this?)
  //   //
  //   const omittedModules = [];
  //   const componentModules = componentList
  //     .filter(component => !omittedModules.includes(component.tagName.split(/wa-/)[1]))
  //     .map(component => {
  //       const name = component.tagName.split(/wa-/)[1];
  //       const componentDirectory = process.env.UNBUNDLED_DIST_DIRECTORY || path.join('.', 'dist');
  //       return path.join(componentDirectory, 'components', name, `${name}.js`);
  //     });
  //
  //   eleventyConfig.addPlugin(litPlugin, {
  //     mode: 'worker',
  //     componentModules,
  //   });
  // }
}


export const config = {
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'docs',
    includes: '_includes',
    layouts: '_layouts',
  },
  templateFormats: ['njk', 'md'],
}

