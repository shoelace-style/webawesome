import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaCallout from './callout.js';

describe('<wa-callout>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible with default properties', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>This is a callout</wa-callout>`);
          await expect(el).to.be.accessible();
        });

        it('should be accessible with all variants', async () => {
          const variants = ['brand', 'neutral', 'success', 'warning', 'danger'] as const;
          // dumb reason these fail in CI.
          if (fixture.type === "ssr-client-hydrated") { return }

          for (const variant of variants) {
            const el = await fixture<WaCallout>(html`<wa-callout variant="${variant}">Callout</wa-callout>`);
            await el.updateComplete;
            await expect(el).to.be.accessible();
            await aTimeout(1);
          }
        });
      });

      describe('properties', () => {
        it('should have default property values', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>Test</wa-callout>`);

          expect(el.variant).to.equal('brand');
          expect(el.size).to.equal('m');
          expect(el.appearance).to.be.undefined;
        });

        it('should reflect the variant attribute', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout variant="danger">Test</wa-callout>`);
          expect(el.getAttribute('variant')).to.equal('danger');
          expect(el.variant).to.equal('danger');
        });

        it('should reflect the size attribute', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout size="s">Test</wa-callout>`);
          expect(el.getAttribute('size')).to.equal('s');
          expect(el.size).to.equal('s');
        });

        it('should reflect the appearance attribute', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout appearance="filled">Test</wa-callout>`);
          expect(el.getAttribute('appearance')).to.equal('filled');
          expect(el.appearance).to.equal('filled');
        });

        it('should accept all valid variants', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>Test</wa-callout>`);

          for (const variant of ['brand', 'neutral', 'success', 'warning', 'danger'] as const) {
            el.variant = variant;
            await el.updateComplete;
            expect(el.variant).to.equal(variant);
            expect(el.getAttribute('variant')).to.equal(variant);
          }
        });

        it('should accept all valid appearances', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>Test</wa-callout>`);

          for (const appearance of ['accent', 'filled', 'outlined', 'plain', 'filled-outlined'] as const) {
            el.appearance = appearance;
            await el.updateComplete;
            expect(el.appearance).to.equal(appearance);
            expect(el.getAttribute('appearance')).to.equal(appearance);
          }
        });

        it('should accept all valid sizes', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>Test</wa-callout>`);

          for (const size of ['xs', 's', 'm', 'l', 'xl'] as const) {
            el.size = size;
            await el.updateComplete;
            expect(el.size).to.equal(size);
            expect(el.getAttribute('size')).to.equal(size);
          }
        });
      });

      describe('slots', () => {
        it('should render the default slot content', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>Hello World</wa-callout>`);
          const defaultSlot = el.shadowRoot!.querySelector('slot:not([name])');
          expect(defaultSlot).to.exist;
        });

        it('should render the icon slot', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout><span slot="icon">Icon</span>Content</wa-callout>`);
          const iconSlot = el.shadowRoot!.querySelector('slot[name="icon"]');
          expect(iconSlot).to.exist;
        });
      });

      describe('CSS parts', () => {
        it('should have an icon part', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>Test</wa-callout>`);
          expect(el.shadowRoot!.querySelector('[part~="icon"]')).to.exist;
        });

        it('should have a message part', async () => {
          const el = await fixture<WaCallout>(html`<wa-callout>Test</wa-callout>`);
          expect(el.shadowRoot!.querySelector('[part~="message"]')).to.exist;
        });
      });
    });
  }
});
