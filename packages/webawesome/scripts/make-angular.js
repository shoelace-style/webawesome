import commandLineArgs from 'command-line-args';
import { deleteSync } from 'del';
import fs from 'fs';
import path from 'path';
import prettier from 'prettier';
import { default as prettierConfig } from '../../../prettier.config.js';
import { getAllComponents } from './shared.js';

const { outdir } = commandLineArgs({ name: 'outdir', type: String });

const angularDir = path.join(process.env.ROOT_DIR || '.', 'src', 'angular');

// Clear build directory
deleteSync(angularDir);
fs.mkdirSync(angularDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join(outdir, 'custom-elements.json'), 'utf8'));
const components = getAllComponents(metadata);

const componentExports = [];

for await (const component of components) {
  if (!component.tagName) {
    continue;
  }
  
  const tagWithoutPrefix = component.tagName.replace(/^wa-/, '');
  const componentDir = path.join(angularDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, `index.ts`);
  const componentName = `Wa${component.name}`;
  
  // Get inputs (properties/attributes)
  const properties = component.members?.filter(member => 
    member.kind === 'field' && member.attribute
  ) || [];
  
  // We only want to wrap wa- prefixed events
  const events = component.events?.filter(event => event.name.startsWith('wa-')) || [];

  fs.mkdirSync(componentDir, { recursive: true });

  // Generate interface for the component
  const propsInterface = properties.map(p => {
    const type = p.type?.text || 'any';
    return `  ${p.name}?: ${type};`;
  }).join('\n');

  const eventsInterface = events.map(e => {
    const eventType = e.type?.text || 'CustomEvent';
    return `  ${e.name}: EventEmitter<${eventType}>;`;
  }).join('\n');

  // Build inputs and outputs
  const inputsList = properties.map(p => `'${p.name}'`).join(', ');
  const outputsList = events.map(e => `'${e.name}'`).join(', ');

  const componentCode = await prettier.format(
    `
/* tslint:disable */
/* auto-generated angular directive proxies */
import { 
  ChangeDetectionStrategy, 
  ChangeDetectorRef, 
  Component, 
  ElementRef, 
  EventEmitter, 
  NgZone,
  CUSTOM_ELEMENTS_SCHEMA
} from '@angular/core';

export interface ${componentName}Props {
${propsInterface}
}

/** 
 * ${component.jsDoc || ''}
 */
@Component({
  selector: '${component.tagName}',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [${inputsList}],
  // eslint-disable-next-line @angular-eslint/no-outputs-metadata-property  
  outputs: [${outputsList}],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ${componentName} {
  protected el: HTMLElement;
${eventsInterface}

  constructor(
    c: ChangeDetectorRef,
    r: ElementRef,
    protected z: NgZone
  ) {
    c.detach();
    this.el = r.nativeElement;
    ${events.map(e => `this.${e.name} = new EventEmitter();`).join('\n    ')}
    this.proxyOutputs(this.el, this.z);
  }

  private proxyOutputs(el: HTMLElement, zone: NgZone) {
    ${events.map(e => `
    el.addEventListener('${e.name}', (ev: Event) => {
      zone.run(() => this.${e.name}.emit(ev));
    });`).join('')}
  }
}

${properties.map(p => `
Object.defineProperty(${componentName}.prototype, '${p.name}', {
  get() { return this.el['${p.name}']; },
  set(val: any) { 
    this.z.runOutsideAngular(() => (this.el['${p.name}'] = val));
  }
});`).join('')}
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts',
    }),
  );

  fs.writeFileSync(componentFile, componentCode, 'utf8');
  
  componentExports.push(`export { ${componentName} } from './${tagWithoutPrefix}/index';`);
}

// Generate barrel export
const indexCode = await prettier.format(
  `
/* tslint:disable */
/* auto-generated angular directive proxies */
${componentExports.join('\n')}

// Ensure web components are defined
import '@awesome.me/webawesome';
  `,
  Object.assign(prettierConfig, {
    parser: 'babel-ts',
  }),
);

fs.writeFileSync(path.join(angularDir, 'index.ts'), indexCode, 'utf8');

console.log(`✅ Generated ${components.filter(c => c.tagName).length} Angular standalone components`);

