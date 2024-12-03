import { parse } from 'path';
import { markdown } from './_utils/markdown.js';
import { anchorHeadingsPlugin } from './_utils/anchor-headings.js';
import { codeExamplesPlugin } from './_utils/code-examples.js';
import { copyCodePlugin } from './_utils/copy-code.js';
import { currentLink } from './_utils/current-link.js';
import { highlightCodePlugin } from './_utils/highlight-code.js';
import { formatCodePlugin } from './_utils/format-code.js';
import { replaceTextPlugin } from './_utils/replace-text.js';
import { searchPlugin } from './_utils/search.js';
import { readFile } from 'fs/promises';
import { outlinePlugin } from './_utils/outline.js';
import componentList from './_data/componentList.js';
import litPlugin from '@lit-labs/eleventy-plugin-lit';

import process from 'process';

const packageData = JSON.parse(await readFile('./package.json', 'utf-8'));
const isAlpha = process.argv.includes('--alpha');
const isDeveloping = process.argv.includes('--develop');

export default function (eleventyConfig) {
  // NOTE - alpha setting removes certain pages
  if (isAlpha) {
    eleventyConfig.ignores.add('**/components/page.md');
    eleventyConfig.ignores.add('**/experimental/**');
  }

  // Add template data
  eleventyConfig.addGlobalData('package', packageData);

  // Template filters - {{ content | filter }}
  eleventyConfig.addFilter('inlineMarkdown', content => markdown.renderInline(content || ''));
  eleventyConfig.addFilter('markdown', content => markdown.render(content || ''));
  eleventyConfig.addFilter('stripExtension', string => parse(string).name);
  eleventyConfig.addFilter('stripPrefix', content => content.replace(/^wa-/, ''));
  eleventyConfig.addFilter('trimPipes', content => {
    // Trims whitespace and pipes from the start and end of a string. Useful for CEM types, which can be pipe-delimited.
    // With Prettier 3, this means a leading pipe will exist be present when the line wraps.
    return typeof content === 'string' ? content.replace(/^(\s|\|)/g, '').replace(/(\s|\|)$/g, '') : content;
  });
  eleventyConfig.addFilter('keys', obj => Object.keys(obj));

  // Shortcodes - {% shortCode arg1, arg2 %}
  eleventyConfig.addShortcode('cdnUrl', location => {
    return `https://early.webawesome.com/webawesome@${packageData.version}/dist/` + location.replace(/^\//, '');
  });

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
      }
    })
  );

  // Add current link classes
  eleventyConfig.addPlugin(currentLink());

  // Add code examples for `<code class="example">` blocks
  eleventyConfig.addPlugin(codeExamplesPlugin());

  // Highlight code blocks with Prism
  eleventyConfig.addPlugin(highlightCodePlugin());

  // Add copy code buttons to code blocks
  eleventyConfig.addPlugin(copyCodePlugin());

  // Various text replacements
  eleventyConfig.addPlugin(
    replaceTextPlugin([
      // Replace [issue:1234] with a link to the issue on GitHub
      {
        replace: /\[pr:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/pull/$1">#$1</a>'
      },
      // Replace [pr:1234] with a link to the pull request on GitHub
      {
        replace: /\[issue:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/issues/$1">#$1</a>'
      },
      // Replace [discuss:1234] with a link to the discussion on GitHub
      {
        replace: /\[discuss:([0-9]+)\]/gs,
        replaceWith: '<a href="https://github.com/shoelace-style/webawesome/discussions/$1">#$1</a>'
      }
    ])
  );

  const omittedModules = [];

  // problematic components:
  // animation (breaks on navigation + ssr with Turbo)
  // mutation-observer (why SSR this?)
  // resize-observer (why SSR this?)
  // tooltip (why SSR this?)
  const componentModules = componentList
    // .filter(component => !omittedModules.includes(component.tagName.split(/wa-/)[1]))
    .map(component => {
      const name = component.tagName.split(/wa-/)[1];
      return `./dist/components/${name}/${name}.js`;
    });

  eleventyConfig.addPlugin(litPlugin, {
    mode: 'worker',
    componentModules
  });

  // Build the search index
  eleventyConfig.addPlugin(
    searchPlugin({
      filename: '',
      selectorsToIgnore: ['code.example'],
      getContent: doc => doc.querySelector('#content')?.textContent ?? ''
    })
  );

  // Production-only plugins
  //
  // TODO - disabled because it takes about a minute to run now
  //
  // if (!isDeveloping) {
  //   // Run Prettier on each file (prod only because it can be slow)
  //   eleventyConfig.addPlugin(formatCodePlugin());
  // }

  return {
    dir: {
      includes: '_includes',
      layouts: '_layouts'
    },
    templateFormats: ['njk', 'md']
  };
}
