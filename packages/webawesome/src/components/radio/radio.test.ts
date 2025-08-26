import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaRadioGroup from '../radio-group/radio-group.js';
import type WaRadio from './radio.js';

describe('<wa-radio>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
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
    });
  }
});
