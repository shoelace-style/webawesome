import { expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaQrCode from './qr-code.js';

const getCanvas = (el: WaQrCode): HTMLCanvasElement => {
  const canvas = el.shadowRoot?.querySelector<HTMLCanvasElement>('canvas');
  expect(canvas).to.exist;
  return canvas!;
};

describe('<wa-qr-code>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="test data"></wa-qr-code>`);
          await expect(el).to.be.accessible();
        });

        it('should use the value as the aria-label when no label is provided', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="test data"></wa-qr-code>`);
          const canvas = getCanvas(el);
          expect(canvas.getAttribute('role')).to.equal('img');
          expect(canvas.getAttribute('aria-label')).to.equal('test data');
        });

        it('should use the label attribute as the aria-label when provided', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="test data" label="Scan me"></wa-qr-code>`);
          const canvas = getCanvas(el);
          expect(canvas.getAttribute('aria-label')).to.equal('Scan me');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code></wa-qr-code>`);
          expect(el.value).to.equal('');
          expect(el.label).to.equal('');
          expect(el.size).to.equal(128);
          expect(el.fill).to.equal('');
          expect(el.background).to.equal('');
          expect(el.radius).to.equal(0);
          expect(el.errorCorrection).to.equal('H');
        });

        it('should render a canvas element', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="hello"></wa-qr-code>`);
          const canvas = getCanvas(el);
          expect(canvas).to.be.instanceOf(HTMLCanvasElement);
        });

        it('should reflect the size as the rendered dimensions', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="test data" size="100"></wa-qr-code>`);
          await waitUntil(() => el.getBoundingClientRect().width > 0);
          const rect = el.getBoundingClientRect();
          expect(rect.width).to.equal(100);
          expect(rect.height).to.equal(100);
        });

        it('should accept different error-correction levels', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="test" error-correction="L"></wa-qr-code>`);
          expect(el.errorCorrection).to.equal('L');
        });

        it('should accept a radius value', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="test" radius="0.5"></wa-qr-code>`);
          expect(el.radius).to.equal(0.5);
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the base CSS part on the canvas', async () => {
          const el = await fixture<WaQrCode>(html`<wa-qr-code value="test"></wa-qr-code>`);
          const canvas = getCanvas(el);
          expect(canvas.part.contains('base')).to.be.true;
        });
      });
    });
  }
});
