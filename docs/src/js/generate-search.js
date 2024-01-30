import * as pagefind from 'pagefind';
import * as path from 'node:path';

// clean up once complete
import { getCollection } from 'astro:content';

export async function generateSearch() {
  const { index } = await pagefind.createIndex({});
  if (!index) return;

  // Get all `src/content/docs/` entries
  let allContent = await getCollection('docs');

  allContent = allContent.filter(doc => {
    return doc.data.pagefind !== false;
  });

  await Promise.allSettled(
    allContent.map(async entry => {
      const { category, title, description } = entry.data;
      return await index?.addCustomRecord({
        content: entry.body,
        language: 'en',
        url: entry.slug,
        meta: {
          category: category || '',
          title,
          description: description || ''
        }
      });
    })
  );

  const { errors } = await index.writeFiles({
    outputPath: path.join(process.cwd(), 'public', 'pagefind')
  });
}
