import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaZoomableFrame from './zoomable-frame.js';

// Waits for the iframe's srcdoc to fully load.
function waitForIframe(el: WaZoomableFrame) {
  return waitUntil(() => el.contentDocument?.URL === 'about:srcdoc' && el.contentDocument.readyState === 'complete');
}

describe('<wa-zoomable-frame>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('properties', () => {
        it('should have a default zoom of 1', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          expect(el.zoom).to.equal(1);
        });

        it('should reflect zoom to attribute', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          el.zoom = 0.5;
          await el.updateComplete;
          expect(el.getAttribute('zoom')).to.equal('0.5');
        });

        it('should accept zoom via attribute', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="0.75"></wa-zoomable-frame>`);
          expect(el.zoom).to.equal(0.75);
        });

        it('should accept src property', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame src="about:blank"></wa-zoomable-frame>`);
          expect(el.src).to.equal('about:blank');
        });

        it('should accept srcdoc property', async () => {
          const el = await fixture<WaZoomableFrame>(
            html`<wa-zoomable-frame srcdoc="<p>Hello</p>"></wa-zoomable-frame>`,
          );
          expect(el.srcdoc).to.equal('<p>Hello</p>');
        });

        it('should default loading to eager', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          expect(el.loading).to.equal('eager');
        });

        it('should default withoutControls to false', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          expect(el.withoutControls).to.be.false;
        });

        it('should default withoutInteraction to false', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          expect(el.withoutInteraction).to.be.false;
        });

        it('should default withThemeSync to false', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          expect(el.withThemeSync).to.be.false;
        });

        it('should have default zoom levels', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          expect(el.zoomLevels).to.equal('25% 50% 75% 100% 125% 150% 175% 200%');
        });

        it('should set --zoom CSS property when zoom changes', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="0.5"></wa-zoomable-frame>`);
          expect(el.style.getPropertyValue('--zoom')).to.equal('0.5');
        });

        it('should provide contentWindow', async () => {
          const el = await fixture<WaZoomableFrame>(
            html`<wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>`,
          );
          await waitForIframe(el);
          expect(el.contentWindow).to.not.be.null;
        });

        it('should provide contentDocument', async () => {
          const el = await fixture<WaZoomableFrame>(
            html`<wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>`,
          );
          await waitForIframe(el);
          expect(el.contentDocument).to.not.be.null;
        });

        it('should make iframe inert when withoutInteraction is set', async () => {
          const el = await fixture<WaZoomableFrame>(
            html`<wa-zoomable-frame without-interaction srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>`,
          );

          const iframe = el.shadowRoot!.querySelector('iframe')!;
          expect(iframe.hasAttribute('inert')).to.be.true;
        });
      });

      describe('zoom controls', () => {
        it('should show controls by default', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          const controls = el.shadowRoot!.querySelector('[part="controls"]');
          expect(controls).to.exist;
        });

        it('should hide controls when without-controls is set', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame without-controls></wa-zoomable-frame>`);
          const controls = el.shadowRoot!.querySelector('[part="controls"]');
          expect(controls).to.not.exist;
        });

        it('should zoom in when zoomIn() is called', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="1"></wa-zoomable-frame>`);
          el.zoomIn();
          await el.updateComplete;
          expect(el.zoom).to.equal(1.25);
        });

        it('should zoom out when zoomOut() is called', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="1"></wa-zoomable-frame>`);
          el.zoomOut();
          await el.updateComplete;
          expect(el.zoom).to.equal(0.75);
        });

        it('should not zoom in beyond the maximum zoom level', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="2"></wa-zoomable-frame>`);
          el.zoomIn();
          await el.updateComplete;
          expect(el.zoom).to.equal(2);
        });

        it('should not zoom out beyond the minimum zoom level', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="0.25"></wa-zoomable-frame>`);
          el.zoomOut();
          await el.updateComplete;
          expect(el.zoom).to.equal(0.25);
        });

        it('should zoom in when clicking the zoom in button', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="1"></wa-zoomable-frame>`);
          const zoomInButton = el.shadowRoot!.querySelector<HTMLElement>('[part="zoom-in-button"]')!;
          zoomInButton.click();
          await el.updateComplete;
          expect(el.zoom).to.equal(1.25);
        });

        it('should zoom out when clicking the zoom out button', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="1"></wa-zoomable-frame>`);
          const zoomOutButton = el.shadowRoot!.querySelector<HTMLElement>('[part="zoom-out-button"]')!;
          zoomOutButton.click();
          await el.updateComplete;
          expect(el.zoom).to.equal(0.75);
        });

        it('should disable zoom in button at max level', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="2"></wa-zoomable-frame>`);
          await el.updateComplete;
          const zoomInButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="zoom-in-button"]')!;
          expect(zoomInButton.hasAttribute('disabled')).to.be.true;
        });

        it('should disable zoom out button at min level', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame zoom="0.25"></wa-zoomable-frame>`);
          await el.updateComplete;
          const zoomOutButton = el.shadowRoot!.querySelector<HTMLButtonElement>('[part="zoom-out-button"]')!;
          expect(zoomOutButton.hasAttribute('disabled')).to.be.true;
        });

        it('should support custom zoom levels', async () => {
          const el = await fixture<WaZoomableFrame>(
            html`<wa-zoomable-frame zoom="1" zoom-levels="50% 100% 200%"></wa-zoomable-frame>`,
          );
          el.zoomIn();
          await el.updateComplete;
          expect(el.zoom).to.equal(2);
        });
      });

      describe('slots', () => {
        it('should render zoom-in-icon and zoom-out-icon slots', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          const zoomInSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="zoom-in-icon"]');
          const zoomOutSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="zoom-out-icon"]');
          expect(zoomInSlot).to.exist;
          expect(zoomOutSlot).to.exist;
        });
      });

      describe('theme sync', () => {
        afterEach(() => {
          document.documentElement.classList.remove('wa-dark', 'wa-light', 'wa-theme-test');
        });

        it('should not sync host theme classes to the iframe by default', async () => {
          document.documentElement.classList.add('wa-dark');
          const el = await fixture<WaZoomableFrame>(html`
            <wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
          `);
          await waitForIframe(el);
          await aTimeout(50);
          expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.false;
        });

        it('should sync theme classes when with-theme-sync is set', async () => {
          document.documentElement.classList.add('wa-dark');
          const el = await fixture<WaZoomableFrame>(html`
            <wa-zoomable-frame with-theme-sync srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
          `);
          await waitUntil(
            () =>
              el.contentDocument?.URL === 'about:srcdoc' &&
              el.contentDocument.documentElement.classList.contains('wa-dark'),
          );
          expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.true;
        });

        it('should not react to host class changes by default', async () => {
          const el = await fixture<WaZoomableFrame>(html`
            <wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
          `);
          await waitForIframe(el);

          document.documentElement.classList.add('wa-dark');
          await aTimeout(0);

          expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.false;
        });

        it('should sync when host document changes with with-theme-sync', async () => {
          const el = await fixture<WaZoomableFrame>(html`
            <wa-zoomable-frame with-theme-sync srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
          `);
          await waitForIframe(el);

          document.documentElement.classList.add('wa-dark');
          await aTimeout(0);

          expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.true;
        });

        it('should stop syncing when with-theme-sync is removed', async () => {
          document.documentElement.classList.add('wa-dark');
          const el = await fixture<WaZoomableFrame>(html`
            <wa-zoomable-frame with-theme-sync srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
          `);
          await waitUntil(
            () =>
              el.contentDocument?.URL === 'about:srcdoc' &&
              el.contentDocument.documentElement.classList.contains('wa-dark'),
          );

          el.withThemeSync = false;
          await el.updateComplete;

          document.documentElement.classList.replace('wa-dark', 'wa-light');
          await aTimeout(0);

          expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.true;
          expect(el.contentDocument!.documentElement.classList.contains('wa-light')).to.be.false;
        });

        it('should start syncing when with-theme-sync is added at runtime', async () => {
          document.documentElement.classList.add('wa-dark');
          const el = await fixture<WaZoomableFrame>(html`
            <wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
          `);
          await waitForIframe(el);
          expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.false;

          el.withThemeSync = true;
          await el.updateComplete;

          document.documentElement.classList.replace('wa-dark', 'wa-light');
          await aTimeout(0);

          expect(el.contentDocument!.documentElement.classList.contains('wa-light')).to.be.true;
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the expected CSS parts', async () => {
          const el = await fixture<WaZoomableFrame>(html`<wa-zoomable-frame></wa-zoomable-frame>`);
          expect(el.shadowRoot!.querySelector('[part="iframe"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part="controls"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part="zoom-in-button"]')).to.exist;
          expect(el.shadowRoot!.querySelector('[part="zoom-out-button"]')).to.exist;
        });
      });
    });
  }
});
