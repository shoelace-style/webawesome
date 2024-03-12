// import { APIContext } from "astro";
import * as pagefind from 'pagefind';
import * as path from 'node:path';

// clean up once complete
import { getCollection } from 'astro:content';

export async function generateSearch() {
  const { index } = await pagefind.createIndex({});
  if (!index) return;

  let json: Array<{ url: string; content: string }> = [];

  // Get all `src/content/docs/` entries
  let allContent = await getCollection('docs');

  allContent = allContent.filter(doc => {
    return doc.data.pagefind !== false;
  });

  await Promise.allSettled(
    allContent.map(async entry => {
      const { category, title, description } = entry.data;
      const resp = await fetch('http://localhost:4000/' + entry.slug);
      const html = await resp.text();

      // json.push({
      //   content: html,
      //   url: entry.slug
      // });
      return await index?.addHTMLFile({
        content: html,
        url: entry.slug
      });
    })
  );

  const { errors } = await index.writeFiles({
    outputPath: path.join(process.cwd(), 'public', 'pagefind')
  });

  return json;
}

export async function GET() {
  await generateSearch();

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
