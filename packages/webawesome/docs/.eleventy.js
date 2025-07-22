import { parse as HTMLParse } from 'node-html-parser';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { anchorHeadingsTransformer } from './_transformers/anchor-headings.js';
import { codeExamplesTransformer } from './_transformers/code-examples.js';
import { copyCodeTransformer } from './_transformers/copy-code.js';
import { currentLinkTransformer } from './_transformers/current-link.js';
import { highlightCodeTransformer } from './_transformers/highlight-code.js';
import { outlineTransformer } from './_transformers/outline.js';
import { getComponents } from './_utils/manifest.js';
import { markdown } from './_utils/markdown.js';
import { SimulateWebAwesomeApp } from './_utils/simulate-webawesome-app.js';
// import { formatCodePlugin } from './_plugins/format-code.js';
// import litPlugin from '@lit-labs/eleventy-plugin-lit';
import { readFile } from 'fs/promises';
import process from 'process';
import * as url from 'url';
import { replaceTextPlugin } from './_plugins/replace-text.js';
import { searchPlugin } from './_plugins/search.js';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const isDev = process.argv.includes('--develop');
const passThroughExtensions = ['js', 'css', 'png', 'svg', 'jpg', 'mp4'];

async function getPackageData() {
  return JSON.parse(await readFile(path.join(__dirname, '..', 'package.json'), 'utf-8'));
}

