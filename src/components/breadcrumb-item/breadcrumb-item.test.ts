import { expect, fixture, html } from '@open-wc/testing';
import type WaBreadcrumbItem from './breadcrumb-item.js';

describe('<wa-breadcrumb-item>', () => {
  let el: WaBreadcrumbItem;

  describe('when not provided a href attribute', () => {
    before(async () => {
      el = await fixture<WaBreadcrumbItem>(html` <wa-breadcrumb-item>Home</wa-breadcrumb-item> `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should hide the separator from screen readers', () => {
      const separator = el.shadowRoot!.querySelector<HTMLSpanElement>('[part~="separator"]');
      expect(separator).attribute('aria-hidden', 'true');
    });

    it('should render a HTMLButtonElement as the part "label", with a set type "button"', () => {
      const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="label"]');
      expect(button).to.exist;
      expect(button).attribute('type', 'button');
    });
  });

  describe('when provided a href attribute', () => {
    describe('and no target', () => {
      before(async () => {
        el = await fixture<WaBreadcrumbItem>(html`
          <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/">Home</wa-breadcrumb-item>
        `);
      });

      it('should pass accessibility tests', async () => {
        await expect(el).to.be.accessible();
      });

      it('should render a HTMLAnchorElement as the part "label", with the supplied href value', () => {
        const hyperlink = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
        expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
      });
    });

    describe('and target, without rel', () => {
      before(async () => {
        el = await fixture<WaBreadcrumbItem>(html`
          <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank">Help</wa-breadcrumb-item>
        `);
      });

      it('should pass accessibility tests', async () => {
        await expect(el).to.be.accessible();
      });

      describe('should render a HTMLAnchorElement as the part "label"', () => {
        let hyperlink: HTMLAnchorElement | null;

        before(() => {
          hyperlink = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
        });

        it('should use the supplied href value, as the href attribute value', () => {
          expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
        });

        it('should default rel attribute to "noreferrer noopener"', () => {
          expect(hyperlink).attribute('rel', 'noreferrer noopener');
        });
      });
    });

    describe('and target, with rel', () => {
      before(async () => {
        el = await fixture<WaBreadcrumbItem>(html`
          <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank" rel="alternate"
            >Help</wa-breadcrumb-item
          >
        `);
      });

      it('should pass accessibility tests', async () => {
        await expect(el).to.be.accessible();
      });

      describe('should render a HTMLAnchorElement', () => {
        let hyperlink: HTMLAnchorElement | null;

        before(() => {
          hyperlink = el.shadowRoot!.querySelector<HTMLAnchorElement>('a');
        });

        it('should use the supplied href value, as the href attribute value', () => {
          expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
        });

        it('should use the supplied rel value, as the rel attribute value', () => {
          expect(hyperlink).attribute('rel', 'alternate');
        });
      });
    });
  });

  describe('when provided an element in the slot "prefix" to support prefix icons', () => {
    before(async () => {
      el = await fixture<WaBreadcrumbItem>(html`
        <wa-breadcrumb-item>
          <span class="prefix-example" slot="prefix">/</span>
          Home
        </wa-breadcrumb-item>
      `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', () => {
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=prefix]')!;
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });
  });

  describe('when provided an element in the slot "suffix" to support suffix icons', () => {
    before(async () => {
      el = await fixture<WaBreadcrumbItem>(html`
        <wa-breadcrumb-item>
          <span class="prefix-example" slot="suffix">/</span>
          Security
        </wa-breadcrumb-item>
      `);
    });

    it('should pass accessibility tests', async () => {
      await expect(el).to.be.accessible();
    });

    it('should accept as an assigned child in the shadow root', () => {
      const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=suffix]')!;
      const childNodes = slot.assignedNodes({ flatten: true });

      expect(childNodes.length).to.eq(1);
    });
  });

  describe('when rendering a wa-dropdown in the default slot', () => {
    it('should not render a link or button tag, but a div wrapper', async () => {
      el = await fixture<WaBreadcrumbItem>(html`
        <wa-breadcrumb-item>
          <wa-dropdown>
            <wa-button slot="trigger" size="small" circle>
              <wa-icon label="More options" name="ellipsis"></wa-icon>
            </wa-button>
            <wa-menu>
              <wa-menu-item type="checkbox" checked>Web Design</wa-menu-item>
              <wa-menu-item type="checkbox">Web Development</wa-menu-item>
              <wa-menu-item type="checkbox">Marketing</wa-menu-item>
            </wa-menu>
          </wa-dropdown>
        </wa-breadcrumb-item>
      `);

      await expect(el).to.be.accessible();
      expect(el.shadowRoot!.querySelector('a')).to.be.null;
      expect(el.shadowRoot!.querySelector('button')).to.be.null;
      expect(el.shadowRoot!.querySelector('.breadcrumb-item__label--dropdown')).not.to.be.null;
    });
  });
});
