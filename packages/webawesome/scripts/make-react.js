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

// Remove any @cssproperty tags from the original jsDoc to avoid stale/duplicate CSS var entries
function stripCssPropertyTags(doc) {
  if (!doc) return '';
  const cleaned = doc
    .split('\n')
    .filter(line => !line.includes('@cssproperty'))
    .join('\n')
    .trim();
  // If the cleaned block is effectively an empty JSDoc, drop it
  const normalized = cleaned.replace(/[ \t]+$/gm, '');
  if (/^\/\*\*[\s\*]*\*\/$/.test(normalized)) return '';
  return cleaned;
}

const index = [];

for await (const component of components) {
  const tagWithoutPrefix = component.tagName.replace(/^wa-/, '');
  const componentDir = path.join(reactDir, tagWithoutPrefix);
  const componentFile = path.join(componentDir, 'index.ts');
  const importPath = path.posix.relative(srcDir, component.path);

  // We only want to wrap wa- prefixed events, because the others are native
  // Treat any hyphenated event name as a custom event to expose in React (avoids native events)
  const eventsToWrap = component.events?.filter(event => event.name.includes('-')) || [];
  const eventImports = eventsToWrap
    .map(event => `import type { ${event.eventName} } from '../../events/events.js';`)
    .join('\n');
  const eventExports = eventsToWrap
    .map(event => `export type { ${event.eventName} } from '../../events/events.js';`)
    .join('\n');
  const eventNameImport = `import { type EventName } from '@lit/react';`;

  // Curated list of native DOM events we want to expose on all wrappers for React ergonomics
  const DOM_EVENTS = [
    { react: 'onClick', name: 'click', type: 'MouseEvent' },
    { react: 'onDblClick', name: 'dblclick', type: 'MouseEvent' },
    { react: 'onContextMenu', name: 'contextmenu', type: 'MouseEvent' },
    { react: 'onMouseDown', name: 'mousedown', type: 'MouseEvent' },
    { react: 'onMouseUp', name: 'mouseup', type: 'MouseEvent' },
    { react: 'onMouseEnter', name: 'mouseenter', type: 'MouseEvent' },
    { react: 'onMouseLeave', name: 'mouseleave', type: 'MouseEvent' },
    { react: 'onPointerDown', name: 'pointerdown', type: 'PointerEvent' },
    { react: 'onPointerUp', name: 'pointerup', type: 'PointerEvent' },
    { react: 'onPointerEnter', name: 'pointerenter', type: 'PointerEvent' },
    { react: 'onPointerLeave', name: 'pointerleave', type: 'PointerEvent' },
    { react: 'onKeyDown', name: 'keydown', type: 'KeyboardEvent' },
    { react: 'onKeyUp', name: 'keyup', type: 'KeyboardEvent' },
    { react: 'onInput', name: 'input', type: 'InputEvent' },
    { react: 'onChange', name: 'change', type: 'Event' },
    { react: 'onFocus', name: 'focus', type: 'FocusEvent' },
    { react: 'onBlur', name: 'blur', type: 'FocusEvent' },
    { react: 'onSubmit', name: 'submit', type: 'SubmitEvent' },
    { react: 'onWheel', name: 'wheel', type: 'WheelEvent' }
  ];

  const domEvents = DOM_EVENTS.map(e => `${e.react}: '${e.name}' as EventName<${e.type}>`).join(',\n');
  const customEvents = eventsToWrap
    .map(event => `${event.reactName}: '${event.name}' as EventName<${event.eventName}>`)
    .join(',\n');
  const events = [customEvents, domEvents].filter(Boolean).join(',\n');

  fs.mkdirSync(componentDir, { recursive: true });

  const rawJsDoc = component.jsDoc || '';
  const jsDoc = stripCssPropertyTags(rawJsDoc);
  const cssProps = Array.isArray(component.cssProperties) ? component.cssProperties : [];
  const cssPropsJsDoc = cssProps.length
    ? `/**\n${cssProps.map(p => ` * @cssproperty ${p.name}`).join('\n')}\n */`
    : '';

  const source = await prettier.format(
    `
      /// <reference path="../../../dist-cdn/custom-elements-jsx.d.ts" />
      import * as React from 'react';
      import { createComponent } from '@lit/react';
      import Component from '../../${importPath}';

      ${eventNameImport}
      ${eventImports}
      ${eventExports}

      const tagName = '${component.tagName}'

      // Props for the React wrapper reuse the generated JSX intrinsic element props for this tag
      export type ${component.name}Props = JSX.IntrinsicElements['${component.tagName}'] & Omit<
        React.HTMLAttributes<HTMLElement>,
        keyof JSX.IntrinsicElements['${component.tagName}']
      >;
      type __El = InstanceType<typeof Component>;

      ${jsDoc}
      ${cssPropsJsDoc}
      const reactWrapper = createComponent({
        tagName,
        elementClass: Component,
        react: React,
        events: {
          ${events}
        },
        displayName: "${component.name}"
      }) as unknown as React.ForwardRefExoticComponent<
        ${component.name}Props & React.RefAttributes<__El>
      >

      export default reactWrapper
    `,
    Object.assign(prettierConfig, {
      parser: 'babel-ts',
    }),
  );

  index.push(`export { default as ${component.name} } from './${tagWithoutPrefix}/index.js';`);
  index.push(`export type { ${component.name}Props } from './${tagWithoutPrefix}/index.js';`);

  fs.writeFileSync(componentFile, source, 'utf8');
}

// Generate the index file
fs.writeFileSync(path.join(reactDir, 'index.ts'), index.join('\n'), 'utf8');
