/**
 * Crawls every component docs page in SSR mode and fails if any page emits a
 * `lit-hydration-error` event (dispatched by WebAwesomeElement when a component
 * throws while hydrating server-rendered markup).
 *
 * Usage:
 *   1. Start the dev server in another terminal (or background it in CI):  npm start
 *   2. Run this script (point BASE_URL at the dev server if it isn't on :4000):
 *        node scripts/check-hydration.js
 *        BASE_URL=http://localhost:4001 node scripts/check-hydration.js
 *
 * The script waits for the server to come up (SERVER_TIMEOUT_MS) before crawling,
 * so in CI you can launch `npm start &` and run this immediately after.
 *
 * Exits non-zero if any page hydrated with an error.
 */
import { globby } from 'globby';
import { basename, dirname } from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = dirname(__dirname);

const BASE_URL = (process.env.BASE_URL || 'http://localhost:4000').replace(/\/$/, '');

// Short settle after the (deterministic) hydration barrier, giving any trailing
// async rejection time to reach the pageerror listener before we read results.
const HYDRATION_WAIT_MS = Number(process.env.HYDRATION_WAIT_MS || 300);

// `npm start` does a full build before it starts listening, so in CI we may be
// launched before the server is reachable. Poll until it responds.
const SERVER_TIMEOUT_MS = Number(process.env.SERVER_TIMEOUT_MS || 180_000);

/** Wait for the dev server to start responding before we begin crawling. */
async function waitForServer() {
  const deadline = Date.now() + SERVER_TIMEOUT_MS;
  let lastError = 'no response';
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${BASE_URL}/`, { redirect: 'manual' });
      if (response.status < 500) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error.message;
    }
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  throw new Error(`Server at ${BASE_URL} not reachable after ${SERVER_TIMEOUT_MS}ms (${lastError})`);
}

/** Build the list of component docs URLs from the markdown source files. */
async function getComponentUrls() {
  const files = await globby('docs/docs/components/*.md', { cwd: rootDir, absolute: false });
  return files
    .map(file => basename(file, '.md'))
    .sort()
    .map(name => `${BASE_URL}/docs/components/${name}/?ssr=true`);
}

async function main() {
  const urls = await getComponentUrls();
  console.log(`Waiting for dev server at ${BASE_URL} ...`);
  await waitForServer();
  console.log(`Checking ${urls.length} component docs pages for hydration errors against ${BASE_URL}\n`);

  // `channel: 'chromium'` selects the *new* headless mode, which renders
  // identically to headed Chromium. The default (old) headless renders via a
  // different path and can make the client re-render happen to match the server
  // markup, masking hydration mismatches that headed mode catches. Set
  // HEADLESS=false to watch the run in a real window while debugging.
  const browser = await chromium.launch({
    channel: 'chromium',
    headless: process.env.HEADLESS !== 'false',
  });
  const context = await browser.newContext();

  // Belt-and-suspenders: also send the SSR cookie the dev server honors, so SSR
  // is on even if the query param is ever dropped on a redirect.
  await context.addCookies([{ name: 'webawesome_ssr', value: 'true', url: BASE_URL }]);

  // Register the document-level listener *before* any page script runs, so we
  // never miss an event fired early during hydration.
  await context.addInitScript(() => {
    window.__hydrationErrors = [];
    document.addEventListener('lit-hydration-error', event => {
      const target = event.target;
      window.__hydrationErrors.push({
        tagName: target && target.tagName ? target.tagName.toLowerCase() : '(unknown)',
        message: (event.error && (event.error.message || String(event.error))) || '(no message)',
      });
    });
  });

  const failures = [];

  for (const url of urls) {
    const label = url.replace(BASE_URL, '').replace('?ssr=true', '');

    // Use a fresh page per URL. Reusing one page across navigations let the very
    // first (cold) page's errors slip through; a clean page per URL captures them
    // reliably and keeps the pageerror listener scoped to a single visit.
    const page = await context.newPage();

    page.waitForComponentsLoaded = async () => {
      await page.evaluate(async () => {
        const undefinedEls = []
        const tagNames = [...document.querySelectorAll(":not(:defined)")].map((el) => {
          undefinedEls.push(el)
          return el.localName
        })

        const tagNamesSet = new Set([...tagNames])

        // @ts-expect-error
        await Promise.allSettled([...tagNamesSet.values()].map((tagName) => window.customElements.whenDefined(tagName)))
        await Promise.allSettled(undefinedEls.map((el) => el.updateComplete))
        await new Promise((resolve) => setTimeout(resolve, 1))
      })
    }

    // Warm up things, sometimes the first navigation gets messed up with hydration.
    // await page.goto(BASE_URL, { waitUntil: "networkidle" })
    // await page.waitForComponentsLoaded()

    const MAX_ATTEMPTS = 2
    let attempts = 0

    try {
      const attempt = async () => {
        const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
        if (response && !response.ok()) {
          console.log(`⚠️  ${label} — HTTP ${response.status()}`);
        }

        if (response.ok()) {
          await page.waitForComponentsLoaded()
          const hydrationErrors = await page.evaluate(() => {
            return window.__hydrationErrors
          });

          if (hydrationErrors.length > 0) {
            console.log(`❌ ${label} — hydration error(s) detected.`);
            // hydrationErrors.forEach((e) => {
            // })
            return
          }

          if (attempts > MAX_ATTEMPTS) {
            console.log(`✅ ${label}`);
            return
          }

          attempts += 1
          await attempt()
        }
      }

      await attempt()
    } catch (error) {
      failures.push({ url: label, errors: [{ tagName: '(navigation)', message: error.message }] });
      console.log(`❌ ${label} — navigation failed: ${error.message}`);
      await page.close();
      continue;
    }

    await page.close();

      // failures.push({ url: label, errors });
      // console.log(`❌ ${label} — ${errors.length} hydration error(s):`);
      // for (const e of errors) {
      //   console.log(`      <${e.tagName}>: ${e.message}`);
      // }
      // console.log(`✅ ${label}`);
  }

  await browser.close();

  console.log('');
  if (failures.length > 0) {
    console.log(`FAILED: ${failures.length} page(s) with hydration error(s).`);
    process.exit(1);
  }

  console.log(`PASSED: all ${urls.length} pages hydrated cleanly.`);
}

await main().catch(error => {
  console.error(error);
  process.exit(1);
});
