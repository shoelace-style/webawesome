import { expect, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { clientFixture, fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaDropdownItem from './dropdown-item.js';

describe('<wa-dropdown-item>', () => {
  describe('submenu lifecycle', () => {
    async function submenuFixture() {
      const item = await clientFixture<WaDropdownItem>(html`
        <wa-dropdown-item>
          Parent
          <wa-dropdown-item slot="submenu">First</wa-dropdown-item>
          <wa-dropdown-item slot="submenu">Second</wa-dropdown-item>
        </wa-dropdown-item>
      `);
      await item.updateComplete;
      return item;
    }

    it('should share repeated opening requests without notifying or animating twice', async () => {
      const item = await submenuFixture();
      const openingHandler = sinon.spy();
      item.addEventListener('submenu-opening', openingHandler);

      const firstOpening = item.openSubmenu();
      const secondOpening = item.openSubmenu();
      await item.updateComplete;

      expect(openingHandler).to.have.been.calledOnce;
      await Promise.all([firstOpening, secondOpening]);
      expect(item.submenuElement.matches(':popover-open')).to.be.true;
      expect(item.getAttribute('aria-expanded')).to.equal('true');
    });

    it('should focus when opening starts without stealing focus when animation finishes', async () => {
      const item = await submenuFixture();
      item.style.setProperty('--show-duration', '10s');
      const animationStarted = oneEvent(item.submenuElement, 'animationstart');
      const opening = item.openSubmenu();
      await animationStarted;

      const [first, second] = item.querySelectorAll<WaDropdownItem>('[slot="submenu"]');
      expect(document.activeElement).to.equal(first);
      second.focus();
      item.submenuElement.getAnimations().forEach(animation => animation.finish());
      await opening;
      expect(document.activeElement).to.equal(second);
    });

    it('should keep a reopened submenu visible when its earlier close is canceled', async () => {
      const item = await submenuFixture();
      await item.openSubmenu();
      item.style.setProperty('--show-duration', '10s');
      const closingStarted = oneEvent(item.submenuElement, 'animationstart');
      const closing = item.closeSubmenu();
      await closingStarted;

      item.style.setProperty('--show-duration', '0s');
      item.submenuOpen = true;
      const reopening = item.openSubmenu();
      await Promise.all([closing, reopening]);

      expect(item.submenuOpen).to.be.true;
      expect(item.submenuElement.hidden).to.be.false;
      expect(item.submenuElement.matches(':popover-open')).to.be.true;
      expect(item.getAttribute('aria-expanded')).to.equal('true');
    });

    it('should retire an opening submenu when disconnected and allow it to reopen', async () => {
      const item = await submenuFixture();
      const parent = item.parentElement!;
      item.style.setProperty('--show-duration', '10s');
      const animationStarted = oneEvent(item.submenuElement, 'animationstart');
      const opening = item.openSubmenu();
      await animationStarted;

      item.remove();
      expect(item.submenuElement.hidden).to.be.true;
      expect(item.submenuElement.hasAttribute('data-visible')).to.be.false;
      await opening;

      item.style.setProperty('--show-duration', '0s');
      parent.append(item);
      await item.openSubmenu();
      expect(item.submenuElement.hidden).to.be.false;
      expect(item.submenuElement.matches(':popover-open')).to.be.true;
      expect(item.getAttribute('aria-expanded')).to.equal('true');
    });
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should have role="menuitem" by default', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.getAttribute('role')).to.equal('menuitem');
        });

        it('should have role="menuitemcheckbox" when type is checkbox', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`);
          expect(el.getAttribute('role')).to.equal('menuitemcheckbox');
        });

        it('should not have aria-checked when type is normal', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.hasAttribute('aria-checked')).to.be.false;
        });

        it('should have aria-checked="false" when type is checkbox and not checked', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`);
          expect(el.getAttribute('aria-checked')).to.equal('false');
        });

        it('should have aria-checked="true" when type is checkbox and checked', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox" checked>Item</wa-dropdown-item>`,
          );
          expect(el.getAttribute('aria-checked')).to.equal('true');
        });

        it('should remove aria-checked when type changes from checkbox to normal', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox" checked>Item</wa-dropdown-item>`,
          );
          expect(el.getAttribute('aria-checked')).to.equal('true');

          el.type = 'normal';
          await el.updateComplete;
          expect(el.hasAttribute('aria-checked')).to.be.false;
          expect(el.getAttribute('role')).to.equal('menuitem');
        });

        it('should set aria-disabled when disabled', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item disabled>Item</wa-dropdown-item>`);
          expect(el.getAttribute('aria-disabled')).to.equal('true');
        });

        it('should set aria-disabled to false when not disabled', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.getAttribute('aria-disabled')).to.equal('false');
        });

        it('should set tabindex to -1 by default', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.getAttribute('tabindex')).to.equal('-1');
        });

        it('should set tabindex to 0 when active', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          el.active = true;
          await el.updateComplete;
          expect(el.getAttribute('tabindex')).to.equal('0');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.active).to.equal(false);
          expect(el.variant).to.equal('default');
          expect(el.type).to.equal('normal');
          expect(el.checked).to.equal(false);
          expect(el.disabled).to.equal(false);
          expect(el.submenuOpen).to.equal(false);
        });

        it('should reflect the variant property to an attribute', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item variant="danger">Item</wa-dropdown-item>`);
          expect(el.getAttribute('variant')).to.equal('danger');
        });

        it('should reflect the type property to an attribute', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`);
          expect(el.getAttribute('type')).to.equal('checkbox');
        });

        it('should reflect the disabled property to an attribute', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item disabled>Item</wa-dropdown-item>`);
          expect(el.hasAttribute('disabled')).to.equal(true);
        });

        it('should render a checkmark when type is checkbox', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`);
          const checkmark = el.shadowRoot!.querySelector('[part~="checkmark"]');
          expect(checkmark).to.exist;
        });

        it('should not render a checkmark when type is normal', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          const checkmark = el.shadowRoot!.querySelector('[part~="checkmark"]');
          expect(checkmark).to.not.exist;
        });
      });

      describe('events', () => {
        it('should not fire click event when disabled', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item disabled>Item</wa-dropdown-item>`);
          const clickHandler = sinon.spy();
          el.addEventListener('click', clickHandler);
          await clickOnElement(el);
          expect(clickHandler).not.to.have.been.called;
        });

        it('should not fire click event when disabled and .click() is called', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item disabled>Item</wa-dropdown-item>`);
          const clickHandler = sinon.spy();
          el.addEventListener('click', clickHandler);
          el.click();
          expect(clickHandler).not.to.have.been.called;
        });

        it('should fire click event when not disabled', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          const clickHandler = sinon.spy();
          el.addEventListener('click', clickHandler);
          await clickOnElement(el);
          expect(clickHandler).to.have.been.calledOnce;
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>My Item</wa-dropdown-item>`);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot:not([name])')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          const textContent = assignedNodes.map(n => n.textContent).join('');
          expect(textContent).to.include('My Item');
        });

        it('should accept content in the icon slot', async () => {
          const el = await fixture<WaDropdownItem>(html`
            <wa-dropdown-item>
              <wa-icon slot="icon" name="gear"></wa-icon>
              Settings
            </wa-dropdown-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="icon"]')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.equal(1);
        });

        it('should accept content in the details slot', async () => {
          const el = await fixture<WaDropdownItem>(html`
            <wa-dropdown-item>
              Item
              <span slot="details">Ctrl+S</span>
            </wa-dropdown-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="details"]')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.equal(1);
        });
      });

      describe('links', () => {
        it('should not render a link when href is absent', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.shadowRoot!.querySelector('#link')).to.not.exist;
        });

        it('should render a hidden link when href is set', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item href="/about">About</wa-dropdown-item>`);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          expect(link).to.exist;
          expect(link.getAttribute('href')).to.equal('/about');
          expect(link.getAttribute('aria-hidden')).to.equal('true');
          expect(link.getAttribute('tabindex')).to.equal('-1');
        });

        it('should pass target, rel, and download through to the link', async () => {
          const el = await fixture<WaDropdownItem>(html`
            <wa-dropdown-item href="/file.pdf" target="_blank" rel="noreferrer" download="report.pdf">
              Download
            </wa-dropdown-item>
          `);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          expect(link.getAttribute('target')).to.equal('_blank');
          expect(link.getAttribute('rel')).to.equal('noreferrer');
          expect(link.getAttribute('download')).to.equal('report.pdf');
        });

        it('should omit target, rel, and download when they are not set', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item href="/about">About</wa-dropdown-item>`);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          expect(link.hasAttribute('target')).to.be.false;
          expect(link.hasAttribute('rel')).to.be.false;
          expect(link.hasAttribute('download')).to.be.false;
        });

        it('should keep role="menuitem" when href is set', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item href="/about">About</wa-dropdown-item>`);
          expect(el.getAttribute('role')).to.equal('menuitem');
        });

        it('should expose the link custom state when href is set', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.matches(':state(link)')).to.be.false;

          el.href = '/about';
          await el.updateComplete;
          expect(el.matches(':state(link)')).to.be.true;
        });

        // Skipped for SSR because rendering a submenu server-side triggers a pre-existing hydration mismatch. The
        // submenu icon and container render only after firstUpdated(), so the server omits markup the client adds.
        // This is unrelated to link behavior and also fails for submenu items without an href.
        const itOrSkip = fixture.type === 'ssr-client-hydrated' ? it.skip : it;

        itOrSkip('should not navigate when the item has a submenu', async () => {
          const el = await fixture<WaDropdownItem>(html`
            <wa-dropdown-item href="/about">
              About
              <wa-dropdown-item slot="submenu" href="/about/team">Team</wa-dropdown-item>
            </wa-dropdown-item>
          `);
          await el.updateComplete;
          expect(el.matches(':state(link)')).to.be.false;

          // The link element still exists so server and client render the same template, but the item must not navigate
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          el.navigate();
          expect(clickHandler).to.not.have.been.called;
        });

        it('should click the link when navigate() is called', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item href="/about">About</wa-dropdown-item>`);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          el.navigate();
          expect(clickHandler).to.have.been.calledOnce;
        });

        it('should forward modifier keys from the source event to the link', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item href="/about">About</wa-dropdown-item>`);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          el.navigate(new MouseEvent('click', { metaKey: true, shiftKey: true }));

          const forwarded = clickHandler.firstCall.args[0];
          expect(forwarded.metaKey).to.be.true;
          expect(forwarded.shiftKey).to.be.true;
          expect(forwarded.ctrlKey).to.be.false;
          expect(forwarded.altKey).to.be.false;
        });

        it('should not navigate when disabled', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item href="/about" disabled>About</wa-dropdown-item>`,
          );
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          el.navigate();
          expect(clickHandler).to.not.have.been.called;
        });

        it('should not throw when navigate() is called without an href', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(() => el.navigate()).to.not.throw();
        });
      });

      describe('CSS parts and states', () => {
        it('should have an icon part', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.shadowRoot!.querySelector('[part~="icon"]')).to.exist;
        });

        it('should have a label part', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.shadowRoot!.querySelector('[part~="label"]')).to.exist;
        });

        it('should have a details part', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.shadowRoot!.querySelector('[part~="details"]')).to.exist;
        });

        it('should have a checkmark part when type is checkbox', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`);
          expect(el.shadowRoot!.querySelector('[part~="checkmark"]')).to.exist;
        });

        it('should expose the active custom state', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.matches(':state(active)')).to.be.false;

          el.active = true;
          await el.updateComplete;
          expect(el.matches(':state(active)')).to.be.true;
        });

        it('should expose the checked custom state', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`);
          expect(el.matches(':state(checked)')).to.be.false;

          el.checked = true;
          await el.updateComplete;
          expect(el.matches(':state(checked)')).to.be.true;
        });

        it('should expose the disabled custom state', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.matches(':state(disabled)')).to.be.false;

          el.disabled = true;
          await el.updateComplete;
          expect(el.matches(':state(disabled)')).to.be.true;
        });
      });
    });
  }
});
