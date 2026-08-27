import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys, setViewport } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { getDeepestActiveElement } from '../../internal/active-elements.js';
import { expectEvent } from '../../internal/test/expect-event.js';
import { clientFixture, fixtures } from '../../internal/test/fixture.js';
import type WaDropdownItem from '../dropdown-item/dropdown-item.js';
import type WaDropdown from './dropdown.js';

describe('<wa-dropdown>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should set aria-haspopup on the trigger button', async () => {
          const el = await fixture<HTMLDivElement>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          const dropdown = el.querySelector<WaDropdown>('wa-dropdown') ?? (el as unknown as WaDropdown);
          const dd = dropdown.tagName === 'WA-DROPDOWN' ? dropdown : el.querySelector<WaDropdown>('wa-dropdown')!;
          await dd.updateComplete;

          const trigger = dd.querySelector<HTMLElement>('[slot="trigger"]')!;
          await customElements.whenDefined('wa-button');
          const waButton = trigger as any;
          await waButton.updateComplete;
          const nativeButton = waButton.shadowRoot!.querySelector('[part~="base"]')!;

          expect(nativeButton.getAttribute('aria-haspopup')).to.equal('menu');
        });

        it('should set aria-expanded to true when open', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')! as any;
          await trigger.updateComplete;
          const nativeButton = trigger.shadowRoot!.querySelector('[part~="base"]')!;

          expect(nativeButton.getAttribute('aria-expanded')).to.equal('true');
        });

        it('should have role="menu" on the menu container', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;

          const menu = el.shadowRoot!.querySelector('#menu')!;
          expect(menu.getAttribute('role')).to.equal('menu');
        });

        it('should exclude labels and dividers from the reported menu item count', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <h3>Type</h3>
              <wa-dropdown-item>Phone</wa-dropdown-item>
              <wa-dropdown-item>Tablet</wa-dropdown-item>
              <wa-dropdown-item>Desktop</wa-dropdown-item>
              <wa-divider></wa-divider>
              <wa-dropdown-item>More options</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;

          const items = [...el.querySelectorAll('wa-dropdown-item')];
          await waitUntil(() => items.every(item => item.hasAttribute('aria-posinset')));
          expect(items.map(item => item.getAttribute('aria-posinset'))).to.deep.equal(['1', '2', '3', '4']);
          expect(items.map(item => item.getAttribute('aria-setsize'))).to.deep.equal(['4', '4', '4', '4']);
        });
      });

      describe('properties', () => {
        it('should render a component', async () => {
          const el = await fixture(html`<wa-dropdown></wa-dropdown>`);
          expect(el).to.exist;
        });

        it('should default to closed', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          expect(el.open).to.be.false;
        });

        it('should respect the open attribute when included', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);
          expect(el.open).to.be.true;
        });

        it('should default placement to bottom-start', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          expect(el.placement).to.equal('bottom-start');
        });

        it('should accept a custom placement', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown placement="top-end">
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          expect(el.placement).to.equal('top-end');
        });

        it('should default size to medium', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          expect(el.size).to.equal('m');
        });

        it('should accept distance property', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown distance="20">
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          expect(el.distance).to.equal(20);
        });

        it('should accept skidding property', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown skidding="10">
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          expect(el.skidding).to.equal(10);
        });
      });

      describe('events', () => {
        it('should fire wa-show and wa-after-show when opening', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;

          await expectEvent(el, ['wa-show', 'wa-after-show'], () => {
            trigger.click();
          });

          expect(el.open).to.be.true;
        });

        it('should fire wa-hide and wa-after-hide when closing', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;

          await expectEvent(el, ['wa-hide', 'wa-after-hide'], () => {
            trigger.click();
          });

          expect(el.open).to.be.false;
        });

        it('should not fire wa-after-hide when wa-hide is prevented', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;

          // Open first
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          const afterHideSpy = sinon.spy();
          el.addEventListener('wa-hide', event => event.preventDefault());
          el.addEventListener('wa-after-hide', afterHideSpy);

          // Try to close
          trigger.click();
          await aTimeout(200);

          expect(afterHideSpy.callCount).to.equal(0);
          expect(el.open).to.be.true;
        });

        it('should fire wa-select when an item is clicked', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="one">One</wa-dropdown-item>
              <wa-dropdown-item value="two">Two</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const item = el.querySelector<HTMLElement>('wa-dropdown-item[value="two"]')!;
          const events = await expectEvent(el, 'wa-select', () => {
            item.click();
          });

          expect((events[0] as CustomEvent).detail.item.value).to.equal('two');
        });

        it('should close after selection by default', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="one">One</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const item = el.querySelector<HTMLElement>('wa-dropdown-item')!;
          item.click();

          await waitUntil(() => !el.open);
          expect(el.open).to.be.false;
        });

        it('should navigate when a link item is selected', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="about" href="/about">About</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const item = el.querySelector<HTMLElement>('wa-dropdown-item')!;
          const link = item.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          item.click();
          await aTimeout(200);

          expect(clickHandler).to.have.been.calledOnce;
          expect(el.open).to.be.false;
        });

        it('should not navigate when wa-select is prevented on a link item', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="about" href="/about">About</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          el.addEventListener('wa-select', event => event.preventDefault());

          const item = el.querySelector<HTMLElement>('wa-dropdown-item')!;
          const link = item.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          item.click();
          await aTimeout(200);

          expect(clickHandler).to.not.have.been.called;
          expect(el.open).to.be.true;
        });

        it('should not navigate when a disabled link item is clicked', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="about" href="/about" disabled>About</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const item = el.querySelector<HTMLElement>('wa-dropdown-item')!;
          const link = item.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          item.click();
          await aTimeout(200);

          expect(clickHandler).to.not.have.been.called;
        });

        // Skipped for SSR because a dropdown that hydrates with the open attribute never transitions open, so
        // showMenu() never runs and the document keydown listener is never attached. This is a pre-existing
        // wa-dropdown issue unrelated to link items.
        const itOrSkip = fixture.type === 'ssr-client-hydrated' ? it.skip : it;

        itOrSkip('should navigate when a link item is selected with Enter', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="about" href="/about">About</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const item = el.querySelector<HTMLElement>('wa-dropdown-item')!;
          const link = item.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          const clickHandler = sinon.spy((event: MouseEvent) => event.preventDefault());
          link.addEventListener('click', clickHandler);

          item.focus();
          await sendKeys({ press: 'Enter' });
          await aTimeout(200);

          expect(clickHandler).to.have.been.calledOnce;
        });

        it('should still fire wa-select for link items', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="about" href="/about">About</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const item = el.querySelector<HTMLElement>('wa-dropdown-item')!;
          const link = item.shadowRoot!.querySelector<HTMLAnchorElement>('#link')!;
          link.addEventListener('click', event => event.preventDefault());

          const events = await expectEvent(el, 'wa-select', () => {
            item.click();
          });

          expect((events[0] as CustomEvent).detail.item.value).to.equal('about');
        });

        it('should not close after selection when wa-select is prevented', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="one">One</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          el.addEventListener('wa-select', event => event.preventDefault());

          const item = el.querySelector<HTMLElement>('wa-dropdown-item')!;
          item.click();
          await aTimeout(200);

          expect(el.open).to.be.true;
        });

        it('should toggle checkbox items on selection', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown open>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item type="checkbox" value="check-me">Check Me</wa-dropdown-item>
            </wa-dropdown>
          `);
          await el.updateComplete;
          await aTimeout(200);

          const item = el.querySelector<any>('wa-dropdown-item[value="check-me"]')!;
          expect(item.checked).to.be.false;

          item.click();
          await aTimeout(100);

          expect(item.checked).to.be.true;
        });
      });

      describe('slots', () => {
        it('should accept items in the default slot', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
              <wa-dropdown-item>Two</wa-dropdown-item>
            </wa-dropdown>
          `);
          const items = el.querySelectorAll('wa-dropdown-item');
          expect(items.length).to.equal(2);
        });

        it('should accept a trigger in the trigger slot', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          const trigger = el.querySelector('[slot="trigger"]');
          expect(trigger).to.exist;
        });
      });

      describe('keyboard navigation', () => {
        it('should close on Escape and focus the trigger', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
              <wa-dropdown-item>Two</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          const firstItem = el.querySelector('wa-dropdown-item')!;
          el.style.setProperty('--hide-duration', '100ms');
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          const afterHide = new Promise(resolve => el.addEventListener('wa-after-hide', resolve, { once: true }));
          await sendKeys({ press: 'Escape' });
          await aTimeout(50);

          expect(getDeepestActiveElement()).to.equal(firstItem);

          await afterHide;
          expect(el.open).to.be.false;
          expect(getDeepestActiveElement()).to.equal(trigger.shadowRoot!.querySelector('[part~="base"]'));
        });

        it('should navigate items with ArrowDown', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
              <wa-dropdown-item>Two</wa-dropdown-item>
              <wa-dropdown-item>Three</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          // First item should be focused on open
          const items = el.querySelectorAll('wa-dropdown-item');
          expect((items[0] as any).active).to.be.true;

          // ArrowDown should move to next item
          await sendKeys({ press: 'ArrowDown' });
          await aTimeout(50);

          expect((items[1] as any).active).to.be.true;
          expect((items[0] as any).active).to.be.false;
        });

        it('should navigate items with ArrowUp', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
              <wa-dropdown-item>Two</wa-dropdown-item>
              <wa-dropdown-item>Three</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          // ArrowUp from first item should wrap to last
          await sendKeys({ press: 'ArrowUp' });
          await aTimeout(50);

          const items = el.querySelectorAll('wa-dropdown-item');
          expect((items[2] as any).active).to.be.true;
        });

        it('should select an item with Enter', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="one">One</wa-dropdown-item>
              <wa-dropdown-item value="two">Two</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          const selectSpy = sinon.spy();
          el.addEventListener('wa-select', selectSpy);

          await sendKeys({ press: 'Enter' });
          await waitUntil(() => selectSpy.calledOnce);

          expect(selectSpy.calledOnce).to.be.true;
          expect(selectSpy.firstCall.args[0].detail.item.value).to.equal('one');
        });

        it('should select an item with Space', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item value="one">One</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          const selectSpy = sinon.spy();
          el.addEventListener('wa-select', selectSpy);

          await sendKeys({ press: ' ' });
          await waitUntil(() => selectSpy.calledOnce);

          expect(selectSpy.calledOnce).to.be.true;
        });

        it('should navigate to Home and End keys', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
              <wa-dropdown-item>Two</wa-dropdown-item>
              <wa-dropdown-item>Three</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          const items = el.querySelectorAll('wa-dropdown-item');

          // End should go to last item
          await sendKeys({ press: 'End' });
          await aTimeout(50);
          expect((items[2] as any).active).to.be.true;

          // Home should go to first item
          await sendKeys({ press: 'Home' });
          await aTimeout(50);
          expect((items[0] as any).active).to.be.true;
        });

        it('should support type-ahead to find items', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>Apple</wa-dropdown-item>
              <wa-dropdown-item>Banana</wa-dropdown-item>
              <wa-dropdown-item>Cherry</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          const items = el.querySelectorAll('wa-dropdown-item');

          // Type "b" to jump to Banana
          await sendKeys({ press: 'b' });
          await aTimeout(50);
          expect((items[1] as any).active).to.be.true;
        });

        it('should skip disabled items during navigation', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
              <wa-dropdown-item disabled>Two</wa-dropdown-item>
              <wa-dropdown-item>Three</wa-dropdown-item>
            </wa-dropdown>
          `);

          const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          const items = el.querySelectorAll('wa-dropdown-item');

          // First non-disabled item should be active
          expect((items[0] as any).active).to.be.true;

          // ArrowDown should skip disabled item and go to Three
          await sendKeys({ press: 'ArrowDown' });
          await aTimeout(50);

          expect((items[2] as any).active).to.be.true;
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the menu CSS part', async () => {
          const el = await fixture<WaDropdown>(html`
            <wa-dropdown>
              <wa-button slot="trigger">Dropdown</wa-button>
              <wa-dropdown-item>One</wa-dropdown-item>
            </wa-dropdown>
          `);
          const menu = el.shadowRoot!.querySelector('[part~="menu"]');
          expect(menu).to.exist;
        });
      });
    });
  }

  describe('trigger interaction', () => {
    it('should toggle open when the trigger is clicked', async () => {
      const el = await clientFixture<WaDropdown>(html`
        <wa-dropdown>
          <wa-button slot="trigger">Dropdown</wa-button>
          <wa-dropdown-item>One</wa-dropdown-item>
        </wa-dropdown>
      `);

      const trigger = el.querySelector<HTMLElement>('[slot="trigger"]')!;
      trigger.click();
      await waitUntil(() => el.open);
      expect(el.open).to.be.true;

      await aTimeout(200);
      trigger.click();
      await waitUntil(() => !el.open);
      expect(el.open).to.be.false;
    });
  });

  describe('dismissible stack', () => {
    it('should only close the dropdown when pressing Escape on a dropdown with a popover inside', async () => {
      const el = await clientFixture<HTMLDivElement>(html`
        <div>
          <wa-dropdown id="test-dropdown">
            <wa-button slot="trigger">Dropdown</wa-button>
            <wa-dropdown-item>Item 1</wa-dropdown-item>
            <wa-dropdown-item id="popover-trigger">Item 2</wa-dropdown-item>
          </wa-dropdown>
          <wa-popover id="test-popover" for="popover-trigger">
            <div style="padding: 1rem;">Popover inside dropdown</div>
          </wa-popover>
        </div>
      `);

      const dropdown = el.querySelector<WaDropdown>('#test-dropdown')!;
      const popover = el.querySelector<any>('#test-popover')!;

      dropdown.open = true;
      await waitUntil(() => dropdown.open);
      await aTimeout(200);

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(popover.open).to.be.false;
      expect(dropdown.open).to.be.true;

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(dropdown.open).to.be.false;
    });
  });

  describe('submenu positioning', () => {
    const submenuFixture = () =>
      clientFixture<WaDropdown>(html`
        <wa-dropdown>
          <wa-button slot="trigger">Menu</wa-button>
          <wa-dropdown-item id="parent-item">
            Email Template Previews
            <wa-dropdown-item slot="submenu">Received</wa-dropdown-item>
            <wa-dropdown-item slot="submenu">Approval Needed</wa-dropdown-item>
            <wa-dropdown-item slot="submenu">Needs Scheduled</wa-dropdown-item>
            <wa-dropdown-item slot="submenu">Scheduled</wa-dropdown-item>
            <wa-dropdown-item slot="submenu">Awaiting Payment</wa-dropdown-item>
            <wa-dropdown-item slot="submenu">New User Welcome</wa-dropdown-item>
            <wa-dropdown-item slot="submenu">Reset Password</wa-dropdown-item>
          </wa-dropdown-item>
        </wa-dropdown>
      `);

    async function openSubmenu(el: WaDropdown) {
      el.open = true;
      await waitUntil(() => el.open);
      await aTimeout(200);

      const parentItem = el.querySelector<WaDropdownItem>('#parent-item')!;
      parentItem.submenuOpen = true;
      await waitUntil(() => parentItem.submenuElement?.style.left !== '');
      await aTimeout(100);
      return parentItem;
    }

    it('should keep submenus inside the viewport on narrow screens', async () => {
      const originalViewport = { width: window.innerWidth, height: window.innerHeight };
      await setViewport({ width: 342, height: 700 });

      try {
        const el = await submenuFixture();
        const parentItem = await openSubmenu(el);

        const rect = parentItem.submenuElement.getBoundingClientRect();
        expect(rect.width).to.be.greaterThan(0);
        expect(rect.left).to.be.at.least(0);
        expect(rect.right).to.be.at.most(window.innerWidth);

        // The submenu should overlap the menu instead of being squeezed beside it, so no item wraps to multiple lines.
        const itemHeights = [...parentItem.querySelectorAll<WaDropdownItem>('[slot="submenu"]')].map(
          item => item.getBoundingClientRect().height,
        );
        expect(Math.max(...itemHeights)).to.be.lessThan(Math.min(...itemHeights) * 1.5);
      } finally {
        await setViewport(originalViewport);
      }
    });

    it('should place submenus beside the parent item when there is room', async () => {
      const el = await submenuFixture();
      const parentItem = await openSubmenu(el);

      const rect = parentItem.submenuElement.getBoundingClientRect();
      const itemRect = parentItem.getBoundingClientRect();
      expect(parentItem.submenuElement.getAttribute('data-placement')).to.match(/^right/);
      // Allow for the intentional 5px overlap from the offset middleware.
      expect(rect.left).to.be.at.least(itemRect.right - 6);
      expect(rect.right).to.be.at.most(window.innerWidth);
    });
  });
});
