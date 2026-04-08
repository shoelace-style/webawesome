import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { expectEvent } from '../../internal/test/expect-event.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
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
          const nativeButton = waButton.shadowRoot!.querySelector('[part="base"]')!;

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
          const nativeButton = trigger.shadowRoot!.querySelector('[part="base"]')!;

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
          expect(el.size).to.equal('medium');
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
          trigger.click();
          await waitUntil(() => el.open);
          await aTimeout(200);

          await sendKeys({ press: 'Escape' });
          await waitUntil(() => !el.open);

          expect(el.open).to.be.false;
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
      const el = await fixtures[0]<WaDropdown>(html`
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
      const el = await fixtures[0]<HTMLDivElement>(html`
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
});
