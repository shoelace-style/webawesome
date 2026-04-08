import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaIntersectionObserver from './intersection-observer.js';

describe('<wa-intersection-observer>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have default property values', async () => {
          const el = await fixture<WaIntersectionObserver>(
            html`<wa-intersection-observer></wa-intersection-observer>`,
          );

          expect(el.root).to.be.null;
          expect(el.rootMargin).to.equal('0px');
          expect(el.threshold).to.equal('0');
          expect(el.intersectClass).to.equal('');
          expect(el.once).to.be.false;
          expect(el.disabled).to.be.false;
        });

        it('should reflect the "once" property to an attribute', async () => {
          const el = await fixture<WaIntersectionObserver>(
            html`<wa-intersection-observer once></wa-intersection-observer>`,
          );

          expect(el.once).to.be.true;
          expect(el.hasAttribute('once')).to.be.true;
        });

        it('should reflect the "disabled" property to an attribute', async () => {
          const el = await fixture<WaIntersectionObserver>(
            html`<wa-intersection-observer disabled></wa-intersection-observer>`,
          );

          expect(el.disabled).to.be.true;
          expect(el.hasAttribute('disabled')).to.be.true;
        });

        it('should accept a root-margin attribute', async () => {
          const el = await fixture<WaIntersectionObserver>(
            html`<wa-intersection-observer root-margin="10px 20px"></wa-intersection-observer>`,
          );

          expect(el.rootMargin).to.equal('10px 20px');
        });

        it('should accept a threshold attribute', async () => {
          const el = await fixture<WaIntersectionObserver>(
            html`<wa-intersection-observer threshold="0.5"></wa-intersection-observer>`,
          );

          expect(el.threshold).to.equal('0.5');
        });

        it('should accept an intersect-class attribute', async () => {
          const el = await fixture<WaIntersectionObserver>(
            html`<wa-intersection-observer intersect-class="visible"></wa-intersection-observer>`,
          );

          expect(el.intersectClass).to.equal('visible');
        });

        it('should accept a root attribute', async () => {
          const el = await fixture<WaIntersectionObserver>(
            html`<wa-intersection-observer root="my-root"></wa-intersection-observer>`,
          );

          expect(el.root).to.equal('my-root');
        });
      });

      describe('events', () => {
        it('should emit wa-intersect events for slotted children', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaIntersectionObserver>(html`
            <wa-intersection-observer>
              <div style="width: 100px; height: 100px;">Test</div>
            </wa-intersection-observer>
          `);

          el.addEventListener('wa-intersect', handler);

          // The intersection observer fires asynchronously after setup
          await waitUntil(() => handler.called, 'wa-intersect event should fire');
          expect(handler).to.have.been.called;

          const event = handler.firstCall.args[0];
          expect(event.detail).to.have.property('entry');
        });

        it('should not emit events when disabled', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaIntersectionObserver>(html`
            <wa-intersection-observer disabled>
              <div style="width: 100px; height: 100px;">Test</div>
            </wa-intersection-observer>
          `);

          el.addEventListener('wa-intersect', handler);
          await aTimeout(200);

          expect(handler).not.to.have.been.called;
        });

        it('should stop emitting events after disabling', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaIntersectionObserver>(html`
            <wa-intersection-observer>
              <div style="width: 100px; height: 100px;">Test</div>
            </wa-intersection-observer>
          `);

          // Wait for initial intersection event
          el.addEventListener('wa-intersect', handler);
          await waitUntil(() => handler.called, 'wa-intersect event should fire');

          const countBefore = handler.callCount;

          // Disable the observer
          el.disabled = true;
          await el.updateComplete;
          await aTimeout(200);

          // No additional events should fire after disabling
          expect(handler.callCount).to.equal(countBefore);
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaIntersectionObserver>(html`
            <wa-intersection-observer>
              <div id="child">Hello</div>
            </wa-intersection-observer>
          `);

          const child = el.querySelector('#child');
          expect(child).to.exist;
          expect(child!.textContent).to.equal('Hello');
        });

        it('should observe multiple slotted children', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaIntersectionObserver>(html`
            <wa-intersection-observer>
              <div style="width: 50px; height: 50px;">One</div>
              <div style="width: 50px; height: 50px;">Two</div>
            </wa-intersection-observer>
          `);

          el.addEventListener('wa-intersect', handler);

          // Should eventually fire events for both children
          await waitUntil(() => handler.callCount >= 2, 'should fire events for multiple children');
          expect(handler.callCount).to.be.at.least(2);
        });
      });
    });
  }
});
