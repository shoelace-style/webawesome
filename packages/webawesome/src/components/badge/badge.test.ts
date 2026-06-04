import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaBadge from './badge.js';

const ignoredRules = ['color-contrast'];

describe('<wa-badge>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should have role="status" on the base part', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          const base = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base.getAttribute('role')).to.equal('status');
        });
      });

      describe('properties', () => {
        it('should default variant to "brand"', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.variant).to.equal('brand');
          expect(el.getAttribute('variant')).to.equal('brand');
        });

        it('should default appearance to "accent"', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.appearance).to.equal('accent');
          expect(el.getAttribute('appearance')).to.equal('accent');
        });

        it('should default pill to false', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.pill).to.equal(false);
          expect(el.hasAttribute('pill')).to.be.false;
        });

        it('should default attention to "none"', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.attention).to.equal('none');
        });

        it('should reflect pill attribute when set', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge pill>Badge</wa-badge>`);
          expect(el.pill).to.equal(true);
          expect(el.hasAttribute('pill')).to.be.true;
        });

        it('should reflect variant attribute', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge variant="danger">Badge</wa-badge>`);
          expect(el.variant).to.equal('danger');
          expect(el.getAttribute('variant')).to.equal('danger');
        });

        it('should reflect appearance attribute', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge appearance="filled">Badge</wa-badge>`);
          expect(el.appearance).to.equal('filled');
          expect(el.getAttribute('appearance')).to.equal('filled');
        });

        it('should reflect attention attribute', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge attention="pulse">Badge</wa-badge>`);
          expect(el.attention).to.equal('pulse');
          expect(el.getAttribute('attention')).to.equal('pulse');
        });

        for (const variant of ['brand', 'neutral', 'success', 'warning', 'danger'] as const) {
          it(`should accept variant="${variant}"`, async () => {
            const el = await fixture<WaBadge>(html`<wa-badge variant="${variant}">Badge</wa-badge>`);
            expect(el.variant).to.equal(variant);
            await expect(el).to.be.accessible({ ignoredRules });
          });
        }

        for (const appearance of ['accent', 'filled', 'outlined', 'filled-outlined'] as const) {
          it(`should accept appearance="${appearance}"`, async () => {
            const el = await fixture<WaBadge>(html`<wa-badge appearance="${appearance}">Badge</wa-badge>`);
            expect(el.appearance).to.equal(appearance);
          });
        }

        for (const attention of ['none', 'pulse', 'bounce'] as const) {
          it(`should accept attention="${attention}"`, async () => {
            const el = await fixture<WaBadge>(html`<wa-badge attention="${attention}">Badge</wa-badge>`);
            expect(el.attention).to.equal(attention);
          });
        }
      });

      describe('slots', () => {
        it('should render default slot content', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.innerText).to.equal('Badge');
        });

        it('should render content in the start slot', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge><span slot="start">Icon</span>Badge</wa-badge>`);
          const startSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="start"]')!;
          const assigned = startSlot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Icon');
        });

        it('should render content in the end slot', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge<span slot="end">Icon</span></wa-badge>`);
          const endSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="end"]')!;
          const assigned = endSlot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Icon');
        });
      });

      describe('CSS parts', () => {
        it('should have a base part', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.shadowRoot!.querySelector('[part~="base"]')).to.exist;
        });

        it('should have a start part', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.shadowRoot!.querySelector('[part~="start"]')).to.exist;
        });

        it('should have an end part', async () => {
          const el = await fixture<WaBadge>(html`<wa-badge>Badge</wa-badge>`);
          expect(el.shadowRoot!.querySelector('[part~="end"]')).to.exist;
        });
      });
    });
  }
});
