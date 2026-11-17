import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaNumberTicker from './number-ticker.js';

/** The number currently on screen. */
function shown(el: WaNumberTicker) {
  return el.shadowRoot!.querySelector('span')!.textContent ?? '';
}

/** The number exposed to assistive technology while counting, or null once the ticker has settled. */
function announced(el: WaNumberTicker) {
  return el.shadowRoot!.querySelector('.wa-visually-hidden')?.textContent ?? null;
}

function shownNumber(el: WaNumberTicker) {
  return Number(shown(el).replace(/,/g, ''));
}

// Force a known prefers-reduced-motion result without touching the real OS setting.
function stubReducedMotion(matches: boolean) {
  return sinon.stub(window, 'matchMedia').callsFake(
    (query: string) =>
      ({
        matches: query.includes('prefers-reduced-motion') ? matches : false,
        media: query,
        onchange: null,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        dispatchEvent: () => false,
      }) as unknown as MediaQueryList,
  );
}

describe('<wa-number-ticker>', () => {
  // Listen on the document so a finish that lands before the fixture resolves is still counted.
  let finishHandler: sinon.SinonSpy;

  beforeEach(() => {
    finishHandler = sinon.spy();
    document.addEventListener('wa-finish', finishHandler);
  });

  afterEach(() => {
    document.removeEventListener('wa-finish', finishHandler);
    sinon.restore();
  });

  const finished = (count = 1) => waitUntil(() => finishHandler.callCount >= count, 'wa-finish was not emitted');

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaNumberTicker>(html`<wa-number-ticker value="100"></wa-number-ticker>`);
          await expect(el).to.be.accessible();
        });

        it('should expose the final value to assistive technology while counting', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="1000" delay="60000"></wa-number-ticker>`,
          );

          expect(shown(el)).to.equal('0');
          expect(el.shadowRoot!.querySelector('span')!.getAttribute('aria-hidden')).to.equal('true');
          expect(announced(el)).to.equal('1,000');
        });

        it('should render the number once after it settles', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="1000" duration="50"></wa-number-ticker>`,
          );
          await finished();

          expect(el.shadowRoot!.querySelectorAll('span')).to.have.lengthOf(1);
          expect(el.shadowRoot!.querySelector('[aria-hidden]')).to.be.null;
          expect(shown(el)).to.equal('1,000');
        });
      });

      describe('properties', () => {
        it('should have correct default values', async () => {
          const el = await fixture<WaNumberTicker>(html`<wa-number-ticker></wa-number-ticker>`);

          expect(el.value).to.equal(0);
          expect(el.startValue).to.equal(0);
          expect(el.duration).to.equal(2000);
          expect(el.delay).to.equal(0);
          expect(el.easing).to.equal('cubic-bezier(0.16, 1, 0.3, 1)');
          expect(el.eager).to.be.false;
          expect(el.type).to.equal('decimal');
          expect(el.withoutGrouping).to.be.false;
          expect(el.currency).to.equal('USD');
          expect(el.currencyDisplay).to.equal('symbol');
          expect(el.minimumFractionDigits).to.be.undefined;
          expect(el.maximumFractionDigits).to.be.undefined;
          expect(el.valueFormatter).to.be.undefined;
        });
      });

      describe('counting', () => {
        it('should count from the start value to the value and emit wa-finish', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker start-value="50" value="100" duration="300" easing="linear"></wa-number-ticker>`,
          );

          await waitUntil(() => shownNumber(el) > 50 && shownNumber(el) < 100, 'never showed a number in between');
          await finished();

          expect(shown(el)).to.equal('100');
          expect(finishHandler).to.have.been.calledOnce;
          expect(el.getAnimations()).to.have.lengthOf(0);
        });

        it('should count down when the start value is higher', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker start-value="100" value="0" duration="300" easing="linear"></wa-number-ticker>`,
          );

          await waitUntil(() => shownNumber(el) < 100 && shownNumber(el) > 0, 'never showed a number in between');
          await finished();

          expect(shown(el)).to.equal('0');
        });

        it('should finish right away when the duration is 0', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="0"></wa-number-ticker>`,
          );
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should finish right away when the start value equals the value', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker start-value="5" value="5" duration="60000"></wa-number-ticker>`,
          );
          await finished();

          expect(shown(el)).to.equal('5');
        });

        it('should wait for the delay before counting', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50" delay="60000"></wa-number-ticker>`,
          );
          await aTimeout(200);

          expect(shown(el)).to.equal('0');
          expect(finishHandler).to.not.have.been.called;
        });

        it('should fall back to the default easing when the easing is invalid', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50" easing="bogus"></wa-number-ticker>`,
          );
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should ignore a delay that is not a number', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50" delay="abc"></wa-number-ticker>`,
          );
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should finish when something else cancels its animation', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="60000"></wa-number-ticker>`,
          );
          await waitUntil(() => el.getAnimations().length > 0);
          el.getAnimations().forEach(animation => animation.cancel());
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should match :state(counting) only while counting', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="60000"></wa-number-ticker>`,
          );
          await waitUntil(() => el.matches(':state(counting)'), 'never entered the counting state');

          el.duration = 50;
          el.restart();
          await finished();

          expect(el.matches(':state(counting)')).to.be.false;
        });

        it('should never show negative zero', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker start-value="-3" value="0" duration="300" easing="linear"></wa-number-ticker>`,
          );
          const seen = new Set<string>();

          while (finishHandler.callCount === 0) {
            seen.add(shown(el));
            await new Promise(requestAnimationFrame);
          }

          expect([...seen]).to.include('-3');
          expect([...seen]).to.not.include('-0');
        });
      });

      describe('visibility', () => {
        it('should wait until it is visible before counting', async () => {
          const container = await fixture<HTMLDivElement>(html`
            <div style="display: none"><wa-number-ticker value="100" duration="50"></wa-number-ticker></div>
          `);
          const el = container.querySelector('wa-number-ticker')!;
          await el.updateComplete;
          await aTimeout(200);

          expect(shown(el)).to.equal('0');
          expect(finishHandler).to.not.have.been.called;

          container.style.display = '';
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should wait until at least half of it is visible', async () => {
          // The container clips the ticker so only a sliver of it shows.
          const container = await fixture<HTMLDivElement>(html`
            <div style="height: 10px; overflow: hidden">
              <wa-number-ticker value="100" duration="50" style="display: block; height: 100px"></wa-number-ticker>
            </div>
          `);
          const el = container.querySelector('wa-number-ticker')!;
          await el.updateComplete;
          await aTimeout(200);

          expect(shown(el)).to.equal('0');
          expect(finishHandler).to.not.have.been.called;

          container.style.height = '60px';
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should count right away when eager, even if it is not visible', async () => {
          const container = await fixture<HTMLDivElement>(html`
            <div style="display: none"><wa-number-ticker value="100" duration="50" eager></wa-number-ticker></div>
          `);
          const el = container.querySelector('wa-number-ticker')!;
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should start a waiting ticker when eager is set', async () => {
          const container = await fixture<HTMLDivElement>(html`
            <div style="display: none"><wa-number-ticker value="100" duration="50"></wa-number-ticker></div>
          `);
          const el = container.querySelector('wa-number-ticker')!;
          await el.updateComplete;
          await aTimeout(100);
          expect(finishHandler).to.not.have.been.called;

          el.eager = true;
          await finished();

          expect(shown(el)).to.equal('100');
        });

        it('should not replay a finished ticker when it reconnects', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50"></wa-number-ticker>`,
          );
          const parent = el.parentElement!;
          await finished();

          el.remove();
          parent.append(el);
          await aTimeout(200);

          expect(shown(el)).to.equal('100');
          expect(finishHandler).to.have.been.calledOnce;
        });
      });

      describe('updating the value', () => {
        // The shared live region outlives each test, so empty it first.
        beforeEach(() =>
          document.querySelectorAll('[role="log"][aria-live="polite"] > div').forEach(node => node.remove()),
        );
        const announcements = () =>
          [...document.querySelectorAll('[role="log"][aria-live="polite"] > div')].map(node => node.textContent);

        it('should announce a new value once it finishes counting', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="300"></wa-number-ticker>`,
          );
          await finished();

          el.value = 2468;
          await el.updateComplete;
          expect(announcements()).to.deep.equal([]);

          await finished(2);
          expect(announcements()).to.deep.equal(['2,468']);
        });

        it('should not announce the first count or a restart', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="1357" duration="50"></wa-number-ticker>`,
          );
          await finished();

          el.restart();
          await finished(2);

          expect(announcements()).to.deep.equal([]);
        });

        it('should not announce a value set while the ticker is still on its start value', async () => {
          const el = await fixture<WaNumberTicker>(html`<wa-number-ticker duration="50"></wa-number-ticker>`);
          await finished();

          el.value = 9753;
          await finished(2);

          expect(announcements()).to.deep.equal([]);
        });

        it('should announce only the last of several rapid changes', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50"></wa-number-ticker>`,
          );
          await finished();

          el.duration = 300;
          for (const value of [111, 222, 333]) {
            el.value = value;
            await el.updateComplete;
          }
          await finished(2);
          await aTimeout(100);

          expect(announcements()).to.deep.equal(['333']);
        });

        it('should announce the finished value even if a wa-finish listener changes it', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50"></wa-number-ticker>`,
          );
          await finished();

          el.addEventListener('wa-finish', () => (el.value = 999), { once: true });
          el.value = 2468;
          await finished(3);

          expect(announcements()).to.deep.equal(['2,468', '999']);
        });

        it('should announce right away with reduced motion', async () => {
          stubReducedMotion(true);
          const el = await fixture<WaNumberTicker>(html`<wa-number-ticker value="100"></wa-number-ticker>`);
          await finished();

          el.value = 4321;
          await finished(2);

          expect(announcements()).to.deep.equal(['4,321']);
        });

        it('should count from the number shown to the new value', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50" easing="linear"></wa-number-ticker>`,
          );
          await finished();

          el.duration = 300;
          el.value = 200;
          await waitUntil(() => shownNumber(el) > 100 && shownNumber(el) < 200, 'never showed a number in between');
          expect(announced(el)).to.equal('200');
          await finished(2);

          expect(shown(el)).to.equal('200');
          expect(finishHandler).to.have.been.calledTwice;
        });

        it('should not delay later value changes', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50"></wa-number-ticker>`,
          );
          await finished();

          el.delay = 60000;
          el.value = 200;
          await finished(2);

          expect(shown(el)).to.equal('200');
        });

        it('should emit wa-finish once when the value changes rapidly', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="100"></wa-number-ticker>`,
          );
          await waitUntil(() => el.getAnimations().length > 0);

          for (const value of [200, 300, 400]) {
            el.value = value;
            await el.updateComplete;
          }
          await finished();
          await aTimeout(200);

          expect(shown(el)).to.equal('400');
          expect(finishHandler).to.have.been.calledOnce;
        });
      });

      describe('restart()', () => {
        it('should count again from the start value', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50" easing="linear"></wa-number-ticker>`,
          );
          await finished();

          el.duration = 300;
          el.restart();
          await waitUntil(() => shownNumber(el) > 0 && shownNumber(el) < 100, 'never showed a number in between');
          await finished(2);

          expect(shown(el)).to.equal('100');
        });

        it('should apply the delay again', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50"></wa-number-ticker>`,
          );
          await finished();

          el.delay = 60000;
          el.restart();
          await aTimeout(200);

          expect(shown(el)).to.equal('0');
          expect(finishHandler).to.have.been.calledOnce;
        });
      });

      describe('reduced motion', () => {
        it('should show the final value right away and still emit wa-finish', async () => {
          stubReducedMotion(true);
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="60000"></wa-number-ticker>`,
          );
          await finished();

          expect(shown(el)).to.equal('100');
          expect(el.getAnimations()).to.have.lengthOf(0);
        });
      });

      describe('formatting', () => {
        // A long delay holds the ticker on its start value so the formatting can be read without racing the count.
        const format = async (template: ReturnType<typeof html>) => {
          const el = await fixture<WaNumberTicker>(template);
          return { el, start: shown(el), end: announced(el) };
        };

        it('should group digits by default', async () => {
          const { end } = await format(html`<wa-number-ticker value="1234567" delay="60000"></wa-number-ticker>`);
          expect(end).to.equal('1,234,567');
        });

        it('should turn off grouping with without-grouping', async () => {
          const { end } = await format(
            html`<wa-number-ticker value="1234567" delay="60000" without-grouping></wa-number-ticker>`,
          );
          expect(end).to.equal('1234567');
        });

        it('should format currency', async () => {
          const { start, end } = await format(
            html`<wa-number-ticker
              type="currency"
              currency="EUR"
              value="1234.5"
              delay="60000"
              lang="en"
            ></wa-number-ticker>`,
          );
          expect(start).to.equal('€0.00');
          expect(end).to.equal('€1,234.50');
        });

        it('should format percentages', async () => {
          const { end } = await format(
            html`<wa-number-ticker type="percent" value="0.87" delay="60000"></wa-number-ticker>`,
          );
          expect(end).to.equal('87%');
        });

        it('should localize with the lang attribute', async () => {
          const { end } = await format(
            html`<wa-number-ticker value="1234567.89" delay="60000" lang="de"></wa-number-ticker>`,
          );
          expect(end).to.equal('1.234.567,89');
        });

        it('should keep the decimal places of the value for the whole count', async () => {
          const { start, end } = await format(html`<wa-number-ticker value="99.5" delay="60000"></wa-number-ticker>`);
          expect(start).to.equal('0.0');
          expect(end).to.equal('99.5');
        });

        it('should ignore floating point noise when inferring decimal places', async () => {
          const { el } = await format(html`<wa-number-ticker delay="60000"></wa-number-ticker>`);
          el.value = 0.1 + 0.2;
          await el.updateComplete;

          expect(announced(el)).to.equal('0.3');
        });

        it('should use a single fraction digit option for both the minimum and maximum', async () => {
          const max = await format(
            html`<wa-number-ticker value="99.5" delay="60000" maximum-fraction-digits="2"></wa-number-ticker>`,
          );
          const min = await format(
            html`<wa-number-ticker value="99.5" delay="60000" minimum-fraction-digits="2"></wa-number-ticker>`,
          );

          expect(max.start).to.equal('0.00');
          expect(max.end).to.equal('99.50');
          expect(min.start).to.equal('0.00');
          expect(min.end).to.equal('99.50');
        });

        it('should use the valueFormatter when set', async () => {
          const { el } = await format(html`<wa-number-ticker value="2500" delay="60000"></wa-number-ticker>`);
          el.valueFormatter = value => `${value / 1000} kB`;
          await el.updateComplete;

          expect(shown(el)).to.equal('0 kB');
          expect(announced(el)).to.equal('2.5 kB');
        });

        it('should render nothing when formatting throws and still finish', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="100" duration="50"></wa-number-ticker>`,
          );
          el.valueFormatter = () => {
            throw new Error('Nope');
          };
          await finished();

          expect(shown(el)).to.equal('');
        });

        it('should render nothing when the value is not a number', async () => {
          const el = await fixture<WaNumberTicker>(
            html`<wa-number-ticker value="abc" start-value="abc"></wa-number-ticker>`,
          );
          expect(shown(el)).to.equal('');
          expect(announced(el)).to.be.null;
        });
      });
    });
  }
});
