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

/**
 * Generate JSDoc comment for a property
 */
function generatePropJsDoc(description) {
  if (!description) return '';
  // Escape any */ in the description to avoid breaking the JSDoc comment
  const escaped = description.replace(/\*\//g, '*\\/');
  return `/** ${escaped} */\n  `;
}

/**
 * Get public properties from component members that have an attribute
 * (these are the props that can be set via JSX)
 */
function getPublicProps(component, internalProps = []) {
  const props = [];
  const seenProps = new Set();

  // Get properties from members that have attributes (these are the public reactive properties)
  for (const member of component.members || []) {
    if (member.kind === 'field' && member.attribute && !member.privacy) {
      // Skip internal properties
      if (internalProps.includes(member.name)) continue;
      if (seenProps.has(member.name)) continue;
      seenProps.add(member.name);

      props.push({
        name: member.name,
        type: member.type?.text || 'any',
        description: member.description || '',
      });
    }
  }

  return props;
}

/**
 * Convert a TypeScript type from the CEM to a valid prop type.
 * Returns the type to use in the interface, and whether it should use Component reference.
 */
function normalizeType(typeText, propName) {
  if (!typeText) return { type: 'any', useComponentRef: false };

  // Simple/primitive types that don't need Component reference
  const simpleTypePatterns = [
    /^(string|number|boolean|null|undefined)$/,
    /^'[^']*'(\s*\|\s*'[^']*')*$/, // String literal unions like 'small' | 'medium' | 'large'
    /^(string|number|boolean)\s*\|\s*(string|number|boolean|null|undefined)/, // Simple unions
  ];

  for (const pattern of simpleTypePatterns) {
    if (pattern.test(typeText)) {
      return { type: typeText, useComponentRef: false };
    }
  }

  // Complex types (containing Element, custom types, etc.) should use Component reference
  // to ensure all types are properly resolved
  const complexTypeIndicators = ['Element', 'VirtualElement', 'HTMLElement', '[]', '()', '=>', 'Record', 'Map', 'Set'];
  if (complexTypeIndicators.some(indicator => typeText.includes(indicator))) {
    return { type: `Component['${propName}']`, useComponentRef: true };
  }

  // Default: use the type directly
  return { type: typeText, useComponentRef: false };
}

// Properties that conflict with React.HTMLAttributes and need to be omitted
const CONFLICTING_HTML_PROPS = ['defaultValue', 'color', 'size', 'value', 'checked', 'disabled', 'type', 'name', 'title'];

// Internal properties that shouldn't be exposed in React props
const INTERNAL_PROPS = ['didSSR', 'form', 'internals', 'shadowRoot', 'assignedSlot'];

for await (const component of components) {
  if (!component.tagName) {
    continue;
  }
  const tagWithoutPrefix = component.tagName.replace(/^wa-/, '');
  const componentDir = path.join(reactDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const importPath = path.posix.relative(srcDir, component.path);

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

  // Generate explicit props interface for better IDE support
  const publicProps = getPublicProps(component, INTERNAL_PROPS);
  const propsInterfaceName = `${component.name}Props`;

  // Generate prop definitions with JSDoc comments
  const propDefinitions = publicProps
    .map(prop => {
      const jsDocComment = generatePropJsDoc(prop.description);
      const { type } = normalizeType(prop.type, prop.name);
      return `${jsDocComment}'${prop.name}'?: ${type};`;
    })
    .join('\n  ');

  // Generate event handler prop definitions
  const eventPropDefinitions = eventsToWrap
    .map(event => {
      const description = component.events?.find(e => e.name === event.name)?.description || '';
      const jsDocComment = generatePropJsDoc(description);
      return `${jsDocComment}${event.reactName}?: (event: ${event.eventName}) => void;`;
    })
    .join('\n  ');

  // Combine props and events into the interface
  const allPropDefinitions = [propDefinitions, eventPropDefinitions].filter(Boolean).join('\n  ');

  // Find which conflicting props this component has
  const componentConflictingProps = publicProps
    .filter(prop => CONFLICTING_HTML_PROPS.includes(prop.name))
    .map(prop => `'${prop.name}'`);

  // Generate the base type with omitted conflicting props
  const baseType = componentConflictingProps.length > 0
    ? `Omit<React.HTMLAttributes<Component>, ${componentConflictingProps.join(' | ')}>`
    : `React.HTMLAttributes<Component>`;

  const propsInterface = `
/**
 * Props for the ${component.name} component.
 * This interface provides explicit typing for better IDE support and documentation.
 */
export interface ${propsInterfaceName} extends ${baseType} {
  ${allPropDefinitions}
}
`;

  const source = await prettier.format(
    `
      import * as React from 'react';
      import { createComponent } from '@lit/react';
      import Component from '../../${importPath}';

      ${eventNameImport}
      ${eventImports}
      ${eventExports}

      const tagName = '${component.tagName}'

      ${propsInterface}

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

  index.push(`export { default as ${component.name}, type ${propsInterfaceName} } from './${tagWithoutPrefix}/index.js';`);

  fs.writeFileSync(componentFile, source, 'utf8');
}

// Generate the index file
fs.writeFileSync(path.join(reactDir, 'index.ts'), index.join('\n'), 'utf8');
