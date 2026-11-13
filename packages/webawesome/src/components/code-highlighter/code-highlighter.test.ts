import { aTimeout, expect, oneEvent, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
// Make sure this is `dist-cdn/` otherwise you will get an error.
import { registerCodeGrammar } from '../../../dist-cdn/webawesome.js';
import type WaCopyButton from '../copy-button/copy-button.js';
import type WaCodeHighlighter from './code-highlighter.js';

// Firefox 140+ and Safari 17.2+ support the Custom Highlight API. Range assertions are skipped without it.
const supportsHighlights = 'highlights' in CSS;

const getCode = (el: WaCodeHighlighter) => el.shadowRoot!.querySelector<HTMLElement>('[part~="code"]')!;
const getPre = (el: WaCodeHighlighter) => el.shadowRoot!.querySelector<HTMLElement>('[part~="pre"]')!;
const getCopyButton = (el: WaCodeHighlighter) => el.shadowRoot!.querySelector<WaCopyButton>('wa-copy-button');

/** Checks whether any registered highlight (or the named one) has a range inside the element's shadow root. */
function hasRanges(el: WaCodeHighlighter, category?: string) {
  let found = false;
  CSS.highlights.forEach((highlight, name) => {
    if (!name.startsWith('wa-') || (category && name !== `wa-${category}`)) return;
    highlight.forEach(range => {
      if ((range as Range).startContainer.getRootNode() === el.shadowRoot) found = true;
    });
  });
  return found;
}

describe('<wa-code-highlighter>', () => {
  before(async () => {
    // Lazy grammars load from the base path, which the test server serves from /dist
    const basePathElement = document.createElement('div');
    basePathElement.setAttribute('data-webawesome', '/dist');
    document.body.append(basePathElement);

    // The test runner loads components asynchronously, so wait before reading defaults
    await customElements.whenDefined('wa-code-highlighter');
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter></wa-code-highlighter>`);

          expect(el.code).to.equal('');
          expect(el.language).to.equal('');
          expect(el.label).to.equal('');
          expect(el.withoutCopy).to.be.false;
          expect(el.withoutDedent).to.be.false;
          expect(el.wrap).to.be.false;
        });

        it('should reflect the wrap attribute', async () => {
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter></wa-code-highlighter>`);

          el.wrap = true;
          await el.updateComplete;
          expect(el.hasAttribute('wrap')).to.be.true;

          el.wrap = false;
          await el.updateComplete;
          expect(el.hasAttribute('wrap')).to.be.false;
        });
      });

      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="js">const answer = 42;</wa-code-highlighter>`,
          );
          await expect(el).to.be.accessible();
        });

        it('should expose the code as a labeled region', async () => {
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter>npm i</wa-code-highlighter>`);
          const pre = getPre(el);

          expect(pre.getAttribute('role')).to.equal('region');
          expect(pre.getAttribute('aria-label')).to.equal('Code');

          el.label = 'Install command';
          await el.updateComplete;
          expect(pre.getAttribute('aria-label')).to.equal('Install command');
        });

        it('should only be focusable when the code overflows', async () => {
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter>short</wa-code-highlighter>`);
          expect(getPre(el).getAttribute('tabindex')).to.equal('-1');

          el.style.width = '80px';
          el.code = 'const aVeryLongVariableName = "that will definitely overflow an eighty pixel container";';
          await waitUntil(() => getPre(el).getAttribute('tabindex') === '0', undefined, { timeout: 2500 });
        });
      });

      describe('rendering', () => {
        it('should render slotted code inside the code part', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="js">const answer = 42;</wa-code-highlighter>`,
          );

          expect(getPre(el).tagName).to.equal('PRE');
          expect(getCode(el).tagName).to.equal('CODE');
          expect(getCode(el).textContent).to.equal('const answer = 42;');
        });

        it('should dedent slotted code and trim blank lines', async () => {
          // Interpolated so the meaningful whitespace survives formatting
          const text = `\n    function greet() {\n      return 'hello';\n    }\n  `;
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter>${text}</wa-code-highlighter>`);

          expect(getCode(el).textContent).to.equal(`function greet() {\n  return 'hello';\n}`);
        });

        it('should use pre semantics with without-dedent', async () => {
          const text = `\n    first line\n      second line\n  `;
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter without-dedent>${text}</wa-code-highlighter>`,
          );

          expect(getCode(el).textContent).to.equal(`    first line\n      second line\n  `);

          el.withoutDedent = false;
          await el.updateComplete;
          expect(getCode(el).textContent).to.equal(`first line\n  second line`);
        });

        it('should only ignore a single leading newline with without-dedent', async () => {
          const text = `\n\nafter a blank line`;
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter without-dedent>${text}</wa-code-highlighter>`,
          );

          expect(getCode(el).textContent).to.equal(`\nafter a blank line`);
        });

        it('should read code from a text/plain script without escaping', async () => {
          // Built imperatively because Lit templates can't contain script elements
          const el = document.createElement('wa-code-highlighter') as WaCodeHighlighter;
          const script = document.createElement('script');
          const warn = console.warn;
          let warnings = 0;

          console.warn = () => warnings++;
          script.type = 'text/plain';
          script.textContent = '\n    <p class="intro">Fish &amp; chips</p>\n  ';
          el.append(script);
          document.body.append(el);

          try {
            await el.updateComplete;
            expect(getCode(el).textContent).to.equal('<p class="intro">Fish &amp; chips</p>');
            expect(warnings).to.equal(0);
          } finally {
            console.warn = warn;
            el.remove();
          }
        });

        it('should update when slotted code changes', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="js">const before = true;</wa-code-highlighter>`,
          );

          el.textContent = 'const after = true;';
          await waitUntil(() => getCode(el).textContent === 'const after = true;');
        });
      });

      describe('code property', () => {
        it('should take precedence over slotted content', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>const slotted = true;</wa-code-highlighter>`,
          );
          expect(el.code).to.equal('');
          expect(getCode(el).textContent).to.equal('const slotted = true;');

          el.code = 'const property = true;';
          await el.updateComplete;
          expect(getCode(el).textContent).to.equal('const property = true;');
        });

        it('should fall back to slotted content when cleared', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>const slotted = true;</wa-code-highlighter>`,
          );

          el.code = 'const property = true;';
          await el.updateComplete;
          el.code = '';
          await el.updateComplete;
          expect(getCode(el).textContent).to.equal('const slotted = true;');
        });

        it('should render verbatim, without dedenting', async () => {
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter></wa-code-highlighter>`);

          el.code = '  indented\n';
          await el.updateComplete;
          expect(getCode(el).textContent).to.equal('  indented\n');
        });

        it('should work via attribute', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter code="let attr = 1;"></wa-code-highlighter>`,
          );

          expect(getCode(el).textContent).to.equal('let attr = 1;');
        });
      });

      describe('highlighting', () => {
        it('should highlight bundled languages', async () => {
          if (!supportsHighlights) return;
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="js">const answer = 42;</wa-code-highlighter>`,
          );

          await waitUntil(() => hasRanges(el, 'numeric'));
          expect(hasRanges(el, 'storage') || hasRanges(el, 'keyword')).to.be.true;
        });

        it('should highlight bundled languages before the next frame', async () => {
          if (!supportsHighlights) return;
          const el = document.createElement('wa-code-highlighter') as WaCodeHighlighter;
          el.language = 'html';
          el.textContent = '<p class="intro">Hi</p>';
          document.body.append(el);

          try {
            await new Promise(requestAnimationFrame);
            expect(hasRanges(el, 'tag')).to.be.true;
          } finally {
            el.remove();
          }
        });

        it('should not register ranges without a language', async () => {
          if (!supportsHighlights) return;
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>const answer = 42;</wa-code-highlighter>`,
          );

          expect(hasRanges(el)).to.be.false;
        });

        it('should re-highlight when the language changes', async () => {
          if (!supportsHighlights) return;
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>const answer = 42;</wa-code-highlighter>`,
          );

          el.language = 'js';
          await waitUntil(() => hasRanges(el));

          el.language = '';
          await waitUntil(() => !hasRanges(el));
        });

        it('should re-highlight when the code changes', async () => {
          if (!supportsHighlights) return;
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="js">plain</wa-code-highlighter>`,
          );
          expect(hasRanges(el, 'numeric')).to.be.false;

          el.code = 'const answer = 42;';
          await waitUntil(() => hasRanges(el, 'numeric'));
        });

        it('should keep the highlights of every instance', async () => {
          if (!supportsHighlights) return;
          const first = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="js">const first = 1;</wa-code-highlighter>`,
          );
          await waitUntil(() => hasRanges(first));

          const second = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="css">.second { color: red; }</wa-code-highlighter>`,
          );
          await waitUntil(() => hasRanges(second));
          expect(hasRanges(first)).to.be.true;
        });

        it('should remove ranges when disconnected', async () => {
          if (!supportsHighlights) return;
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="js">const answer = 42;</wa-code-highlighter>`,
          );
          await waitUntil(() => hasRanges(el));

          el.remove();
          expect(hasRanges(el)).to.be.false;
        });
      });

      describe('grammar loading', () => {
        it('should load other grammars from the base path and emit wa-load', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>SELECT * FROM cheeses;</wa-code-highlighter>`,
          );

          el.language = 'sql';
          await oneEvent(el, 'wa-load');

          expect(el.matches(':state(loading)')).to.be.false;
          expect(el.matches(':state(error)')).to.be.false;
          if (supportsHighlights) {
            expect(hasRanges(el)).to.be.true;
          }
        });

        it('should apply the loading state while a grammar loads', async () => {
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter>fn main() {}</wa-code-highlighter>`);

          el.language = 'rust';
          const loaded = oneEvent(el, 'wa-load');
          await el.updateComplete;
          await loaded;

          expect(el.matches(':state(loading)')).to.be.false;
          if (supportsHighlights) {
            expect(hasRanges(el)).to.be.true;
          }
        });

        it('should emit wa-error for unknown languages and keep the code as plain text', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>const answer = 42;</wa-code-highlighter>`,
          );

          el.language = 'not-a-real-language';
          await oneEvent(el, 'wa-error');

          expect(el.matches(':state(error)')).to.be.true;
          expect(el.matches(':state(loading)')).to.be.false;
          expect(getCode(el).textContent).to.equal('const answer = 42;');
        });

        it('should clear the error state when the language becomes valid', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>const answer = 42;</wa-code-highlighter>`,
          );

          el.language = 'also-not-a-language';
          await oneEvent(el, 'wa-error');

          el.language = 'js';
          await oneEvent(el, 'wa-load');
          expect(el.matches(':state(error)')).to.be.false;
        });

        it('should highlight languages added with registerCodeGrammar()', async () => {
          registerCodeGrammar('wa-test-lang', {
            scopeName: 'source.wa-test-lang',
            patterns: [{ match: '\\bsqueak\\b', name: 'keyword.control.wa-test-lang' }],
          });

          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter language="wa-test-lang">squeak squeak</wa-code-highlighter>`,
          );

          await waitUntil(() => !el.matches(':state(loading)'));
          expect(el.matches(':state(error)')).to.be.false;
          if (supportsHighlights) {
            expect(hasRanges(el, 'keyword')).to.be.true;
          }
        });

        it('should re-highlight elements in the error state when their grammar is registered', async () => {
          const language = `wa-late-lang-${fixture.type}`;
          const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter>nibble nibble</wa-code-highlighter>`);

          el.language = language;
          await oneEvent(el, 'wa-error');
          expect(el.matches(':state(error)')).to.be.true;

          const loaded = oneEvent(el, 'wa-load');
          registerCodeGrammar(language, {
            scopeName: `source.${language}`,
            patterns: [{ match: '\\bnibble\\b', name: 'keyword.control' }],
          });
          await loaded;

          expect(el.matches(':state(error)')).to.be.false;
          if (supportsHighlights) {
            expect(hasRanges(el, 'keyword')).to.be.true;
          }
        });

        it('should not emit the copy button icon events from the host', async () => {
          let hostLoads = 0;
          const handleLoad = (event: Event) => {
            if ((event.target as Element).localName === 'wa-code-highlighter') hostLoads++;
          };
          document.addEventListener('wa-load', handleLoad);

          try {
            const el = await fixture<WaCodeHighlighter>(html`<wa-code-highlighter>plain</wa-code-highlighter>`);
            const icon = getCopyButton(el)!.shadowRoot!.querySelector('wa-icon')!;
            await waitUntil(() => icon.shadowRoot?.querySelector('svg'), undefined, { timeout: 2500 });
            await aTimeout(50);
            expect(hostLoads).to.equal(0);
          } finally {
            document.removeEventListener('wa-load', handleLoad);
          }
        });
      });

      describe('copy button', () => {
        it('should copy the displayed code', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter>const slotted = true;</wa-code-highlighter>`,
          );
          expect(getCopyButton(el)!.value).to.equal('const slotted = true;');

          el.code = 'const property = true;';
          await el.updateComplete;
          expect(getCopyButton(el)!.value).to.equal('const property = true;');
        });

        it('should remove the copy button with without-copy', async () => {
          const el = await fixture<WaCodeHighlighter>(
            html`<wa-code-highlighter without-copy>const answer = 42;</wa-code-highlighter>`,
          );

          expect(getCopyButton(el)).to.not.exist;
        });
      });
    });
  }
});
