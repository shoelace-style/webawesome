import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaMarkdown from './markdown.js';

describe('<wa-markdown>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should have correct default property values', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>test</template></wa-markdown>
        `);
        expect(el.tabSize).to.equal(4);
      });

      it('should accept the tab-size attribute', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown tab-size="2"><template>test</template></wa-markdown>
        `);
        expect(el.tabSize).to.equal(2);
      });

      it('should render basic markdown', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>**bold**</template></wa-markdown>
        `);
        await aTimeout(50);
        const strong = el.querySelector('strong');
        expect(strong).to.not.be.null;
        expect(strong!.textContent).to.equal('bold');
      });

      it('should render headings', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template># Heading</template></wa-markdown>
        `);
        await aTimeout(50);
        expect(el.querySelector('h1')).to.not.be.null;
        expect(el.querySelector('h1')!.textContent).to.equal('Heading');
      });

      it('should render links', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>[link](https://example.com)</template></wa-markdown>
        `);
        await aTimeout(50);
        const anchor = el.querySelector('a');
        expect(anchor).to.not.be.null;
        expect(anchor!.getAttribute('href')).to.equal('https://example.com');
      });

      it('should render unordered lists', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown>
            <template>
              - one
              - two
              - three
            </template>
          </wa-markdown>
        `);
        await aTimeout(50);
        const items = el.querySelectorAll('li');
        expect(items.length).to.equal(3);
      });

      it('should preserve the template element after rendering', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>**bold**</template></wa-markdown>
        `);
        await aTimeout(50);
        expect(el.querySelector('template')).to.not.be.null;
        expect(el.querySelector('strong')).to.not.be.null;
      });

      it('should do nothing when no template is present', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown></wa-markdown>
        `);
        await aTimeout(50);
        expect(el.children.length).to.equal(0);
      });

      it('should handle an empty template', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template></template></wa-markdown>
        `);
        await aTimeout(50);
        // Only the template should be present, no rendered content
        expect(el.children.length).to.equal(1);
        expect(el.children[0].tagName).to.equal('TEMPLATE');
      });

      it('should dedent common indentation', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown>
            <template>
              # Hello
              World
            </template>
          </wa-markdown>
        `);
        await aTimeout(50);
        expect(el.querySelector('h1')).to.not.be.null;
        expect(el.querySelector('h1')!.textContent).to.equal('Hello');
      });

      it('should trim leading and trailing blank lines', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown>
            <template>

              **bold**

            </template>
          </wa-markdown>
        `);
        await aTimeout(50);
        expect(el.querySelector('strong')).to.not.be.null;
      });

      it('should handle content with no indentation', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>no indent</template></wa-markdown>
        `);
        await aTimeout(50);
        expect(el.querySelector('p')).to.not.be.null;
        expect(el.querySelector('p')!.textContent).to.equal('no indent');
      });

      it('should preserve relative indentation for code blocks', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown>
            <template>
              text

                  code block
            </template>
          </wa-markdown>
        `);
        await aTimeout(50);
        expect(el.querySelector('code')).to.not.be.null;
      });

      it('should expose the shared Marked instance via the marked property', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>test</template></wa-markdown>
        `);
        expect(el.marked).to.not.be.undefined;
        expect(el.marked.parse).to.be.a('function');
      });

      it('should return the same Marked instance from getMarked() and the marked property', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>test</template></wa-markdown>
        `);
        const Ctor = el.constructor as typeof WaMarkdown;
        expect(el.marked).to.equal(Ctor.getMarked());
      });

      it('should share the same Marked instance across multiple elements', async () => {
        const el1 = await fixture<WaMarkdown>(html`
          <wa-markdown><template>one</template></wa-markdown>
        `);
        const el2 = await fixture<WaMarkdown>(html`
          <wa-markdown><template>two</template></wa-markdown>
        `);
        expect(el1.marked).to.equal(el2.marked);
      });

      it('should re-render when renderMarkdown() is called after updating template content', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>**original**</template></wa-markdown>
        `);
        await aTimeout(50);
        expect(el.querySelector('strong')!.textContent).to.equal('original');

        const template = el.querySelector('template')!;
        template.innerHTML = '**updated**';
        el.renderMarkdown();
        await aTimeout(50);
        expect(el.querySelector('strong')!.textContent).to.equal('updated');
      });

      it('should preserve HTML entities like < and & in the markdown source', async () => {
        const el = await fixture<WaMarkdown>(html`
          <wa-markdown><template>Use &lt;div&gt; and &amp; in text</template></wa-markdown>
        `);
        await aTimeout(50);
        const text = el.querySelector('p')!.textContent!;
        expect(text).to.contain('<div>');
        expect(text).to.contain('&');
      });
    });
  }
});
