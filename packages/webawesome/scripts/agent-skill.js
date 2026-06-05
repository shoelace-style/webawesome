import fs from 'fs';
import matter from 'gray-matter';
import { parse } from 'node-html-parser';
import path from 'path';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';
import { getAllComponents } from './shared.js';
import { getCdnDir, getDistDir, getDocsDir, getSiteDir } from './utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Creates a configured Turndown service for converting HTML to Markdown.
 */
function createTurndownService(baseUrl) {
  const turndown = new TurndownService({
    headingStyle: 'atx',
    codeBlockStyle: 'fenced',
    bulletListMarker: '-',
  });

  // Custom rule for code examples - extract clean code from syntax-highlighted blocks
  turndown.addRule('codeExample', {
    filter: node => {
      return node.nodeName === 'DIV' && node.classList?.contains('code-example');
    },
    replacement: (_content, node) => {
      // Find the code element within code-example-source
      const sourceDiv = node.querySelector('.code-example-source');
      if (!sourceDiv) return '';

      const codeElement = sourceDiv.querySelector('pre code');
      if (!codeElement) return '';

      // Get the raw text content (strips syntax highlighting spans)
      const code = codeElement.textContent.trim();

      // Detect language from class
      const classes = codeElement.className || '';
      const langMatch = classes.match(/language-(\w+)/);
      const lang = langMatch ? langMatch[1] : '';

      return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
    },
  });

  // Custom rule for standalone pre/code blocks (not in code-example)
  turndown.addRule('standaloneCode', {
    filter: node => {
      return node.nodeName === 'PRE' && !node.closest('.code-example') && node.querySelector('code');
    },
    replacement: (content, node) => {
      const codeElement = node.querySelector('code');
      if (!codeElement) return content;

      const code = codeElement.textContent.trim();
      const classes = codeElement.className || '';
      const langMatch = classes.match(/language-(\w+)/);
      const lang = langMatch ? langMatch[1] : '';

      return `\n\n\`\`\`${lang}\n${code}\n\`\`\`\n\n`;
    },
  });

  // Remove elements we don't want in the output
  turndown.addRule('removeUnwanted', {
    filter: node => {
      if (node.nodeName === 'NAV' && node.id === 'outline-expandable') return true;
      if (node.nodeName === 'DIV' && node.id === 'flashes') return true;
      if (node.nodeName === 'STYLE') return true;
      if (node.nodeName === 'SCRIPT') return true;
      if (node.classList?.contains('code-example-preview')) return true;
      if (node.classList?.contains('code-example-buttons')) return true;
      if (node.classList?.contains('code-example-resizer')) return true;
      if (node.nodeName === 'WA-COPY-BUTTON') return true;
      return false;
    },
    replacement: () => '',
  });

  // Handle headings with anchor links - extract just the heading text
  turndown.addRule('anchorHeading', {
    filter: node => {
      return /^H[1-6]$/.test(node.nodeName) && node.classList?.contains('anchor-heading');
    },
    replacement: (_content, node) => {
      const level = parseInt(node.nodeName.charAt(1), 10);
      // Get just the text content, excluding the anchor link
      let text = '';
      for (const child of node.childNodes) {
        if (child.nodeType === 3) {
          // Text node
          text += child.textContent;
        } else if (child.nodeName !== 'A') {
          text += child.textContent;
        }
      }
      text = text.trim();
      return `\n\n${'#'.repeat(level)} ${text}\n\n`;
    },
  });

  // Convert relative URLs to absolute
  turndown.addRule('absoluteLinks', {
    filter: 'a',
    replacement: (content, node) => {
      let href = node.getAttribute('href') || '';
      if (href.startsWith('/')) {
        href = baseUrl + href;
      }
      const title = node.getAttribute('title');
      if (title) {
        return `[${content}](${href} "${title}")`;
      }
      return `[${content}](${href})`;
    },
  });

  // Handle images with absolute URLs
  turndown.addRule('absoluteImages', {
    filter: 'img',
    replacement: (_content, node) => {
      let src = node.getAttribute('src') || '';
      if (src.startsWith('/')) {
        src = baseUrl + src;
      }
      const alt = node.getAttribute('alt') || '';
      const title = node.getAttribute('title');
      if (title) {
        return `![${alt}](${src} "${title}")`;
      }
      return `![${alt}](${src})`;
    },
  });

  // Keep wa-* elements as inline code in prose (they appear as examples)
  turndown.addRule('waComponents', {
    filter: node => {
      return node.nodeName.startsWith('WA-') && !node.closest('.code-example');
    },
    replacement: (content, node) => {
      // For icon elements, just return empty (decorative)
      if (node.nodeName === 'WA-ICON') return '';
      // For other wa-* elements outside code examples, keep the content
      return content;
    },
  });

  return turndown;
}

/**
 * Renders a component's API table (Slots, Attributes & Properties, Methods, Events, CSS custom
 * properties, Custom States, CSS parts) directly from the Custom Elements Manifest.
 *
 * The docs site builds these tables from the CEM, so scraping the rendered HTML is a lossy
 * round-trip: per-row type, default, and description collapse into a single cell and any inline
 * `<code>` after the first is dropped. Reading the CEM (as scripts/llms.js already does) keeps
 * them accurate. Returns a markdown table string, or null when the section has no CEM data.
 *
 * The result is restored after the Turndown pass via a placeholder (see processHtmlToMarkdown),
 * so it can contain real backticks, brackets, and `<…>` text without being escaped or parsed.
 */
