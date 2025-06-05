import commandLineArgs from 'command-line-args';
import { deleteSync } from 'del';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { default as prettierConfig } from '../../../prettier.config.js';
import { getAllComponents } from './shared.js';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });

const reactDir = path.join(process.env.ROOT_DIR || '.', 'src', 'react');
const srcDir = process.env.ROOT_DIR ? path.join(process.env.ROOT_DIR, 'src') : '.';

// Clear build directory
deleteSync(reactDir);
fs.mkdirSync(reactDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join(outdir, 'custom-elements.json'), 'utf8'));
const components = getAllComponents(metadata);

const index = [];

for await (const component of components) {
  const tagWithoutPrefix = component.tagName.replace(/^wa-/, '');
  const componentDir = path.join(reactDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const importPath = path.relative(srcDir, component.path);

  // We only want to wrap wa- prefixed events, because the others are native
  const eventsToWrap = component.events?.filter(event => event.name.startsWith('wa-')) || [];
  const eventImports = eventsToWrap
    .map(event => `import type { ${event.eventName} } from '../../events/events.js';`)
    .join('\n');
  const eventExports = eventsToWrap
    .map(event => `export type { ${event.eventName} } from '../../events/events.js';`)
    .join('\n');
  const eventNameImport = eventsToWrap.length > 0 ? `import { type EventName } from '@lit/react';` : ``;
  const events = eventsToWrap
    .map(event => `${event.reactName}: '${event.name}' as EventName<${event.eventName}>`)
    .join(',\n');

  fs.mkdirSync(componentDir, { recursive: true });

  const jsDoc = component.jsDoc || '';

  const source = await prettier.format(
    `
      import * as React from 'react';
      import { createComponent } from '@lit/react';
      import Component from '../../${importPath}';

      ${eventNameImport}
      ${eventImports}
      ${eventExports}

      const tagName = '${component.tagName}'

      ${jsDoc}
      const reactWrapper = createComponent({
        tagName,
        elementClass: Component,
        react: React,
        events: {
          ${events}
        },
        displayName: "${component.name}"
      })

      export default reactWrapper
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts',
    }),
  );

  index.push(`export { default as ${component.name} } from './${tagWithoutPrefix}/index.js';`);

  fs.writeFileSync(componentFile, source, 'utf8');
}

// Generate the index file
fs.writeFileSync(path.join(reactDir, 'index.ts'), index.join('\n'), 'utf8');
