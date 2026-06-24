import { expect } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaRandomContent from './random-content.js';

function visibleChildren(el: WaRandomContent): Element[] {
  return Array.from(el.children).filter(c => !(c as HTMLElement).hidden);
}

function hiddenChildren(el: WaRandomContent): Element[] {
  return Array.from(el.children).filter(c => (c as HTMLElement).hidden);
}

// Force a known prefers-reduced-motion result without touching the real OS setting. Only the
// reduced-motion query is overridden; other media queries fall through to their default.
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

describe('<wa-random-content>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <span>A</span>
              <span>B</span>
            </wa-random-content>
          `);
          await expect(el).to.be.accessible();
        });
      });

      describe('default behavior', () => {
        it('shows exactly one child on mount', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          expect(visibleChildren(el)).to.have.lengthOf(1);
          expect(hiddenChildren(el)).to.have.lengthOf(2);
        });

        it('shows the only child when there is one', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <span>Only</span>
            </wa-random-content>
          `);
          expect(visibleChildren(el)).to.have.lengthOf(1);
        });
      });

      describe('items property', () => {
        it('shows the requested number of children', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content items="2">
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
            </wa-random-content>
          `);
          expect(visibleChildren(el)).to.have.lengthOf(2);
        });

        it('clamps items to childCount when items exceeds children', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content items="10">
              <span>A</span>
              <span>B</span>
            </wa-random-content>
          `);
          expect(visibleChildren(el)).to.have.lengthOf(2);
        });

        it('clamps items to 1 when items is 0 or negative', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content items="0">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          expect(visibleChildren(el)).to.have.lengthOf(1);
        });
      });

      describe('animation', () => {
        it('plays a fade animation on shown elements when animation="fade"', async () => {
          // Force motion on so the test doesn't depend on the runner's OS setting.
          const stub = stubReducedMotion(false);
          try {
            const el = await fixture<WaRandomContent>(html`
              <wa-random-content animation="fade">
                <span>A</span>
                <span>B</span>
                <span>C</span>
              </wa-random-content>
            `);
            el.randomize();
            const shown = visibleChildren(el)[0] as HTMLElement;
            expect(shown.getAnimations().length).to.be.greaterThan(0);
          } finally {
            stub.restore();
          }
        });

        it('plays no animation by default', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          const shown = visibleChildren(el)[0] as HTMLElement;
          expect(shown.getAnimations().length).to.equal(0);
        });
      });

      describe('margin', () => {
        it('strips the leading and trailing block margins from a single shown element', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="sequence">
              <p>A</p>
              <p>B</p>
              <p>C</p>
            </wa-random-content>
          `);
          const shown = visibleChildren(el)[0] as HTMLElement;
          expect(parseFloat(shown.style.marginBlockStart)).to.equal(0);
          expect(parseFloat(shown.style.marginBlockEnd)).to.equal(0);
        });

        it('keeps inner margins between shown elements when items > 1', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="sequence" items="2">
              <p>A</p>
              <p>B</p>
              <p>C</p>
            </wa-random-content>
          `);
          const shown = visibleChildren(el) as HTMLElement[];
          // First shown: leading margin stripped, trailing margin preserved.
          expect(parseFloat(shown[0].style.marginBlockStart)).to.equal(0);
          expect(shown[0].style.marginBlockEnd).to.equal('');
          // Last shown: trailing margin stripped, leading margin preserved.
          expect(shown[1].style.marginBlockStart).to.equal('');
          expect(parseFloat(shown[1].style.marginBlockEnd)).to.equal(0);
        });
      });

      describe('randomize() method', () => {
        it('can be called imperatively to trigger a new selection', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          el.randomize();
          expect(visibleChildren(el)).to.have.lengthOf(1);
        });

        it('shows exactly `items` children after each call', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content items="2">
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
            </wa-random-content>
          `);
          el.randomize();
          expect(visibleChildren(el)).to.have.lengthOf(2);
          el.randomize();
          expect(visibleChildren(el)).to.have.lengthOf(2);
        });
      });

      describe('mode="sequence"', () => {
        it('advances through children in DOM order', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="sequence">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          const [a, b, c] = Array.from(el.children) as HTMLElement[];
          const first = visibleChildren(el)[0];

          el.randomize();
          const second = visibleChildren(el)[0];

          // Second pick should be the next sibling of the first
          const firstIdx = [a, b, c].indexOf(first as HTMLElement);
          const expectedSecond = [a, b, c][(firstIdx + 1) % 3];
          expect(second).to.equal(expectedSecond);
        });

        it('wraps around to the beginning after the last child', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="sequence">
              <span>A</span>
              <span>B</span>
            </wa-random-content>
          `);
          const first = visibleChildren(el)[0];
          el.randomize();
          el.randomize();
          // After 2 more calls on 2 children we're back to the start
          expect(visibleChildren(el)[0]).to.equal(first);
        });

        it('resets cursor when mode changes to sequence', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="sequence">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          const first = visibleChildren(el)[0];
          el.randomize(); // advance cursor
          el.mode = 'random';
          await el.updateComplete;
          el.mode = 'sequence';
          await el.updateComplete;
          // cursor reset — first shown item is children[0]
          expect(visibleChildren(el)[0]).to.equal(first);
        });
      });

      describe('mode="unique"', () => {
        it('does not show the same child twice in a row', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="unique">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          const first = visibleChildren(el)[0];
          el.randomize();
          expect(visibleChildren(el)[0]).not.to.equal(first);
        });

        it('never shows the same item immediately after pool exhaustion', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="unique">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          // Exhaust the pool: initial + 2 calls shows all 3 children
          el.randomize();
          el.randomize();
          const lastShown = visibleChildren(el)[0];
          // Pool is now exhausted — history resets, but the last-shown item must not repeat
          el.randomize();
          expect(visibleChildren(el)[0]).not.to.equal(lastShown);
        });

        it('resets the pool and continues showing items after exhaustion', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="unique">
              <span>A</span>
              <span>B</span>
            </wa-random-content>
          `);
          // Exhaust the 2-child pool and verify a new pick works
          el.randomize();
          el.randomize();
          expect(visibleChildren(el)).to.have.lengthOf(1);
        });

        it('resets the queue when mode changes away and back', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="unique">
              <span>A</span>
              <span>B</span>
            </wa-random-content>
          `);
          el.randomize(); // exhaust
          el.mode = 'random';
          await el.updateComplete;
          el.mode = 'unique';
          await el.updateComplete;
          expect(visibleChildren(el)).to.have.lengthOf(1);
        });

        it('never shows the same child twice in a row across many cycles', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="unique">
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
            </wa-random-content>
          `);
          let prev = visibleChildren(el)[0];
          for (let i = 0; i < 40; i++) {
            el.randomize();
            const curr = visibleChildren(el)[0];
            expect(curr).not.to.equal(prev, `duplicate at iteration ${i}`);
            prev = curr;
          }
        });
      });

      describe('defaults', () => {
        it('defaults to unique mode', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <span>A</span>
              <span>B</span>
            </wa-random-content>
          `);
          expect(el.mode).to.equal('unique');
        });
      });

      describe('hiding', () => {
        it('hides unselected children with the hidden attribute, not inline display', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          const hidden = hiddenChildren(el) as HTMLElement[];
          expect(hidden).to.have.lengthOf(2);
          hidden.forEach(c => expect(c.hasAttribute('hidden')).to.be.true);
          const shown = visibleChildren(el)[0] as HTMLElement;
          expect(shown.hasAttribute('hidden')).to.be.false;
          expect(shown.style.display).to.not.equal('none');
        });

        it('visually hides children that set their own display (e.g. a layout class)', async () => {
          // A bare [hidden] loses to an author `display`; the component must still hide these.
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content>
              <div style="display: flex">A</div>
              <div style="display: flex">B</div>
              <div style="display: flex">C</div>
            </wa-random-content>
          `);
          const hidden = hiddenChildren(el) as HTMLElement[];
          expect(hidden.length).to.be.greaterThan(0);
          hidden.forEach(c => expect(getComputedStyle(c).display).to.equal('none'));
        });
      });

      describe('wa-content-change event', () => {
        it('emits with the shown items and matches the randomize() return value', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content items="2">
              <span>A</span>
              <span>B</span>
              <span>C</span>
              <span>D</span>
            </wa-random-content>
          `);
          const emitted: Element[][] = [];
          el.addEventListener('wa-content-change', (e: Event) => emitted.push((e as CustomEvent).detail.items));
          const returned = el.randomize();
          // randomize() dispatches synchronously, so the last emitted detail is from this call.
          expect(returned).to.have.lengthOf(2);
          expect(emitted[emitted.length - 1]).to.deep.equal(returned);
          returned.forEach(item => expect((item as HTMLElement).hidden).to.be.false);
        });
      });

      describe('autoplay', () => {
        it('rotates automatically on the configured interval', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="sequence">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          const first = visibleChildren(el)[0];
          const clock = sinon.useFakeTimers();
          try {
            el.autoplay = true;
            el.autoplayInterval = 1000;
            await el.updateComplete;
            clock.tick(1000);
            expect(visibleChildren(el)[0]).to.not.equal(first);
          } finally {
            clock.restore();
          }
        });

        it('pauses on pointer interaction and resumes after', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="sequence">
              <span>A</span>
              <span>B</span>
              <span>C</span>
            </wa-random-content>
          `);
          const clock = sinon.useFakeTimers();
          try {
            el.autoplay = true;
            el.autoplayInterval = 1000;
            await el.updateComplete;
            el.dispatchEvent(new MouseEvent('mouseenter'));
            const paused = visibleChildren(el)[0];
            clock.tick(3000);
            expect(visibleChildren(el)[0]).to.equal(paused);
            el.dispatchEvent(new MouseEvent('mouseleave'));
            clock.tick(1000);
            expect(visibleChildren(el)[0]).to.not.equal(paused);
          } finally {
            clock.restore();
          }
        });
      });

      describe('reduced motion', () => {
        it('skips the entrance animation but keeps autoplaying', async () => {
          const stub = stubReducedMotion(true);
          try {
            const el = await fixture<WaRandomContent>(html`
              <wa-random-content animation="fade" mode="sequence">
                <span>A</span>
                <span>B</span>
                <span>C</span>
              </wa-random-content>
            `);
            // No entrance animation is applied under reduced motion.
            el.randomize();
            const shown = visibleChildren(el)[0] as HTMLElement;
            expect(shown.getAnimations().length).to.equal(0);
            expect(shown.dataset['waAnimation']).to.be.undefined;

            // ...but autoplay still advances (matching <wa-carousel>).
            const before = visibleChildren(el)[0];
            const clock = sinon.useFakeTimers();
            try {
              el.autoplay = true;
              el.autoplayInterval = 1000;
              await el.updateComplete;
              clock.tick(1000);
              expect(visibleChildren(el)[0]).to.not.equal(before);
            } finally {
              clock.restore();
            }
          } finally {
            stub.restore();
          }
        });
      });
    });
  }

  // Not part of the CSR/SSR fixture loop: the listener must be attached before the element mounts,
  // which the fixture helpers don't allow.
  describe('initial render', () => {
    it('emits wa-content-change on first render', async () => {
      await customElements.whenDefined('wa-random-content');
      const emitted: Element[][] = [];
      const el = document.createElement('wa-random-content') as WaRandomContent;
      el.addEventListener('wa-content-change', (e: Event) => emitted.push((e as CustomEvent).detail.items));
      el.innerHTML = '<span>A</span><span>B</span>';
      document.body.append(el);
      await el.updateComplete;
      // Covers the first-render emission specifically (the other event test only checks an explicit
      // randomize()). The listener has to be attached before mount to observe it.
      expect(emitted.length).to.be.at.least(1);
      expect(emitted[0]).to.have.lengthOf(1);
      el.remove();
    });
  });
});
