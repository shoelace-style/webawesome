import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaRandomContent from './random-content.js';

function visibleChildren(el: WaRandomContent): Element[] {
  return Array.from(el.children).filter(c => (c as HTMLElement).style.display !== 'none');
}

function hiddenChildren(el: WaRandomContent): Element[] {
  return Array.from(el.children).filter(c => (c as HTMLElement).style.display === 'none');
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

        it('clears history and allows repeats when pool is exhausted', async () => {
          const el = await fixture<WaRandomContent>(html`
            <wa-random-content mode="unique">
              <span>A</span>
              <span>B</span>
            </wa-random-content>
          `);
          // Exhaust the pool (2 children, 2 calls)
          el.randomize();
          // Third call should clear history and pick again without error
          el.randomize();
          expect(visibleChildren(el)).to.have.lengthOf(1);
        });

        it('resets history when mode changes away and back', async () => {
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
          // history cleared — should show exactly 1 child normally
          expect(visibleChildren(el)).to.have.lengthOf(1);
        });
      });
    });
  }
});
