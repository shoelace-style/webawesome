/* eslint-disable no-invalid-this */
import { readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import lunr from 'lunr';
import { parse } from 'node-html-parser';
import * as path from 'path';
import { dirname, join } from 'path';

function collapseWhitespace(string) {
  return string.replace(/\s+/g, ' ');
}

/**
 * Eleventy plugin to build a Lunr search index.
 */
export function searchPlugin(options = {}) {
  options = {
    filename: '',
    selectorsToIgnore: [],
    getTitle: doc => doc.querySelector('title')?.textContent ?? '',
    getDescription: doc => doc.querySelector('meta[name="description"]')?.getAttribute('content') ?? '',
    getHeadings: doc => [...doc.querySelectorAll('h1, h2, h3, h4, h5, h6')].map(heading => heading.textContent ?? ''),
    getContent: doc => doc.querySelector('body')?.textContent ?? '',
    ...options,
  };

  // Hoist above so that it can "cache" properly for incremental builds.
  return function (eleventyConfig) {
    let pagesToIndex = new Map();

    eleventyConfig.addPreprocessor('exclude-unlisted-from-search', '*', function (data, content) {
      if (data.unlisted) {
        // no-op
        pagesToIndex.delete(data.page.inputPath);
      } else {
        pagesToIndex.set(data.page.inputPath, true);
      }

      return content;
    });

    // With incremental builds we need this to be last in case stuff was added from metadata. _BUT_ in incremental builds, not every page is added to the "transform".
    eleventyConfig.addTransform('search', function (content) {
      if (!pagesToIndex.has(this.page.inputPath)) {
        return content;
      }

      const doc = parse(content, {
        blockTextElements: {
          script: false,
          noscript: false,
          style: false,
          pre: false,
          code: false,
        },
      });

      // Remove content that shouldn't be searchable to reduce the index size
      options.selectorsToIgnore.forEach(selector => {
        doc.querySelectorAll(selector).forEach(el => el.remove());
      });

      pagesToIndex.set(this.page.inputPath, {
        title: collapseWhitespace(options.getTitle(doc)),
        description: collapseWhitespace(options.getDescription(doc)),
        headings: options.getHeadings(doc).map(collapseWhitespace),
        content: collapseWhitespace(options.getContent(doc)),
        url: this.page.url === '/' ? '/' : this.page.url.replace(/\/$/, ''),
      });

      return content;
    });

    eleventyConfig.on('eleventy.after', async ({ directories }) => {
      const { output } = directories;
      const outputFilename = path.resolve(join(output, 'search.json'));
      const cachedPages = path.resolve(join(output, 'cached_pages.json'));

      function getCachedPages() {
        let content = { pages: [] };
        try {
          content = JSON.parse(readFileSync(cachedPages));
        } catch (e) {}

        const cachedPagesMap = new Map(content.pages);
        for (const [key, value] of cachedPagesMap.entries()) {
          // A page uses a cached value if `true` and it didnt get its value set in the "transform" hook. This is to get around the limitation of incremental builds not going over every file in transform.
          if (pagesToIndex.get(key) === true) {
            pagesToIndex.set(key, value);
          }
        }
      }

      const map = [];

      getCachedPages();
      const searchIndex = lunr(function () {
        let index = 0;

        this.ref('id');
        this.field('t', { boost: 20 });
        this.field('h', { boost: 10 });
        this.field('c');

        for (const [_inputPath, page] of pagesToIndex) {
          this.add({ id: index, t: page.title, h: page.headings, c: page.content });
          map[index] = { title: page.title, description: page.description, url: page.url };
          index++;
        }
      });

      await mkdir(dirname(outputFilename), { recursive: true });
      await writeFile(outputFilename, JSON.stringify({ searchIndex, map }), 'utf-8');
      await writeFile(cachedPages, JSON.stringify({ pages: [...pagesToIndex.entries()] }, null, 2));
    });
  };
}
