import { aTimeout, expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import type WaZoomableFrame from './zoomable-frame.js';

// Waits for the iframe's srcdoc to fully load.
// The iframe initially has an about:blank document before srcdoc is applied, so
// we check for url === 'about:srcdoc' to ensure the srcdoc has actually loaded.
function waitForIframe(el: WaZoomableFrame) {
  return waitUntil(() => el.contentDocument?.URL === 'about:srcdoc' && el.contentDocument.readyState === 'complete');
}

describe('<wa-zoomable-frame>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-zoomable-frame></wa-zoomable-frame> `);

    expect(el).to.exist;
  });

  describe('theme sync', () => {
    afterEach(() => {
      document.documentElement.classList.remove('wa-dark', 'wa-light', 'wa-theme-test');
    });

    it('should not sync host theme classes to the iframe on load by default', async () => {
      document.documentElement.classList.add('wa-dark');
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      await waitForIframe(el);
      await aTimeout(50);
      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.false;
    });

    it('should sync theme classes on load when with-theme-sync is set', async () => {
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

    it('should sync theme classes when the host document changes and with-theme-sync is set', async () => {
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame with-theme-sync srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      await waitForIframe(el);

      document.documentElement.classList.add('wa-dark');
      await aTimeout(0);

      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.true;
    });

    it('should stop syncing when with-theme-sync is removed at runtime', async () => {
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
});
