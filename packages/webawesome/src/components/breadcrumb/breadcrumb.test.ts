import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaBreadcrumb from './breadcrumb.js';

// The default link color just misses AA contrast, but the next step up is way too dark. Maybe we can solve this in the
// future with a prefers-contrast media query.
const ignoredRules = ['color-contrast'];

describe('<wa-breadcrumb>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided a standard list of el-breadcrumb-item children and no parameters', () => {
        it('should render wa-icon as separator', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <wa-breadcrumb-item>Catalog</wa-breadcrumb-item>
              <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
              <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
              <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
            </wa-breadcrumb>
          `);

          expect(el.querySelectorAll('wa-icon').length).to.eq(4);
        });

        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <wa-breadcrumb-item>Catalog</wa-breadcrumb-item>
              <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
              <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
              <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
            </wa-breadcrumb>
          `);
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should attach aria-current "page" on the last breadcrumb item.', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <wa-breadcrumb-item>Catalog</wa-breadcrumb-item>
              <wa-breadcrumb-item>Clothing</wa-breadcrumb-item>
              <wa-breadcrumb-item>Women's</wa-breadcrumb-item>
              <wa-breadcrumb-item>Shirts &amp; Tops</wa-breadcrumb-item>
            </wa-breadcrumb>
          `);

          const breadcrumbItems = el.querySelectorAll('wa-breadcrumb-item');
          const lastNode = breadcrumbItems[3];
          expect(lastNode).attribute('aria-current', 'page');
        });
      });

      describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "separator" to support Custom Separators', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <span class="replacement-separator" slot="separator">/</span>
              <wa-breadcrumb-item>First</wa-breadcrumb-item>
              <wa-breadcrumb-item>Second</wa-breadcrumb-item>
              <wa-breadcrumb-item>Third</wa-breadcrumb-item>
            </wa-breadcrumb>
          `);
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should accept "separator" as an assigned child in the shadow root', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <span class="replacement-separator" slot="separator">/</span>
              <wa-breadcrumb-item>First</wa-breadcrumb-item>
              <wa-breadcrumb-item>Second</wa-breadcrumb-item>
              <wa-breadcrumb-item>Third</wa-breadcrumb-item>
            </wa-breadcrumb>
          `);

          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=separator]')!;
          const childNodes = slot.assignedNodes({ flatten: true });

          expect(childNodes.length).to.eq(1);
        });

        it('should replace the wa-icon separator with the provided separator', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <span class="replacement-separator" slot="separator">/</span>
              <wa-breadcrumb-item>First</wa-breadcrumb-item>
              <wa-breadcrumb-item>Second</wa-breadcrumb-item>
              <wa-breadcrumb-item>Third</wa-breadcrumb-item>
            </wa-breadcrumb>
          `);
          expect(el.querySelectorAll('.replacement-separator').length).to.eq(4);
          expect(el.querySelectorAll('wa-icon').length).to.eq(0);
        });
      });

      describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "start" to support start icons', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <wa-breadcrumb-item>
                <span class="start-example" slot="start">/</span>
                Home
              </wa-breadcrumb-item>
              <wa-breadcrumb-item>First</wa-breadcrumb-item>
              <wa-breadcrumb-item>Second</wa-breadcrumb-item>
              <wa-breadcrumb-item>Third</wa-breadcrumb-item>
            </wa-breadcrumb>
          `);
          await expect(el).to.be.accessible({ ignoredRules });
        });
      });

      describe('when provided a standard list of el-breadcrumb-item children and an element in the slot "end" to support end icons', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumb>(html`
            <wa-breadcrumb>
              <wa-breadcrumb-item>First</wa-breadcrumb-item>
              <wa-breadcrumb-item>Second</wa-breadcrumb-item>
              <wa-breadcrumb-item>Third</wa-breadcrumb-item>
              <wa-breadcrumb-item>
                <span class="end-example" slot="end">/</span>
                Security
              </wa-breadcrumb-item>
            </wa-breadcrumb>
          `);
          await expect(el).to.be.accessible({ ignoredRules });
        });
      });
    });
  }
});
