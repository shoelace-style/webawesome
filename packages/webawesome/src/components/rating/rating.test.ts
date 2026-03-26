import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaRating from './rating.js';

describe('<wa-rating>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should pass accessibility tests', async () => {
        const el = await fixture<WaRating>(html` <wa-rating label="Test"></wa-rating> `);
        await expect(el).to.be.accessible();

        expect(el.getAttribute('role')).to.equal('slider');
        expect(el.getAttribute('aria-disabled')).to.equal('false');
        expect(el.getAttribute('aria-readonly')).to.equal('false');
        expect(el.getAttribute('aria-valuenow')).to.equal('0');
        expect(el.getAttribute('aria-valuemin')).to.equal('0');
        expect(el.getAttribute('aria-valuemax')).to.equal('5');
        expect(el.tabIndex).to.equal(0);
      });

      it('should be readonly with the readonly attribute', async () => {
        const el = await fixture<WaRating>(html` <wa-rating label="Test" readonly></wa-rating> `);

        expect(el.getAttribute('aria-readonly')).to.equal('true');
      });

      it('should be disabled with the disabled attribute', async () => {
        const el = await fixture<WaRating>(html` <wa-rating label="Test" disabled></wa-rating> `);

        expect(el.getAttribute('aria-disabled')).to.equal('true');
      });

      it('should set max value by attribute', async () => {
        const el = await fixture<WaRating>(html` <wa-rating label="Test" max="12"></wa-rating> `);

        expect(el.getAttribute('aria-valuemax')).to.equal('12');
      });

      it('should set selected value by attribute', async () => {
        const el = await fixture<WaRating>(html` <wa-rating label="Test" value="3"></wa-rating> `);

        expect(el.getAttribute('aria-valuenow')).to.equal('3');
      });

      it('should emit change when clicked', async () => {
        const el = await fixture<WaRating>(html` <wa-rating></wa-rating> `);
        const lastSymbol = el.shadowRoot!.querySelector<HTMLSpanElement>('.symbol:last-child')!;
        const changeHandler = sinon.spy();

        el.addEventListener('change', changeHandler);

        await clickOnElement(lastSymbol);
        await el.updateComplete;

        expect(changeHandler).to.have.been.calledOnce;
        expect(el.value).to.equal(5);
      });

      it('should emit change when the value is changed with the keyboard', async () => {
        const el = await fixture<WaRating>(html` <wa-rating></wa-rating> `);
        const changeHandler = sinon.spy();

        el.addEventListener('change', changeHandler);
        el.focus();
        await el.updateComplete;
        await sendKeys({ press: 'ArrowRight' });
        await el.updateComplete;

        expect(changeHandler).to.have.been.calledOnce;
        expect(el.value).to.equal(1);
      });

      it('should not emit change when disabled', async () => {
        const el = await fixture<WaRating>(html` <wa-rating value="5" disabled></wa-rating> `);
        const lastSymbol = el.shadowRoot!.querySelector<HTMLSpanElement>('.symbol:last-child')!;
        const changeHandler = sinon.spy();

        el.addEventListener('change', changeHandler);

        await clickOnElement(lastSymbol);
        await el.updateComplete;

        expect(changeHandler).to.not.have.been.called;
        expect(el.value).to.equal(5);
      });

      it('should not emit change when the value is changed programmatically', async () => {
        const el = await fixture<WaRating>(html` <wa-rating label="Test" value="1"></wa-rating> `);
        el.addEventListener('change', () => expect.fail('change incorrectly emitted'));
        el.value = 5;
        await el.updateComplete;
      });

      describe('focus', () => {
        it('should focus the host element', async () => {
          const el = await fixture<WaRating>(html` <wa-rating label="Test"></wa-rating> `);

          el.focus();
          await el.updateComplete;

          expect(document.activeElement).to.equal(el);
        });
      });

      describe('blur', () => {
        it('should blur the host element', async () => {
          const el = await fixture<WaRating>(html` <wa-rating label="Test"></wa-rating> `);

          el.focus();
          await el.updateComplete;

          el.blur();
          await el.updateComplete;

          expect(document.activeElement).to.not.equal(el);
        });
      });
    });
  }
});