function renderComponentApiTable(section, component) {
  const bt = s => '`' + s + '`';
  const esc = s =>
    String(s ?? '')
      .replace(/\r?\n/g, ' ')
      .replace(/\|/g, '\\|')
      .replace(/\s+/g, ' ')
      .trim();
  const codeOrDash = s => {
    const t = esc(s);
    return t ? bt(t) : '—';
  };
  const table = (headers, rows) =>
    rows.length
      ? ['| ' + headers.join(' | ') + ' |', '| ' + headers.map(() => '---').join(' | ') + ' |', ...rows].join('\n')
      : null;

  switch (section) {
    case 'Slots':
      return table(
        ['Name', 'Description'],
        (component.slots || []).map(
          s => `| ${s.name ? bt(esc(s.name)) : '(default)'} | ${esc(s.description) || '—'} |`,
        ),
      );

    case 'Attributes & Properties': {
      const props = (component.members || []).filter(
        m => m.kind === 'field' && m.privacy !== 'private' && m.description,
      );
      return table(
        ['Property', 'Attribute', 'Description', 'Type', 'Default'],
        props.map(p => {
          const attr = (component.attributes || []).find(a => a.fieldName === p.name);
          return `| ${bt(esc(p.name))} | ${attr ? bt(esc(attr.name)) : '—'} | ${esc(p.description) || '—'} | ${codeOrDash(p.type && p.type.text)} | ${codeOrDash(p.default)} |`;
        }),
      );
    }

    case 'Methods': {
      const methods = (component.members || []).filter(
        m => m.kind === 'method' && m.privacy !== 'private' && m.description,
      );
      return table(
        ['Name', 'Description', 'Arguments'],
        methods.map(m => {
          const args = (m.parameters || [])
            .map(p => `${p.name}: ${esc(p.type && p.type.text) || 'unknown'}`)
            .join(', ');
          return `| ${bt(esc(m.name) + '()')} | ${esc(m.description) || '—'} | ${args ? bt(esc(args)) : '—'} |`;
        }),
      );
    }

    case 'Events':
      return table(
        ['Name', 'Description'],
        (component.events || []).filter(e => e.name).map(e => `| ${bt(esc(e.name))} | ${esc(e.description) || '—'} |`),
      );

    case 'CSS custom properties':
      return table(
        ['Name', 'Description', 'Default'],
        (component.cssProperties || []).map(
          p => `| ${bt(esc(p.name))} | ${esc(p.description) || '—'} | ${codeOrDash(p.default)} |`,
        ),
      );

    case 'Custom States':
      return table(
        ['Name', 'Description', 'CSS selector'],
        (component.cssStates || []).map(
          s => `| ${bt(esc(s.name))} | ${esc(s.description) || '—'} | ${bt(':state(' + esc(s.name) + ')')} |`,
        ),
      );

    case 'CSS parts':
      return table(
        ['Name', 'Description', 'CSS selector'],
        (component.cssParts || []).map(
          p => `| ${bt(esc(p.name))} | ${esc(p.description) || '—'} | ${bt('::part(' + esc(p.name) + ')')} |`,
        ),
      );

    default:
      return null;
  }
}

/**
 * Processes rendered HTML from Eleventy output and converts it to clean Markdown.
 *
 * When `component` (a Custom Elements Manifest declaration) is provided, that component's API
 * tables are regenerated from the manifest instead of being scraped from the rendered HTML.
 */
