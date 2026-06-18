// Generates a /src/ssr/all.js endpoint for easily grabbing all components on a server for SSR
import commandLineArgs from 'command-line-args';
import { deleteSync } from 'del';
import fs from 'fs';
import path from 'path';
import { getAllComponents } from './shared.js';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });

import prettier from 'prettier';
import { default as prettierConfig } from '../../../prettier.config.js';

const allFile = path.join(process.env.ROOT_DIR || '.', 'src', 'ssr', 'all.ts');

// Clear build directory
deleteSync(allFile);

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join(outdir, 'custom-elements.json'), 'utf8'));
const components = getAllComponents(metadata);

const index = [];
components.sort((a, b) => a.tagName.localeCompare(b.tagName));

for (const component of components) {
  if (!component.tagName) {
    continue;
  }
  const tagWithoutPrefix = component.tagName.replace(/^wa-/, '');

  index.push(
    `export { default as ${component.name} } from '../components/${tagWithoutPrefix}/${tagWithoutPrefix}.js';`,
  );
}

const preamble = `// This file is auto-generated. Do not edit it directly.`;
let text = preamble + '\n' + index.join('\n');
text = await prettier.format(
  text,
  Object.assign(prettierConfig, {
    parser: 'babel-ts',
  }),
);

fs.writeFileSync(allFile, text, 'utf8');
