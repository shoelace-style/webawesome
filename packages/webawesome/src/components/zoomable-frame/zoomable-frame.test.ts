import { aTimeout, expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import type WaZoomableFrame from './zoomable-frame.js';

describe('<wa-zoomable-frame>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-zoomable-frame></wa-zoomable-frame> `);

    expect(el).to.exist;
  });

  describe('theme sync', () => {
    afterEach(() => {
      document.documentElement.classList.remove('wa-dark', 'wa-light', 'wa-theme-test');
    });

    it('should sync host theme classes to the iframe on load', async () => {
      document.documentElement.classList.add('wa-dark');
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      // Wait for handleLoad → syncTheme to run, not just readyState
      await waitUntil(() => el.contentDocument?.documentElement.classList.contains('wa-dark'));
      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.true;
    });

    it('should not sync theme classes on load when without-theme-sync is set', async () => {
      document.documentElement.classList.add('wa-dark');
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame without-theme-sync srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      await waitUntil(() => el.contentDocument?.readyState === 'complete');
      await aTimeout(50); // ensure any load handlers have had a chance to fire
      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.false;
    });

    it('should sync theme classes when the host document changes', async () => {
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      await waitUntil(() => el.contentDocument?.readyState === 'complete');

      document.documentElement.classList.add('wa-dark');
      await aTimeout(0); // MutationObserver fires asynchronously

      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.true;
    });

    it('should not react to host class changes when without-theme-sync is set', async () => {
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame without-theme-sync srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      await waitUntil(() => el.contentDocument?.readyState === 'complete');

      document.documentElement.classList.add('wa-dark');
      await aTimeout(0);

      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.false;
    });

    it('should stop syncing when without-theme-sync is toggled on at runtime', async () => {
      document.documentElement.classList.add('wa-dark');
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      await waitUntil(() => el.contentDocument?.documentElement.classList.contains('wa-dark'));

      el.withoutThemeSync = true;
      await el.updateComplete;

      document.documentElement.classList.replace('wa-dark', 'wa-light');
      await aTimeout(0);

      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.true;
      expect(el.contentDocument!.documentElement.classList.contains('wa-light')).to.be.false;
    });

    it('should resume syncing when without-theme-sync is removed at runtime', async () => {
      document.documentElement.classList.add('wa-dark');
      const el = await fixture<WaZoomableFrame>(html`
        <wa-zoomable-frame without-theme-sync srcdoc="<html><body>test</body></html>"></wa-zoomable-frame>
      `);
      await waitUntil(() => el.contentDocument?.readyState === 'complete');
      expect(el.contentDocument!.documentElement.classList.contains('wa-dark')).to.be.false;

      el.withoutThemeSync = false;
      await el.updateComplete;

      document.documentElement.classList.add('wa-light');
      await aTimeout(0);

      expect(el.contentDocument!.documentElement.classList.contains('wa-light')).to.be.true;
    });
  });
});
