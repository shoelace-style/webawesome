import { expect } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaDropdownItem from './dropdown-item.js';

describe('<wa-dropdown-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should have role="menuitem" by default', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.getAttribute('role')).to.equal('menuitem');
        });

        it('should have role="menuitemcheckbox" when type is checkbox', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`
          );
          expect(el.getAttribute('role')).to.equal('menuitemcheckbox');
        });

        it('should not have aria-checked when type is normal', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item>Item</wa-dropdown-item>`);
          expect(el.hasAttribute('aria-checked')).to.be.false;
        });

        it('should have aria-checked="false" when type is checkbox and not checked', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`
          );
          expect(el.getAttribute('aria-checked')).to.equal('false');
        });

        it('should have aria-checked="true" when type is checkbox and checked', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox" checked>Item</wa-dropdown-item>`
          );
          expect(el.getAttribute('aria-checked')).to.equal('true');
        });

        it('should remove aria-checked when type changes from checkbox to normal', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox" checked>Item</wa-dropdown-item>`
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
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`
          );
          expect(el.getAttribute('type')).to.equal('checkbox');
        });

        it('should reflect the disabled property to an attribute', async () => {
          const el = await fixture<WaDropdownItem>(html`<wa-dropdown-item disabled>Item</wa-dropdown-item>`);
          expect(el.hasAttribute('disabled')).to.equal(true);
        });

        it('should render a checkmark when type is checkbox', async () => {
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`
          );
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
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`
          );
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
          const el = await fixture<WaDropdownItem>(
            html`<wa-dropdown-item type="checkbox">Item</wa-dropdown-item>`
          );
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