function processHtmlToMarkdown(htmlContent, baseUrl, component = null) {
  const root = parse(htmlContent, {
    blockTextElements: {
      script: true,
      style: true,
      pre: true,
    },
  });

  const main = root.querySelector('main#content');
  if (!main) {
    console.warn('Warning: Could not find main#content in HTML');
    return '';
  }

  // Process color groups before removing copy buttons - extract token names
  main.querySelectorAll('ul.color-group').forEach(ul => {
    const tokens = [];
    ul.querySelectorAll('wa-copy-button').forEach(btn => {
      const value = btn.getAttribute('value');
      if (value) {
        tokens.push(`\`${value}\``);
      }
    });
    if (tokens.length > 0) {
      // Replace the ul with a simple text node containing the tokens
      ul.replaceWith(tokens.join(', '));
    }
  });

  // Process tables - convert to markdown tables, skipping visual-only columns
  // We use a special marker that we'll convert back to newlines after turndown
  const TABLE_NEWLINE = '{{TABLE_NEWLINE}}';

  // Map each component API table to its section heading, in document order, so CEM-backed tables
  // can be regenerated from the manifest instead of scraped (see renderComponentApiTable).
  const sectionByTable = new Map();
  if (component) {
    let currentHeading = '';
    main.querySelectorAll('h2, table').forEach(node => {
      if (node.tagName === 'H2') {
        currentHeading = node.textContent.trim();
      } else if (node.classList?.contains('component-table')) {
        sectionByTable.set(node, currentHeading);
      }
    });
  }

  // CEM-generated tables are swapped in via placeholders and restored after Turndown, so their
  // backticks, brackets, pipes, and `<…>` text aren't escaped or parsed as HTML.
  const cemTables = [];

  main.querySelectorAll('table').forEach(table => {
    // Regenerate component API tables from the CEM (lossless) rather than scraping the HTML.
    if (sectionByTable.has(table)) {
      const cemTable = renderComponentApiTable(sectionByTable.get(table), component);
      if (cemTable !== null) {
        table.replaceWith(`{{CEMTABLE${cemTables.length}}}`);
        cemTables.push(cemTable);
        return;
      }
    }

    const headers = [];
    const headerCells = table.querySelectorAll('thead th');
    const columnsToSkip = new Set();

    // Collect headers and identify visual-only columns (Preview, CSS selector columns with no useful text)
    headerCells.forEach((th, index) => {
      const text = th.textContent.trim();
      // Skip "Preview" columns as they only contain visual elements
      if (text === 'Preview') {
        columnsToSkip.add(index);
      } else {
        headers.push(text);
      }
    });

    // If no headers found, skip this table
    if (headers.length === 0) return;

    // Build markdown table
    const rows = [];
    rows.push('| ' + headers.join(' | ') + ' |');
    rows.push('| ' + headers.map(() => '---').join(' | ') + ' |');

    // Process body rows
    table.querySelectorAll('tbody tr').forEach(tr => {
      const cells = [];
      const tds = tr.querySelectorAll('td');
      tds.forEach((td, index) => {
        if (columnsToSkip.has(index)) return;

        // Get text content, preserving code formatting
        let cellText = '';
        const codeEl = td.querySelector('code');
        if (codeEl) {
          cellText = '`' + codeEl.textContent.trim() + '`';
          // Check for additional text after the code (like default values or descriptions)
          const remainingText = td.textContent.replace(codeEl.textContent, '').trim();
          if (remainingText) {
            cellText += ' ' + remainingText;
          }
        } else {
          cellText = td.textContent.trim();
        }
        // Escape pipe characters and normalize whitespace
        cellText = cellText.replace(/\|/g, '\\|').replace(/\s+/g, ' ');
        cells.push(cellText);
      });

      if (cells.length > 0) {
        rows.push('| ' + cells.join(' | ') + ' |');
      }
    });

    // Replace the table with markdown using special newline markers
    table.replaceWith(rows.join(TABLE_NEWLINE));
  });

  // Process tab groups - convert to labeled sections
  main.querySelectorAll('wa-tab-group').forEach(tabGroup => {
    const sections = [];
    const tabs = tabGroup.querySelectorAll('wa-tab');

    tabs.forEach(tab => {
      const panelName = tab.getAttribute('panel');
      const tabLabel = tab.textContent.trim();
      const panel = tabGroup.querySelector(`wa-tab-panel[name="${panelName}"]`);

      if (panel) {
        // Get the panel's HTML content for turndown to process later
        const panelContent = panel.innerHTML.trim();
        if (panelContent) {
          sections.push(`**${tabLabel}**\n\n${panelContent}`);
        }
      }
    });

    if (sections.length > 0) {
      tabGroup.replaceWith(sections.join('\n\n'));
    }
  });

  // Remove elements before conversion (some are easier to remove here than via turndown rules)
  main
    .querySelectorAll(
      'nav#outline-expandable, #flashes, style, script, .code-example-preview, .code-example-buttons, .code-example-resizer, wa-copy-button',
    )
    .forEach(el => el.remove());

  // Get the h1 title if present (we'll add it separately in the header)
  const h1 = main.querySelector('h1.title');
  const title = h1 ? h1.textContent.trim() : null;
  if (h1) h1.remove();

  const turndown = createTurndownService(baseUrl);
  let markdown = turndown.turndown(main.innerHTML);

  // Restore table newlines from markers (underscores may be escaped by turndown)
  markdown = markdown.replace(/\{\{TABLE[_\\]+NEWLINE\}\}/g, '\n');
  // Restore CEM-generated tables (kept out of the Turndown pass so their markdown isn't escaped)
  markdown = markdown.replace(/\{\{CEMTABLE(\d+)\}\}/g, (_, i) => cemTables[Number(i)]);

  // Remove server-side Nunjucks templates that aren't rendered in static build
  // These are templates meant for the production server (e.g., {% if session.isLoggedIn %})
  markdown = markdown.replace(/\{%-?\s*[\s\S]*?-?%\}/g, '').replace(/\{#[\s\S]*?#\}/g, '');

  // Clean up excessive blank lines
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

  return { content: markdown, title };
}

/**
 * Loads front-matter from all component markdown files.
 * We still need this for metadata like category, isProComponent, etc.
 */
function loadAllFrontMatter(docsDir) {
  const cache = new Map();
  const componentsDir = path.join(docsDir, 'docs/components');

  if (!fs.existsSync(componentsDir)) {
    return cache;
  }

  const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const componentName = file.replace('.md', '');
    const mdPath = path.join(componentsDir, file);

    try {
      const content = fs.readFileSync(mdPath, 'utf-8');
      const { data } = matter(content);
      cache.set(componentName, data);
    } catch {
      // Skip if parsing fails
    }
  }

  return cache;
}

/**
 * Loads front-matter from markdown files in a directory.
 */
function loadFrontMatterFromDir(dirPath) {
  const cache = new Map();

  if (!fs.existsSync(dirPath)) {
    return cache;
  }

  const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const name = file.replace('.md', '');
    const mdPath = path.join(dirPath, file);

    try {
      const content = fs.readFileSync(mdPath, 'utf-8');
      const { data } = matter(content);
      cache.set(name, data);
    } catch {
      // Skip if parsing fails
    }
  }

  return cache;
}

