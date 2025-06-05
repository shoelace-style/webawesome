import { expect } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import type WaTag from './tag.js';

describe('<wa-tag>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should render default tag', async () => {
        const el = await fixture<WaTag>(html` <wa-tag>Test</wa-tag> `);
        expect(el.getAttribute('size')).to.equal('medium');
        expect(el.getAttribute('variant')).to.equal('neutral');
        expect(el.variant).to.equal('neutral');
      });

      it('should set variant by attribute', async () => {
        const el = await fixture<WaTag>(html` <wa-tag variant="danger">Test</wa-tag> `);
        expect(el.getAttribute('variant')).to.equal('danger');
      });

      it('should set size by attribute', async () => {
        const el = await fixture<WaTag>(html` <wa-tag size="large">Test</wa-tag> `);
        expect(el.getAttribute('size')).to.equal('large');
      });

      it('should set pill attribute', async () => {
        const el = await fixture<WaTag>(html` <wa-tag pill>Test</wa-tag> `);
        expect(el.hasAttribute('pill')).to.be.true;
      });

      it('should set removable by attribute', async () => {
        const el = await fixture<WaTag>(html` <wa-tag with-remove>Test</wa-tag> `);
        const removeButton = el.shadowRoot!.querySelector('wa-button');

        expect(el.withRemove).to.be.true;
        expect(removeButton).to.exist;
      });

      describe('removable', () => {
        it('should emit remove event when remove button clicked', async () => {
          const el = await fixture<WaTag>(html` <wa-tag with-remove>Test</wa-tag> `);
          const removeButton = el.shadowRoot!.querySelector('wa-button');
          const spy = sinon.spy();

          el.addEventListener('wa-remove', spy, { once: true });
          removeButton?.click();

          expect(spy.called).to.be.true;
        });
      });
    });
  }
});
