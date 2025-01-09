/* eslint-disable no-invalid-this */
import { mkdir, writeFile } from 'fs/promises';
import lunr from 'lunr';
import { parse } from 'node-html-parser';
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

  return function (eleventyConfig) {
    const pagesToIndex = [];

    eleventyConfig.addTransform('search', function (content) {
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

      pagesToIndex.push({
        title: collapseWhitespace(options.getTitle(doc)),
        description: collapseWhitespace(options.getDescription(doc)),
        headings: options.getHeadings(doc).map(collapseWhitespace),
        content: collapseWhitespace(options.getContent(doc)),
        url: this.page.url === '/' ? '/' : this.page.url.replace(/\/$/, ''),
      });

      return content;
    });

    eleventyConfig.on('eleventy.after', ({ dir }) => {
      const outputFilename = join(dir.output, 'search.json');
      const map = [];
      const searchIndex = lunr(async function () {
        let index = 0;

        this.ref('id');
        this.field('t', { boost: 20 });
        this.field('h', { boost: 10 });
        this.field('c');

        for (const page of pagesToIndex) {
          this.add({ id: index, t: page.title, h: page.headings, c: page.content });
          map[index] = { title: page.title, description: page.description, url: page.url };
          index++;
        }
        await mkdir(dirname(outputFilename), { recursive: true });
        await writeFile(outputFilename, JSON.stringify({ searchIndex, map }), 'utf-8');
      });
    });
  };
}
