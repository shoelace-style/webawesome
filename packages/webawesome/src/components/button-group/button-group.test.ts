import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaButtonGroup from './button-group.js';

describe('<wa-button-group>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('defaults ', () => {
        it('default label empty', async () => {
          const group = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1 Label</wa-button>
              <wa-button>Button 2 Label</wa-button>
              <wa-button>Button 3 Label</wa-button>
            </wa-button-group>
          `);
          expect(group.label).to.equal('');
        });

        it('passes accessibility test', async () => {
          const group = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1 Label</wa-button>
              <wa-button>Button 2 Label</wa-button>
              <wa-button>Button 3 Label</wa-button>
            </wa-button-group>
          `);
          await expect(group).to.be.accessible();
        });
      });

      describe('slotted button custom properties', () => {
        it('slotted buttons inherit the right custom properties based on their order', async () => {
          const group = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1 Label</wa-button>
              <wa-button>Button 2 Label</wa-button>
              <wa-button>Button 3 Label</wa-button>
            </wa-button-group>
          `);

          const allButtons = group.querySelectorAll('wa-button');
          Array.from(allButtons).every(button =>
            expect(button).to.have.style('--_button-horizontal-indent', 'var(--wa-form-control-border-width)'),
          );

          expect(allButtons[0]).to.not.have.style('--_button-start-start-radius', '0');
          expect(allButtons[0]).to.have.style('--_button-start-end-radius', '0');
          expect(allButtons[0]).to.not.have.style('--_button-end-start-radius', '0');
          expect(allButtons[0]).to.have.style('--_button-end-end-radius', '0');

          expect(allButtons[1]).to.have.style('--_button-start-start-radius', '0');
          expect(allButtons[1]).to.have.style('--_button-start-end-radius', '0');
          expect(allButtons[1]).to.have.style('--_button-end-start-radius', '0');
          expect(allButtons[1]).to.have.style('--_button-end-end-radius', '0');

          expect(allButtons[2]).to.have.style('--_button-start-start-radius', '0');
          expect(allButtons[2]).to.not.have.style('--_button-start-end-radius', '0');
          expect(allButtons[2]).to.have.style('--_button-end-start-radius', '0');
          expect(allButtons[2]).to.not.have.style('--_button-end-end-radius', '0');
        });
      });

      describe('focus and blur events', () => {
        it('toggles focus class to slotted buttons on focus/blur', async () => {
          const group = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1 Label</wa-button>
              <wa-button>Button 2 Label</wa-button>
              <wa-button>Button 3 Label</wa-button>
            </wa-button-group>
          `);

          const allButtons = group.querySelectorAll('wa-button');
          allButtons[0].dispatchEvent(new FocusEvent('focusin', { bubbles: true }));

          await elementUpdated(allButtons[0]);
          expect(allButtons[0].classList.contains('button-focus')).to.be.true;

          allButtons[0].dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
          await elementUpdated(allButtons[0]);
          expect(allButtons[0].classList.contains('button-focus')).not.to.be.true;
        });
      });

      describe('mouseover and mouseout events', () => {
        it('toggles hover class to slotted buttons on mouseover/mouseout', async () => {
          const group = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1 Label</wa-button>
              <wa-button>Button 2 Label</wa-button>
              <wa-button>Button 3 Label</wa-button>
            </wa-button-group>
          `);

          const allButtons = group.querySelectorAll('wa-button');

          allButtons[0].dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          await elementUpdated(allButtons[0]);
          expect(allButtons[0].classList.contains('button-hover')).to.be.true;

          allButtons[0].dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
          await elementUpdated(allButtons[0]);
          expect(allButtons[0].classList.contains('button-hover')).not.to.be.true;
        });
      });
    });
  }
});
