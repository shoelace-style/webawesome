/**
 * Crawls every component docs page in SSR mode and fails if any page emits a
 * `lit-hydration-error` event (dispatched by WebAwesomeElement when a component
 * throws while hydrating server-rendered markup).
 *
 * Runs CONCURRENCY pages at a time via a shared-index worker pool.
 *
 * Usage:
 *   1. Start the dev server in another terminal (or background it in CI):  npm start
 *   2. Run this script:
 *        node scripts/check-hydration.js
 *        CONCURRENCY=8 BASE_URL=http://localhost:4001 node scripts/check-hydration.js
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
const HYDRATION_WAIT_MS = Number(process.env.HYDRATION_WAIT_MS || 300);
const SERVER_TIMEOUT_MS = Number(process.env.SERVER_TIMEOUT_MS || 180_000);

// How many docs pages to check simultaneously. Each one is an independent
// Playwright page in the same browser context. Tune down if the dev server
// struggles to reach `networkidle` under load; tune up on a beefy CI box.
const CONCURRENCY = Number(process.env.CONCURRENCY || 4);

// Some hydration errors only surface on a *re*-load, not the first paint. So we
// load each clean-looking page up to this many times, stopping early the moment
// an error shows up. Set to 1 to disable the extra load.
const RELOAD_ATTEMPTS = Number(process.env.RELOAD_ATTEMPTS || 2);

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

/** Wait until all custom elements on the page are defined and updated. */
async function waitForComponentsLoaded(page) {
  await page.evaluate(async () => {
    const undefinedEls = [];
    const tagNames = [...document.querySelectorAll(':not(:defined)')].map(el => {
      undefinedEls.push(el);
      return el.localName;
    });
    const tagNamesSet = new Set(tagNames);
    await Promise.allSettled([...tagNamesSet].map(t => window.customElements.whenDefined(t)));
    await Promise.allSettled(undefinedEls.map(el => el.updateComplete));
    await new Promise(resolve => setTimeout(resolve, 1));
  });
  // Give any trailing async rejection time to land in __hydrationErrors.
  await page.waitForTimeout(HYDRATION_WAIT_MS);
}

/**
 * Check a single URL on its own fresh page. Returns a failure object or null.
 * Each page has its own window.__hydrationErrors (addInitScript runs per page),
 * so this is safe to run concurrently.
 */
async function checkUrl(context, url) {
  const label = url.replace(BASE_URL, '').replace('?ssr=true', '');
  const page = await context.newPage();

  try {
    // Load (and re-load) while the page stays clean. Each goto resets
    // window.__hydrationErrors (addInitScript runs per navigation), so every
    // attempt is checked independently. We only re-navigate *after* a clean
    // pass — the first attempt that surfaces errors stops the loop and reports,
    // so a later reload can never erase an error we already caught.
    for (let attempt = 1; attempt <= RELOAD_ATTEMPTS; attempt++) {
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });

      if (response && !response.ok()) {
        console.log(`⚠️  ${label} — HTTP ${response.status()}`);
        return { url: label, errors: [{ tagName: '(http)', message: `HTTP ${response.status()}` }] };
      }

      await waitForComponentsLoaded(page);

      const hydrationErrors = await page.evaluate(() => window.__hydrationErrors);

      if (hydrationErrors.length > 0) {
        const where = attempt > 1 ? ` (surfaced on load ${attempt})` : '';
        console.log(`❌ ${label} — ${hydrationErrors.length} hydration error(s)${where}:`);
        for (const e of hydrationErrors) console.log(`      <${e.tagName}>: ${e.message}`);
        return { url: label, errors: hydrationErrors };
      }
    }

    console.log(`✅ ${label}`);
    return null;
  } catch (error) {
    console.log(`❌ ${label} — navigation failed: ${error.message}`);
    return { url: label, errors: [{ tagName: '(navigation)', message: error.message }] };
  } finally {
    await page.close();
  }
}

async function main() {
  const urls = await getComponentUrls();
  console.log(`Waiting for dev server at ${BASE_URL} ...`);
  await waitForServer();
  console.log(`Checking ${urls.length} pages, ${CONCURRENCY} at a time, against ${BASE_URL}\n`);

  const browser = await chromium.launch({
    channel: 'chromium',
    headless: process.env.HEADLESS !== 'false',
  });
  const context = await browser.newContext();

  // Cookie + init script live on the context, so every page we open inherits them.
  await context.addCookies([{ name: 'webawesome_ssr', value: 'true', url: BASE_URL }]);
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

  // Shared-index worker pool: each worker pulls the next URL when it finishes,
  // keeping exactly CONCURRENCY pages busy until the queue is drained.
  let next = 0;
  const worker = async () => {
    while (true) {
      const i = next++;
      if (i >= urls.length) return;
      const result = await checkUrl(context, urls[i]);
      if (result) failures.push(result);
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, urls.length) }, worker)
  );

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
