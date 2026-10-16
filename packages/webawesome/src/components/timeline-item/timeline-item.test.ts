import { expect, html, waitUntil } from '@open-wc/testing';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTimelineItem from './timeline-item.js';

describe('<wa-timeline-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should render as a listitem', async () => {
          const el = await fixture<WaTimelineItem>(html`<wa-timeline-item>Ordered</wa-timeline-item>`);

          expect(el.getAttribute('role')).to.equal('listitem');
        });

        it('should be accessible', async () => {
          // <wa-timeline-item> renders role="listitem", which ARIA requires to live inside a role="list" container,
          // so test it inside its real parent.
          const timeline = await fixture<HTMLElement>(html`
            <wa-timeline>
              <wa-timeline-item>Shipped</wa-timeline-item>
            </wa-timeline>
          `);

          await expect(timeline).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaTimelineItem>(html`<wa-timeline-item>Ordered</wa-timeline-item>`);

          expect(el.variant).to.equal('neutral');
          expect(el.withOpposite).to.be.false;
        });

        it('should reflect variant', async () => {
          const el = await fixture<WaTimelineItem>(
            html`<wa-timeline-item variant="success">Ordered</wa-timeline-item>`,
          );

          expect(el.variant).to.equal('success');
          expect(el.getAttribute('variant')).to.equal('success');
        });
      });

      describe('slots', () => {
        it('should hide the opposite wrapper when the opposite slot is empty', async () => {
          const el = await fixture<WaTimelineItem>(html`<wa-timeline-item>Shipped</wa-timeline-item>`);
          await waitUntil(() => el.shadowRoot!.querySelector('[part~="opposite"]')!.hasAttribute('hidden'));
        });

        it('should show the opposite wrapper when the opposite slot has content', async () => {
          const el = await fixture<WaTimelineItem>(html`
            <wa-timeline-item with-opposite>
              <wa-format-date slot="opposite" date="2026-09-16"></wa-format-date>
              Shipped
            </wa-timeline-item>
          `);
          await waitUntil(() => !el.shadowRoot!.querySelector('[part~="opposite"]')!.hasAttribute('hidden'));
        });

        it('should hide the opposite wrapper again when with-opposite is set but nothing is slotted', async () => {
          const el = await fixture<WaTimelineItem>(html`<wa-timeline-item with-opposite>Shipped</wa-timeline-item>`);
          await waitUntil(() => el.shadowRoot!.querySelector('[part~="opposite"]')!.hasAttribute('hidden'));
        });

        it('should let a slotted icon replace the default marker content', async () => {
          const el = await fixture<WaTimelineItem>(html`
            <wa-timeline-item>
              <wa-icon slot="icon" name="check"></wa-icon>
              Done
            </wa-timeline-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('[part~="marker"] slot[name="icon"]')!;

          expect(slot.assignedElements().map(node => node.localName)).to.deep.equal(['wa-icon']);
        });
      });

      describe('CSS parts', () => {
        it('should expose the documented CSS parts', async () => {
          const el = await fixture<WaTimelineItem>(html`<wa-timeline-item>Ordered</wa-timeline-item>`);

          ['timeline-item', 'marker', 'connector', 'content', 'opposite'].forEach(part => {
            expect(el.shadowRoot!.querySelector(`[part~="${part}"]`), part).to.exist;
          });
        });
      });
    });
  }
});
