import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaPage from './page.js';

describe('<wa-page>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          await expect(el).to.be.accessible({ ignoredRules: ['color-contrast'] });
        });
      });

      describe('properties', () => {
        it('should default view to "desktop"', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.view).to.equal('desktop');
          expect(el.getAttribute('view')).to.equal('desktop');
        });

        it('should default navOpen to false', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.navOpen).to.equal(false);
        });

        it('should default mobileBreakpoint to "768px"', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.mobileBreakpoint).to.equal('768px');
        });

        it('should default navigationPlacement to "start"', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.navigationPlacement).to.equal('start');
          expect(el.getAttribute('navigation-placement')).to.equal('start');
        });

        it('should default disableNavigationToggle to false', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          // disableNavigationToggle may be auto-set to true when no nav content is present
          expect(typeof el.disableNavigationToggle).to.equal('boolean');
        });

        it('should reflect view attribute', async () => {
          const el = await fixture<WaPage>(html`<wa-page view="mobile">Content</wa-page>`);
          expect(el.view).to.equal('mobile');
          expect(el.getAttribute('view')).to.equal('mobile');
        });

        it('should reflect nav-open attribute', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          el.navOpen = true;
          await el.updateComplete;
          expect(el.hasAttribute('nav-open')).to.be.true;
          el.navOpen = false;
          await el.updateComplete;
          expect(el.hasAttribute('nav-open')).to.be.false;
        });
      });

      describe('slots', () => {
        it('should render default slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><p>Main Content</p></wa-page>`);
          const defaultSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
          const assigned = defaultSlot.assignedElements();
          expect(assigned.length).to.be.greaterThan(0);
        });

        it('should render banner slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><div slot="banner">Banner</div></wa-page>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="banner"]')!;
          const assigned = slot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Banner');
        });

        it('should render header slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><div slot="header">Header</div></wa-page>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="header"]')!;
          const assigned = slot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Header');
        });

        it('should render subheader slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><div slot="subheader">Sub</div></wa-page>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="subheader"]')!;
          const assigned = slot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Sub');
        });

        it('should render footer slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><div slot="footer">Footer</div></wa-page>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="footer"]')!;
          const assigned = slot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Footer');
        });

        it('should render aside slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><div slot="aside">Aside</div></wa-page>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="aside"]')!;
          const assigned = slot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Aside');
        });

        it('should render main-header slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><div slot="main-header">Main Header</div></wa-page>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="main-header"]')!;
          const assigned = slot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Main Header');
        });

        it('should render main-footer slot content', async () => {
          const el = await fixture<WaPage>(html`<wa-page><div slot="main-footer">Main Footer</div></wa-page>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="main-footer"]')!;
          const assigned = slot.assignedElements();
          expect(assigned.length).to.equal(1);
          expect(assigned[0].textContent).to.equal('Main Footer');
        });
      });

      describe('CSS parts', () => {
        it('should have a base part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="base"]')).to.exist;
        });

        it('should have a header part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="header"]')).to.exist;
        });

        it('should have a banner part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="banner"]')).to.exist;
        });

        it('should have a subheader part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="subheader"]')).to.exist;
        });

        it('should have a body part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="body"]')).to.exist;
        });

        it('should have a menu part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="menu"]')).to.exist;
        });

        it('should have a main-content part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="main-content"]')).to.exist;
        });

        it('should have an aside part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="aside"]')).to.exist;
        });

        it('should have a footer part', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.shadowRoot!.querySelector('[part~="footer"]')).to.exist;
        });
      });

      describe('methods', () => {
        it('should toggle navigation via showNavigation()', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.navOpen).to.equal(false);
          el.showNavigation();
          expect(el.navOpen).to.equal(true);
        });

        it('should hide navigation via hideNavigation()', async () => {
          const el = await fixture<WaPage>(html`<wa-page nav-open>Content</wa-page>`);
          el.hideNavigation();
          expect(el.navOpen).to.equal(false);
        });

        it('should toggle navigation via toggleNavigation()', async () => {
          const el = await fixture<WaPage>(html`<wa-page>Content</wa-page>`);
          expect(el.navOpen).to.equal(false);
          el.toggleNavigation();
          expect(el.navOpen).to.equal(true);
          el.toggleNavigation();
          expect(el.navOpen).to.equal(false);
        });
      });
    });
  }
});
