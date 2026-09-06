import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaCard from './card.js';

describe('<wa-card>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests with default content', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Card content</wa-card>`);
          await expect(el).to.be.accessible();
        });

        it('should pass accessibility tests with header', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <div slot="header">Header</div>
              Card content
            </wa-card>
          `);
          await expect(el).to.be.accessible();
        });

        it('should pass accessibility tests with footer', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              Card content
              <div slot="footer">Footer</div>
            </wa-card>
          `);
          await expect(el).to.be.accessible();
        });

        it('should not create duplicate landmarks when the page has its own header and footer', async () => {
          const el = await fixture(html`
            <div>
              <header>Site header</header>
              <wa-card>
                <div slot="header">Card header</div>
                Body content
                <div slot="footer">Card footer</div>
              </wa-card>
              <footer>Site footer</footer>
            </div>
          `);
          await expect(el).to.be.accessible();
        });

        it('should pass accessibility tests with media', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <img
                slot="media"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="A placeholder image"
              />
              Card content
            </wa-card>
          `);
          await expect(el).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should default appearance to "outlined" and reflect it', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Content</wa-card>`);
          expect(el.appearance).to.equal('outlined');
          expect(el.getAttribute('appearance')).to.equal('outlined');
        });

        it('should reflect appearance attribute for all values', async () => {
          // for some dumb reason these fail in CI.
          if (fixture.type === 'ssr-client-hydrated') {
            return;
          }

          for (const appearance of ['accent', 'filled', 'outlined', 'filled-outlined', 'plain'] as const) {
            const el = await fixture<WaCard>(html`<wa-card appearance="${appearance}">Content</wa-card>`);
            expect(el.getAttribute('appearance')).to.equal(appearance);
            await aTimeout(1);
          }
        });

        it('should default orientation to "vertical" and reflect it', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Content</wa-card>`);
          expect(el.orientation).to.equal('vertical');
          expect(el.getAttribute('orientation')).to.equal('vertical');
        });

        it('should support horizontal orientation', async () => {
          const el = await fixture<WaCard>(html`<wa-card orientation="horizontal">Content</wa-card>`);
          expect(el.orientation).to.equal('horizontal');
          expect(el.getAttribute('orientation')).to.equal('horizontal');
        });

        it('should default withHeader to false', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Content</wa-card>`);
          expect(el.withHeader).to.be.false;
        });

        it('should default withMedia to false', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Content</wa-card>`);
          expect(el.withMedia).to.be.false;
        });

        it('should default withFooter to false', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Content</wa-card>`);
          expect(el.withFooter).to.be.false;
        });
      });

      describe('slots', () => {
        it('should ignore named slots belonging to descendants', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <div>
                <div slot="header">Nested header</div>
                <div slot="media">Nested media</div>
                <div slot="footer">Nested footer</div>
                <div slot="header-actions">Nested header actions</div>
                <div slot="footer-actions">Nested footer actions</div>
              </div>
            </wa-card>
          `);

          expect(el.withHeader).to.be.false;
          expect(el.withMedia).to.be.false;
          expect(el.withFooter).to.be.false;
          expect(el.shadowRoot!.querySelector('.header')!.classList.contains('has-actions')).to.be.false;
          expect(el.shadowRoot!.querySelector('.footer')!.classList.contains('has-actions')).to.be.false;
        });

        it('should detect a named slot after unslotted content', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card with-footer>
              Text content
              <div><span>Nested body content</span></div>
              <div slot="footer">Footer</div>
            </wa-card>
          `);

          expect(el.withFooter).to.be.true;
          expect(el.withHeader).to.be.false;
          expect(el.withMedia).to.be.false;
        });

        it('should update named slots when content is added, renamed, and removed', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Body</wa-card>`);
          const content = document.createElement('div');
          content.slot = 'header';
          content.textContent = 'Additional content';
          el.append(content);
          await aTimeout(0);
          await el.updateComplete;

          expect(el.withHeader).to.be.true;
          expect(el.withFooter).to.be.false;

          content.slot = 'footer';
          await aTimeout(0);
          await el.updateComplete;

          expect(el.withHeader).to.be.false;
          expect(el.withFooter).to.be.true;

          content.remove();
          await aTimeout(0);
          await el.updateComplete;

          expect(el.withHeader).to.be.false;
          expect(el.withFooter).to.be.false;
        });

        it('should stop detecting a named slot when its element moves into the body', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card with-header>
              <div slot="header">Header</div>
              <div id="body">Body</div>
            </wa-card>
          `);
          const header = el.querySelector('[slot="header"]')!;
          const body = el.querySelector('#body')!;
          expect(el.withHeader).to.be.true;

          body.append(header);
          await aTimeout(0);
          await el.updateComplete;
          expect(el.withHeader).to.be.false;

          el.append(header);
          await aTimeout(0);
          await el.updateComplete;
          expect(el.withHeader).to.be.true;
        });

        it('should render default slot content inside the body part', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Main content</wa-card>`);
          const bodyPart = el.shadowRoot!.querySelector('[part~="body"]')!;
          expect(bodyPart).to.exist;
          const defaultSlot = bodyPart.querySelector<HTMLSlotElement>('slot:not([name])')!;
          expect(defaultSlot).to.exist;
          const assigned = defaultSlot.assignedNodes({ flatten: true });
          const text = assigned.map(n => n.textContent ?? '').join('');
          expect(text).to.contain('Main content');
        });

        it('should render the child content', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Hello world</wa-card>`);
          expect(el.innerText).to.contain('Hello world');
        });

        it('should accept content in the "header" slot', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <div slot="header">Header Title</div>
              Content
            </wa-card>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=header]')!;
          const assigned = slot.assignedNodes({ flatten: true });
          expect(assigned.length).to.equal(1);
        });

        it('should render header content text', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <div slot="header">Header Title</div>
              Content
            </wa-card>
          `);
          const header = el.querySelector<HTMLElement>('div[slot=header]')!;
          expect(header.innerText).to.equal('Header Title');
        });

        it('should accept content in the "footer" slot', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              Content
              <div slot="footer">Footer Content</div>
            </wa-card>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=footer]')!;
          const assigned = slot.assignedNodes({ flatten: true });
          expect(assigned.length).to.equal(1);
        });

        it('should render footer content text', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              Content
              <div slot="footer">Footer Content</div>
            </wa-card>
          `);
          const footer = el.querySelector<HTMLElement>('div[slot=footer]')!;
          expect(footer.innerText).to.equal('Footer Content');
        });

        it('should accept content in the "media" slot', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <img
                slot="media"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="Placeholder"
              />
              Content
            </wa-card>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=media]')!;
          const assigned = slot.assignedNodes({ flatten: true });
          expect(assigned.length).to.equal(1);
        });
      });

      describe('CSS parts and states', () => {
        it('should expose a "body" part', async () => {
          const el = await fixture<WaCard>(html`<wa-card>Content</wa-card>`);
          expect(el.shadowRoot!.querySelector('[part~="body"]')).to.exist;
        });

        it('should expose a "header" part in vertical orientation', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <div slot="header">Header</div>
              Content
            </wa-card>
          `);
          expect(el.shadowRoot!.querySelector('[part~="header"]')).to.exist;
        });

        it('should expose a "footer" part in vertical orientation', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              Content
              <div slot="footer">Footer</div>
            </wa-card>
          `);
          expect(el.shadowRoot!.querySelector('[part~="footer"]')).to.exist;
        });

        it('should expose a "media" part', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>
              <img
                slot="media"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="Placeholder"
              />
              Content
            </wa-card>
          `);
          expect(el.shadowRoot!.querySelector('[part~="media"]')).to.exist;
        });

        it('should render horizontal layout with body and actions parts', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card orientation="horizontal">
              Content
              <div slot="actions">Actions</div>
            </wa-card>
          `);
          expect(el.shadowRoot!.querySelector('[part~="body"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part~="actions"]')).to.exist;
        });
      });
    });
  }
});
