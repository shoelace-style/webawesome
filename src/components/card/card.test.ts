import '../../../dist/webawesome.js';
import { expect, fixture, html } from '@open-wc/testing';
import type WaCard from './card.js';

describe('<wa-card>', () => {
  let el: WaCard;

  describe('when provided no parameters', () => {
    before(async () => {
      el = await fixture<WaCard>(
        html` <wa-card>This is just a basic card. No image, no header, and no footer. Just your content.</wa-card> `
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', () => {
      expect(el.innerText).to.eq('This is just a basic card. No image, no header, and no footer. Just your content.');
    });

    it('should contain the class card.', () => {
      const card = el.shadowRoot!.querySelector('.card')!;
      expect(card.classList.value.trim()).to.eq('card');
    });
  });

  describe('when provided an element in the slot "header" to render a header', () => {
    before(async () => {
      el = await fixture<WaCard>(
        html`<wa-card>
          <div slot="header">Header Title</div>
          This card has a header. You can put all sorts of things in it!
        </wa-card>`
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', () => {
      expect(el.innerText).to.contain('This card has a header. You can put all sorts of things in it!');
    });

    it('render the header content provided.', () => {
      const header = el.querySelector<HTMLElement>('div[slot=header]')!;
      expect(header.innerText).eq('Header Title');
    });

    it('accept "header" as an assigned child in the shadow root.', () => {
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=header]')!;
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should contain the class card--has-header.', () => {
      const card = el.shadowRoot!.querySelector('.card')!;
      expect(card.classList.value.trim()).to.eq('card card--has-header');
    });
  });

  describe('when provided an element in the slot "footer" to render a footer', () => {
    before(async () => {
      el = await fixture<WaCard>(
        html`<wa-card>
          This card has a footer. You can put all sorts of things in it!

          <div slot="footer">Footer Content</div>
        </wa-card>`
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', () => {
      expect(el.innerText).to.contain('This card has a footer. You can put all sorts of things in it!');
    });

    it('render the footer content provided.', () => {
      const footer = el.querySelector<HTMLElement>('div[slot=footer]')!;
      expect(footer.innerText).eq('Footer Content');
    });

    it('accept "footer" as an assigned child in the shadow root.', () => {
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=footer]')!;
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should contain the class card--has-footer.', () => {
      const card = el.shadowRoot!.querySelector('.card')!;
      expect(card.classList.value.trim()).to.eq('card card--has-footer');
    });
  });

  describe('when provided an element in the slot "image" to render a image', () => {
    before(async () => {
      el = await fixture<WaCard>(
        html`<wa-card>
          <img
            slot="image"
            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
            alt="A kitten walks towards camera on top of pallet."
          />
          This is a kitten, but not just any kitten. This kitten likes walking along pallets.
        </wa-card>`
      );
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should render the child content provided.', () => {
      expect(el.innerText).to.contain(
        'This is a kitten, but not just any kitten. This kitten likes walking along pallets.'
      );
    });

    it('accept "image" as an assigned child in the shadow root.', () => {
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=image]')!;
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });

    it('should contain the class card--has-image.', () => {
      const card = el.shadowRoot!.querySelector('.card')!;
      expect(card.classList.value.trim()).to.eq('card card--has-image');
    });
  });
});
