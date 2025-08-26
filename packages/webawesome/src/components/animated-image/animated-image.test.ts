import { expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import { clientFixture } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaAnimatedImage from './animated-image.js';

describe('<wa-animated-image>', () => {
  // @TODO: Figure out why hydrated tests are failing
  for (const fixture of [clientFixture]) {
    it('should render a component', async () => {
      const animatedImage = await fixture(html` <wa-animated-image></wa-animated-image> `);

      expect(animatedImage).to.exist;
    });

    it('should render be accessible', async () => {
      const animatedImage = await fixture(html` <wa-animated-image></wa-animated-image> `);

      await expect(animatedImage).to.be.accessible();
    });

    const files = ['docs/assets/images/walk.gif', 'docs/assets/images/tie.webp'];

    files.forEach((file: string) => {
      it(`should load a ${file} without errors`, async () => {
        const animatedImage = await fixture<WaAnimatedImage>(html` <wa-animated-image></wa-animated-image> `);
        let errorCount = 0;
        oneEvent(animatedImage, 'wa-error').then(() => errorCount++);
        await loadImage(animatedImage, file);

        expect(errorCount).to.be.equal(0);
      });

      it(`should play ${file} on click`, async () => {
        const animatedImage = await fixture<WaAnimatedImage>(html` <wa-animated-image></wa-animated-image> `);
        await loadImage(animatedImage, file);

        expect(animatedImage.play).not.to.be.true;

        await clickOnElement(animatedImage);

        expect(animatedImage.play).to.be.true;
      });

      it(`should pause and resume ${file} on click`, async () => {
        const animatedImage = await fixture<WaAnimatedImage>(html` <wa-animated-image></wa-animated-image> `);
        await loadImage(animatedImage, file);

        animatedImage.play = true;

        await clickOnElement(animatedImage);

        expect(animatedImage.play).to.be.false;

        await clickOnElement(animatedImage);

        expect(animatedImage.play).to.be.true;
      });
    });

    it('should emit an error event on invalid url', async () => {
      const animatedImage = await fixture<WaAnimatedImage>(html` <wa-animated-image></wa-animated-image> `);

      const errorPromise = oneEvent(animatedImage, 'wa-error');
      animatedImage.src = 'completelyWrong';

      await errorPromise;
    });
  }
});
async function loadImage(animatedImage: WaAnimatedImage, file: string) {
  const loadingPromise = oneEvent(animatedImage, 'wa-load');
  animatedImage.src = file;
  await loadingPromise;
}
