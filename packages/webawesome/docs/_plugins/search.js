/* eslint-disable no-invalid-this */
import { readFileSync } from 'fs';
import { mkdir, writeFile } from 'fs/promises';
import MiniSearch from 'minisearch';
import { parse } from 'node-html-parser';
import * as path from 'path';
import { dirname, join } from 'path';

function collapseWhitespace(string) {
  return string.replace(/\s+/g, ' ');
}

/** Strip .njk/.html and /index.njk or /index.html so search results show real URLs, not source filenames. */
function normalizeDisplayUrl(url) {
  if (!url || url === '/') return '/';
  // Strip /index.njk or /index.html so path ends at parent directory (e.g. /docs/button/index.html → /docs/button)
  let s = url.replace(/\/index\.(njk|html)$/i, '');
  // Strip .njk or .html from last path segment (e.g. /account/login.njk → /account/login)
  s = s.replace(/\.(njk|html)$/i, '');
  return s || '/';
}

/**
 * Eleventy plugin to build a MiniSearch search index.
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
        pagesToIndex.delete(data.page.inputPath);
      } else {
        // Cache front matter keywords here (preprocessor has data access, transform does not)
        pagesToIndex.set(data.page.inputPath, {
          pending: true,
          synonyms: data.synonyms || [],
          useCases: data['use-cases'] || [],
          category: data.category || '',
        });
      }

      return content;
    });

    // With incremental builds we need this to be last in case stuff was added from metadata. _BUT_ in incremental builds, not every page is added to the "transform".
    eleventyConfig.addTransform('search', function (content) {
      const existing = pagesToIndex.get(this.page.inputPath);
      if (!existing) {
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

      const rawUrl = this.page.url === '/' ? '/' : this.page.url.replace(/\/$/, '');
      pagesToIndex.set(this.page.inputPath, {
        title: collapseWhitespace(options.getTitle(doc)),
        description: collapseWhitespace(options.getDescription(doc)),
        headings: options.getHeadings(doc).map(collapseWhitespace),
        content: collapseWhitespace(options.getContent(doc)),
        url: normalizeDisplayUrl(rawUrl),
        synonyms: existing.synonyms || [],
        useCases: existing.useCases || [],
        category: existing.category || '',
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
          // A page uses a cached value if it's still pending (not yet processed by the transform hook).
          // This works around the limitation of incremental builds not running transform on every file.
          const current = pagesToIndex.get(key);
          if (current?.pending) {
            pagesToIndex.set(key, {
              ...value,
              synonyms: current.synonyms,
              useCases: current.useCases,
              category: current.category,
            });
          }
        }
      }

      const map = [];

      getCachedPages();

      const searchIndex = new MiniSearch({
        fields: ['t', 'h', 's', 'u', 'c'],
        storeFields: [],
      });

      let index = 0;
      for (const [_inputPath, page] of pagesToIndex) {
        searchIndex.add({
          id: index,
          t: page.title,
          h: page.headings,
          s: (page.synonyms || []).join(' '),
          u: (page.useCases || []).join(' '),
          c: page.content,
        });
        map[index] = { title: page.title, description: page.description, url: page.url, category: page.category };
        index++;
      }

      await mkdir(dirname(outputFilename), { recursive: true });
      await writeFile(outputFilename, JSON.stringify({ searchIndex: searchIndex.toJSON(), map }), 'utf-8');
      await writeFile(cachedPages, JSON.stringify({ pages: [...pagesToIndex.entries()] }, null, 2));
    });
  };
}
