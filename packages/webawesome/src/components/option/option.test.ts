import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaOption from './option.js';
import type WaSelect from '../select/select.js';

describe('<wa-option>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests when used inside a select', async () => {
          const el = await fixture<WaSelect>(html`
            <wa-select label="Select one">
              <wa-option value="1">Option 1</wa-option>
              <wa-option value="2">Option 2</wa-option>
              <wa-option value="3">Option 3</wa-option>
              <wa-option value="4" disabled>Disabled</wa-option>
            </wa-select>
          `);
          await expect(el).to.be.accessible();
        });

        it('should have role="option"', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          expect(el.getAttribute('role')).to.equal('option');
        });

        it('should have aria-selected="false" by default', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          expect(el.getAttribute('aria-selected')).to.equal('false');
        });

        it('should set aria-disabled when disabled', async () => {
          const el = await fixture<WaOption>(html` <wa-option disabled>Test</wa-option> `);
          await el.updateComplete;
          expect(el.getAttribute('aria-disabled')).to.equal('true');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);

          expect(el.value).to.equal('');
          expect(el.disabled).to.be.false;
          expect(el.selected).to.be.false;
          expect(el.label).to.equal('Test');
          expect(el.getAttribute('aria-disabled')).to.equal('false');
        });

        it('should reflect the value property to an attribute', async () => {
          const el = await fixture<WaOption>(html` <wa-option value="test">Test</wa-option> `);
          expect(el.getAttribute('value')).to.equal('test');
        });

        it('should convert non-string values to string', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Text</wa-option> `);

          // @ts-expect-error - intentional
          el.value = 10;
          await el.updateComplete;

          expect(el.value).to.equal('10');
        });

        it('should update aria-disabled when disabled changes', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);

          el.disabled = true;
          await el.updateComplete;
          expect(el.getAttribute('aria-disabled')).to.equal('true');

          el.disabled = false;
          await el.updateComplete;
          expect(el.getAttribute('aria-disabled')).to.equal('false');
        });

        it('should update aria-selected when selected changes', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);

          el.selected = true;
          await el.updateComplete;
          expect(el.getAttribute('aria-selected')).to.equal('true');

          el.selected = false;
          await el.updateComplete;
          expect(el.getAttribute('aria-selected')).to.equal('false');
        });

        it('should generate defaultLabel from text content', async () => {
          const el = await fixture<WaOption>(html` <wa-option><strong>Option</strong></wa-option> `);
          expect(el.defaultLabel).to.equal('Option');
          expect(el.label).to.equal('Option');
        });

        it('should allow the label attribute to override defaultLabel', async () => {
          const el = await fixture<WaOption>(html` <wa-option label="Manual label">Text content</wa-option> `);
          expect(el.defaultLabel).to.equal('Text content');
          expect(el.label).to.equal('Manual label');
        });

        it('should fall back to defaultLabel when label is empty', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Fallback</wa-option> `);
          expect(el.label).to.equal('Fallback');
        });
      });

      describe('slots', () => {
        it('should render default slot content', async () => {
          const el = await fixture<WaOption>(html` <wa-option>My Option</wa-option> `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])');
          expect(slot).to.not.be.null;
        });

        it('should render start slot content', async () => {
          const el = await fixture<WaOption>(html`
            <wa-option>
              <span slot="start">Start</span>
              Option
            </wa-option>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="start"]');
          expect(slot).to.not.be.null;
          const assignedNodes = slot!.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.be.greaterThan(0);
        });

        it('should render end slot content', async () => {
          const el = await fixture<WaOption>(html`
            <wa-option>
              Option
              <span slot="end">End</span>
            </wa-option>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="end"]');
          expect(slot).to.not.be.null;
          const assignedNodes = slot!.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.be.greaterThan(0);
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the checked-icon part', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          const checkedIcon = el.shadowRoot!.querySelector('[part~="checked-icon"]');
          expect(checkedIcon).to.not.be.null;
        });

        it('should expose the label part', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          const label = el.shadowRoot!.querySelector('[part~="label"]');
          expect(label).to.not.be.null;
        });

        it('should expose the start part', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          const start = el.shadowRoot!.querySelector('[part~="start"]');
          expect(start).to.not.be.null;
        });

        it('should expose the end part', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          const end = el.shadowRoot!.querySelector('[part~="end"]');
          expect(end).to.not.be.null;
        });

        it('should render a wa-icon for checked-icon when selected', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          el.selected = true;
          await el.updateComplete;
          const icon = el.shadowRoot!.querySelector('wa-icon[part~="checked-icon"]');
          expect(icon).to.not.be.null;
        });

        it('should apply the selected custom state when selected', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          expect(el.matches(':state(selected)')).to.be.false;

          el.selected = true;
          await el.updateComplete;
          expect(el.matches(':state(selected)')).to.be.true;
        });

        it('should apply the disabled custom state when disabled', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          expect(el.matches(':state(disabled)')).to.be.false;

          el.disabled = true;
          await el.updateComplete;
          expect(el.matches(':state(disabled)')).to.be.true;
        });

        it('should apply the current custom state when current', async () => {
          const el = await fixture<WaOption>(html` <wa-option>Test</wa-option> `);
          expect(el.matches(':state(current)')).to.be.false;

          el.current = true;
          await el.updateComplete;
          expect(el.matches(':state(current)')).to.be.true;
        });
      });

      describe('within a select', () => {
        it('should be selectable inside a wa-select', async () => {
          const select = await fixture<WaSelect>(html`
            <wa-select label="Test" value="2">
              <wa-option value="1">One</wa-option>
              <wa-option value="2">Two</wa-option>
              <wa-option value="3">Three</wa-option>
            </wa-select>
          `);
          await aTimeout(0);

          const options = select.querySelectorAll<WaOption>('wa-option');
          expect(options[1].selected).to.be.true;
          expect(options[0].selected).to.be.false;
        });

        it('should support the disabled state inside a wa-select', async () => {
          const select = await fixture<WaSelect>(html`
            <wa-select label="Test">
              <wa-option value="1">One</wa-option>
              <wa-option value="2" disabled>Two</wa-option>
            </wa-select>
          `);

          const disabledOption = select.querySelector<WaOption>('wa-option[disabled]')!;
          expect(disabledOption.disabled).to.be.true;
          expect(disabledOption.getAttribute('aria-disabled')).to.equal('true');
        });
      });
    });
  }
});
