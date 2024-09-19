import { expect } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import { html } from 'lit';
import type WaRadioButton from './radio-button.js';
import type WaRadioGroup from '../radio-group/radio-group.js';

describe('<wa-radio-button>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should not get checked when disabled', async () => {
        const radioGroup = await fixture<WaRadioGroup>(html`
          <wa-radio-group value="1">
            <wa-radio-button id="radio-1" value="1"></wa-radio-button>
            <wa-radio-button id="radio-2" value="2" disabled></wa-radio-button>
          </wa-radio-group>
        `);
        const radio1 = radioGroup.querySelector<WaRadioButton>('#radio-1')!;
        const radio2 = radioGroup.querySelector<WaRadioButton>('#radio-2')!;

        radio2.click();
        await Promise.all([radio1.updateComplete, radio2.updateComplete]);

        expect(radio1.checked).to.be.true;
        expect(radio2.checked).to.be.false;
      });

      it('should receive positional classes from <wa-button-group>', async () => {
        const radioGroup = await fixture<WaRadioGroup>(html`
          <wa-radio-group value="1">
            <wa-radio-button id="radio-1" value="1"></wa-radio-button>
            <wa-radio-button id="radio-2" value="2"></wa-radio-button>
            <wa-radio-button id="radio-3" value="3"></wa-radio-button>
          </wa-radio-group>
        `);
        const radio1 = radioGroup.querySelector<WaRadioButton>('#radio-1')!;
        const radio2 = radioGroup.querySelector<WaRadioButton>('#radio-2')!;
        const radio3 = radioGroup.querySelector<WaRadioButton>('#radio-3')!;

        await Promise.all([
          radioGroup.updateComplete,
          radio1.updateComplete,
          radio2.updateComplete,
          radio3.updateComplete
        ]);

        expect(radio1.classList.contains('wa-button-group__button')).to.be.true;
        expect(radio1.classList.contains('wa-button-group__button--first')).to.be.true;
        expect(radio2.classList.contains('wa-button-group__button')).to.be.true;
        expect(radio2.classList.contains('wa-button-group__button--inner')).to.be.true;
        expect(radio3.classList.contains('wa-button-group__button')).to.be.true;
        expect(radio3.classList.contains('wa-button-group__button--last')).to.be.true;
      });
    });
  }
});