/**
 * Gets component info combining CEM data with frontmatter.
 */
function getComponentInfo(components, frontMatterCache) {
  const componentList = [];

  for (const component of components) {
    if (!component.tagName) continue;

    const componentName = component.tagName.replace(/^wa-/, '');
    const frontmatter = frontMatterCache.get(componentName) || {};

    componentList.push({
      tagName: component.tagName,
      name: componentName,
      title: frontmatter.title || componentName,
      description: frontmatter.description || component.summary || '',
      category: frontmatter.category || 'Uncategorized',
      isProComponent: frontmatter.isProComponent === true,
    });
  }

  // Sort alphabetically by tag name
  return componentList.sort((a, b) => a.tagName.localeCompare(b.tagName));
}

/**
 * Generates the main SKILL.md content.
 */
function generateSkillMd({ componentList, packageData, baseUrl }) {
  const freeComponents = componentList.filter(c => !c.isProComponent);
  const proComponents = componentList.filter(c => c.isProComponent);

  // Group components by category
  const categorize = list => {
    const categories = {};
    for (const c of list) {
      if (!categories[c.category]) {
        categories[c.category] = [];
      }
      categories[c.category].push(c);
    }
    return categories;
  };

  const freeByCategory = categorize(freeComponents);
  const proByCategory = categorize(proComponents);

  // Helper to generate component list for a category
  const renderComponentList = (components, isPro = false) => {
    return components
      .map(c => {
        const proTag = isPro ? ' [Pro]' : '';
        return `- [\`<${c.tagName}>\`](references/components/${c.name}.md)${proTag} - ${c.description || 'No description'} ([docs](${baseUrl}/docs/components/${c.name}))`;
      })
      .join('\n');
  };

  // Generate free components section
  const freeComponentsSection =
    Object.keys(freeByCategory).length > 0
      ? `### Free Components

${Object.keys(freeByCategory)
  .sort()
  .map(
    category => `#### ${category}

${renderComponentList(freeByCategory[category])}`,
  )
  .join('\n\n')}
`
      : '';

  // Generate pro components section
  const proComponentsSection =
    Object.keys(proByCategory).length > 0
      ? `### Pro Components

These components require [Web Awesome Pro](${baseUrl}/purchase).

${Object.keys(proByCategory)
  .sort()
  .map(
    category => `#### ${category}

${renderComponentList(proByCategory[category], true)}`,
  )
  .join('\n\n')}
`
      : '';

  return `---
name: webawesome
description: Web Awesome is a UI component library built with web components. Use when building buttons, inputs, selects, checkboxes, dialogs, modals, drawers, tabs, dropdowns, tooltips, carousels, forms, or using CSS utilities like wa-stack, wa-cluster, wa-grid. Supports React, Vue, Angular, Svelte, and vanilla JS.
license: MIT / Commercial (for Web Awesome Pro)
metadata:
  author: Web Awesome
  version: "${packageData.version || '0.0.0'}"
  homepage: ${baseUrl}
  repository: https://github.com/shoelace-style/webawesome
compatibility: Works in modern browsers. Requires no build tools when using CDN. Works with bundlers like Webpack and Vite when installed via npm.
allowed-tools: Read
---

# Web Awesome

Web Awesome is an open source UI component library with a Pro offering that helps sustain the project. It provides 50+ accessible, customizable web components that work with any framework.

**Pro components and features are available to paid users.** [Purchase Pro](${baseUrl}/purchase)

## Quick Start

### npm Installation

\`\`\`bash
npm install @awesome.me/webawesome
\`\`\`

Import styles and components:

\`\`\`js
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
\`\`\`

### CDN / Project Setup

The easiest way to use Web Awesome is with a hosted project. [Create a project](${baseUrl}) to get a single line of code that loads everything automatically.

For detailed installation options, see [Installation Guide](references/installation.md).

## Core Concepts

Web Awesome components are custom HTML elements. They work like native elements but with enhanced functionality.

- **Attributes & Properties**: Configure components via HTML attributes or JavaScript properties
- **Events**: Listen to custom events prefixed with \`wa-\` (e.g., \`wa-change\`, \`wa-input\`)
- **Methods**: Call methods programmatically (e.g., \`element.focus()\`)
- **Slots**: Insert content into named slots (e.g., \`<wa-icon slot="start">\`)
- **CSS Parts**: Style internal elements using \`::part()\` selectors
- **CSS Custom Properties**: Customize appearance with CSS variables

**Important**: Always use closing tags. Custom elements cannot self-close.

\`\`\`html
<!-- Correct -->
<wa-input></wa-input>

<!-- Incorrect - will not work -->
<wa-input />
\`\`\`

For complete usage details, see [Usage Guide](references/usage.md).

## Components

${freeComponentsSection}
${proComponentsSection}
## Themes

Web Awesome includes pre-built themes. Apply a theme by adding its class to the \`<html>\` element.

### Free Themes
- **Default** - The foundational theme
- **Awesome** - Bright, vibrant color palette
- **Shoelace** - Classic Shoelace styling

### Pro Themes
- **Active** - Green branding with rudimentary palette
- **Brutalist** - Blue branding with default palette
- **Glossy** - Indigo accents with elegant palette
- **Matter** - Purple branding with mild palette
- **Mellow** - Blue branding with natural palette
- **Playful** - Purple branding with rudimentary palette
- **Premium** - Cyan branding with anodized palette
- **Tailspin** - Indigo accents with vogue palette

See [Themes Reference](references/themes.md) for usage details.

## Color Palettes

Each palette provides 10 color hues with 11 tints each.

### Free Palettes
- Default, Bright, Shoelace

### Pro Palettes
- Rudimentary, Elegant, Mild, Natural, Anodized, Vogue

See [Themes Reference](references/themes.md) for palette usage.

## Utilities

Web Awesome provides CSS utilities for common styling tasks:

- **Layout**: \`wa-stack\`, \`wa-cluster\`, \`wa-grid\`, \`wa-split\`, \`wa-flank\`, \`wa-frame\`
- **Spacing**: \`wa-gap-*\` utilities
- **Text**: Typography utilities
- **Color**: Color variant utilities
- **Rounding**: \`wa-border-radius-*\` utilities
- **Accessibility**: \`wa-visually-hidden\` utilities
- **FOUCE Prevention**: \`wa-cloak\` utility
- **Native Styles**: Enhanced styling for native HTML elements

See [Layout Utilities](references/utilities/layout.md), [Rounding](references/utilities/rounding.md), [Visually Hidden](references/utilities/visually-hidden.md), [FOUCE](references/utilities/fouce.md), and [Native Styles](references/utilities/native.md).

## Design Tokens

Web Awesome uses CSS custom properties (design tokens) for consistent theming:

- **Borders**: \`--wa-border-*\` for width, radius, style
- **Color**: \`--wa-color-*\` for surfaces, text, semantic colors
- **Space**: \`--wa-space-*\` for consistent spacing
- **Typography**: \`--wa-font-*\` for font families, sizes, weights
- **Shadows**: \`--wa-shadow-*\` for elevation
- **Focus**: \`--wa-focus-*\` for focus ring styles
- **Transitions**: \`--wa-transition-*\` for animation timing

See [Design Tokens](references/tokens/) for full reference.

## Form Controls

Web Awesome form controls are form-associated custom elements supporting native form validation and the Constraint Validation API.

- Use \`required\`, \`pattern\`, \`minlength\`, \`maxlength\` attributes
- Use \`setCustomValidity()\` for custom error messages
- Style validation states with \`:state(valid)\`, \`:state(invalid)\`, etc.

See [Form Controls Reference](references/form-controls.md) for details.

## Icons

Font Awesome is the default icon library. Use \`<wa-icon>\` with Font Awesome icon names:

\`\`\`html
<wa-icon name="house"></wa-icon>
<wa-icon name="gear"></wa-icon>
<wa-icon name="check"></wa-icon>
\`\`\`

## Framework Integration

Web Awesome works with any framework:

- **React 19+**: Native custom element support with TypeScript types
- **React 18 and below**: Use provided React wrappers
- **Vue**: Works out of the box
- **Angular**: Works out of the box
- **Svelte**: Works out of the box

See framework-specific guides in [references/frameworks/](references/frameworks/).

## Pro Features

[Web Awesome Pro](${baseUrl}/purchase) includes:

- Pro Components (Data Grid, Date Picker, Rich Text Editor, etc.)
- Pro Themes and Color Palettes
- Theme Builder tool
- Official Figma Design Kit
- Responsive Layout Tools
- Pattern Library
- Priority Support

## Support

- **GitHub Issues**: https://github.com/shoelace-style/webawesome/issues
- **GitHub Discussions**: https://github.com/shoelace-style/webawesome/discussions
- **Discord**: Community chat and support
- **Email**: For account and billing questions

See [Support Reference](references/support.md) for more details.

## Reference Documentation

- [Installation Guide](references/installation.md)
- [Usage Guide](references/usage.md)
- [Form Controls](references/form-controls.md)
- [Customizing](references/customizing.md)
- [Localization](references/localization.md)
- [Themes & Palettes](references/themes.md)
- [Layout Utilities](references/utilities/layout.md)
- [Native Styles](references/utilities/native.md)
- [Design Tokens](references/tokens/) - Borders, Color, Space, Typography, Shadows, Focus, Transitions
- [Framework Guides](references/frameworks/)
`;
}

