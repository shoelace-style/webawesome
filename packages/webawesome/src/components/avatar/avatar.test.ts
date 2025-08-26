import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaAvatar from './avatar.js';

const ignoredRules = ['color-contrast'];

describe('<wa-avatar>', () => {
  let el: WaAvatar;

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('when provided no parameters', () => {
        beforeEach(async () => {
          el = await fixture<WaAvatar>(html` <wa-avatar label="Avatar"></wa-avatar> `);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should default to circle styling', () => {
          expect(el.getAttribute('shape')).to.eq('circle');
        });
      });

      describe('when provided an image and label parameter', () => {
        const image = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        const label = 'Small transparent square';
        beforeEach(async () => {
          el = await fixture<WaAvatar>(html`<wa-avatar image="${image}" label="${label}"></wa-avatar>`);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('renders "image" part with src and proper aria-label', () => {
          const part = el.shadowRoot!.querySelector('[part~="image"]')!;
          expect(part.getAttribute('src')).to.eq(image);
          expect(part.getAttribute('aria-label')).to.eq(label);
        });
      });

      describe('when provided initials parameter', () => {
        const initials = 'SL';
        beforeEach(async () => {
          el = await fixture<WaAvatar>(html`<wa-avatar initials="${initials}" label="Avatar"></wa-avatar>`);
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('renders "initials" part with initials and proper aria-label', () => {
          const part = el.shadowRoot!.querySelector<HTMLElement>('[part~="initials"]')!;
          expect(part.innerText).to.eq(initials);
          expect(part.getAttribute('aria-label')).to.eq('Avatar');
        });
      });

      ['square', 'rounded', 'circle'].forEach(shape => {
        describe(`when passed a shape attribute ${shape}`, () => {
          beforeEach(async () => {
            el = await fixture<WaAvatar>(html`<wa-avatar shape="${shape}" label="Shaped avatar"></wa-avatar>`);
          });

          it('should pass accessibility tests', async () => {
            await expect(el).to.be.accessible({ ignoredRules });
          });

          it('reflects the shape attribute', () => {
            expect(el.getAttribute('shape')).to.eq(shape);
          });
        });
      });

      describe('when passed a <span>, on slot "icon"', () => {
        beforeEach(async () => {
          el = await fixture<WaAvatar>(
            html`<wa-avatar label="Avatar"><span slot="icon">random content</span></wa-avatar>`,
          );
        });

        it('should pass accessibility tests', async () => {
          await expect(el).to.be.accessible({ ignoredRules });
        });

        it('should accept as an assigned child in the shadow root', () => {
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name=icon]')!;
          const childNodes = slot.assignedNodes({ flatten: true }) as HTMLElement[];
          expect(childNodes.length).to.eq(1);
          expect(childNodes[0].innerHTML).to.eq('random content');
        });
      });

      it('should not render the image when the image fails to load', async () => {
        el = await fixture<WaAvatar>(html`<wa-avatar></wa-avatar>`);
        el.image = 'bad_image';

        await el.updateComplete;
        await waitUntil(() => el.shadowRoot?.querySelector('img') === null);
        expect(el.shadowRoot?.querySelector('img')).to.be.null;
      });

      it('should show a valid image after being passed an invalid image initially', async () => {
        el = await fixture<WaAvatar>(html`<wa-avatar></wa-avatar>`);

        await aTimeout(0);
        await el.updateComplete;
        expect(el.shadowRoot!.querySelector('img')).to.be.null;

        el.image = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        await el.updateComplete;

        expect(el.shadowRoot?.querySelector('img')).to.exist;
      });
    });
  }
});
