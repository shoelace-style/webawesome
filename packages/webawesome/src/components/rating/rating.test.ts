import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { expectEvent } from '../../internal/test/expect-event.js';
import { runFormControlBaseTests } from '../../internal/test/form-control-base-tests.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaRating from './rating.js';

describe('<wa-rating>', () => {
  runFormControlBaseTests('wa-rating');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test"></wa-rating>`);
          await expect(el).to.be.accessible();
        });

        it('should have role="slider"', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test"></wa-rating>`);
          expect(el.getAttribute('role')).to.equal('slider');
        });

        it('should set aria attributes correctly', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test"></wa-rating>`);
          expect(el.getAttribute('aria-valuenow')).to.equal('0');
          expect(el.getAttribute('aria-valuemin')).to.equal('0');
          expect(el.getAttribute('aria-valuemax')).to.equal('5');
          expect(el.getAttribute('aria-disabled')).to.equal('false');
          expect(el.getAttribute('aria-readonly')).to.equal('false');
        });

        it('should be focusable by default', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test"></wa-rating>`);
          expect(el.tabIndex).to.equal(0);
        });

        it('should not be focusable when disabled', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test" disabled></wa-rating>`);
          expect(el.tabIndex).to.equal(-1);
        });

        it('should not be focusable when readonly', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test" readonly></wa-rating>`);
          expect(el.tabIndex).to.equal(-1);
        });

        it('should set aria-label from label property', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="My Rating"></wa-rating>`);
          expect(el.getAttribute('aria-label')).to.equal('My Rating');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaRating>(html`<wa-rating></wa-rating>`);
          expect(el.value).to.equal(0);
          expect(el.max).to.equal(5);
          expect(el.precision).to.equal(1);
          expect(el.readonly).to.be.false;
          expect(el.disabled).to.be.false;
          expect(el.required).to.be.false;
          expect(el.label).to.equal('');
          expect(el.size).to.equal('medium');
        });

        it('should set value by attribute', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="3"></wa-rating>`);
          expect(el.value).to.equal(3);
          expect(el.getAttribute('aria-valuenow')).to.equal('3');
        });

        it('should set max by attribute', async () => {
          const el = await fixture<WaRating>(html`<wa-rating max="10"></wa-rating>`);
          expect(el.max).to.equal(10);
          expect(el.getAttribute('aria-valuemax')).to.equal('10');
        });

        it('should reflect disabled state in aria', async () => {
          const el = await fixture<WaRating>(html`<wa-rating disabled></wa-rating>`);
          expect(el.disabled).to.be.true;
          expect(el.getAttribute('aria-disabled')).to.equal('true');
        });

        it('should reflect readonly state in aria', async () => {
          const el = await fixture<WaRating>(html`<wa-rating readonly></wa-rating>`);
          expect(el.readonly).to.be.true;
          expect(el.getAttribute('aria-readonly')).to.equal('true');
        });

        it('should update aria-valuenow when value changes programmatically', async () => {
          const el = await fixture<WaRating>(html`<wa-rating></wa-rating>`);
          el.value = 4;
          await el.updateComplete;
          expect(el.getAttribute('aria-valuenow')).to.equal('4');
        });
      });

      describe('events', () => {
        it('should emit change when clicked', async () => {
          const el = await fixture<WaRating>(html`<wa-rating></wa-rating>`);
          const lastSymbol = el.shadowRoot!.querySelector<HTMLSpanElement>('.symbol:last-child')!;

          await expectEvent(el, 'change', async () => {
            await clickOnElement(lastSymbol);
            await el.updateComplete;
          });

          expect(el.value).to.equal(5);
        });

        it('should emit change when the value is changed with the keyboard', async () => {
          const el = await fixture<WaRating>(html`<wa-rating></wa-rating>`);

          await expectEvent(el, 'change', async () => {
            el.focus();
            await el.updateComplete;
            await sendKeys({ press: 'ArrowRight' });
            await el.updateComplete;
          });

          expect(el.value).to.equal(1);
        });

        it('should not emit change when disabled', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="5" disabled></wa-rating>`);
          const lastSymbol = el.shadowRoot!.querySelector<HTMLSpanElement>('.symbol:last-child')!;
          const changeHandler = sinon.spy();

          el.addEventListener('change', changeHandler);

          await clickOnElement(lastSymbol);
          await el.updateComplete;

          expect(changeHandler).to.not.have.been.called;
          expect(el.value).to.equal(5);
        });

        it('should not emit change when the value is changed programmatically', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="1"></wa-rating>`);
          el.addEventListener('change', () => expect.fail('change incorrectly emitted'));
          el.value = 5;
          await el.updateComplete;
        });
      });

      describe('keyboard navigation', () => {
        it('should increase value with ArrowRight', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="2"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;
          expect(el.value).to.equal(3);
        });

        it('should increase value with ArrowUp', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="2"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowUp' });
          await el.updateComplete;
          expect(el.value).to.equal(3);
        });

        it('should decrease value with ArrowLeft', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="3"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;
          expect(el.value).to.equal(2);
        });

        it('should decrease value with ArrowDown', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="3"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowDown' });
          await el.updateComplete;
          expect(el.value).to.equal(2);
        });

        it('should set value to 0 with Home', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="3"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'Home' });
          await el.updateComplete;
          expect(el.value).to.equal(0);
        });

        it('should set value to max with End', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="3"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'End' });
          await el.updateComplete;
          expect(el.value).to.equal(5);
        });

        it('should not go below 0', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="0"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowLeft' });
          await el.updateComplete;
          expect(el.value).to.equal(0);
        });

        it('should not exceed max', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="5"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;
          expect(el.value).to.equal(5);
        });

        it('should respect precision when navigating with arrow keys', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="2" precision="0.5"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;
          expect(el.value).to.equal(2.5);
        });

        it('should not respond to keys when disabled', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="3" disabled></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;
          expect(el.value).to.equal(3);
        });

        it('should not respond to keys when readonly', async () => {
          const el = await fixture<WaRating>(html`<wa-rating value="3" readonly></wa-rating>`);
          el.focus();
          await el.updateComplete;
          await sendKeys({ press: 'ArrowRight' });
          await el.updateComplete;
          expect(el.value).to.equal(3);
        });
      });

      describe('focus and blur', () => {
        it('should focus the host element', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          expect(document.activeElement).to.equal(el);
        });

        it('should blur the host element', async () => {
          const el = await fixture<WaRating>(html`<wa-rating label="Test"></wa-rating>`);
          el.focus();
          await el.updateComplete;
          el.blur();
          await el.updateComplete;
          expect(document.activeElement).to.not.equal(el);
        });
      });

      describe('form integration', () => {
        it('should reset to defaultValue when form is reset', async () => {
          const form = await fixture<HTMLFormElement>(html`
            <form>
              <wa-rating name="rating" value="3" default-value="1"></wa-rating>
              <button type="reset">Reset</button>
            </form>
          `);
          const rating = form.querySelector<WaRating>('wa-rating')!;

          rating.value = 5;
          await rating.updateComplete;
          expect(rating.value).to.equal(5);

          form.reset();
          await rating.updateComplete;
          expect(rating.value).to.equal(1);
        });
      });

      describe('CSS parts', () => {
        it('should expose the base part', async () => {
          const el = await fixture<WaRating>(html`<wa-rating></wa-rating>`);
          const base = el.shadowRoot!.querySelector('[part~="base"]');
          expect(base).to.not.be.null;
        });
      });
    });
  }
});