/**
 * Generates the themes reference documentation.
 */
function generateThemesReference(baseUrl) {
  return `# Themes & Color Palettes

**Full documentation:** ${baseUrl}/docs/themes

## Applying Themes

Apply theme classes to the \`<html>\` element:

\`\`\`html
<html class="wa-theme-awesome wa-palette-bright wa-brand-indigo">
\`\`\`

For npm/CDN users, import the theme stylesheet:

\`\`\`js
import '@awesome.me/webawesome/dist/styles/themes/awesome.css';
\`\`\`

## Free Themes

| Theme | Description |
|-------|-------------|
| **Default** | The foundational theme using default design tokens |
| **Awesome** | Bright, vibrant color palette for modern interfaces |
| **Shoelace** | Classic Shoelace styling for familiarity |

## Pro Themes

Requires [Web Awesome Pro](${baseUrl}/purchase).

| Theme | Palette | Brand Color |
|-------|---------|-------------|
| **Active** | Rudimentary | Green |
| **Brutalist** | Default | Blue |
| **Glossy** | Elegant | Indigo |
| **Matter** | Mild | Purple |
| **Mellow** | Natural | Blue |
| **Playful** | Rudimentary | Purple |
| **Premium** | Anodized | Cyan |
| **Tailspin** | Vogue | Indigo |

## Color Palettes

Each palette provides 10 color hues with a scale of 11 tints.

### Free Palettes
- **Default** - Standard balanced hues
- **Bright** - Enhanced saturation
- **Shoelace** - Classic Shoelace colors

### Pro Palettes
- **Rudimentary**
- **Elegant**
- **Mild**
- **Natural**
- **Anodized**
- **Vogue**

## Applying Palettes

\`\`\`html
<html class="wa-palette-bright">
\`\`\`

CSS variables follow the pattern \`--wa-color-{hue}-{tint}\`:

\`\`\`css
.my-element {
  color: var(--wa-color-blue-60);
  background: var(--wa-color-gray-10);
}
\`\`\`

## Theme Builder

Pro users can customize themes using the [Theme Builder](${baseUrl}/docs/themes). Access it through Settings > Edit Your Theme.
`;
}

