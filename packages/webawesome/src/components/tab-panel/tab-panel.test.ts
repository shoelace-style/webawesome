import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTabPanel from './tab-panel.js';

describe('<wa-tab-panel>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          await expect(el).to.be.accessible();
        });

        it('should have role="tabpanel"', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          expect(el.getAttribute('role')).to.equal('tabpanel');
        });

        it('should set aria-hidden to "true" when not active', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          expect(el.getAttribute('aria-hidden')).to.equal('true');
        });

        it('should set aria-hidden to "false" when active', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel active>Test</wa-tab-panel>`);
          expect(el.getAttribute('aria-hidden')).to.equal('false');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          expect(el.name).to.equal('');
          expect(el.active).to.equal(false);
        });

        it('should reflect the name property to an attribute', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          el.name = 'general';
          await el.updateComplete;
          expect(el.getAttribute('name')).to.equal('general');
        });

        it('should reflect the active property to an attribute', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          el.active = true;
          await el.updateComplete;
          expect(el.hasAttribute('active')).to.equal(true);
        });

        it('should update aria-hidden when active changes dynamically', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          expect(el.getAttribute('aria-hidden')).to.equal('true');

          el.active = true;
          await aTimeout(100);
          expect(el.getAttribute('aria-hidden')).to.equal('false');

          el.active = false;
          await aTimeout(100);
          expect(el.getAttribute('aria-hidden')).to.equal('true');
        });

        it('should generate an id if none is provided', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          expect(el.id).to.not.be.empty;
          expect(el.id).to.match(/^wa-tab-panel-\d+$/);
        });

        it('should preserve a user-provided id', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel id="my-panel">Test</wa-tab-panel>`);
          expect(el.id).to.equal('my-panel');
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Panel Content</wa-tab-panel>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          const textContent = assignedNodes.map(n => n.textContent).join('');
          expect(textContent).to.include('Panel Content');
        });
      });

      describe('CSS parts', () => {
        it('should have a base part', async () => {
          const el = await fixture<WaTabPanel>(html`<wa-tab-panel>Test</wa-tab-panel>`);
          const base = el.shadowRoot!.querySelector('[part~="base"]');
          expect(base).to.exist;
        });
      });
    });
  }
});
