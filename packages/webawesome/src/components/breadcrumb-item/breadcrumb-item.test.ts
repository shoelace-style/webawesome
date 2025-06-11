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

      describe('when provided an element in the slot "start" to support start icons', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="start-example" slot="start">/</span>
              Home
            </wa-breadcrumb-item>
          `);
          await expect(el).to.be.accessible();
        });

        it('should accept as an assigned child in the shadow root', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="start-example" slot="start">/</span>
              Home
            </wa-breadcrumb-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=start]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });
      });

      describe('when provided an element in the slot "end" to support end icons', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="end-example" slot="end">/</span>
              Security
            </wa-breadcrumb-item>
          `);
          await expect(el).to.be.accessible();
          // await aTimeout(1)
        });

        it('should accept as an assigned child in the shadow root', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span class="end-example" slot="end">/</span>
              Security
            </wa-breadcrumb-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=end]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });
      });
    });
  }
});
