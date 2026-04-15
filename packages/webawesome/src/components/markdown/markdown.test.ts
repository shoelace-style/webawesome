import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaMarkdown from './markdown.js';

/**
 * Creates a `<wa-markdown>` element with a `<script type="text/markdown">` child containing the given markdown source.
 * We build this imperatively because Lit's html`` tag doesn't allow `<script>` elements inside templates.
 */
function createMarkdownElement(markdown: string, attrs: Record<string, string> = {}): WaMarkdown {
  const el = document.createElement('wa-markdown') as WaMarkdown;
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  const script = document.createElement('script');
  script.setAttribute('type', 'text/markdown');
  script.textContent = markdown;
  el.appendChild(script);
  return el;
}

/**
 * Appends a markdown element to the DOM, waits for rendering, and returns it.
 * The caller must call el.remove() when done.
 */
async function renderMarkdown(markdown: string, attrs: Record<string, string> = {}): Promise<WaMarkdown> {
  const el = createMarkdownElement(markdown, attrs);
  document.body.appendChild(el);
  await aTimeout(50);
  return el;
}

describe('<wa-markdown>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaMarkdown>(html`<wa-markdown></wa-markdown>`);
          expect(el.tabSize).to.equal(4);
        });

        it('should accept the tab-size attribute', async () => {
          const el = await fixture<WaMarkdown>(html`<wa-markdown tab-size="2"></wa-markdown>`);
          expect(el.tabSize).to.equal(2);
        });

        it('should expose the shared Marked instance via the marked property', async () => {
          const el = await fixture<WaMarkdown>(html`<wa-markdown></wa-markdown>`);
          expect(el.marked).to.not.be.undefined;
          expect(el.marked.parse).to.be.a('function');
        });

        it('should return the same Marked instance from getMarked() and the marked property', async () => {
          const el = await fixture<WaMarkdown>(html`<wa-markdown></wa-markdown>`);
          const Ctor = el.constructor as typeof WaMarkdown;
          expect(el.marked).to.equal(Ctor.getMarked());
        });

        it('should share the same Marked instance across multiple elements', async () => {
          const el1 = await fixture<WaMarkdown>(html`<wa-markdown></wa-markdown>`);
          const el2 = await fixture<WaMarkdown>(html`<wa-markdown></wa-markdown>`);
          expect(el1.marked).to.equal(el2.marked);
        });
      });

      describe('rendering', () => {
        it('should render bold text', async () => {
          const el = await renderMarkdown('**bold**');
          try {
            const strong = el.querySelector('strong');
            expect(strong).to.not.be.null;
            expect(strong!.textContent).to.equal('bold');
          } finally {
            el.remove();
          }
        });

        it('should render headings', async () => {
          const el = await renderMarkdown('# Heading');
          try {
            const h1 = el.querySelector('h1');
            expect(h1).to.not.be.null;
            expect(h1!.textContent).to.equal('Heading');
          } finally {
            el.remove();
          }
        });

        it('should render links', async () => {
          const el = await renderMarkdown('[link](https://example.com)');
          try {
            const anchor = el.querySelector('a');
            expect(anchor).to.not.be.null;
            expect(anchor!.getAttribute('href')).to.equal('https://example.com');
          } finally {
            el.remove();
          }
        });

        it('should render unordered lists', async () => {
          const el = await renderMarkdown('- one\n- two\n- three');
          try {
            const items = el.querySelectorAll('li');
            expect(items.length).to.equal(3);
          } finally {
            el.remove();
          }
        });

        it('should render autolinks with angle brackets', async () => {
          const el = await renderMarkdown('<https://example.com>');
          try {
            const anchor = el.querySelector('a');
            expect(anchor).to.not.be.null;
            expect(anchor!.getAttribute('href')).to.equal('https://example.com');
          } finally {
            el.remove();
          }
        });

        it('should preserve the script element after rendering', async () => {
          const el = await renderMarkdown('**bold**');
          try {
            expect(el.querySelector('script[type="text/markdown"]')).to.not.be.null;
            expect(el.querySelector('strong')).to.not.be.null;
          } finally {
            el.remove();
          }
        });

        it('should preserve relative indentation for code blocks', async () => {
          const el = await renderMarkdown('text\n\n    code block');
          try {
            expect(el.querySelector('code')).to.not.be.null;
          } finally {
            el.remove();
          }
        });

        it('should preserve angle brackets and ampersands in the source', async () => {
          const el = await renderMarkdown('Use <div> and & in text');
          try {
            const text = el.textContent!;
            expect(text).to.contain('<div>');
            expect(text).to.contain('&');
          } finally {
            el.remove();
          }
        });
      });

      describe('whitespace normalization', () => {
        it('should dedent common indentation', async () => {
          const el = await renderMarkdown('    # Hello\n    World');
          try {
            expect(el.querySelector('h1')).to.not.be.null;
            expect(el.querySelector('h1')!.textContent).to.equal('Hello');
          } finally {
            el.remove();
          }
        });

        it('should trim leading and trailing blank lines', async () => {
          const el = await renderMarkdown('\n\n**bold**\n\n');
          try {
            expect(el.querySelector('strong')).to.not.be.null;
          } finally {
            el.remove();
          }
        });

        it('should handle content with no indentation', async () => {
          const el = await renderMarkdown('no indent');
          try {
            const p = el.querySelector('p');
            expect(p).to.not.be.null;
            expect(p!.textContent).to.equal('no indent');
          } finally {
            el.remove();
          }
        });
      });

      describe('edge cases', () => {
        it('should do nothing when no script is present', async () => {
          const el = await fixture<WaMarkdown>(html`<wa-markdown></wa-markdown>`);
          await aTimeout(50);
          expect(el.children.length).to.equal(0);
        });

        it('should handle an empty script', async () => {
          const el = await renderMarkdown('');
          try {
            expect(el.children.length).to.equal(1);
            expect(el.children[0].tagName).to.equal('SCRIPT');
          } finally {
            el.remove();
          }
        });

        it('should re-render when renderMarkdown() is called after updating script content', async () => {
          const el = await renderMarkdown('**original**');
          try {
            expect(el.querySelector('strong')!.textContent).to.equal('original');

            const script = el.querySelector('script[type="text/markdown"]')!;
            script.textContent = '**updated**';
            el.renderMarkdown();
            await aTimeout(50);
            expect(el.querySelector('strong')!.textContent).to.equal('updated');
          } finally {
            el.remove();
          }
        });
      });
    });
  }
});
