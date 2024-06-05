import { esbuildPlugin } from '@web/dev-server-esbuild';
import { getAllComponents } from './scripts/shared.js';
import { globbySync } from 'globby';
import { playwrightLauncher } from '@web/test-runner-playwright';
import { readFileSync } from 'fs';

// Get a list of all Web Awesome component imports for the test runner
const metadata = JSON.parse(readFileSync('./dist/custom-elements.json'), 'utf8');
const componentImports = getAllComponents(metadata).map(component => {
  const name = component.tagName.replace(/^wa-/, '');
  return `./dist/components/${name}/${name}.js`;
});

export default {
  rootDir: '.',
  files: 'src/**/*.test.ts', // "default" group
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default']
  },
  testFramework: {
    config: {
      timeout: 3000,
      retries: 1
    }
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2020'
    })
  ],
  browsers: [
    playwrightLauncher({ product: 'chromium' }),
    playwrightLauncher({ product: 'firefox', concurrency: 1 }),
    playwrightLauncher({ product: 'webkit' })
  ],
  testRunnerHtml: testFramework => `
    <html lang="en-US">
      <head>
        <base href="/dist">
      </head>
      <body>
        <link rel="stylesheet" href="dist/themes/default.css">
        <script>window.process = {env: { NODE_ENV: "production" }}</script>
        ${componentImports.map(url => `<script type="module" src="${url}"></script>`)};
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
  // Create a named group for every test file to enable running single tests. If a test file is `split-panel.test.ts`
  // then you can run `npm run test -- --group split-panel` to run only that component's tests.
  groups: globbySync('src/**/*.test.ts').map(path => {
    const groupName = path.match(/^.*\/(?<fileName>.*)\.test\.ts/).groups.fileName;
    return {
      name: groupName,
      files: path
    };
  })
};
