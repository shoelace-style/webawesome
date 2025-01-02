import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaBreadcrumbItem from './breadcrumb-item.js';

describe('<wa-breadcrumb-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when not provided a href attribute', () => {
        it('should hide the separator from screen readers', async () => {
          const el = await fixture<WaBreadcrumbItem>(html` <wa-breadcrumb-item>Home</wa-breadcrumb-item> `);
          const separator = el.shadowRoot!.querySelector<HTMLSpanElement>('[part~="separator"]');
          expect(separator).attribute('aria-hidden', 'true');
        });

        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumbItem>(html` <wa-breadcrumb-item>Home</wa-breadcrumb-item> `);
          await expect(el).to.be.accessible(el);
        });

        it('should hide the separator from screen readers', async () => {
          const el = await fixture<WaBreadcrumbItem>(html` <wa-breadcrumb-item>Home</wa-breadcrumb-item> `);
          const separator = el.shadowRoot!.querySelector<HTMLSpanElement>('[part~="separator"]');
          expect(separator).attribute('aria-hidden', 'true');
        });

        it('should render a HTMLButtonElement as the part "label", with a set type "button"', async () => {
          const el = await fixture<WaBreadcrumbItem>(html` <wa-breadcrumb-item>Home</wa-breadcrumb-item> `);
          const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="label"]');
          expect(button).to.exist;
          expect(button).attribute('type', 'button');
        });
      });

      describe('when provided a href attribute', () => {
        describe('and no target', () => {
          it('should pass accessibility tests', async () => {
            const el = await fixture<WaBreadcrumbItem>(html`
              <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/">Home</wa-breadcrumb-item>
            `);
            await expect(el).to.be.accessible();
          });

          it('should render a HTMLAnchorElement as the part "label", with the supplied href value', async () => {
            const el = await fixture<WaBreadcrumbItem>(html`
              <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/">Home</wa-breadcrumb-item>
            `);

            const hyperlink = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
            expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
          });
        });

        describe('and target, without rel', () => {
          it('should pass accessibility tests', async () => {
            const el = await fixture<WaBreadcrumbItem>(html`
              <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank">Help</wa-breadcrumb-item>
            `);

            await expect(el).to.be.accessible();
          });

          describe('should render a HTMLAnchorElement as the part "label"', () => {
            it('should use the supplied href value, as the href attribute value', async () => {
              const el = await fixture<WaBreadcrumbItem>(html`
                <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank"
                  >Help</wa-breadcrumb-item
                >
              `);
              const hyperlink: HTMLAnchorElement | null =
                el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');

              expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
            });

            it('should default rel attribute to "noreferrer noopener"', async () => {
              const el = await fixture<WaBreadcrumbItem>(html`
                <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank"
                  >Help</wa-breadcrumb-item
                >
              `);
              const hyperlink: HTMLAnchorElement | null =
                el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
              expect(hyperlink).attribute('rel', 'noreferrer noopener');
            });
          });
        });

        describe('and target, with rel', () => {
          it('should pass accessibility tests', async () => {
            const el = await fixture<WaBreadcrumbItem>(html`
              <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank" rel="alternate"
                >Help</wa-breadcrumb-item
              >
            `);

            await expect(el).to.be.accessible();
          });

          describe('should render a HTMLAnchorElement', () => {
            it('should use the supplied href value, as the href attribute value', async () => {
              const el = await fixture<WaBreadcrumbItem>(html`
                <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank" rel="alternate"
                  >Help</wa-breadcrumb-item
                >
              `);
              const hyperlink: HTMLAnchorElement | null = el.shadowRoot!.querySelector<HTMLAnchorElement>('a');

              expect(hyperlink).attribute('href', 'https://jsonplaceholder.typicode.com/');
            });

            it('should use the supplied rel value, as the rel attribute value', async () => {
              const el = await fixture<WaBreadcrumbItem>(html`
                <wa-breadcrumb-item href="https://jsonplaceholder.typicode.com/" target="_blank" rel="alternate"
                  >Help</wa-breadcrumb-item
                >
              `);
              const hyperlink: HTMLAnchorElement | null = el.shadowRoot!.querySelector<HTMLAnchorElement>('a');
              expect(hyperlink).attribute('rel', 'alternate');
            });
          });
        });
      });

      describe('when provided an element in the slot "prefix" to support prefix icons', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="prefix-example" slot="prefix">/</span>
              Home
            </wa-breadcrumb-item>
          `);
          await expect(el).to.be.accessible();
        });

        it('should accept as an assigned child in the shadow root', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="prefix-example" slot="prefix">/</span>
              Home
            </wa-breadcrumb-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=prefix]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });
      });

      describe('when provided an element in the slot "suffix" to support suffix icons', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="prefix-example" slot="suffix">/</span>
              Security
            </wa-breadcrumb-item>
          `);
          await expect(el).to.be.accessible();
          // await aTimeout(1)
        });

        it('should accept as an assigned child in the shadow root', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="prefix-example" slot="suffix">/</span>
              Security
            </wa-breadcrumb-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=suffix]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });
      });

      describe('when rendering a wa-dropdown in the default slot', () => {
        it('should not render a link or button tag, but a div wrapper', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
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
          expect(el.shadowRoot!.querySelector('.label--dropdown')).not.to.be.null;
        });
      });
    });
  }
});
