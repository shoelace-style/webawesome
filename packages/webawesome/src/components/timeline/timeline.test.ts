import { expect, html, waitUntil } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTimelineItem from '../timeline-item/timeline-item.js';
import type WaTimeline from './timeline.js';

const getItems = (el: Element) => [...el.querySelectorAll<WaTimelineItem>(':scope > wa-timeline-item')];
const part = (item: WaTimelineItem, name: string) => item.shadowRoot!.querySelector(`[part~="${name}"]`)!;
const rect = (el: Element) => el.getBoundingClientRect();
const center = (el: Element) => rect(el).top + rect(el).height / 2;

const previousVariant = (item: Element) => item.getAttribute('data-wa-timeline-previous-variant');

/** Resolves once the timeline has handed every item but the first shown its previous variant, i.e. after a sync. */
const whenSynced = async (el: WaTimeline) => {
  const items = getItems(el);
  await waitUntil(() => items.filter(item => previousVariant(item) !== null).length === items.length - 1);
  await Promise.all(items.map(item => item.updateComplete));
};

describe('<wa-timeline>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should render a role="list" on the timeline part', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);

          expect(el.shadowRoot!.querySelector('[part~="timeline"]')!.getAttribute('role')).to.equal('list');
        });

        it('should be accessible', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item>Ordered</wa-timeline-item>
              <wa-timeline-item>Shipped</wa-timeline-item>
            </wa-timeline>
          `);

          await expect(el).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaTimeline>(html`<wa-timeline></wa-timeline>`);

          expect(el.orientation).to.equal('vertical');
          expect(el.markerPlacement).to.equal('start');
          expect(el.markerAlignment).to.equal('start');
          expect(el.reverse).to.be.false;
        });

        it('should reflect orientation', async () => {
          const el = await fixture<WaTimeline>(html`<wa-timeline orientation="horizontal"></wa-timeline>`);

          expect(el.orientation).to.equal('horizontal');
          expect(el.getAttribute('orientation')).to.equal('horizontal');
        });

        it('should reflect marker-placement', async () => {
          const el = await fixture<WaTimeline>(html`<wa-timeline marker-placement="alternate"></wa-timeline>`);

          expect(el.markerPlacement).to.equal('alternate');
          expect(el.getAttribute('marker-placement')).to.equal('alternate');
        });

        it('should reflect marker-alignment', async () => {
          const el = await fixture<WaTimeline>(html`<wa-timeline marker-alignment="center"></wa-timeline>`);

          expect(el.markerAlignment).to.equal('center');
          expect(el.getAttribute('marker-alignment')).to.equal('center');
        });

        it('should reflect reverse', async () => {
          const el = await fixture<WaTimeline>(html`<wa-timeline reverse></wa-timeline>`);

          expect(el.reverse).to.be.true;
          expect(el.hasAttribute('reverse')).to.be.true;
        });
      });

      describe('item sync', () => {
        it('should hand each item its layout as data-wa-timeline-* attributes', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline orientation="horizontal">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, second] = getItems(el);

          await waitUntil(() => first.hasAttribute('data-wa-timeline-horizontal'));
          expect(first.hasAttribute('data-wa-timeline-placement')).to.be.false;
          expect(first.hasAttribute('data-wa-timeline-reverse')).to.be.false;

          el.orientation = 'vertical';
          el.markerPlacement = 'alternate';
          el.markerAlignment = 'center';
          el.reverse = true;
          await waitUntil(() => second.getAttribute('data-wa-timeline-placement') === 'alternate-end');

          expect(first.getAttribute('data-wa-timeline-placement')).to.equal('alternate-start');
          expect(first.hasAttribute('data-wa-timeline-horizontal')).to.be.false;
          expect(first.hasAttribute('data-wa-timeline-center')).to.be.true;
          expect(first.hasAttribute('data-wa-timeline-reverse')).to.be.true;

          el.markerPlacement = 'end';
          await waitUntil(() => first.getAttribute('data-wa-timeline-placement') === 'end');

          // Placement and alignment are vertical-only, so they clear when the timeline goes horizontal.
          el.orientation = 'horizontal';
          el.reverse = false;
          await waitUntil(() => !first.hasAttribute('data-wa-timeline-center'));

          expect(first.hasAttribute('data-wa-timeline-placement')).to.be.false;
          expect(first.hasAttribute('data-wa-timeline-reverse')).to.be.false;
        });

        it('should tell each item the variant of the item shown before it', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item variant="success">First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
              <wa-timeline-item variant="danger">Third</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, second, third] = getItems(el);

          await whenSynced(el);
          expect(previousVariant(first)).to.be.null;
          expect(previousVariant(second)).to.equal('success');
          expect(previousVariant(third)).to.equal('neutral');

          el.reverse = true;
          await waitUntil(() => previousVariant(second) === 'danger');
          expect(previousVariant(third)).to.be.null;
          expect(previousVariant(first)).to.equal('neutral');

          el.reverse = false;
          first.setAttribute('variant', 'warning');
          await waitUntil(() => previousVariant(second) === 'warning');
        });

        it('should scope its sync to its own items, not a timeline nested inside one', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item variant="success">Outer first</wa-timeline-item>
              <wa-timeline-item>
                Outer second
                <wa-timeline>
                  <wa-timeline-item>Inner first</wa-timeline-item>
                  <wa-timeline-item>Inner second</wa-timeline-item>
                </wa-timeline>
              </wa-timeline-item>
            </wa-timeline>
          `);
          const [, outerSecond] = getItems(el);
          const inner = el.querySelector('wa-timeline wa-timeline')! as WaTimeline;
          const [innerFirst, innerSecond] = getItems(inner);

          await whenSynced(el);
          await whenSynced(inner);
          expect(previousVariant(outerSecond)).to.equal('success');
          expect(previousVariant(innerSecond)).to.equal('neutral');

          innerFirst.setAttribute('variant', 'danger');
          await waitUntil(() => previousVariant(innerSecond) === 'danger');
          expect(previousVariant(outerSecond)).to.equal('success');
        });
      });

      describe('reverse', () => {
        it('should render items last to first when reverse is set, and restore document order when unset', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline reverse>
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
              <wa-timeline-item>Third</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, , third] = getItems(el);

          await waitUntil(() => first.getAttribute('slot') === 'item-0');
          await el.updateComplete;

          const slotNames = [...el.shadowRoot!.querySelectorAll('slot[name]')].map(slot => slot.getAttribute('name'));
          expect(slotNames).to.deep.equal(['item-2', 'item-1', 'item-0']);
          expect(rect(third).top).to.be.lessThan(rect(first).top);

          el.reverse = false;
          await waitUntil(() => !first.hasAttribute('slot'));
          await el.updateComplete;

          expect(el.shadowRoot!.querySelectorAll('slot[name]').length).to.equal(0);
          expect(rect(first).top).to.be.lessThan(rect(third).top);
        });

        it('should show an item appended to a reversed timeline at the top', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline reverse>
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);
          const [first] = getItems(el);
          await waitUntil(() => first.getAttribute('slot') === 'item-0');

          const added = document.createElement('wa-timeline-item');
          added.textContent = 'Third';
          el.append(added);

          await waitUntil(() => added.getAttribute('slot') === 'item-2');
          await el.updateComplete;
          expect(rect(added).top).to.be.lessThan(rect(first).top);
        });

        it("should hide the first item's connector instead of the last one's when reversed", async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline reverse>
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Last</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, last] = getItems(el);
          await waitUntil(() => first.hasAttribute('data-wa-timeline-reverse'));
          await Promise.all([first.updateComplete, last.updateComplete]);

          expect(getComputedStyle(part(first, 'connector')).display).to.equal('none');
          expect(getComputedStyle(part(last, 'connector')).display).to.not.equal('none');
        });
      });

      describe('layout', () => {
        it('should lay items out side by side when horizontal', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline orientation="horizontal">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, second] = getItems(el);
          await waitUntil(() => second.hasAttribute('data-wa-timeline-horizontal'));
          await Promise.all([first.updateComplete, second.updateComplete]);

          expect(rect(second).left).to.be.greaterThan(rect(first).right - 1);
          expect(Math.abs(rect(part(first, 'marker')).top - rect(part(second, 'marker')).top)).to.be.lessThan(1);
          // The content sits below the marker instead of beside it.
          expect(rect(part(first, 'content')).top).to.be.greaterThan(rect(part(first, 'marker')).bottom - 1);
        });

        it('should put content on the start side of the marker with end placement', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline marker-placement="end">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, second] = getItems(el);
          await waitUntil(() => second.getAttribute('data-wa-timeline-placement') === 'end');
          await Promise.all([first.updateComplete, second.updateComplete]);

          expect(rect(part(first, 'content')).right).to.be.lessThan(rect(part(first, 'marker')).left + 1);
          expect(rect(part(second, 'content')).right).to.be.lessThan(rect(part(second, 'marker')).left + 1);
        });

        it('should put alternating items on opposite sides of the rail', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline marker-placement="alternate">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
              <wa-timeline-item>Third</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, second, third] = getItems(el);
          await waitUntil(() => third.getAttribute('data-wa-timeline-placement') === 'alternate-start');
          await Promise.all([first.updateComplete, second.updateComplete, third.updateComplete]);

          const railX = rect(part(first, 'marker')).left + rect(part(first, 'marker')).width / 2;

          expect(rect(part(first, 'content')).right).to.be.lessThan(railX);
          expect(rect(part(second, 'content')).left).to.be.greaterThan(railX);
          expect(rect(part(third, 'content')).right).to.be.lessThan(railX);
          // The rail stays straight down the middle.
          expect(Math.abs(rect(part(second, 'marker')).left - rect(part(first, 'marker')).left)).to.be.lessThan(1);
        });

        it('should center the marker on the item with marker-alignment="center"', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline marker-alignment="center">
              <wa-timeline-item><div style="height: 200px;">First</div></wa-timeline-item>
              <wa-timeline-item><div style="height: 200px;">Second</div></wa-timeline-item>
            </wa-timeline>
          `);
          const [first, last] = getItems(el);
          await waitUntil(() => last.hasAttribute('data-wa-timeline-center'));
          await Promise.all([first.updateComplete, last.updateComplete]);

          // The marker sits at the item's vertical midpoint instead of its top.
          expect(Math.abs(center(part(first, 'marker')) - center(first))).to.be.lessThan(1);

          // The first item shown has no incoming half above its marker and the last has no outgoing half below it.
          const half = (item: WaTimelineItem, pseudo: string) =>
            getComputedStyle(part(item, 'connector'), pseudo).display;
          expect(half(first, '::before')).to.equal('none');
          expect(half(first, '::after')).to.not.equal('none');
          expect(half(last, '::before')).to.not.equal('none');
          expect(half(last, '::after')).to.equal('none');
        });
      });

      describe('connector color', () => {
        it('should color the connector with --connector-color unless the item has a non-neutral variant', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline style="--connector-color: rgb(1, 2, 3);">
              <wa-timeline-item>Neutral by default</wa-timeline-item>
              <wa-timeline-item variant="success">Success</wa-timeline-item>
              <wa-timeline-item>Last</wa-timeline-item>
            </wa-timeline>
          `);
          const [neutral, success] = getItems(el);
          await whenSynced(el);

          expect(getComputedStyle(part(neutral, 'connector')).backgroundColor).to.equal('rgb(1, 2, 3)');
          expect(getComputedStyle(part(success, 'connector')).backgroundColor).to.not.equal('rgb(1, 2, 3)');
        });

        it('should color a centered connector by the previous item above the marker and by itself below', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline marker-alignment="center" style="--connector-color: rgb(1, 2, 3);">
              <wa-timeline-item variant="success"><div style="height: 120px;">First</div></wa-timeline-item>
              <wa-timeline-item><div style="height: 120px;">Second</div></wa-timeline-item>
              <wa-timeline-item variant="danger"><div style="height: 120px;">Third</div></wa-timeline-item>
            </wa-timeline>
          `);
          const [first, second, third] = getItems(el);
          await whenSynced(el);
          await waitUntil(() => third.hasAttribute('data-wa-timeline-center'));

          const half = (item: WaTimelineItem, pseudo: string) =>
            getComputedStyle(part(item, 'connector'), pseudo).backgroundColor;

          expect(half(second, '::before')).to.equal(half(first, '::after'));
          expect(half(second, '::before')).to.not.equal('rgb(1, 2, 3)');
          expect(half(second, '::after')).to.equal('rgb(1, 2, 3)');
          // A neutral previous item hands down --connector-color, not the neutral fill.
          expect(half(third, '::before')).to.equal('rgb(1, 2, 3)');
        });
      });
    });
  }
});
