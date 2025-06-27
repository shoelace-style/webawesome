import { esbuildPlugin } from '@web/dev-server-esbuild';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { readFileSync } from 'fs';
import { globbySync } from 'globby';
import * as os from 'os';
import * as process from 'process';
import { getAllComponents } from './scripts/shared.js';

// Get a list of all Web Awesome component imports for the test runner
const metadata = JSON.parse(readFileSync('./dist/custom-elements.json'), 'utf8');
const serverComponents = [];
const componentImports = [];
getAllComponents(metadata).forEach(component => {
  const name = component.tagName.replace(/^wa-/, '');

  serverComponents.push(`/dist/components/${name}/${name}.js`);
  componentImports.push(`/dist-cdn/components/${name}/${name}.js`);
});

// os.availableParallelism only available as of Node 18.14.0 , maybe don't need the fallback?
// I've found the browser is more stable if you give it concurrency up front.
const cores = os.availableParallelism?.() ?? os.cpus.length;
const concurrency = Math.max(Math.floor(cores / 3), 1);

export default {
  rootDir: '.',
  files: 'src/**/*.test.ts', // "default" group
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default'],
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 0,
      // fails the whole test suite on first failure rather than letting the whole test suite run.
      bail: process.env['FAIL_FAST'] === 'true',
    },
  },
  middleware: [
    // When using relative CSS imports, we need to rewrite the paths so the test runner can find them.
    function rewriteCssUrls(context, next) {
      if (context.url.endsWith('.css') && context.url.match(/^\/[^/]+\//)) {
        const theme = context.url.split('/')[1];
        context.url = `/dist/styles/themes/${theme}${context.url.slice(theme.length + 1)}`;
      }
      return next();
    },
  ],
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2020',
    }),
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium', concurrency }),
    playwrightLauncher({ product: 'firefox', concurrency }),
    //
    // TODO - re-enable this and figure out why color picker tests randomly start failing in WebKit (CI only)
    //
    // playwrightLauncher({ product: 'webkit', concurrency }),
  ],
  testRunnerHtml: testFramework => `
    <!DOCTYPE html>
    <html lang="en-US">
      <head>
        <link rel="stylesheet" href="/dist/styles/themes/default.css">

        <script>
          window.process = {env: { NODE_ENV: "production" }}
        </script>
        <script>
          window.serverComponents = [
            ${serverComponents.map(str => `"${str}"`).join(',\n')}
          ]

          window.clientComponents = [
            ${componentImports.map(str => `"${str}"`).join(',\n')}
          ]

          window.CSR_ONLY = ${process.env['CSR_ONLY'] === 'true'}
        </script>
        <script type="module">
          ;(async () => {
            await Promise.allSettled(window.clientComponents.map(str => import(str)));
          })()
        </script>
        <script type="module" src="${testFramework}"></script>
      </head>
      <body>
      </body>
    </html>
  `,
  // Create a named group for every test file to enable running single tests. If a test file is `split-panel.test.ts`
  // then you can run `npm run test -- --group split-panel` to run only that component's tests.
  groups: globbySync('src/**/*.test.ts').map(path => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups.fileName;
    return {
      name: groupName,
      files: path,
    };
  }),
};
