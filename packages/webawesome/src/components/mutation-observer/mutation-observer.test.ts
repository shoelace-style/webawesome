import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaMutationObserver from './mutation-observer.js';

describe('<wa-mutation-observer>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have default property values', async () => {
          const el = await fixture<WaMutationObserver>(html`<wa-mutation-observer></wa-mutation-observer>`);

          expect(el.attr).to.be.undefined;
          expect(el.attrOldValue).to.be.false;
          expect(el.charData).to.be.false;
          expect(el.charDataOldValue).to.be.false;
          expect(el.childList).to.be.false;
          expect(el.disabled).to.be.false;
        });

        it('should reflect the "disabled" property to an attribute', async () => {
          const el = await fixture<WaMutationObserver>(html`<wa-mutation-observer disabled></wa-mutation-observer>`);

          expect(el.disabled).to.be.true;
          expect(el.hasAttribute('disabled')).to.be.true;

          el.disabled = false;
          await el.updateComplete;
          expect(el.hasAttribute('disabled')).to.be.false;
        });

        it('should reflect the "attr" property to an attribute', async () => {
          const el = await fixture<WaMutationObserver>(
            html`<wa-mutation-observer attr="class"></wa-mutation-observer>`,
          );

          expect(el.attr).to.equal('class');
          expect(el.getAttribute('attr')).to.equal('class');
        });

        it('should reflect the "attr-old-value" property to an attribute', async () => {
          const el = await fixture<WaMutationObserver>(
            html`<wa-mutation-observer attr="*" attr-old-value></wa-mutation-observer>`,
          );

          expect(el.attrOldValue).to.be.true;
          expect(el.hasAttribute('attr-old-value')).to.be.true;
        });

        it('should reflect the "char-data" property to an attribute', async () => {
          const el = await fixture<WaMutationObserver>(html`<wa-mutation-observer char-data></wa-mutation-observer>`);

          expect(el.charData).to.be.true;
          expect(el.hasAttribute('char-data')).to.be.true;
        });

        it('should reflect the "char-data-old-value" property to an attribute', async () => {
          const el = await fixture<WaMutationObserver>(
            html`<wa-mutation-observer char-data char-data-old-value></wa-mutation-observer>`,
          );

          expect(el.charDataOldValue).to.be.true;
          expect(el.hasAttribute('char-data-old-value')).to.be.true;
        });

        it('should reflect the "child-list" property to an attribute', async () => {
          const el = await fixture<WaMutationObserver>(html`<wa-mutation-observer child-list></wa-mutation-observer>`);

          expect(el.childList).to.be.true;
          expect(el.hasAttribute('child-list')).to.be.true;
        });
      });

      describe('events', () => {
        it('should emit wa-mutation when a watched attribute changes', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaMutationObserver>(html`
            <wa-mutation-observer attr="class">
              <div class="initial">Hello</div>
            </wa-mutation-observer>
          `);

          el.addEventListener('wa-mutation', handler);

          // Trigger a mutation by changing the class attribute
          const child = el.querySelector('div')!;
          child.classList.add('changed');

          await waitUntil(() => handler.called, 'wa-mutation event should fire');

          const event = handler.firstCall.args[0];
          expect(event.detail).to.have.property('mutationList');
          expect(event.detail.mutationList).to.be.an('array');
          expect(event.detail.mutationList.length).to.be.greaterThan(0);
          expect(event.detail.mutationList[0].type).to.equal('attributes');
        });

        it('should emit wa-mutation when watching all attributes with "*"', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaMutationObserver>(html`
            <wa-mutation-observer attr="*">
              <div>Hello</div>
            </wa-mutation-observer>
          `);

          el.addEventListener('wa-mutation', handler);

          const child = el.querySelector('div')!;
          child.setAttribute('data-test', 'value');

          await waitUntil(() => handler.called, 'wa-mutation event should fire');
          expect(handler).to.have.been.called;
        });

        it('should only watch specified attributes when a filter is provided', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaMutationObserver>(html`
            <wa-mutation-observer attr="class">
              <div>Hello</div>
            </wa-mutation-observer>
          `);

          el.addEventListener('wa-mutation', handler);

          // Change an attribute that is NOT being watched
          const child = el.querySelector('div')!;
          child.setAttribute('data-test', 'value');

          await aTimeout(200);
          expect(handler).not.to.have.been.called;

          // Change the attribute that IS being watched
          child.classList.add('active');

          await waitUntil(() => handler.called, 'wa-mutation event should fire for watched attribute');
          expect(handler).to.have.been.called;
        });

        it('should emit wa-mutation when child-list changes', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaMutationObserver>(html`
            <wa-mutation-observer child-list>
              <div id="container"></div>
            </wa-mutation-observer>
          `);

          el.addEventListener('wa-mutation', handler);

          // Trigger a child list mutation
          const container = el.querySelector('#container')!;
          const newChild = document.createElement('span');
          newChild.textContent = 'New child';
          container.appendChild(newChild);

          await waitUntil(() => handler.called, 'wa-mutation event should fire for child list change');

          const event = handler.firstCall.args[0];
          expect(event.detail.mutationList[0].type).to.equal('childList');
        });

        it('should not emit events when disabled', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaMutationObserver>(html`
            <wa-mutation-observer attr="class" disabled>
              <div class="initial">Hello</div>
            </wa-mutation-observer>
          `);

          el.addEventListener('wa-mutation', handler);

          const child = el.querySelector('div')!;
          child.classList.add('changed');

          await aTimeout(200);
          expect(handler).not.to.have.been.called;
        });

        it('should resume observing after being re-enabled', async () => {
          const handler = sinon.spy();

          const el = await fixture<WaMutationObserver>(html`
            <wa-mutation-observer attr="class" disabled>
              <div class="initial">Hello</div>
            </wa-mutation-observer>
          `);

          el.addEventListener('wa-mutation', handler);

          // Re-enable the observer
          el.disabled = false;
          await el.updateComplete;

          // Trigger a mutation
          const child = el.querySelector('div')!;
          child.classList.add('changed');

          await waitUntil(() => handler.called, 'wa-mutation event should fire after re-enabling');
          expect(handler).to.have.been.called;
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaMutationObserver>(html`
            <wa-mutation-observer attr="*">
              <div id="child">Hello</div>
            </wa-mutation-observer>
          `);

          const child = el.querySelector('#child');
          expect(child).to.exist;
          expect(child!.textContent).to.equal('Hello');
        });
      });
    });
  }
});