export default async function (eleventyConfig) {
  const docsDir = path.join(process.env.BASE_DIR || '.', 'docs');
  let packageData = await getPackageData();
  let allComponents = getComponents();

  const distDir = process.env.UNBUNDLED_DIST_DIRECTORY || path.resolve(__dirname, '../dist');
  const customElementsManifest = path.join(distDir, 'custom-elements.json');
  const stylesheets = path.join(distDir, 'styles');

  eleventyConfig.addWatchTarget(customElementsManifest);
  eleventyConfig.setWatchThrottleWaitTime(10); // in milliseconds

  eleventyConfig.on('eleventy.beforeWatch', async function (changedFiles) {
    let updatePackageData = false;
    let updateComponentData = false;
    changedFiles.forEach(file => {
      if (file.includes('package.json')) {
        updatePackageData = true;
      }

      if (file.includes('custom-elements.json')) {
        updateComponentData = true;
      }
    });

    if (updatePackageData) {
      packageData = await getPackageData();
    }

    if (updateComponentData) {
      allComponents = getComponents();
    }
  });

  /**
   * If you plan to add or remove any of these extensions, make sure to let either Konnor or Cory know as these
   * passthrough extensions will also need to be updated in the Web Awesome App.
   */
  const passThrough = [...passThroughExtensions.map(ext => path.join(docsDir, '**/*.' + ext))];

  /**
   * This is the guard we use for now to make sure our final built files don't need a 2nd pass by the server. This keeps
   * us able to still deploy the bare HTML files on Vercel until the app is ready.
   */
  const serverBuild = process.env.WEBAWESOME_SERVER === 'true';

  //
  // Set all global template data here
  //
  eleventyConfig.addGlobalData('package', packageData);
  eleventyConfig.addGlobalData('layout', 'page.njk');
  eleventyConfig.addGlobalData('server', {
    head: '',
    loginOrAvatar: '',
    flashes: '',
  });

  // Template filters - {{ content | filter }}
  eleventyConfig.addFilter('inlineMarkdown', content => markdown.renderInline(content || ''));
  eleventyConfig.addFilter('markdown', content => markdown.render(content || ''));
  eleventyConfig.addFilter('stripExtension', string => path.parse(string + '').name);
  eleventyConfig.addFilter('stripPrefix', content => content.replace(/^wa-/, ''));
  // Trims whitespace and pipes from the start and end of a string. Useful for CEM types, which can be pipe-delimited.
  // With Prettier 3, this means a leading pipe will exist be present when the line wraps.
  eleventyConfig.addFilter('trimPipes', content => {
    return typeof content === 'string' ? content.replace(/^(\s|\|)/g, '').replace(/(\s|\|)$/g, '') : content;
  });

  // Custom filter to sort with a priority item first, e.g.
  // {{ collection | sortWithFirst('fileSlug', 'default') }} => the item with the fileSlug of 'default' will be first
  eleventyConfig.addFilter('sortWithFirst', function (collection, property, firstValue) {
    const items = [...collection]; // Create a copy to avoid mutating original
    return items.sort((a, b) => {
      const aValue = property ? a[property] : a;
      const bValue = property ? b[property] : b;
      if (aValue === firstValue) return -1;
      if (bValue === firstValue) return 1;
      return 0;
    });
  });

  //
  // Add the componentPages collection
  //
  eleventyConfig.addCollection('componentPages', function (collectionApi) {
    const componentPages = collectionApi.getFilteredByGlob(
      path.join(eleventyConfig.directories.input, 'docs/components/**/*.md'),
    );

    return componentPages.map(page => {
      const componentName = path.basename(page.inputPath, '.md');
      const tagName = `wa-${componentName}`;
      const component = allComponents.find(c => c.tagName === tagName);

      // Add component to the page's data
      if (component) {
        page.data.component = component;
      }

      return page;
    });
  });

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

  // Paired shortcodes - {% shortCode %}content{% endShortCode %}
  eleventyConfig.addPairedShortcode('markdown', content => markdown.render(content || ''));

  // Helpers
  eleventyConfig.addNunjucksGlobal('getComponent', tagName => {
    const component = allComponents.find(c => c.tagName === tagName);
    if (!component) {
      throw new Error(
        `Unable to find "<${tagName}>". Make sure the file name is the same as the tag name (without prefix).`,
      );
    }
    return component;
  });

  // Use our own markdown instance
  eleventyConfig.setLibrary('md', markdown);

  // Add anchors to headings
  eleventyConfig.addTransform('doc-transforms', function (content) {
    let doc = HTMLParse(content, { blockTextElements: { code: true } });

    const transformers = [
      anchorHeadingsTransformer({ container: '#content' }),
      outlineTransformer({
        container: '#content',
        target: '.outline-links',
        selector: 'h2, h3',
        ifEmpty: doc => {
          doc.querySelector('#outline')?.remove();
        },
      }),
      // Add current link classes
      currentLinkTransformer(),
      codeExamplesTransformer(),
      highlightCodeTransformer(),
      copyCodeTransformer(),
    ];

    for (const transformer of transformers) {
      transformer.call(this, doc);
    }

    return doc.toString();
  });

  eleventyConfig.addPlugin(
    replaceTextPlugin([
      {
        replace: /\[version\]/gs,
        replaceWith: packageData.version,
      },
      // Replace [issue:1234] with a link to the issue on GitHub
      {
        replace: /\[pr:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/pull/$1" target="_blank">#$1</a>',
      },
      // Replace [pr:1234] with a link to the pull request on GitHub
      {
        replace: /\[issue:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/issues/$1" target="_blank">#$1</a>',
      },
      // Replace [discuss:1234] with a link to the discussion on GitHub
      {
        replace: /\[discuss:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/discussions/$1" target="_blank">#$1</a>',
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

  // This needs to happen in "eleventy.after" otherwise incremental builds never update.
  eleventyConfig.on('eleventy.after', function () {
    let assetsDir = path.join(process.env.BASE_DIR || 'docs', 'assets');
    const siteAssetsDir = path.join(eleventyConfig.directories.output, 'assets');
    fs.cpSync(assetsDir, siteAssetsDir, { recursive: true });
  });

  for (let glob of passThrough) {
    eleventyConfig.addPassthroughCopy(glob);
  }

  // // SSR plugin
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

  // For a server build, we expect a server to run the second transform.
  // For dev builds, we run the second transform in a middleware.
  if (!isDev && !serverBuild) {
    eleventyConfig.addTransform('simulate-webawesome-app', function (content) {
      // Only run the transform on files nunjucks would transform.
      if (!this.page.inputPath.match(/.(md|html|njk)$/)) {
        return content;
      }

      /** This largely mimics what an app would do and just stubs out what we don't care about. */
      return SimulateWebAwesomeApp(content);
    });
  }
}

export const config = {
  markdownTemplateEngine: 'njk',
  dir: {
    input: 'docs',
    includes: '_includes',
    layouts: '_layouts',
  },
  templateFormats: ['njk', 'md'],
};
