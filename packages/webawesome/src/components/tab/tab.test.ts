import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTab from './tab.js';

describe('<wa-tab>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests within a tab group', async () => {
          const el = await fixture<HTMLElement>(html`
            <wa-tab-group>
              <wa-tab slot="nav" panel="general">General</wa-tab>
              <wa-tab-panel name="general">Content</wa-tab-panel>
            </wa-tab-group>
          `);
          await expect(el).to.be.accessible();
        });

        it('should have role="tab"', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          expect(el.getAttribute('role')).to.equal('tab');
        });

        it('should set aria-selected based on active state', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          expect(el.getAttribute('aria-selected')).to.equal('false');

          el.active = true;
          await el.updateComplete;
          expect(el.getAttribute('aria-selected')).to.equal('true');
        });

        it('should set aria-disabled based on disabled state', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          expect(el.getAttribute('aria-disabled')).to.equal('false');

          el.disabled = true;
          await el.updateComplete;
          expect(el.getAttribute('aria-disabled')).to.equal('true');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          expect(el.panel).to.equal('');
          expect(el.active).to.equal(false);
          expect(el.disabled).to.equal(false);
        });

        it('should reflect the panel property to an attribute', async () => {
          const el = await fixture<WaTab>(html`<wa-tab panel="general">Test</wa-tab>`);
          expect(el.getAttribute('panel')).to.equal('general');
        });

        it('should reflect the active property to an attribute', async () => {
          const el = await fixture<WaTab>(html`<wa-tab active>Test</wa-tab>`);
          expect(el.active).to.equal(true);
          expect(el.hasAttribute('active')).to.equal(true);
        });

        it('should reflect the disabled property to an attribute', async () => {
          const el = await fixture<WaTab>(html`<wa-tab disabled>Test</wa-tab>`);
          expect(el.disabled).to.equal(true);
          expect(el.hasAttribute('disabled')).to.equal(true);
        });

        it('should set tabindex to 0 by default', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          expect(el.getAttribute('tabindex')).to.equal('0');
        });

        it('should set tabindex to -1 when disabled and not active', async () => {
          const el = await fixture<WaTab>(html`<wa-tab disabled>Test</wa-tab>`);
          expect(el.getAttribute('tabindex')).to.equal('-1');
        });

        it('should keep tabindex 0 when disabled but active', async () => {
          const el = await fixture<WaTab>(html`<wa-tab disabled active>Test</wa-tab>`);
          expect(el.getAttribute('tabindex')).to.equal('0');
        });

        it('should auto-assign slot to "nav"', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          expect(el.slot).to.equal('nav');
        });

        it('should generate an id if none is provided', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          expect(el.id).to.not.be.empty;
          expect(el.id).to.match(/^wa-tab-\d+$/);
        });

        it('should preserve a user-provided id', async () => {
          const el = await fixture<WaTab>(html`<wa-tab id="my-tab">Test</wa-tab>`);
          expect(el.id).to.equal('my-tab');
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>My Tab Label</wa-tab>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          const textContent = assignedNodes.map(n => n.textContent).join('');
          expect(textContent).to.include('My Tab Label');
        });
      });

      describe('CSS parts', () => {
        it('should have a base part', async () => {
          const el = await fixture<WaTab>(html`<wa-tab>Test</wa-tab>`);
          const base = el.shadowRoot!.querySelector('[part~="base"]');
          expect(base).to.exist;
        });
      });
    });
  }
});
