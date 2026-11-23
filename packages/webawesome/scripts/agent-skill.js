import fs from 'fs';
import matter from 'gray-matter';
import { parse } from 'node-html-parser';
import path from 'path';
import TurndownService from 'turndown';
import { fileURLToPath } from 'url';
import { getAllComponents } from './shared.js';
import {
  CORE_PACKAGE_NAME,
  getCdnDir,
  getDistDir,
  getDocsDir,
  getPackageName,
  getSiteDir,
  listMarkdownFiles,
  retargetPackageFiles,
} from './utils.js';

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
      // Card links wrap block content; keep the link text on one line
      content = content.replace(/\s+/g, ' ').trim();
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

/** Collapses whitespace and renders `[[Key]]` shortcodes from JSDoc as plain key names. */
export function cleanCemText(text) {
  return String(text ?? '')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Escapes the characters that would otherwise be parsed as HTML. */
function escapeHtml(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Escapes pipes so text can sit in a markdown table cell. */
function escapeCell(text) {
  return text.replace(/\|/g, '\\|');
}

/** A type with aliases expanded when the type parser resolved them, without a leading union pipe. */
export function typeText(item) {
  return (item?.parsedType?.text || item?.type?.text || '').replace(/^\s*\|\s*/, '');
}

/** Drops CEM items flagged deprecated. */
export function current(items = []) {
  return items.filter(item => !item.deprecated);
}

/** Public, documented, non-static, non-deprecated members of one kind. */
export function apiMembers(component, kind) {
  return (component.members || []).filter(
    m =>
      m.kind === kind &&
      m.privacy !== 'private' &&
      m.privacy !== 'protected' &&
      !m.static &&
      !m.deprecated &&
      !m.name.startsWith('#') &&
      m.description,
  );
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
  const esc = s => escapeCell(cleanCemText(s));
  const codeOrDash = s => {
    const t = esc(s);
    return t ? bt(t) : '—';
  };
  const table = (headers, rows) =>
    rows.length
      ? ['| ' + headers.join(' | ') + ' |', '| ' + headers.map(() => '---').join(' | ') + ' |', ...rows].join('\n')
      : null;

  switch (section) {
    case 'Slots': {
      // Rendered as a bullet list (not a table) with an explicit warning: losing slot names is the
      // exact failure that makes LLMs invent non-existent slots like `slot="main"`, so the valid
      // names are stated plainly. The default slot is shown as `(default)`.
      const slots = current(component.slots);
      if (!slots.length) return null;
      const lines = [
        'Valid slot names for this component. An element with any other `slot` value is not rendered.',
        '',
      ];
      for (const s of slots) {
        const name = s.name ? bt(esc(s.name)) : '`(default)`';
        lines.push(`- ${name} — ${esc(s.description) || 'No description.'}`);
      }
      return lines.join('\n');
    }

    case 'Attributes & Properties': {
      const props = apiMembers(component, 'field');
      return table(
        ['Property', 'Attribute', 'Description', 'Type', 'Default'],
        props.map(p => {
          const attr = (component.attributes || []).find(a => a.fieldName === p.name);
          return `| ${bt(esc(p.name))} | ${attr ? bt(esc(attr.name)) : '—'} | ${esc(p.description) || '—'} | ${codeOrDash(typeText(p))} | ${codeOrDash(p.default)} |`;
        }),
      );
    }

    case 'Methods': {
      const methods = apiMembers(component, 'method');
      return table(
        ['Name', 'Description', 'Arguments'],
        methods.map(m => {
          const args = (m.parameters || []).map(p => `${p.name}: ${cleanCemText(typeText(p)) || 'unknown'}`).join(', ');
          return `| ${bt(esc(m.name) + '()')} | ${esc(m.description) || '—'} | ${args ? bt(esc(args)) : '—'} |`;
        }),
      );
    }

    case 'Events':
      return table(
        ['Name', 'Description'],
        current(component.events)
          .filter(e => e.name)
          .map(e => `| ${bt(esc(e.name))} | ${esc(e.description) || '—'} |`),
      );

    case 'CSS Custom Properties':
      return table(
        ['Name', 'Description', 'Default'],
        current(component.cssProperties).map(
          p => `| ${bt(esc(p.name))} | ${esc(p.description) || '—'} | ${codeOrDash(p.default)} |`,
        ),
      );

    case 'Custom States':
      return table(
        ['Name', 'Description', 'CSS selector'],
        current(component.cssStates).map(
          s => `| ${bt(esc(s.name))} | ${esc(s.description) || '—'} | ${bt(':state(' + esc(s.name) + ')')} |`,
        ),
      );

    case 'CSS Parts':
      return table(
        ['Name', 'Description', 'CSS selector'],
        current(component.cssParts).map(
          p => `| ${bt(esc(p.name))} | ${esc(p.description) || '—'} | ${bt('::part(' + esc(p.name) + ')')} |`,
        ),
      );

    default:
      throw new Error(`No manifest renderer for the "${section}" table on <${component.tagName}>`);
  }
}

/**
 * Moves a component's `## Examples` section to the end of the doc so the API comes first.
 *
 * The component layout (docs/_layouts/component.njk) emits the page in this order: summary →
 * Examples (the markdown body) → API sections (Importing, Slots, Attributes & Properties, …). The
 * skill wants summary → API → Examples. The examples are one contiguous block — `## Examples` up to
 * the next `## ` heading (`## Importing`) — so we just cut that block out and append it at the end.
 */
function moveExamplesToEnd(markdown) {
  const match = markdown.match(/\n## Examples\n[\s\S]*?(?=\n## |$)/);
  if (!match) return markdown;
  const examples = match[0];
  return (markdown.slice(0, match.index) + markdown.slice(match.index + examples.length)).trimEnd() + '\n' + examples;
}

/**
 * Shrinks a component's Importing section to the npm import, plus the React wrapper import when the docs
 * list one. CDN and self-hosted setup is the same for every component, so it lives in installation.md.
 */
function collapseImporting(markdown) {
  return markdown.replace(/### Importing\n[\s\S]*?(?=\n### |\n## |$)/, section => {
    const code = label =>
      section.match(new RegExp(`\\*\\*${label}\\*\\*[\\s\\S]*?\`\`\`\\w*\\n([\\s\\S]*?)\\n\`\`\``))?.[1];
    const npm = code('npm');
    if (!npm) return section;
    const react = code('React');
    return [
      '### Importing',
      '',
      'The autoloader and hosted projects load components on demand. To import this one from npm:',
      '',
      '```js',
      npm,
      '```',
      '',
      ...(react ? ['React 18 and below use the wrapper instead:', '', '```js', react, '```', ''] : []),
      'For CDN and self-hosted setup, see [Installation](../installation.md).',
      '',
    ].join('\n');
  });
}

/**
 * Adds a contents line to a long component reference, after the summary and hero example, listing its
 * sections and example headings so an agent can jump to the one it needs.
 */
function addContentsLine(markdown, minBytes = 15 * 1024) {
  if (Buffer.byteLength(markdown) < minBytes) return markdown;
  const examples = markdown.match(/\n## Examples\n([\s\S]*)$/)?.[1] ?? '';
  const exampleHeadings = [...examples.matchAll(/^### (.+)$/gm)].map(m => m[1].trim());
  const sections = [...markdown.matchAll(/^## (.+)$/gm)].map(m => m[1].trim()).filter(h => h !== 'Examples');
  const parts = [...sections, ...(exampleHeadings.length ? [`Examples (${exampleHeadings.join(', ')})`] : [])];
  if (!parts.length) return markdown;
  const line = `**Contents:** ${parts.join(' · ')}`;
  // Insert before the first heading below the title, which follows the summary and any hero example.
  const firstSection = markdown.search(/\n## /);
  if (firstSection === -1) return markdown;
  return markdown.slice(0, firstSection) + '\n' + line + '\n' + markdown.slice(firstSection);
}

/**
 * Rewrites absolute component docs links to the sibling reference file when the build ships one, so agents
 * stay inside the skill instead of fetching the website.
 */
function localizeComponentLinks(refsDir, baseUrl) {
  const componentsDir = path.join(refsDir, 'components');
  const docsUrl = baseUrl.replace(/\./g, '\\.') + '/docs/components/';
  const linkPattern = new RegExp(`\\]\\(${docsUrl}([a-z0-9-]+)/?(#[^)\\s]*)?(\\s+"[^"]*")?\\)`, 'g');

  for (const file of listMarkdownFiles(refsDir)) {
    const before = fs.readFileSync(file, 'utf-8');
    const after = before.replace(linkPattern, (match, name, hash = '', title = '') => {
      const target = path.join(componentsDir, `${name}.md`);
      if (!fs.existsSync(target)) return match;
      const relative = path.relative(path.dirname(file), target).split(path.sep).join('/');
      return `](${relative}${hash}${title})`;
    });
    if (after !== before) fs.writeFileSync(file, after, 'utf-8');
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

  // Strip "Link to This Section" permalink anchors and their tooltips from headings
  main.querySelectorAll('a[id$="-permalink"], wa-tooltip[for$="-permalink"]').forEach(node => node.remove());

  // Strip the "Learn more about <topic>." helper paragraphs that follow API headings
  main.querySelectorAll('p').forEach(p => {
    if (/^Learn more about\b/.test(p.textContent.trim()) && p.querySelector('a[href*="/docs/usage/"]')) {
      p.remove();
    }
  });

  // Collapse each palette swatch grid to its token and tints
  main.querySelectorAll('.color-scale').forEach(scale => {
    const token = scale.querySelector('.color-token')?.textContent.trim();
    const tints = scale.querySelectorAll('.tint-label').map(label => label.textContent.trim());
    if (token && tints.length) scale.replaceWith(`<p><code>${token}</code> tints: ${tints.join(', ')}</p>`);
  });

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

  // Drop docs chrome that means nothing outside the site: breadcrumbs, "Next Steps" cards, feedback and
  // "ready to use" callouts, the interactive page anatomy, and buttons that open demos we don't ship.
  main
    .querySelectorAll('wa-breadcrumb.page-breadcrumbs, section.modern-card-list, #page-anatomy-demo')
    .forEach(el => el.remove());
  main.querySelectorAll('wa-callout').forEach(callout => {
    const text = callout.textContent;
    if (/Help make things more awesome|Web Awesome is ready to use/.test(text)) callout.remove();
  });
  main.querySelectorAll('p').forEach(p => {
    const text = p.textContent.trim();
    if (/^(Open demo in a new window|Open demos in a new tab|This image depicts)/.test(text)) p.remove();
  });

  const turndown = createTurndownService(baseUrl);

  // Generated tables are swapped in via placeholders and restored after Turndown, so their backticks,
  // brackets, pipes, and `<…>` text aren't escaped again or parsed as HTML. Each placeholder sits in its own
  // paragraph so Turndown keeps the table apart from the text around it.
  const tables = [];
  const placeholder = markdown => {
    tables.push(markdown);
    return `<p>{{TABLE${tables.length - 1}}}</p>`;
  };

  // Converts one scraped cell to inline markdown so every `<code>` survives and pipes can't split the row.
  const cellToMarkdown = td =>
    escapeCell(
      turndown
        .turndown(td.innerHTML)
        .replace(/```\w*\n([\s\S]*?)\n```/g, (_, code) => '`' + code.replace(/\s+/g, ' ') + '`')
        .replace(/\s+/g, ' ')
        .trim(),
    );

  // Map each component API table to its section heading, in document order, so CEM-backed tables
  // can be regenerated from the manifest instead of scraped (see renderComponentApiTable).
  const sectionByTable = new Map();
  if (component) {
    let currentHeading = '';
    main.querySelectorAll('h2, h3, table').forEach(node => {
      if (node.tagName !== 'TABLE') {
        currentHeading = node.textContent.trim();
      } else if (node.classList?.contains('component-table')) {
        sectionByTable.set(node, currentHeading);
      }
    });
  }

  main.querySelectorAll('table').forEach(table => {
    // Regenerate component API tables from the CEM (lossless) rather than scraping the HTML.
    if (sectionByTable.has(table)) {
      const cemTable = renderComponentApiTable(sectionByTable.get(table), component);
      if (cemTable !== null) {
        table.replaceWith(placeholder(cemTable));
        return;
      }
    }

    const headers = [];
    const headerCells = table.querySelectorAll('thead th');
    // Header text goes through the same escaping as cells.
    const headerText = th => cellToMarkdown(th);
    const columnsToSkip = new Set();

    // Collect headers and identify visual-only columns (Preview, CSS selector columns with no useful text)
    headerCells.forEach((th, index) => {
      // Skip "Preview" columns as they only contain visual elements
      if (th.textContent.trim() === 'Preview') {
        columnsToSkip.add(index);
      } else {
        headers.push(headerText(th));
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

        cells.push(cellToMarkdown(td));
      });

      if (cells.length > 0) {
        rows.push('| ' + cells.join(' | ') + ' |');
      }
    });

    table.replaceWith(placeholder(rows.join('\n')));
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
          sections.push(`<p><strong>${escapeHtml(tabLabel)}</strong></p>${panelContent}`);
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

  // Drop the "Need a hand?" help footer and its leading divider
  main.querySelectorAll('.component-help').forEach(el => {
    const divider = el.previousElementSibling;
    if (divider && divider.tagName === 'WA-DIVIDER') divider.remove();
    el.remove();
  });

  // Get the h1 title if present (we'll add it separately in the header)
  const h1 = main.querySelector('h1.title');
  const title = h1 ? h1.textContent.trim() : null;
  if (h1) h1.remove();

  let markdown = turndown.turndown(main.innerHTML);

  // Restore the generated tables
  markdown = markdown.replace(/\{\{TABLE(\d+)\}\}/g, (_, i) => tables[Number(i)]);

  // Remove server-side Nunjucks templates that aren't rendered in static build
  // These are templates meant for the production server (e.g., {% if session.isLoggedIn %})
  markdown = markdown.replace(/\{%-?\s*[\s\S]*?-?%\}/g, '').replace(/\{#[\s\S]*?#\}/g, '');

  // Clean up excessive blank lines
  markdown = markdown.replace(/\n{3,}/g, '\n\n').trim();

  // For component docs, move the examples below the API reference.
  if (component) {
    markdown = collapseImporting(moveExamplesToEnd(markdown));
  }

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
      summary: component.summary || frontmatter.description || '',
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
function generateSkillMd({ componentList, packageData, baseUrl, packageName = CORE_PACKAGE_NAME }) {
  // A core build names both packages. The copy that ships inside Pro names only Pro.
  const isCore = packageName === CORE_PACKAGE_NAME;
  const proPackages = isCore
    ? '`@web.awesome.me/webawesome-pro` or `@awesome.me/webawesome-pro`'
    : `\`${packageName}\``;
  const freeComponents = componentList.filter(c => !c.isProComponent);
  const proComponents = componentList.filter(c => c.isProComponent);

  // One line per component: the local reference and the first sentence of its summary
  const firstSentence = text => {
    const flat = String(text || '')
      .replace(/\s+/g, ' ')
      .trim();
    return flat.match(/^.*?[.!?](?=\s|$)/)?.[0] || flat || 'No description.';
  };
  const renderIndex = list => {
    const categories = {};
    for (const c of list) (categories[c.category] ||= []).push(c);
    return Object.keys(categories)
      .sort()
      .map(
        category =>
          `**${category}**\n\n` +
          categories[category]
            .map(c => `- [\`<${c.tagName}>\`](references/components/${c.name}.md): ${firstSentence(c.summary)}`)
            .join('\n'),
      )
      .join('\n\n');
  };

  const proSection = proComponents.length
    ? `
### Pro components

Use these only when the project depends on ${proPackages}, or the user says they have Pro.

${renderIndex(proComponents)}
`
    : '';

  return `---
name: webawesome
description: Component API reference for Web Awesome (wa-* custom elements such as wa-button, wa-input, wa-select, wa-dialog; ${isCore ? 'packages @awesome.me/webawesome, @web.awesome.me/webawesome-pro, and @awesome.me/webawesome-pro' : `package ${packageName}`}). Use when writing, fixing, or reviewing code that uses Web Awesome components, to pick the right component and get its attributes, slots, events, methods, CSS parts, and form behavior right, including in React, Vue, Angular, or Svelte, or when migrating from Shoelace. For page layout, theming, and visual design, use webawesome-design.
license: MIT / Commercial (for Web Awesome Pro)
metadata:
  author: Web Awesome
  version: "${packageData.version || '0.0.0'}"
  homepage: ${baseUrl}
  repository: https://github.com/shoelace-style/webawesome
compatibility: Works in modern browsers. Requires no build tools when using CDN. Works with bundlers like Webpack and Vite when installed via npm.
---

# Web Awesome

Web Awesome is a library of ${componentList.length} accessible web components (\`<wa-*>\` custom elements) that work in plain HTML
and in any framework. This skill is the component reference. For page layout, theming, and visual design, use the
\`webawesome-design\` skill if installed.

## Setup

\`\`\`bash
npm install @awesome.me/webawesome
\`\`\`

\`\`\`js
import '@awesome.me/webawesome/dist/styles/webawesome.css';
import '@awesome.me/webawesome/dist/components/button/button.js';
\`\`\`

Hosted projects and the autoloader load components on demand. For CDN, self-hosted, and autoloader setup, read
[installation.md](references/installation.md).

## Facts that break output when guessed

- **Read the component's reference before using an attribute, slot, event, or part.** Each one lists the valid names.
  Names that look right but aren't there are ignored without an error.
- **Form controls fire native \`input\` and \`change\` events**, with no prefix. Read the new value from the element
  (\`event.target.value\`, or \`checked\` on checkboxes and switches).
- **Component-specific events use a \`wa-\` prefix**, such as \`wa-show\`, \`wa-after-hide\`, and \`wa-clear\`.
- **Sizes are \`xs\`, \`s\`, \`m\` (default), \`l\`, and \`xl\`**, as in \`<wa-button size="s">\`. Code written before 3.6 may
  use long-form size names; switch them to the short form when you edit those lines.
- **Variants are \`neutral\`, \`brand\`, \`success\`, \`warning\`, and \`danger\`.** There is no \`primary\`.
- **Boolean attributes that add optional UI start with \`with-\`** (\`with-clear\`, \`with-caret\`), and ones that remove
  default UI start with \`without-\` (\`without-arrow\`). \`with-label\`, \`with-hint\`, \`with-start\`, and the like are
  SSR hints, not switches.
- **In HTML, close every tag**: \`<wa-input></wa-input>\`. HTML has no self-closing custom elements, so \`<wa-input />\`
  stays open and the markup after it ends up nested inside. JSX is fine either way.
- **Style the inside of a component with \`::part()\`** and its documented CSS custom properties. Shadow DOM blocks
  ordinary selectors.
- **In a Claude.ai artifact, load from jsDelivr.** Its Content Security Policy blocks \`ka-f.webawesome.com\`, so the
  page renders unstyled with no error, but it allows jsDelivr. Load \`styles/webawesome.css\` and
  \`webawesome.loader.js\` from
  \`https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@${packageData.version || '0.0.0'}/dist-cdn/\`, keep the loader's
  \`<script src>\` tag, and for icons add a second module script that imports \`setIconPath\` from that loader and
  calls \`setIconPath('https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@7/svgs')\`. Pro components, Pro
  themes, and Pro icon families aren't available this way. In other sandboxes, check which hosts are allowed first. See "Sandboxed Environments" in [installation.md](references/installation.md).

For attributes versus properties, slots, and events in depth, read [usage.md](references/usage.md).

## Components

Most mistakes are picking the wrong component (\`<wa-dropdown>\` is a menu of actions, \`<wa-select>\` picks a value),
not API misuse. When unsure, read [choosing-components.md](references/choosing-components.md), a decision tree by
user intent.

${renderIndex(freeComponents)}
${proSection || '\nPro components (' + proPackages + ') are listed in the copy of this skill that ships with Pro.\n'}
## Building full pages with \`<wa-page>\`

\`<wa-page>\` scaffolds an entire page (banner, header, navigation, main content, aside, footer) with sticky regions
and a responsive navigation drawer built in. The \`webawesome-design\` skill, if installed, has the full guide in its
\`layouts-page.md\`; the facts below are the ones that break pages when guessed.

### Main content goes in the default slot

Put primary content directly inside \`<wa-page>\` with no \`slot\` attribute.

\`\`\`html
<wa-page>
  <header slot="header">…</header>
  <nav slot="navigation">…</nav>
  <main>…</main>
  <footer slot="footer">…</footer>
</wa-page>
\`\`\`

Valid named slots: \`banner\`, \`header\`, \`subheader\`, \`navigation-header\`, \`navigation\`, \`navigation-footer\`,
\`navigation-toggle\`, \`navigation-toggle-icon\`, \`menu\`, \`main-header\`, \`main-footer\`, \`aside\`, \`skip-to-content\`,
\`footer\`. An element with any other slot name is not rendered, so the page can come out blank. \`menu\` replaces the
entire left region and opts out of the responsive drawer; use \`navigation\` for ordinary nav. \`<wa-page>\` adds no
semantic elements of its own, so slot in your own \`<header>\`, \`<nav>\`, \`<main>\`, and \`<footer>\`.

### Write the nav once, in \`slot="navigation"\`

The \`navigation\` slot renders in exactly one place at a time: as a left sidebar when \`view="desktop"\` and inside the
component's own \`<wa-drawer>\` when \`view="mobile"\`, opened by a hamburger button the component provides. One copy
serves both views. Don't duplicate the links into \`header\` (they show twice on desktop), don't add your own
\`<wa-drawer>\`, and don't write media queries for the nav.

Want nav links in the header bar on desktop with no sidebar (the marketing-site look)? Keep the links in \`header\`,
mirror them in \`slot="navigation"\` so the drawer has content, and hide each copy in the view where it doesn't belong:

\`\`\`css
wa-page[view='mobile'] .header-nav {
  display: none;
}
wa-page[view='desktop']::part(navigation) {
  display: none;
}
/* Leave --menu-width at its default (auto) so the hidden sidebar column collapses to nothing. */
\`\`\`

Put your own \`data-toggle-nav\` button inside the header so the hamburger sits in your bar; supplying one hides the
default button, and it is hidden automatically on desktop.

Never put a \`data-toggle-nav\` button on a page that has no \`navigation\` content: on mobile it still opens the
component's drawer, which is then empty and modal, covering the page.

### Reset the page and control the main padding

1. Zero \`<html>\` and \`<body>\` margin and padding, or you get gaps (native styles do this for you):
   \`html, body { min-height: 100%; padding: 0; margin: 0; }\`.

2. \`<wa-page>\` pads a \`<main>\` or \`<section>\` placed in the default slot (a \`<div>\` gets no padding). Keep it for a
   contained column such as a docs article or a form. For full-bleed heroes and color bands, zero it on the light-DOM
   element and let each section own its gutter: \`main { padding: 0; }\`.
   \`wa-page::part(main-content) { padding: 0 }\` does nothing here: the padding lives on your slotted element, not on
   the part.

3. If you set a fixed \`--menu-width\` for a desktop sidebar, reset it with \`wa-page[view='mobile'] { --menu-width: auto; }\`.
   The \`aside\` slot has no drawer, so hide it on mobile yourself.

### \`view\` is read-only, and the utility classes need a \`<wa-page>\`

The component sets \`view="mobile"\` or \`view="desktop"\` from \`mobile-breakpoint\` (default \`768px\`). Read it in CSS;
never set it. \`.wa-mobile-only\` and \`.wa-desktop-only\` work only inside a \`<wa-page>\` because they key off \`view\`.
Add \`data-drawer="close"\` to nav links so the drawer closes after a tap.

The full API is in [page.md](references/components/page.md).

## Forms

Form controls are form-associated custom elements: they submit with a native \`<form>\`, support \`required\`,
\`pattern\`, \`minlength\`, and \`maxlength\`, and take \`setCustomValidity()\` for custom messages. Style validation with
\`:state(user-invalid)\`, \`:state(user-valid)\`, \`:state(invalid)\`, and \`:state(required)\`. Read
[form-controls.md](references/form-controls.md) when building or validating a form.

## Icons

Font Awesome is the default icon library, so \`name\` takes Font Awesome icon names: \`<wa-icon name="house"></wa-icon>\`.
Give an icon that carries meaning a \`label\`; decorative icons need none. See [icon.md](references/components/icon.md).

## Other references

Read these when the task calls for them:

- [installation.md](references/installation.md): CDN, npm, self-hosted, and autoloader setup.
- [usage.md](references/usage.md): attributes vs. properties, slots, events, methods, editor setup.
- [form-controls.md](references/form-controls.md): submission, validation, the Constraint Validation API.
- [customizing.md](references/customizing.md): light and dark mode, theme CSS, parts, custom properties, states.
- [themes.md](references/themes.md): theme, palette, and brand classes for \`<html>\`, such as \`wa-theme-awesome\`.
- [localization.md](references/localization.md): \`lang\`, available translations, registering your own.
- [support.md](references/support.md): where to report bugs and ask questions.
- Frameworks: [react.md](references/frameworks/react.md) (React 19, and wrappers for 18 and below),
  [vue.md](references/frameworks/vue.md), [angular.md](references/frameworks/angular.md),
  [svelte.md](references/frameworks/svelte.md).
- CSS utilities, for layout and styling without custom CSS:
  - [layout.md](references/utilities/layout.md): \`wa-stack\`, \`wa-cluster\`, \`wa-grid\`, \`wa-split\`, \`wa-flank\`, \`wa-frame\`, gaps.
  - [text.md](references/utilities/text.md): type classes such as \`wa-heading-l\` and \`wa-body-s\`.
  - [color.md](references/utilities/color.md): variant color classes such as \`wa-brand\`.
  - [rounding.md](references/utilities/rounding.md): \`wa-border-radius-*\`.
  - [prose.md](references/utilities/prose.md): \`wa-prose\` for long-form content.
  - [native.md](references/utilities/native.md): styles for native HTML elements.
  - [visually-hidden.md](references/utilities/visually-hidden.md): screen-reader-only text.
  - [fouce.md](references/utilities/fouce.md): \`wa-cloak\`, hiding content until components load.
- Design tokens, for custom CSS that follows the theme:
  - [color.md](references/tokens/color.md): \`--wa-color-*\` surfaces, text, and semantic colors.
  - [space.md](references/tokens/space.md): \`--wa-space-*\`.
  - [typography.md](references/tokens/typography.md): \`--wa-font-*\`.
  - [borders.md](references/tokens/borders.md): \`--wa-border-*\`.
  - [shadows.md](references/tokens/shadows.md): \`--wa-shadow-*\`.
  - [focus.md](references/tokens/focus.md): \`--wa-focus-*\`.
  - [transitions.md](references/tokens/transitions.md): \`--wa-transition-*\`.
  - [component-groups.md](references/tokens/component-groups.md): tokens shared by form controls, buttons, panels.

Pro adds components, themes, and the theme builder (${baseUrl}/purchase). Questions and bugs:
https://github.com/shoelace-style/webawesome/discussions.
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

**Full documentation:** ${baseUrl}/support

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
 *
 * Prose and examples come from the scraped HTML, but the API tables (slots, attributes,
 * methods, events, CSS parts/properties/states) are regenerated in-place from the CEM via
 * `renderComponentApiTable` (passed through to `processHtmlToMarkdown`), because the scraped
 * tables are garbled by the HTML → Markdown conversion. `components` is the CEM component list.
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
      ...(isProComponent ? [`> This component requires [Web Awesome Pro](${baseUrl}/purchase).`, ''] : []),
      '',
    ].join('\n');

    fs.writeFileSync(path.join(componentsDestDir, `${componentName}.md`), addContentsLine(header + processed), 'utf-8');
  }
}

/**
 * Generates combined layout utilities documentation from rendered HTML.
 */
function generateLayoutUtilitiesDoc(siteDir, docsDir, destDir, baseUrl) {
  const layoutNames = [
    'stack',
    'cluster',
    'grid',
    'split',
    'flank',
    'frame',
    'gap',
    'align-items',
    'justify-content',
    'flex-wrap',
  ];

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

  // Copy hand-authored "Choosing the right component" reference — a decision tree by user intent
  // that helps agents pick the correct component instead of guessing from names. Source lives in
  // scripts/agent-skill/ alongside this generator; copied verbatim into the skill's references/.
  fs.copyFileSync(
    path.join(__dirname, 'agent-skill', 'choosing-components.md'),
    path.join(refsDir, 'choosing-components.md'),
  );

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
  copyAndProcessDoc(siteDir, docsDir, utilitiesDir, 'docs/utilities/prose/index.html', 'prose.md', baseUrl, {
    docPath: 'docs/utilities/prose',
    mdPath: 'docs/utilities/prose.md',
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

  localizeComponentLinks(refsDir, baseUrl);

  // Copy to additional directories
  for (const dest of copyTo) {
    copyDirSync(outdir, dest);
  }

  // The dist copy is the one users install skills from, so a Pro build imports from Pro there. The dist-cdn copy
  // feeds webawesome.com and keeps core.
  const packageName = getPackageName();
  if (packageName !== CORE_PACKAGE_NAME) {
    fs.writeFileSync(
      path.join(outdir, 'SKILL.md'),
      generateSkillMd({ componentList, packageData, baseUrl, packageName }),
      'utf-8',
    );
    retargetPackageFiles(listMarkdownFiles(outdir), packageName);
  }
}