/**
 * Generates the support reference documentation.
 */
function generateSupportReference(baseUrl) {
  return `# Support

**Full documentation:** ${baseUrl}/docs/resources/support

## Getting Help

### GitHub

- **Issues**: Report bugs with clear reproduction steps
  https://github.com/shoelace-style/webawesome/issues

- **Discussions**: Ask questions and share tips
  https://github.com/shoelace-style/webawesome/discussions

### Discord

Join the community for real-time help and discussion with other developers.

### Email

For sensitive or account-specific issues:
- Account access & login issues
- Billing or subscription questions
- Private matters

## Pro Support

[Web Awesome Pro](${baseUrl}/purchase) includes priority support.
`;
}

/**
 * Copies and processes a documentation file from rendered HTML.
 */
function copyAndProcessDoc(siteDir, docsDir, destDir, htmlRelPath, destFileName, baseUrl, options = {}) {
  const htmlPath = path.join(siteDir, htmlRelPath);

  // Get frontmatter from source markdown for title
  const mdRelPath = options.mdPath || htmlRelPath.replace('docs/', 'docs/docs/').replace('/index.html', '.md');
  const mdPath = path.join(docsDir, mdRelPath);

  let frontmatter = {};
  if (fs.existsSync(mdPath)) {
    try {
      const mdContent = fs.readFileSync(mdPath, 'utf-8');
      frontmatter = matter(mdContent).data;
    } catch {
      // Ignore frontmatter parsing errors
    }
  }

  if (!fs.existsSync(htmlPath)) {
    console.warn(`Warning: HTML file not found: ${htmlPath}`);
    return false;
  }

  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const { content: processed, title: htmlTitle } = processHtmlToMarkdown(htmlContent, baseUrl);

  const title = frontmatter.title || htmlTitle || destFileName.replace('.md', '');
  const docPath = options.docPath || htmlRelPath.replace('/index.html', '').replace('.html', '');

  const header = [`# ${title}`, '', `**Full documentation:** ${baseUrl}/${docPath}`, '', ''].join('\n');

  fs.writeFileSync(path.join(destDir, destFileName), header + processed, 'utf-8');
  return true;
}

/**
 * Copies all component documentation files from rendered HTML.
 */
function copyAllComponentDocs(siteDir, destDir, baseUrl, frontMatterCache, components = []) {
  const htmlDir = path.join(siteDir, 'docs/components');
  const componentsDestDir = path.join(destDir, 'components');

  if (!fs.existsSync(htmlDir)) {
    console.warn(`Warning: Components HTML directory not found: ${htmlDir}`);
    return;
  }

  fs.mkdirSync(componentsDestDir, { recursive: true });

  // Get list of component directories
  const componentDirs = fs.readdirSync(htmlDir).filter(f => {
    const fullPath = path.join(htmlDir, f);
    return fs.statSync(fullPath).isDirectory();
  });

  for (const componentName of componentDirs) {
    const htmlPath = path.join(htmlDir, componentName, 'index.html');

    if (!fs.existsSync(htmlPath)) continue;

    const frontmatter = frontMatterCache.get(componentName) || {};
    const component = components.find(c => c.tagName === `wa-${componentName}`) || null;
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    const { content: processed } = processHtmlToMarkdown(htmlContent, baseUrl, component);

    const title = frontmatter.title || componentName;
    const isProComponent = frontmatter.isProComponent === true;
    const proBadge = isProComponent ? ' [Pro]' : '';

    const header = [
      `# ${title}${proBadge}`,
      '',
      `**Full documentation:** ${baseUrl}/docs/components/${componentName}`,
      '',
      isProComponent ? `> This component requires [Web Awesome Pro](${baseUrl}/purchase).` : '',
      '',
    ].join('\n');

    fs.writeFileSync(path.join(componentsDestDir, `${componentName}.md`), header + processed, 'utf-8');
  }
}

