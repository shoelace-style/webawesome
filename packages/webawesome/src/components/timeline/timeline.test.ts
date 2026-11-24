import { expect, html, waitUntil } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTimelineItem from '../timeline-item/timeline-item.js';
import type WaTimeline from './timeline.js';

const getItems = (el: Element) => [...el.querySelectorAll<WaTimelineItem>(':scope > wa-timeline-item')];
const part = (item: WaTimelineItem, name: string) => item.shadowRoot!.querySelector(`[part~="${name}"]`)!;
const connector = (item: WaTimelineItem, half: 'start' | 'end') =>
  item.shadowRoot!.querySelector(`.connector-${half}`)!;
const rect = (el: Element) => el.getBoundingClientRect();
const center = (el: Element) => rect(el).top + rect(el).height / 2;

/** Resolves once the timeline and its items have rendered. */
const whenSynced = async (el: WaTimeline) => {
  await el.updateComplete;
  await Promise.all(getItems(el).map(item => item.updateComplete));
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

        it('should not set aria-label on the timeline part by default', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item>First</wa-timeline-item>
            </wa-timeline>
          `);

          expect(el.shadowRoot!.querySelector('[part~="timeline"]')!.hasAttribute('aria-label')).to.be.false;
        });

        it('should set aria-label on the timeline part from label', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline label="Order history">
              <wa-timeline-item>First</wa-timeline-item>
            </wa-timeline>
          `);

          expect(el.shadowRoot!.querySelector('[part~="timeline"]')!.getAttribute('aria-label')).to.equal(
            'Order history',
          );
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaTimeline>(html`<wa-timeline></wa-timeline>`);

          expect(el.orientation).to.equal('vertical');
          expect(el.markerPlacement).to.equal('start');
          expect(el.markerAlignment).to.equal('start');
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

          el.orientation = 'vertical';
          el.markerPlacement = 'alternate';
          el.markerAlignment = 'center';
          await waitUntil(() => second.getAttribute('data-wa-timeline-placement') === 'alternate-end');

          expect(first.getAttribute('data-wa-timeline-placement')).to.equal('alternate-start');
          expect(first.hasAttribute('data-wa-timeline-horizontal')).to.be.false;
          expect(first.hasAttribute('data-wa-timeline-center')).to.be.true;

          el.markerPlacement = 'end';
          await waitUntil(() => first.getAttribute('data-wa-timeline-placement') === 'end');

          // Placement and alignment are vertical-only, so they clear when the timeline goes horizontal.
          el.orientation = 'horizontal';
          await waitUntil(() => !first.hasAttribute('data-wa-timeline-center'));

          expect(first.hasAttribute('data-wa-timeline-placement')).to.be.false;
        });

        it('should match :state(stacked) while an auto timeline is too narrow for a row', async () => {
          const wrapper = await fixture<HTMLDivElement>(html`
            <div style="width: 200px; font-size: 16px;">
              <wa-timeline orientation="auto">
                <wa-timeline-item>First</wa-timeline-item>
                <wa-timeline-item>Second</wa-timeline-item>
                <wa-timeline-item>Third</wa-timeline-item>
              </wa-timeline>
            </div>
          `);
          const el = wrapper.querySelector('wa-timeline')!;
          await whenSynced(el);
          await waitUntil(() => el.matches(':state(stacked)'), 'a narrow auto timeline never stacked');

          wrapper.style.width = '800px';
          await waitUntil(() => !el.matches(':state(stacked)'), 'a wide auto timeline never became a row');
        });

        it('should scope its sync to its own items, not a timeline nested inside one', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline marker-placement="end">
              <wa-timeline-item>Outer first</wa-timeline-item>
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

          await waitUntil(() => outerSecond.getAttribute('data-wa-timeline-placement') === 'end');
          await whenSynced(inner);

          expect(innerFirst.hasAttribute('data-wa-timeline-placement')).to.be.false;
          expect(innerSecond.hasAttribute('data-wa-timeline-placement')).to.be.false;
        });
      });

      describe('prepending', () => {
        it('should show a prepended item first and hand off the connector', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Last</wa-timeline-item>
            </wa-timeline>
          `);
          await whenSynced(el);
          const [first, last] = getItems(el);

          const added = document.createElement('wa-timeline-item');
          added.variant = 'success';
          added.textContent = 'Newest';
          el.prepend(added);

          await added.updateComplete;

          expect(rect(added).top).to.be.lessThan(rect(first).top);
          expect(getComputedStyle(connector(added, 'start')).display).to.equal('none');
          expect(getComputedStyle(connector(added, 'end')).display).to.not.equal('none');
          expect(getComputedStyle(connector(first, 'start')).display).to.not.equal('none');
          expect(getComputedStyle(connector(last, 'end')).display).to.equal('none');
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

        it('should end-align content with end placement so it hugs the rail', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline marker-placement="end">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);
          const [first, second] = getItems(el);
          await waitUntil(() => second.getAttribute('data-wa-timeline-placement') === 'end');
          await Promise.all([first.updateComplete, second.updateComplete]);

          expect(getComputedStyle(part(first, 'content')).textAlign).to.equal('end');
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
          const display = (item: WaTimelineItem, half: 'start' | 'end') =>
            getComputedStyle(connector(item, half)).display;
          expect(display(first, 'start')).to.equal('none');
          expect(display(first, 'end')).to.not.equal('none');
          expect(display(last, 'start')).to.not.equal('none');
          expect(display(last, 'end')).to.equal('none');

          // The halves meet in the middle of the gap and run behind the marker.
          expect(rect(connector(first, 'end')).bottom).to.be.closeTo(rect(connector(last, 'start')).top, 0.5);
          expect(rect(connector(last, 'start')).bottom).to.be.closeTo(center(part(last, 'marker')), 0.5);
        });

        it('should center the connector under the marker in both directions', async () => {
          for (const dir of ['ltr', 'rtl']) {
            const wrapper = await fixture<HTMLElement>(html`
              <div dir=${dir}>
                <wa-timeline style="--connector-width: 4px;">
                  <wa-timeline-item>First</wa-timeline-item>
                  <wa-timeline-item>Second</wa-timeline-item>
                </wa-timeline>
              </div>
            `);
            const el = wrapper.querySelector<WaTimeline>('wa-timeline')!;
            await whenSynced(el);
            const [first, second] = getItems(el);
            const middle = (target: Element) => rect(target).left + rect(target).width / 2;

            expect(middle(connector(first, 'end'))).to.be.closeTo(middle(part(first, 'marker')), 0.5);
            expect(middle(connector(second, 'start'))).to.be.closeTo(middle(part(second, 'marker')), 0.5);
          }
        });

        it('should keep content taller than the marker inside the timeline', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline style="font-size: 16px; line-height: 1.8;">
              <wa-timeline-item>
                <span style="font-size: 32px; line-height: 1.2;">Big heading first</span>
                <span slot="opposite">Date</span>
              </wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);
          await whenSynced(el);
          const [first, second] = getItems(el);

          expect(rect(part(first, 'content')).top).to.be.at.least(rect(el).top - 0.5);
          expect(rect(part(first, 'opposite')).top).to.be.at.least(rect(el).top - 0.5);

          // The connector still stops one --connector-gap short of the next marker, which sits lower in its item.
          const gap = parseFloat(getComputedStyle(el).fontSize) * 0.35;
          expect(rect(connector(first, 'end')).bottom).to.be.closeTo(rect(connector(second, 'start')).top, 0.5);
          expect(rect(part(second, 'marker')).top - rect(connector(second, 'start')).bottom).to.be.closeTo(gap, 1);
        });

        it('should center the marker on a first line taller than the marker', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline style="font-size: 16px; line-height: 1.8;">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Second</wa-timeline-item>
            </wa-timeline>
          `);
          await whenSynced(el);
          const [first] = getItems(el);
          const lineHeight = 16 * 1.8;

          const lineCenter = rect(part(first, 'content')).top + lineHeight / 2;
          expect(center(part(first, 'marker'))).to.be.closeTo(lineCenter, 1);
        });

        it('should join connectors between items with different marker sizes', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline style="font-size: 16px;">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item style="--marker-size: 2.5em;">Second</wa-timeline-item>
              <wa-timeline-item>Third</wa-timeline-item>
            </wa-timeline>
          `);
          await whenSynced(el);
          const items = getItems(el);
          const gap = 16 * 0.35;

          for (let index = 0; index < items.length - 1; index++) {
            const [current, next] = [items[index], items[index + 1]];

            // The halves abut, and the incoming half stops one --connector-gap above the next marker.
            expect(rect(connector(current, 'end')).bottom).to.be.closeTo(rect(connector(next, 'start')).top, 0.5);
            expect(rect(part(next, 'marker')).top - rect(connector(next, 'start')).bottom).to.be.closeTo(gap, 0.5);
          }
        });

        it('should join horizontal connectors between items of different widths and marker sizes', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline orientation="horizontal" style="font-size: 16px;">
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item style="min-inline-size: 300px;">Second</wa-timeline-item>
              <wa-timeline-item style="--marker-size: 2.5em;">Third</wa-timeline-item>
            </wa-timeline>
          `);
          const items = getItems(el);
          await waitUntil(() => items.every(item => item.hasAttribute('data-wa-timeline-horizontal')));
          await whenSynced(el);
          const gap = 16 * 0.35;
          const middle = (target: Element) => rect(target).top + rect(target).height / 2;

          for (let index = 0; index < items.length - 1; index++) {
            const [current, next] = [items[index], items[index + 1]];

            expect(rect(connector(current, 'end')).right).to.be.closeTo(rect(connector(next, 'start')).left, 0.5);
            expect(rect(part(next, 'marker')).left - rect(connector(next, 'start')).right).to.be.closeTo(gap, 0.5);
          }

          // Markers of different sizes share one center line, and the connectors run along it.
          for (const item of items) {
            expect(middle(part(item, 'marker'))).to.be.closeTo(middle(part(items[0], 'marker')), 0.5);
          }
          for (const item of items.slice(1)) {
            expect(middle(connector(item, 'start'))).to.be.closeTo(middle(part(item, 'marker')), 0.5);
          }
        });

        it("should hide the last item's outgoing connector when a non-item element follows it", async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item>First</wa-timeline-item>
              <wa-timeline-item>Last</wa-timeline-item>
              <template></template>
            </wa-timeline>
          `);
          await whenSynced(el);
          const [, last] = getItems(el);

          expect(getComputedStyle(connector(last, 'end')).display).to.equal('none');
        });

        it('should wrap long unbroken content instead of overflowing', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline style="width: 300px;">
              <wa-timeline-item>${'a'.repeat(200)}</wa-timeline-item>
            </wa-timeline>
          `);
          await whenSynced(el);

          expect(el.scrollWidth).to.be.at.most(el.clientWidth + 1);
        });
      });

      describe('connector color', () => {
        it('should color every connector with --connector-color whatever the variant', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline style="--connector-color: rgb(1, 2, 3);">
              <wa-timeline-item>Neutral by default</wa-timeline-item>
              <wa-timeline-item variant="success">Success</wa-timeline-item>
              <wa-timeline-item>Last</wa-timeline-item>
            </wa-timeline>
          `);
          const [neutral, success] = getItems(el);
          await whenSynced(el);

          expect(getComputedStyle(connector(neutral, 'end')).backgroundColor).to.equal('rgb(1, 2, 3)');
          expect(getComputedStyle(connector(success, 'start')).backgroundColor).to.equal('rgb(1, 2, 3)');
          expect(getComputedStyle(connector(success, 'end')).backgroundColor).to.equal('rgb(1, 2, 3)');
        });

        it('should give a neutral marker the same quiet fill as the connector and other variants a louder one', async () => {
          const el = await fixture<WaTimeline>(html`
            <wa-timeline>
              <wa-timeline-item>Neutral by default</wa-timeline-item>
              <wa-timeline-item variant="success">Success</wa-timeline-item>
              <wa-timeline-item>Last</wa-timeline-item>
            </wa-timeline>
          `);
          const [neutral, success] = getItems(el);
          await whenSynced(el);
          const background = (target: Element) => getComputedStyle(target).backgroundColor;

          expect(background(part(neutral, 'marker'))).to.equal(background(connector(neutral, 'end')));
          expect(background(part(success, 'marker'))).to.not.equal(background(connector(success, 'end')));
        });
      });
    });
  }
});
