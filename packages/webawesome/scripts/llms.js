import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';
import { getAllComponents } from './shared.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Removes newlines from text to keep llms.txt formatting clean. */
function removeNewlines(str) {
  return str ? str.replace(/\n/g, ' ').trim() : '';
}

/** Loads front-matter from all component markdown files. */
function loadAllFrontMatter(components, docsDir) {
  const cache = new Map();

  for (const component of components) {
    if (!component.tagName) {
      continue;
    }

    const componentName = component.tagName.replace(/^wa-/, '');
    const mdPath = path.join(docsDir, 'docs/components', `${componentName}.md`);

    if (fs.existsSync(mdPath)) {
      try {
        const content = fs.readFileSync(mdPath, 'utf-8');
        const { data } = matter(content);
        cache.set(component.tagName, data);
      } catch {
        // Skip if parsing fails
      }
    }
  }

  return cache;
}

/** Generates the API reference section for a single component. */
function generateComponentApiSection(component, frontMatterCache, baseUrl) {
  const lines = [];

  if (!component.tagName) {
    return lines;
  }

  const frontMatter = frontMatterCache.get(component.tagName);
  const componentSlug = component.tagName.replace(/^wa-/, '');
  const description = removeNewlines(frontMatter?.description || component.summary || '');

  lines.push(`#### \`<${component.tagName}>\``);
  lines.push('');
  lines.push(`**Description:** ${description || 'No description available.'}`);
  lines.push('');
  lines.push(`**Documentation:** ${baseUrl}/docs/components/${componentSlug}`);
  lines.push('');

  // Slots
  if (component.slots?.length > 0) {
    lines.push('**Slots:**');
    lines.push('');
    for (const slot of component.slots) {
      const slotName = slot.name || '(default)';
      lines.push(`- \`${slotName}\`: ${removeNewlines(slot.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // Properties
  const properties =
    component.members?.filter(m => m.kind === 'field' && m.privacy !== 'private' && m.description) || [];

  if (properties.length > 0) {
    lines.push('**Properties:**');
    lines.push('');
    for (const prop of properties) {
      // Find corresponding attribute if any
      const attr = component.attributes?.find(a => a.fieldName === prop.name);
      const attrNote = attr && attr.name !== prop.name ? ` (attribute: \`${attr.name}\`)` : '';
      const typeStr = prop.type?.text ? `Type: \`${removeNewlines(prop.type.text)}\`` : '';
      const defaultStr = prop.default ? `Default: \`${prop.default}\`` : '';
      const meta = [typeStr, defaultStr].filter(Boolean).join(', ');

      lines.push(
        `- \`${prop.name}\`${attrNote}: ${removeNewlines(prop.description) || 'No description.'}${meta ? ` (${meta})` : ''}`,
      );
    }
    lines.push('');
  }

  // Methods
  const methods = component.members?.filter(m => m.kind === 'method' && m.privacy !== 'private' && m.description) || [];

  if (methods.length > 0) {
    lines.push('**Methods:**');
    lines.push('');
    for (const method of methods) {
      const params = method.parameters?.length
        ? `(${method.parameters.map(p => `${p.name}: ${removeNewlines(p.type?.text) || 'unknown'}`).join(', ')})`
        : '()';
      lines.push(`- \`${method.name}${params}\`: ${removeNewlines(method.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // Events
  const events = component.events?.filter(e => e.name) || [];
  if (events.length > 0) {
    lines.push('**Events:**');
    lines.push('');
    for (const event of events) {
      lines.push(`- \`${event.name}\`: ${removeNewlines(event.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // CSS Custom Properties
  if (component.cssProperties?.length > 0) {
    lines.push('**CSS Custom Properties:**');
    lines.push('');
    for (const prop of component.cssProperties) {
      const defaultStr = prop.default ? ` (Default: \`${prop.default}\`)` : '';
      lines.push(`- \`${prop.name}\`: ${removeNewlines(prop.description) || 'No description.'}${defaultStr}`);
    }
    lines.push('');
  }

  // CSS Parts
  if (component.cssParts?.length > 0) {
    lines.push('**CSS Parts:**');
    lines.push('');
    for (const part of component.cssParts) {
      lines.push(`- \`${part.name}\`: ${removeNewlines(part.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // CSS States
  if (component.cssStates?.length > 0) {
    lines.push('**CSS States:**');
    lines.push('');
    for (const state of component.cssStates) {
      lines.push(`- \`${state.name}\`: ${removeNewlines(state.description) || 'No description.'}`);
    }
    lines.push('');
  }

  return lines;
}

/**
 * Generates the complete llms.txt content.
 */
function generateLlmsTxt({ components, packageData, frontMatterCache, baseUrl }) {
  // Account for base "abstract elements" that don't have a tagName.
  components = components.filter(c => c.tagName);
  const lines = [];

  // H1 Title (required by llmstxt.org spec)
  lines.push('# Web Awesome');
  lines.push('');

  // Blockquote summary
  lines.push(`> ${packageData.description} Version ${packageData.version}.`);
  lines.push('');

  // Overview section
  lines.push(
    `
Web Awesome provides a comprehensive set of customizable, accessible web components for building modern
web applications. All components use shadow DOM and are framework-agnostic, working with vanilla JavaScript
or any framework including React, Vue, Angular, and Svelte.

Form controls are form-associated custom elements that work with native form validation and the
Constraint Validation API.

Font Awesome is the default icon library, so \`<wa-icon name="...">\` values should reference Font Awesome
icon names.
`.trim(),
  );
  lines.push('');

  //
  // Documentation
  //
  lines.push('## Documentation');
  lines.push('');
  lines.push(`For comprehensive documentation, visit ${baseUrl}/docs/`);
  lines.push('');
  lines.push(`- [Getting Started](${baseUrl}/docs/getting-started): Installation and setup guide`);
  lines.push(`- [Components Overview](${baseUrl}/docs/components): Complete component reference`);
  lines.push(`- [Theming](${baseUrl}/docs/theming): Customization and design tokens`);
  lines.push(`- [Form Controls](${baseUrl}/docs/form-controls): Form integration and validation`);
  lines.push('');

  //
  // Components
  //
  lines.push('## Components');
  lines.push('');

  const sortedComponentsList = components.filter(c => c.tagName).sort((a, b) => a.tagName.localeCompare(b.tagName));

  for (const component of sortedComponentsList) {
    const frontMatter = frontMatterCache.get(component.tagName);
    const description = removeNewlines(frontMatter?.description || component.summary || '');
    const componentSlug = component.tagName.replace(/^wa-/, '');
    const title = frontMatter?.title || componentSlug;

    lines.push(
      `- [${title}](${baseUrl}/docs/components/${componentSlug}): ${description || 'No description available.'}`,
    );
  }
  lines.push('');

  //
  // Optional
  //
  lines.push('## Optional');
  lines.push('');
  lines.push(
    `The following is a quick reference describing every component's API. For comprehensive documentation, refer to the component documentation using the URLs provided above.`,
  );
  lines.push('');

  // Sort components alphabetically by tag name for the API reference
  const sortedComponents = components.filter(c => c.tagName).sort((a, b) => a.tagName.localeCompare(b.tagName));

  for (const component of sortedComponents) {
    lines.push(...generateComponentApiSection(component, frontMatterCache, baseUrl));
  }

  return lines.join('\n').trim();
}

/**
 * A CEM plugin that generates an llms.txt file following the llmstxt.org specification.
 */
export function llmsTxtPlugin(options = {}) {
  const {
    outdir = 'dist-cdn',
    docsDir = path.resolve(__dirname, '../docs'),
    baseUrl = 'https://webawesome.com',
  } = options;

  return {
    name: 'wa-llms-txt',
    packageLinkPhase({ customElementsManifest }) {
      const components = getAllComponents(customElementsManifest);
      const packageData = customElementsManifest.package || {};
      const frontMatterCache = loadAllFrontMatter(components, docsDir);

      const llmsTxt = generateLlmsTxt({
        components,
        packageData,
        frontMatterCache,
        baseUrl,
      });

      // Write to the output directory
      const outputPath = path.join(outdir, 'llms.txt');
      fs.writeFileSync(outputPath, llmsTxt, 'utf-8');
    },
  };
}

export default llmsTxtPlugin;
