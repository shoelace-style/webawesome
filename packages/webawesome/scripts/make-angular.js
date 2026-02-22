import commandLineArgs from 'command-line-args';
import { deleteSync } from 'del';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { default as prettierConfig } from '../../../prettier.config.js';
import { getAllComponents } from './shared.js';
const { outdir } = commandLineArgs({ name: 'outdir', type: String });
const angularDir = path.join(process.env.ROOT_DIR || '.', 'src', 'angular');
const srcDir = process.env.ROOT_DIR ? path.join(process.env.ROOT_DIR, 'src') : '.';
// Clear build directory
deleteSync(angularDir);
fs.mkdirSync(angularDir, { recursive: true });
// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join(outdir, 'custom-elements.json'), 'utf8'));
const components = getAllComponents(metadata);
const index = [];
for await (const component of components) {
  if (!component.tagName) {
    continue;
  }
  const tagWithoutPrefix = component.tagName.replace(/^wa-/, '');
  const componentDir = path.join(angularDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, `${tagWithoutPrefix}.component.ts`);
  const componentName = `Wa${component.name}`;
  // Get inputs (properties/attributes)
  const inputs = component.members?.filter(member => 
    member.kind === 'field' && member.attribute
  ).map(member => member.attribute) || [];
  // We only want to wrap wa- prefixed events, because the others are native
  const eventsToWrap = component.events?.filter(event => event.name.startsWith('wa-')) || [];
  const outputs = eventsToWrap.map(event => event.name);
  fs.mkdirSync(componentDir, { recursive: true });
  const jsDoc = component.jsDoc || '';
  const inputsList = inputs.map(input => `'${input}'`).join(', ');
  const outputsList = outputs.map(output => `'${output}'`).join(', ');
  const componentSource = await prettier.format(
    `
      import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

      ${jsDoc}
      @Component({
        selector: '${component.tagName}',
        template: '<ng-content></ng-content>',
        standalone: true,
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        inputs: [${inputsList}],
        outputs: [${outputsList}]
      })
      export class ${componentName} {}
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts',
    }),
  );
  fs.writeFileSync(componentFile, componentSource, 'utf8');
  index.push(`export { ${componentName} } from './${tagWithoutPrefix}/${tagWithoutPrefix}.component.js';`);
}
// Generate the index file
fs.writeFileSync(path.join(angularDir, 'index.ts'), index.join('\n'), 'utf8');
