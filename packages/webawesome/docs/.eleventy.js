import { nanoid } from 'nanoid';
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

  // Site metadata for social sharing (Open Graph, canonical URLs, etc.)
  const siteMetadata = {
    url: 'https://webawesome.com',
    name: 'Web Awesome',
    description: 'Build better with Web Awesome, the open source library of web components from Font Awesome.',
    image: 'https://webawesome.com/assets/images/open-graph/default.png',
  };

  // Title composition/stripping config - single source of truth
  const SITE_NAME = siteMetadata.name;
  const SITE_TITLE_SEPARATORS = ['|'];

  // Helper to escape user-provided strings for safe use inside RegExp sources
  const escapeRegExp = string => (string + '').replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');

  // Precompute a reusable regex to strip a trailing site name suffix from titles, e.g. " | Web Awesome"
  // Supports configured separators and flexible whitespace. This keeps search titles clean and improves Lunr scoring
  const siteNameEscapedForRegex = escapeRegExp(SITE_NAME);
  const separatorsEscaped = SITE_TITLE_SEPARATORS.map(s => escapeRegExp(s)).join('');
  const siteTitleSuffixPattern = new RegExp(`\\s*[${separatorsEscaped}]\\s*${siteNameEscapedForRegex}$`);

  // Helper to remove the site suffix from a page title. Keep this in sync with how page titles
  // are composed (see eleventyComputed.pageTitle) so search indexing stays consistent
  const stripSiteTitleSuffix = title => (title || '').replace(siteTitleSuffixPattern, '');

  // Helper to compose a full page title with site suffix when appropriate
  // Uses the same separator set as the stripping logic for consistency
  const composePageTitle = baseTitle => {
    const title = baseTitle || SITE_NAME;
    const preferredSeparator = SITE_TITLE_SEPARATORS[0] || '|';
    return title !== SITE_NAME ? `${title} ${preferredSeparator} ${SITE_NAME}` : title;
  };

  eleventyConfig.addGlobalData('siteMetadata', siteMetadata);

  // Template filters - {{ content | filter }}
  eleventyConfig.addFilter('inlineMarkdown', content => markdown.renderInline(content || ''));
  eleventyConfig.addFilter('markdown', content => markdown.render(content || ''));
  eleventyConfig.addFilter('stripExtension', string => path.parse(string + '').name);
  eleventyConfig.addFilter('stripPrefix', content => content.replace(/^wa-/, ''));
  eleventyConfig.addFilter('uniqueId', (_value, length = 8) => nanoid(length));

  eleventyConfig.addGlobalData('eleventyComputed', {
    // Page title with smart + default site name formatting
    pageTitle: data => composePageTitle(data.title),
    // Open Graph title with smart + default site name formatting
    ogTitle: data => composePageTitle(data.ogTitle || data.title),
    ogDescription: data => data.ogDescription || data.description,
    ogImage: data => data.ogImage || siteMetadata.image,
    ogUrl: data => {
      if (data.ogUrl) return data.ogUrl;
      const url = data.page?.url || '';
      return url ? `${siteMetadata.url}${url}` : siteMetadata.url;
    },
    ogType: data => data.ogType || 'website',
  });

  // Trims whitespace and pipes from the start and end of a string. Useful for CEM types, which can be pipe-delimited.
  // With Prettier 3, this means a leading pipe will exist be present when the line wraps.
  eleventyConfig.addFilter('trimPipes', content => {
    return typeof content === 'string' ? content.replace(/^(\s|\|)/g, '').replace(/(\s|\|)$/g, '') : content;
  });

  /**
   * @example
    {% set foo = {foo: "bar"} %}
    {% set bar = {bar: "baz"} %}
    {% set merged = foo | merge(bar) %}
    {{ merged | dump }}
   */
  eleventyConfig.addFilter('merge', function (obj1, obj2) {
    return Object.assign({}, obj1, obj2);
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
    // We use WA (free) via the public CDN for CodePen examples
    return (
      `https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@${packageData.version}/dist-cdn/` +
      (location || '').replace(/^\//, '')
    );
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

  // for files with `unpublished: true`, it will make sure they do not make it into the final build at all, but will be usable in development.
  eleventyConfig.addPreprocessor('unpublished', '*', (data, content) => {
    if (data.unpublished && process.env.ELEVENTY_RUN_MODE === 'build') {
      return false;
    }

    return content;
  });

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
      // Use <title> but strip a trailing site name suffix for cleaner search results
      getTitle: doc => {
        const raw = doc.querySelector('title')?.textContent ?? '';
        return stripSiteTitleSuffix(raw);
      },
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
    const baseDir = process.env.BASE_DIR || 'docs';
    let assetsDir = path.join(baseDir, 'assets');
    const siteAssetsDir = path.join(eleventyConfig.directories.output, 'assets');
    fs.cpSync(assetsDir, siteAssetsDir, { recursive: true });

    // Passthrough copy for manifest.json (PWA manifest file)
    fs.cpSync(path.join(baseDir, 'manifest.json'), path.join(eleventyConfig.directories.output, 'manifest.json'));
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
