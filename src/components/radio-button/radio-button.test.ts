import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaRadioGroup from '../radio-group/radio-group.js';
import type WaRadioButton from './radio-button.js';

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
    });
  }
});
