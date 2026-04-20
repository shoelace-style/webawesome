import { expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaAnimatedImage from './animated-image.js';

async function loadImage(el: WaAnimatedImage, file: string) {
  const loadingPromise = oneEvent(el, 'wa-load');
  el.src = file;
  await loadingPromise;
}

describe('<wa-animated-image>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await expect(el).to.be.accessible();
        });
      });

      describe('properties', () => {
        it('should have default property values', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);

          expect(el.play).to.not.be.true;
          expect(el.src).to.be.undefined;
          expect(el.alt).to.be.undefined;
        });

        it('should reflect the play attribute', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');

          el.play = true;
          await el.updateComplete;
          expect(el.hasAttribute('play')).to.be.true;

          el.play = false;
          await el.updateComplete;
          expect(el.hasAttribute('play')).to.be.false;
        });
      });

      describe('loading', () => {
        const files = ['docs/assets/images/walk.gif', 'docs/assets/images/tie.webp'];

        for (const file of files) {
          it(`should load ${file} without errors`, async () => {
            const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
            let errorCount = 0;
            oneEvent(el, 'wa-error').then(() => errorCount++);
            await loadImage(el, file);

            expect(errorCount).to.equal(0);
          });
        }

        it('should emit wa-error on an invalid URL', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          const errorPromise = oneEvent(el, 'wa-error');
          el.src = 'completelyWrong';
          await errorPromise;
        });
      });

      describe('play and pause', () => {
        it('should play on click', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');

          expect(el.play).to.not.be.true;
          await clickOnElement(el);
          expect(el.play).to.be.true;
        });

        it('should pause and resume on click', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');

          el.play = true;
          await clickOnElement(el);
          expect(el.play).to.be.false;

          await clickOnElement(el);
          expect(el.play).to.be.true;
        });

        it('should toggle play on Enter key', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');

          const div = el.shadowRoot!.querySelector('.animated-image')!;
          div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          expect(el.play).to.be.true;

          div.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
          expect(el.play).to.be.false;
        });

        it('should toggle play on Space key', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');

          const div = el.shadowRoot!.querySelector('.animated-image')!;
          div.dispatchEvent(new KeyboardEvent('keydown', { key: ' ', bubbles: true }));
          expect(el.play).to.be.true;
        });
      });

      describe('slots', () => {
        it('should have a play-icon slot', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');
          const slot = el.shadowRoot!.querySelector('slot[name="play-icon"]');
          expect(slot).to.exist;
        });

        it('should have a pause-icon slot', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');
          const slot = el.shadowRoot!.querySelector('slot[name="pause-icon"]');
          expect(slot).to.exist;
        });
      });

      describe('CSS parts', () => {
        it('should have a control-box part when loaded', async () => {
          const el = await fixture<WaAnimatedImage>(html`<wa-animated-image></wa-animated-image>`);
          await loadImage(el, 'docs/assets/images/walk.gif');
          expect(el.shadowRoot!.querySelector('[part~="control-box"]')).to.exist;
        });
      });
    });
  }
});
