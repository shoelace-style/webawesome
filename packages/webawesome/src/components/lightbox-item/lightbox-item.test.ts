import { expect } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaLightboxItem from './lightbox-item.js';

const pixel = `data:image/svg+xml,${encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="3" height="2"/>')}`;

const trigger = (el: WaLightboxItem) => el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="trigger"]')!;
const playButton = (el: WaLightboxItem) => el.shadowRoot!.querySelector<HTMLElement>('[part~="play-button"]')!;

describe('<wa-lightbox-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      it('should be accessible', async () => {
        const el = await fixture<WaLightboxItem>(html`
          <wa-lightbox-item src=${pixel}><img src=${pixel} alt="A pixel" /></wa-lightbox-item>
        `);

        await expect(el).to.be.accessible();
      });

      it('should name the trigger from its alt when the thumbnail is decorative', async () => {
        const el = await fixture<WaLightboxItem>(html`
          <wa-lightbox-item src=${pixel} alt="A pixel"><img src=${pixel} alt="" /></wa-lightbox-item>
        `);

        await expect(el).to.be.accessible();
      });

      it('should link the thumbnail to the full-size media', async () => {
        const el = await fixture<WaLightboxItem>(html`
          <wa-lightbox-item src=${pixel}><img src=${pixel} alt="A pixel" /></wa-lightbox-item>
        `);

        expect(trigger(el).getAttribute('href')).to.equal(pixel);
        expect(trigger(el).hasAttribute('role')).to.be.false;
      });

      it('should act as a button when it has no src', async () => {
        const el = await fixture<WaLightboxItem>(html`
          <wa-lightbox-item><img src=${pixel} alt="A pixel" /></wa-lightbox-item>
        `);
        let clicks = 0;
        el.addEventListener('click', () => clicks++);

        el.focus();
        await sendKeys({ press: 'Enter' });
        await sendKeys({ press: 'Space' });

        expect(trigger(el).getAttribute('role')).to.equal('button');
        expect(clicks).to.equal(2);
      });

      it('should use the alt text of the thumbnail unless it has its own', async () => {
        const el = await fixture<WaLightboxItem>(html`
          <wa-lightbox-item><img src=${pixel} alt="From the thumbnail" /></wa-lightbox-item>
        `);

        expect(el.resolvedAlt).to.equal('From the thumbnail');

        el.alt = 'From the item';

        expect(el.resolvedAlt).to.equal('From the item');
      });

      it('should have the empty state when nothing is slotted in', async () => {
        const el = await fixture<WaLightboxItem>(html`<wa-lightbox-item src=${pixel}></wa-lightbox-item>`);

        expect(el.matches(':state(empty)')).to.be.true;
      });

      it('should not count a template as a thumbnail', async () => {
        const el = await fixture<WaLightboxItem>(html`
          <wa-lightbox-item
            ><template><p>Content</p></template></wa-lightbox-item
          >
        `);

        expect(el.matches(':state(empty)')).to.be.true;
        expect(el.contentTemplate).to.exist;
      });

      it('should show a play button only for videos', async () => {
        const el = await fixture<WaLightboxItem>(html`
          <wa-lightbox-item src=${pixel}><img src=${pixel} alt="A pixel" /></wa-lightbox-item>
        `);

        expect(playButton(el).hidden).to.be.true;

        el.type = 'video';
        await el.updateComplete;

        expect(playButton(el).hidden).to.be.false;
      });
    });
  }
});
