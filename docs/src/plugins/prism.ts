import { highlight } from '../utilities/prism.ts';
import { visit } from 'unist-util-visit';
import type { Transformer } from 'unified';
import type { Node } from './types.js';

const html = String.raw;

let count = 0;

export default function remarkCodeHighlighter(): Transformer {
  return tree => {
    visit(tree, 'code', (node: Node, index: number, parent: Node) => {
      let { lang } = node;

      if (!lang) {
        return;
      }

      lang = lang.split(':')[0];

      // We don't process JSX nodes.
      if (lang === 'jsx') {
        node.value = '';
        node.type = 'html';
        return;
      }

      const options = node.lang.split(':').slice(1);

      node.type = 'html';

      if (!options.includes('preview')) {
        // we still want to generate code blocks for non-previews, just...different html.
        generateCodeBlock(node);
        return;
      }

      let reactCode = '';

      // Need to look ahead at the next node and if its also code, check if it's React.
      if (parent.children?.length) {
        const nextNode = parent.children[index + 1];

        if (nextNode && nextNode.lang && nextNode.lang.split(':')[0] === 'jsx') {
          reactCode = nextNode.value;
        }
      }

      node.value = generatePreviewCodeBlock(node, reactCode);
    });
  };
}

function escapeHtml(str: string) {
  return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function copyButton(id: string) {
  return html`<wa-copy-button from="${id}" class="copy-code-button"></wa-copy-button>`;
}

function generateCodeBlock(node: Node) {
  let language = node.lang?.split(':')[0];

  if (!language) {
    language = 'plaintext';
  }

  node.value = html`<div class="code-preview">
    <pre><code id='code-block-${++count}' class="language-${language}">${highlight(language, node.value)}</code></pre>
    ${copyButton(`code-block-${count}`)}
  </div>`;
}

function generatePreviewCodeBlock(node: Node, reactCode: string) {
  const options = node.lang.split(':').slice(1);
  const sourceGroupId = `code-preview-source-group-${++count}`;

  // const lang = node.lang.split(":")[0]

  const isExpanded = options.includes('expanded');
  const noCodePen = options.includes('no-codepen');

  count++;

  const htmlButton = html`
    <button type="button" title="Show HTML code" class="code-preview__button code-preview__button--html">HTML</button>
  `;

  const reactButton = html`
    <button type="button" title="Show React code" class="code-preview__button code-preview__button--react">
      React
    </button>
  `;

  const codePenButton = html`
    <button type="button" class="code-preview__button code-preview__button--codepen" title="Edit on CodePen">
      <svg
        width="138"
        height="26"
        viewBox="0 0 138 26"
        fill="none"
        stroke="currentColor"
        stroke-width="2.3"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path
          d="M80 6h-9v14h9 M114 6h-9 v14h9 M111 13h-6 M77 13h-6 M122 20V6l11 14V6 M22 16.7L33 24l11-7.3V9.3L33 2L22 9.3V16.7z M44 16.7L33 9.3l-11 7.4 M22 9.3l11 7.3 l11-7.3 M33 2v7.3 M33 16.7V24 M88 14h6c2.2 0 4-1.8 4-4s-1.8-4-4-4h-6v14 M15 8c-1.3-1.3-3-2-5-2c-4 0-7 3-7 7s3 7 7 7 c2 0 3.7-0.8 5-2 M64 13c0 4-3 7-7 7h-5V6h5C61 6 64 9 64 13z"
        />
      </svg>
    </button>
  `;

  const codePreview = html`
    <div class="code-preview ${isExpanded ? 'code-preview--expanded' : ''}">
      <div class="code-preview__preview">
        ${node.value.replaceAll(/<script>/g, "<script type='module'>")}
        <div class="code-preview__resizer">
          <wa-icon name="grip-vertical" variant="solid"></wa-icon>
        </div>
      </div>

      <div class="code-preview__source-group" id="${sourceGroupId}">
        <div class="code-preview__source code-preview__source--html" data-flavor="html">
          <pre><code id='code-block-${++count}' class="source language-html">${highlight(
            'html',
            node.value
          )}</code></pre>
          ${copyButton(`code-block-${count}`)}
        </div>

        ${reactCode
          ? `<div class="code-preview__source code-preview__source--react" data-flavor="react">
                  <pre><code id='code-block-${++count}' class="source language-jsx">${highlight('jsx', reactCode)}</code></pre>
                  ${copyButton(`code-block-${count}`)}
                </div>`
          : ''}
      </div>

      <div class="code-preview__buttons">
        <button
          type="button"
          class="code-preview__button code-preview__toggle"
          aria-expanded="${isExpanded ? 'true' : 'false'}"
          aria-controls="${sourceGroupId}"
        >
          Source
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>

        ${htmlButton} ${reactCode ? reactButton : ''} ${noCodePen ? '' : codePenButton}
      </div>
    </div>
  `;

  return codePreview;
}
