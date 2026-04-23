import { aTimeout, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import type WaRadioGroup from '../radio-group/radio-group.js';
import type WaRadio from './radio.js';

describe('<wa-radio>', () => {
  runFormControlBaseTests('wa-radio-group');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Select one">
              <wa-radio value="1">Option 1</wa-radio>
              <wa-radio value="2">Option 2</wa-radio>
              <wa-radio value="3">Option 3</wa-radio>
            </wa-radio-group>
          `);
          await expect(el).to.be.accessible();
        });

        it('should have role="radio"', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">Option</wa-radio> `);
          expect(el.getAttribute('role')).to.equal('radio');
        });

        it('should have aria-checked="false" by default', async () => {
          const group = await fixture<WaRadioGroup>(html`
            <wa-radio-group label="Test">
              <wa-radio value="1">Option</wa-radio>
            </wa-radio-group>
          `);
          const radio = group.querySelector<WaRadio>('wa-radio')!;
          await radio.updateComplete;
          expect(radio.getAttribute('aria-checked')).to.equal('false');
        });

        it('should have aria-disabled when disabled', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1" disabled>Option</wa-radio> `);
          expect(el.getAttribute('aria-disabled')).to.equal('true');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">Option</wa-radio> `);

          expect(el.value).to.equal('1');
          expect(el.disabled).to.be.false;
          expect(el.checked).to.be.false;
          expect(el.appearance).to.equal('default');
        });

        it('should reflect value to attribute', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="test">Option</wa-radio> `);
          expect(el.getAttribute('value')).to.equal('test');
        });

        it('should reflect appearance to attribute', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1" appearance="button">Option</wa-radio> `);
          expect(el.getAttribute('appearance')).to.equal('button');
        });

        it('should reflect size to attribute', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1" size="l">Option</wa-radio> `);
          expect(el.getAttribute('size')).to.equal('l');
        });

        it('should not get checked when disabled', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1">
              <wa-radio id="radio-1" value="1"></wa-radio>
              <wa-radio id="radio-2" value="2" disabled></wa-radio>
            </wa-radio-group>
          `);
          const radio1 = radioGroup.querySelector<WaRadio>('#radio-1')!;
          const radio2 = radioGroup.querySelector<WaRadio>('#radio-2')!;

          radio2.click();
          await Promise.all([radio1.updateComplete, radio2.updateComplete]);

          expect(radio1.checked).to.be.true;
          expect(radio2.checked).to.be.false;
        });

        it('should become checked when clicked and not disabled', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group>
              <wa-radio id="radio-1" value="1"></wa-radio>
              <wa-radio id="radio-2" value="2"></wa-radio>
            </wa-radio-group>
          `);
          const radio1 = radioGroup.querySelector<WaRadio>('#radio-1')!;

          radio1.click();
          await radio1.updateComplete;

          expect(radio1.checked).to.be.true;
        });

        it('should update aria-checked when checked changes', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group>
              <wa-radio id="radio-1" value="1"></wa-radio>
              <wa-radio id="radio-2" value="2"></wa-radio>
            </wa-radio-group>
          `);
          const radio1 = radioGroup.querySelector<WaRadio>('#radio-1')!;

          expect(radio1.getAttribute('aria-checked')).to.equal('false');

          radio1.click();
          await radio1.updateComplete;

          expect(radio1.getAttribute('aria-checked')).to.equal('true');
        });

        it('should update aria-disabled when disabled changes', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">Option</wa-radio> `);

          expect(el.getAttribute('aria-disabled')).to.equal('false');

          el.disabled = true;
          await el.updateComplete;

          expect(el.getAttribute('aria-disabled')).to.equal('true');
        });
      });

      describe('slots', () => {
        it('should render default slot content', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">My Label</wa-radio> `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])');
          expect(slot).to.not.be.null;
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the control part', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">Option</wa-radio> `);
          const control = el.shadowRoot!.querySelector('[part~="control"]');
          expect(control).to.not.be.null;
        });

        it('should expose the label part', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">Option</wa-radio> `);
          const label = el.shadowRoot!.querySelector('[part~="label"]');
          expect(label).to.not.be.null;
        });

        it('should expose the checked-icon part when checked', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1">
              <wa-radio value="1">Option</wa-radio>
            </wa-radio-group>
          `);
          const radio = radioGroup.querySelector<WaRadio>('wa-radio')!;
          await radio.updateComplete;

          const checkedIcon = radio.shadowRoot!.querySelector('[part~="checked-icon"]');
          expect(checkedIcon).to.not.be.null;
        });

        it('should not show checked-icon when unchecked', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">Option</wa-radio> `);
          const checkedIcon = el.shadowRoot!.querySelector('[part~="checked-icon"]');
          expect(checkedIcon).to.be.null;
        });

        it('should apply the checked custom state when checked', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group>
              <wa-radio value="1">Option</wa-radio>
            </wa-radio-group>
          `);
          const radio = radioGroup.querySelector<WaRadio>('wa-radio')!;

          expect(radio.matches(':state(checked)')).to.be.false;

          radio.click();
          await radio.updateComplete;

          expect(radio.matches(':state(checked)')).to.be.true;
        });

        it('should apply the disabled custom state when disabled', async () => {
          const el = await fixture<WaRadio>(html` <wa-radio value="1">Option</wa-radio> `);
          expect(el.matches(':state(disabled)')).to.be.false;

          el.disabled = true;
          await el.updateComplete;

          expect(el.matches(':state(disabled)')).to.be.true;
        });
      });

      describe('within a radio group', () => {
        it('should only allow one radio to be checked in a group', async () => {
          const radioGroup = await fixture<WaRadioGroup>(html`
            <wa-radio-group value="1">
              <wa-radio value="1">One</wa-radio>
              <wa-radio value="2">Two</wa-radio>
              <wa-radio value="3">Three</wa-radio>
            </wa-radio-group>
          `);
          const radios = radioGroup.querySelectorAll<WaRadio>('wa-radio');

          expect(radios[0].checked).to.be.true;
          expect(radios[1].checked).to.be.false;
          expect(radios[2].checked).to.be.false;

          radios[1].click();
          await aTimeout(0);
          await Promise.all([...radios].map(r => r.updateComplete));

          expect(radios[0].checked).to.be.false;
          expect(radios[1].checked).to.be.true;
          expect(radios[2].checked).to.be.false;
        });
      });
    });
  }
});