/**
 * Generates combined layout utilities documentation from rendered HTML.
 */
function generateLayoutUtilitiesDoc(siteDir, docsDir, destDir, baseUrl) {
  const layoutNames = ['stack', 'cluster', 'grid', 'split', 'flank', 'frame', 'gap', 'align-items', 'justify-content'];

  // Load frontmatter for titles
  const frontMatterCache = loadFrontMatterFromDir(path.join(docsDir, 'docs/utilities'));

  const lines = ['# Layout Utilities', '', `**Full documentation:** ${baseUrl}/docs/utilities`, ''];

  for (const name of layoutNames) {
    const htmlPath = path.join(siteDir, 'docs/utilities', name, 'index.html');

    if (fs.existsSync(htmlPath)) {
      const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
      const { content: processed } = processHtmlToMarkdown(htmlContent, baseUrl);
      const frontmatter = frontMatterCache.get(name) || {};
      const title = frontmatter.title || name;

      lines.push(`## ${title}`);
      lines.push('');
      lines.push(processed);
      lines.push('');
      lines.push('---');
      lines.push('');
    }
  }

  fs.writeFileSync(path.join(destDir, 'layout.md'), lines.join('\n').trim(), 'utf-8');
}

/**
 * Recursively copies a directory.
 */
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

/**
 * Generates the Agent Skill (standalone function for use after Eleventy builds).
 * This should be called after the _site directory has been generated.
 */
