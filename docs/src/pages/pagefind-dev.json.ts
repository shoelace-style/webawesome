// import { APIContext } from "astro";

import { generateSearch } from '../js/generate-search';

if (process.env.DEV_SEARCH !== 'generated') {
  await generateSearch();

  process.env.DEV_SEARCH = 'generated';

  // setTimeout(() => {
  //   process.env.DEV_SEARCH = ""
  // }, 200)
}

export async function GET() {
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
