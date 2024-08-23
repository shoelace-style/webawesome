import { expect } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import { html } from 'lit';
import type WaCard from './card.js';

describe('<wa-card>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided no parameters', () => {
        it('should render the child content provided.', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>This is just a basic card. No image, no header, and no footer. Just your content.</wa-card>
          `);
          expect(el.innerText).to.eq(
            'This is just a basic card. No image, no header, and no footer. Just your content.'
          );
        });

        it('should pass accessibility tests', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>This is just a basic card. No image, no header, and no footer. Just your content.</wa-card>
          `);
          await expect(el).to.be.accessible();
        });

        it('should contain the class card.', async () => {
          const el = await fixture<WaCard>(html`
            <wa-card>This is just a basic card. No image, no header, and no footer. Just your content.</wa-card>
          `);
          const card = el.shadowRoot!.querySelector('.card')!;
          expect(card.classList.value.trim()).to.eq('card');
        });
      });

      describe('when provided an element in the slot "header" to render a header', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-header>
              <div slot="header">Header Title</div>
              This card has a header. You can put all sorts of things in it!
            </wa-card>`
          );
          await expect(el).to.be.accessible();
        });

        it('should render the child content provided.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-header>
              <div slot="header">Header Title</div>
              This card has a header. You can put all sorts of things in it!
            </wa-card>`
          );
          expect(el.innerText).to.contain('This card has a header. You can put all sorts of things in it!');
        });

        it('render the header content provided.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-header>
              <div slot="header">Header Title</div>
              This card has a header. You can put all sorts of things in it!
            </wa-card>`
          );
          const header = el.querySelector<HTMLElement>('div[slot=header]')!;
          expect(header.innerText).eq('Header Title');
        });

        it('accept "header" as an assigned child in the shadow root.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-header>
              <div slot="header">Header Title</div>
              This card has a header. You can put all sorts of things in it!
            </wa-card>`
          );
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=header]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });

        it('should contain the class card--has-header.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-header>
              <div slot="header">Header Title</div>
              This card has a header. You can put all sorts of things in it!
            </wa-card>`
          );
          const card = el.shadowRoot!.querySelector('.card')!;
          expect(card.classList.value.trim()).to.eq('card card--has-header');
        });
      });

      describe('when provided an element in the slot "footer" to render a footer', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-footer>
              This card has a footer. You can put all sorts of things in it!

              <div slot="footer">Footer Content</div>
            </wa-card>`
          );
          await expect(el).to.be.accessible();
        });

        it('should render the child content provided.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-footer>
              This card has a footer. You can put all sorts of things in it!

              <div slot="footer">Footer Content</div>
            </wa-card>`
          );
          expect(el.innerText).to.contain('This card has a footer. You can put all sorts of things in it!');
        });

        it('render the footer content provided.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-footer>
              This card has a footer. You can put all sorts of things in it!

              <div slot="footer">Footer Content</div>
            </wa-card>`
          );
          const footer = el.querySelector<HTMLElement>('div[slot=footer]')!;
          expect(footer.innerText).eq('Footer Content');
        });

        it('accept "footer" as an assigned child in the shadow root.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-footer>
              This card has a footer. You can put all sorts of things in it!

              <div slot="footer">Footer Content</div>
            </wa-card>`
          );
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=footer]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });

        it('should contain the class card--has-footer.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-footer>
              This card has a footer. You can put all sorts of things in it!

              <div slot="footer">Footer Content</div>
            </wa-card>`
          );

          const card = el.shadowRoot!.querySelector('.card')!;
          expect(card.classList.value.trim()).to.eq('card card--has-footer');
        });
      });

      describe('when provided an element in the slot "image" to render a image', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-image>
              <img
                slot="image"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="A kitten walks towards camera on top of pallet."
              />
              This is a kitten, but not just any kitten. This kitten likes walking along pallets.
            </wa-card>`
          );

          await expect(el).to.be.accessible();
        });

        it('should render the child content provided.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-image>
              <img
                slot="image"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="A kitten walks towards camera on top of pallet."
              />
              This is a kitten, but not just any kitten. This kitten likes walking along pallets.
            </wa-card>`
          );

          expect(el.innerText).to.contain(
            'This is a kitten, but not just any kitten. This kitten likes walking along pallets.'
          );
        });

        it('accept "image" as an assigned child in the shadow root.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-image>
              <img
                slot="image"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="A kitten walks towards camera on top of pallet."
              />
              This is a kitten, but not just any kitten. This kitten likes walking along pallets.
            </wa-card>`
          );
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=image]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });

        it('should contain the class card--has-image.', async () => {
          const el = await fixture<WaCard>(
            html`<wa-card with-image>
              <img
                slot="image"
                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                alt="A kitten walks towards camera on top of pallet."
              />
              This is a kitten, but not just any kitten. This kitten likes walking along pallets.
            </wa-card>`
          );

          const card = el.shadowRoot!.querySelector('.card')!;
          expect(card.classList.value.trim()).to.eq('card card--has-image');
        });
      });
    });
  }
});