export async function generateAgentSkill(options = {}) {
  const {
    outdir = path.join(getDistDir(), 'skills/webawesome'),
    docsDir = getDocsDir(),
    siteDir = getSiteDir(),
    copyTo = [path.join(getCdnDir(), 'skills/webawesome')],
    cemPath = path.join(getCdnDir(), 'custom-elements.json'),
    baseUrl = 'https://webawesome.com',
  } = options;

  // Check if _site exists
  if (!fs.existsSync(siteDir)) {
    console.warn(`Warning: _site directory not found at ${siteDir}. Run Eleventy build first.`);
    return;
  }

  // Load CEM
  let customElementsManifest = { modules: [], package: {} };
  if (fs.existsSync(cemPath)) {
    customElementsManifest = JSON.parse(fs.readFileSync(cemPath, 'utf-8'));
  } else {
    console.warn(`Warning: Custom Elements Manifest not found at ${cemPath}`);
  }

  const components = getAllComponents(customElementsManifest);
  const packageData = customElementsManifest.package || {};
  const frontMatterCache = loadAllFrontMatter(docsDir);
  const componentList = getComponentInfo(components, frontMatterCache);

  // Create output directories
  const refsDir = path.join(outdir, 'references');
  const frameworksDir = path.join(refsDir, 'frameworks');
  const utilitiesDir = path.join(refsDir, 'utilities');
  const tokensDir = path.join(refsDir, 'tokens');

  fs.mkdirSync(outdir, { recursive: true });
  fs.mkdirSync(refsDir, { recursive: true });
  fs.mkdirSync(frameworksDir, { recursive: true });
  fs.mkdirSync(utilitiesDir, { recursive: true });
  fs.mkdirSync(tokensDir, { recursive: true });

  // Generate SKILL.md
  const skillMd = generateSkillMd({ componentList, packageData, baseUrl });
  fs.writeFileSync(path.join(outdir, 'SKILL.md'), skillMd, 'utf-8');

  // Copy all component docs from rendered HTML
  copyAllComponentDocs(siteDir, refsDir, baseUrl, frontMatterCache, components);

  // Generate themes reference (static content)
  const themesRef = generateThemesReference(baseUrl);
  fs.writeFileSync(path.join(refsDir, 'themes.md'), themesRef, 'utf-8');

  // Generate support reference (static content)
  const supportRef = generateSupportReference(baseUrl);
  fs.writeFileSync(path.join(refsDir, 'support.md'), supportRef, 'utf-8');

  // Copy and process documentation files from rendered HTML
  copyAndProcessDoc(siteDir, docsDir, refsDir, 'docs/index.html', 'installation.md', baseUrl, {
    docPath: 'docs',
    mdPath: 'docs/index.md',
  });
  copyAndProcessDoc(siteDir, docsDir, refsDir, 'docs/usage/index.html', 'usage.md', baseUrl, {
    docPath: 'docs/usage',
    mdPath: 'docs/usage.md',
  });
  copyAndProcessDoc(siteDir, docsDir, refsDir, 'docs/form-controls/index.html', 'form-controls.md', baseUrl, {
    docPath: 'docs/form-controls',
    mdPath: 'docs/form-controls.md',
  });
  copyAndProcessDoc(siteDir, docsDir, refsDir, 'docs/customizing/index.html', 'customizing.md', baseUrl, {
    docPath: 'docs/customizing',
    mdPath: 'docs/customizing.md',
  });
  copyAndProcessDoc(siteDir, docsDir, refsDir, 'docs/localization/index.html', 'localization.md', baseUrl, {
    docPath: 'docs/localization',
    mdPath: 'docs/localization.md',
  });

  // Framework docs
  copyAndProcessDoc(siteDir, docsDir, frameworksDir, 'docs/frameworks/react/index.html', 'react.md', baseUrl, {
    docPath: 'docs/frameworks/react',
    mdPath: 'docs/frameworks/react.md',
  });
  copyAndProcessDoc(siteDir, docsDir, frameworksDir, 'docs/frameworks/vue/index.html', 'vue.md', baseUrl, {
    docPath: 'docs/frameworks/vue',
    mdPath: 'docs/frameworks/vue.md',
  });
  copyAndProcessDoc(siteDir, docsDir, frameworksDir, 'docs/frameworks/angular/index.html', 'angular.md', baseUrl, {
    docPath: 'docs/frameworks/angular',
    mdPath: 'docs/frameworks/angular.md',
  });
  copyAndProcessDoc(siteDir, docsDir, frameworksDir, 'docs/frameworks/svelte/index.html', 'svelte.md', baseUrl, {
    docPath: 'docs/frameworks/svelte',
    mdPath: 'docs/frameworks/svelte.md',
  });

  // Utility docs
  generateLayoutUtilitiesDoc(siteDir, docsDir, utilitiesDir, baseUrl);
  copyAndProcessDoc(siteDir, docsDir, utilitiesDir, 'docs/utilities/native/index.html', 'native.md', baseUrl, {
    docPath: 'docs/utilities/native',
    mdPath: 'docs/utilities/native.md',
  });
  copyAndProcessDoc(siteDir, docsDir, utilitiesDir, 'docs/utilities/text/index.html', 'text.md', baseUrl, {
    docPath: 'docs/utilities/text',
    mdPath: 'docs/utilities/text.md',
  });
  copyAndProcessDoc(siteDir, docsDir, utilitiesDir, 'docs/utilities/color/index.html', 'color.md', baseUrl, {
    docPath: 'docs/utilities/color',
    mdPath: 'docs/utilities/color.md',
  });
  copyAndProcessDoc(siteDir, docsDir, utilitiesDir, 'docs/utilities/fouce/index.html', 'fouce.md', baseUrl, {
    docPath: 'docs/utilities/fouce',
    mdPath: 'docs/utilities/fouce.md',
  });
  copyAndProcessDoc(siteDir, docsDir, utilitiesDir, 'docs/utilities/rounding/index.html', 'rounding.md', baseUrl, {
    docPath: 'docs/utilities/rounding',
    mdPath: 'docs/utilities/rounding.md',
  });
  copyAndProcessDoc(
    siteDir,
    docsDir,
    utilitiesDir,
    'docs/utilities/visually-hidden/index.html',
    'visually-hidden.md',
    baseUrl,
    {
      docPath: 'docs/utilities/visually-hidden',
      mdPath: 'docs/utilities/visually-hidden.md',
    },
  );

  // Design token docs
  copyAndProcessDoc(siteDir, docsDir, tokensDir, 'docs/tokens/borders/index.html', 'borders.md', baseUrl, {
    docPath: 'docs/tokens/borders',
    mdPath: 'docs/tokens/borders.md',
  });
  copyAndProcessDoc(siteDir, docsDir, tokensDir, 'docs/tokens/color/index.html', 'color.md', baseUrl, {
    docPath: 'docs/tokens/color',
    mdPath: 'docs/tokens/color.md',
  });
  copyAndProcessDoc(
    siteDir,
    docsDir,
    tokensDir,
    'docs/tokens/component-groups/index.html',
    'component-groups.md',
    baseUrl,
    {
      docPath: 'docs/tokens/component-groups',
      mdPath: 'docs/tokens/component-groups.md',
    },
  );
  copyAndProcessDoc(siteDir, docsDir, tokensDir, 'docs/tokens/focus/index.html', 'focus.md', baseUrl, {
    docPath: 'docs/tokens/focus',
    mdPath: 'docs/tokens/focus.md',
  });
  copyAndProcessDoc(siteDir, docsDir, tokensDir, 'docs/tokens/shadows/index.html', 'shadows.md', baseUrl, {
    docPath: 'docs/tokens/shadows',
    mdPath: 'docs/tokens/shadows.md',
  });
  copyAndProcessDoc(siteDir, docsDir, tokensDir, 'docs/tokens/space/index.html', 'space.md', baseUrl, {
    docPath: 'docs/tokens/space',
    mdPath: 'docs/tokens/space.md',
  });
  copyAndProcessDoc(siteDir, docsDir, tokensDir, 'docs/tokens/transitions/index.html', 'transitions.md', baseUrl, {
    docPath: 'docs/tokens/transitions',
    mdPath: 'docs/tokens/transitions.md',
  });
  copyAndProcessDoc(siteDir, docsDir, tokensDir, 'docs/tokens/typography/index.html', 'typography.md', baseUrl, {
    docPath: 'docs/tokens/typography',
    mdPath: 'docs/tokens/typography.md',
  });

  // Copy to additional directories
  for (const dest of copyTo) {
    copyDirSync(outdir, dest);
  }
}
