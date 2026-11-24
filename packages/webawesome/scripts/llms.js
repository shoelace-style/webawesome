import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { fileURLToPath } from 'url';
import { apiMembers, cleanCemText, current, typeText } from './agent-skill.js';
import { getAllComponents } from './shared.js';
import { getCdnDir, getDistDir, getDocsDir, retargetPackageFiles } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Removes newlines and JSDoc key shortcodes from text to keep llms.txt formatting clean. */
const removeNewlines = cleanCemText;

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
  const slots = current(component.slots);
  if (slots.length > 0) {
    lines.push('**Slots:**');
    lines.push('');
    for (const slot of slots) {
      const slotName = slot.name || '(default)';
      lines.push(`- \`${slotName}\`: ${removeNewlines(slot.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // Properties
  const properties = apiMembers(component, 'field');

  if (properties.length > 0) {
    lines.push('**Properties:**');
    lines.push('');
    for (const prop of properties) {
      // Find corresponding attribute if any
      const attr = component.attributes?.find(a => a.fieldName === prop.name);
      const attrNote = attr && attr.name !== prop.name ? ` (attribute: \`${attr.name}\`)` : '';
      const typeStr = typeText(prop) ? `Type: \`${removeNewlines(typeText(prop))}\`` : '';
      const defaultStr = prop.default ? `Default: \`${prop.default}\`` : '';
      const meta = [typeStr, defaultStr].filter(Boolean).join(', ');

      lines.push(
        `- \`${prop.name}\`${attrNote}: ${removeNewlines(prop.description) || 'No description.'}${meta ? ` (${meta})` : ''}`,
      );
    }
    lines.push('');
  }

  // Methods
  const methods = apiMembers(component, 'method');

  if (methods.length > 0) {
    lines.push('**Methods:**');
    lines.push('');
    for (const method of methods) {
      const params = method.parameters?.length
        ? `(${method.parameters.map(p => `${p.name}: ${removeNewlines(typeText(p)) || 'unknown'}`).join(', ')})`
        : '()';
      lines.push(`- \`${method.name}${params}\`: ${removeNewlines(method.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // Events
  const events = current(component.events).filter(e => e.name);
  if (events.length > 0) {
    lines.push('**Events:**');
    lines.push('');
    for (const event of events) {
      lines.push(`- \`${event.name}\`: ${removeNewlines(event.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // CSS Custom Properties
  const cssProperties = current(component.cssProperties);
  if (cssProperties.length > 0) {
    lines.push('**CSS Custom Properties:**');
    lines.push('');
    for (const prop of cssProperties) {
      const defaultStr = prop.default ? ` (Default: \`${prop.default}\`)` : '';
      lines.push(`- \`${prop.name}\`: ${removeNewlines(prop.description) || 'No description.'}${defaultStr}`);
    }
    lines.push('');
  }

  // CSS Parts
  const cssParts = current(component.cssParts);
  if (cssParts.length > 0) {
    lines.push('**CSS Parts:**');
    lines.push('');
    for (const part of cssParts) {
      lines.push(`- \`${part.name}\`: ${removeNewlines(part.description) || 'No description.'}`);
    }
    lines.push('');
  }

  // CSS States
  const cssStates = current(component.cssStates);
  if (cssStates.length > 0) {
    lines.push('**CSS States:**');
    lines.push('');
    for (const state of cssStates) {
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

To load from the CDN, add these two tags to \`<head>\`:

\`\`\`html
<link rel="stylesheet" href="https://ka-f.webawesome.com/webawesome@${packageData.version}/styles/webawesome.css" />
<script type="module" src="https://ka-f.webawesome.com/webawesome@${packageData.version}/webawesome.loader.js"></script>
\`\`\`

Sandboxed previews that load files only from allowlisted hosts, such as Claude.ai artifacts, can block that host. If the
sandbox allows jsDelivr, as Claude.ai does, load the same two files from
\`https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@${packageData.version}/dist-cdn/\` and keep the loader's
\`<script src>\` tag. For icons, add a second module script that imports \`setIconPath\` from that
\`webawesome.loader.js\` and calls \`setIconPath('https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs')\`.
Pro components, Pro themes, and Pro icon families aren't available this way.

For AI agents and coding assistants building with Web Awesome: two Agent Skills ship with the package. The
\`webawesome\` skill is this component reference in progressive, on-demand form; the companion \`webawesome-design\`
skill covers full-page layout (\`<wa-page>\`), theming, brand color, and visual composition. After installing
\`@awesome.me/webawesome\`, register them with \`npx skills add ./node_modules/@awesome.me/webawesome/dist/skills/webawesome\`
and \`npx skills add ./node_modules/@awesome.me/webawesome/dist/skills/webawesome-design\`. See ${baseUrl}/docs/ai/agent-skills for both.
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
  lines.push(`- [Installation](${baseUrl}/docs/): Installation and setup guide`);
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
 * Generates the llms.txt file following the llmstxt.org specification.
 * This should be called after the CEM has been generated.
 */
export async function generateLlmsTxtFile(options = {}) {
  const {
    outdir = getCdnDir(),
    copyTo = [getDistDir()],
    docsDir = getDocsDir(),
    cemPath = path.join(getCdnDir(), 'custom-elements.json'),
    baseUrl = 'https://webawesome.com',
  } = options;

  // Load CEM
  if (!fs.existsSync(cemPath)) {
    console.warn(`Warning: Custom Elements Manifest not found at ${cemPath}`);
    return;
  }

  const customElementsManifest = JSON.parse(fs.readFileSync(cemPath, 'utf-8'));
  const components = getAllComponents(customElementsManifest);
  const packageData = customElementsManifest.package || {};
  const frontMatterCache = loadAllFrontMatter(components, docsDir);

  const llmsTxt = generateLlmsTxt({
    components,
    packageData,
    frontMatterCache,
    baseUrl,
  });

  // Ensure output directory exists
  fs.mkdirSync(outdir, { recursive: true });

  // Write to the output directory
  const outputPath = path.join(outdir, 'llms.txt');
  fs.writeFileSync(outputPath, llmsTxt, 'utf-8');

  // Copy to additional directories. Users install from these, so a Pro build imports from Pro there.
  // The dist-cdn copy feeds webawesome.com and keeps core.
  for (const dest of copyTo) {
    fs.mkdirSync(dest, { recursive: true });
    fs.copyFileSync(outputPath, path.join(dest, 'llms.txt'));
    retargetPackageFiles([path.join(dest, 'llms.txt')]);
  }
}
