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

describe('<wa-markdown>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should have correct default property values', async () => {
        const el = await fixture<WaMarkdown>(html` <wa-markdown></wa-markdown> `);
        expect(el.tabSize).to.equal(4);
      });

      it('should accept the tab-size attribute', async () => {
        const el = await fixture<WaMarkdown>(html` <wa-markdown tab-size="2"></wa-markdown> `);
        expect(el.tabSize).to.equal(2);
      });

      it('should render basic markdown', async () => {
        const el = createMarkdownElement('**bold**');
        document.body.appendChild(el);
        await aTimeout(50);
        const strong = el.querySelector('strong');
        expect(strong).to.not.be.null;
        expect(strong!.textContent).to.equal('bold');
        el.remove();
      });

      it('should render headings', async () => {
        const el = createMarkdownElement('# Heading');
        document.body.appendChild(el);
        await aTimeout(50);
        expect(el.querySelector('h1')).to.not.be.null;
        expect(el.querySelector('h1')!.textContent).to.equal('Heading');
        el.remove();
      });

      it('should render links', async () => {
        const el = createMarkdownElement('[link](https://example.com)');
        document.body.appendChild(el);
        await aTimeout(50);
        const anchor = el.querySelector('a');
        expect(anchor).to.not.be.null;
        expect(anchor!.getAttribute('href')).to.equal('https://example.com');
        el.remove();
      });

      it('should render autolinks with angle brackets', async () => {
        const el = createMarkdownElement('<https://example.com>');
        document.body.appendChild(el);
        await aTimeout(50);
        const anchor = el.querySelector('a');
        expect(anchor).to.not.be.null;
        expect(anchor!.getAttribute('href')).to.equal('https://example.com');
        el.remove();
      });

      it('should render unordered lists', async () => {
        const el = createMarkdownElement('- one\n- two\n- three');
        document.body.appendChild(el);
        await aTimeout(50);
        const items = el.querySelectorAll('li');
        expect(items.length).to.equal(3);
        el.remove();
      });

      it('should preserve the script element after rendering', async () => {
        const el = createMarkdownElement('**bold**');
        document.body.appendChild(el);
        await aTimeout(50);
        expect(el.querySelector('script[type="text/markdown"]')).to.not.be.null;
        expect(el.querySelector('strong')).to.not.be.null;
        el.remove();
      });

      it('should do nothing when no script is present', async () => {
        const el = await fixture<WaMarkdown>(html` <wa-markdown></wa-markdown> `);
        await aTimeout(50);
        expect(el.children.length).to.equal(0);
      });

      it('should handle an empty script', async () => {
        const el = createMarkdownElement('');
        document.body.appendChild(el);
        await aTimeout(50);
        // Only the script should be present, no rendered content
        expect(el.children.length).to.equal(1);
        expect(el.children[0].tagName).to.equal('SCRIPT');
        el.remove();
      });

      it('should dedent common indentation', async () => {
        const el = createMarkdownElement('    # Hello\n    World');
        document.body.appendChild(el);
        await aTimeout(50);
        expect(el.querySelector('h1')).to.not.be.null;
        expect(el.querySelector('h1')!.textContent).to.equal('Hello');
        el.remove();
      });

      it('should trim leading and trailing blank lines', async () => {
        const el = createMarkdownElement('\n\n**bold**\n\n');
        document.body.appendChild(el);
        await aTimeout(50);
        expect(el.querySelector('strong')).to.not.be.null;
        el.remove();
      });

      it('should handle content with no indentation', async () => {
        const el = createMarkdownElement('no indent');
        document.body.appendChild(el);
        await aTimeout(50);
        expect(el.querySelector('p')).to.not.be.null;
        expect(el.querySelector('p')!.textContent).to.equal('no indent');
        el.remove();
      });

      it('should preserve relative indentation for code blocks', async () => {
        const el = createMarkdownElement('text\n\n    code block');
        document.body.appendChild(el);
        await aTimeout(50);
        expect(el.querySelector('code')).to.not.be.null;
        el.remove();
      });

      it('should preserve angle brackets and ampersands in the source', async () => {
        const el = createMarkdownElement('Use <div> and & in text');
        document.body.appendChild(el);
        await aTimeout(50);
        const text = el.textContent!;
        expect(text).to.contain('<div>');
        expect(text).to.contain('&');
        el.remove();
      });

      it('should expose the shared Marked instance via the marked property', async () => {
        const el = await fixture<WaMarkdown>(html` <wa-markdown></wa-markdown> `);
        expect(el.marked).to.not.be.undefined;
        expect(el.marked.parse).to.be.a('function');
      });

      it('should return the same Marked instance from getMarked() and the marked property', async () => {
        const el = await fixture<WaMarkdown>(html` <wa-markdown></wa-markdown> `);
        const Ctor = el.constructor as typeof WaMarkdown;
        expect(el.marked).to.equal(Ctor.getMarked());
      });

      it('should share the same Marked instance across multiple elements', async () => {
        const el1 = await fixture<WaMarkdown>(html` <wa-markdown></wa-markdown> `);
        const el2 = await fixture<WaMarkdown>(html` <wa-markdown></wa-markdown> `);
        expect(el1.marked).to.equal(el2.marked);
      });

      it('should re-render when renderMarkdown() is called after updating script content', async () => {
        const el = createMarkdownElement('**original**');
        document.body.appendChild(el);
        await aTimeout(50);
        expect(el.querySelector('strong')!.textContent).to.equal('original');

        const script = el.querySelector('script[type="text/markdown"]')!;
        script.textContent = '**updated**';
        el.renderMarkdown();
        await aTimeout(50);
        expect(el.querySelector('strong')!.textContent).to.equal('updated');
        el.remove();
      });
    });
  }
});
