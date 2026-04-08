import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaResizeObserver from './resize-observer.js';

describe('<wa-resize-observer>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have default property values', async () => {
          const el = await fixture<WaResizeObserver>(html`<wa-resize-observer></wa-resize-observer>`);

          expect(el.disabled).to.be.false;
        });

        it('should reflect the "disabled" property to an attribute', async () => {
          const el = await fixture<WaResizeObserver>(html`<wa-resize-observer disabled></wa-resize-observer>`);

          expect(el.disabled).to.be.true;
          expect(el.hasAttribute('disabled')).to.be.true;

          el.disabled = false;
          await el.updateComplete;
          expect(el.hasAttribute('disabled')).to.be.false;
        });
      });

      describe('events', () => {
        it('should emit wa-resize for slotted children', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaResizeObserver>(html`
            <wa-resize-observer>
              <div style="width: 100px; height: 100px;">Content</div>
            </wa-resize-observer>
          `);

          el.addEventListener('wa-resize', handler);

          // ResizeObserver fires on initial observation
          await waitUntil(() => handler.called, 'wa-resize event should fire');

          const event = handler.firstCall.args[0];
          expect(event.detail).to.have.property('entries');
          expect(event.detail.entries).to.be.an('array');
          expect(event.detail.entries.length).to.be.greaterThan(0);
        });

        it('should emit wa-resize when a child element is resized', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaResizeObserver>(html`
            <wa-resize-observer>
              <div style="width: 100px; height: 100px;">Content</div>
            </wa-resize-observer>
          `);

          el.addEventListener('wa-resize', handler);

          // Wait for initial resize event
          await waitUntil(() => handler.called, 'initial wa-resize event should fire');
          handler.resetHistory();

          // Trigger a resize by changing the element dimensions
          const child = el.querySelector('div')!;
          child.style.width = '200px';
          child.style.height = '200px';

          await waitUntil(() => handler.called, 'wa-resize event should fire after resizing');
          expect(handler).to.have.been.called;
        });

        it('should not emit events when disabled', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaResizeObserver>(html`
            <wa-resize-observer disabled>
              <div style="width: 100px; height: 100px;">Content</div>
            </wa-resize-observer>
          `);

          el.addEventListener('wa-resize', handler);
          await aTimeout(200);

          expect(handler).not.to.have.been.called;
        });

        it('should stop observing when disabled programmatically', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaResizeObserver>(html`
            <wa-resize-observer>
              <div style="width: 100px; height: 100px;">Content</div>
            </wa-resize-observer>
          `);

          el.addEventListener('wa-resize', handler);

          // Wait for initial resize event
          await waitUntil(() => handler.called, 'initial wa-resize event should fire');
          handler.resetHistory();

          // Disable the observer
          el.disabled = true;
          await el.updateComplete;

          // Trigger a resize
          const child = el.querySelector('div')!;
          child.style.width = '300px';

          await aTimeout(200);
          expect(handler).not.to.have.been.called;
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaResizeObserver>(html`
            <wa-resize-observer>
              <div id="child">Hello</div>
            </wa-resize-observer>
          `);

          const child = el.querySelector('#child');
          expect(child).to.exist;
          expect(child!.textContent).to.equal('Hello');
        });

        it('should observe multiple slotted children', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaResizeObserver>(html`
            <wa-resize-observer>
              <div style="width: 50px; height: 50px;">One</div>
              <div style="width: 50px; height: 50px;">Two</div>
            </wa-resize-observer>
          `);

          el.addEventListener('wa-resize', handler);

          await waitUntil(() => handler.called, 'wa-resize event should fire for slotted children');
          expect(handler).to.have.been.called;
        });
      });
    });
  }
});
