import { fixtures } from '$webawesome/internal/test/fixture.js';
import { clickOnElement } from '$webawesome/internal/test/pointer-utilities.js';
import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import type WaToastItem from '../toast-item/toast-item.js';
import type WaToast from './toast.js';

describe('<wa-toast>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('basic functionality', () => {
        it('should render with default placement', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          await el.updateComplete;

          expect(el.placement).to.equal('top-end');
          expect(el.getAttribute('placement')).to.equal('top-end');
        });

        it('should have popover="manual" set on connect', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          await el.updateComplete;

          expect(el.popover).to.equal('manual');
        });
      });

      describe('placement', () => {
        const placements = [
          'top-start',
          'top-center',
          'top-end',
          'bottom-start',
          'bottom-center',
          'bottom-end',
        ] as const;

        for (const placement of placements) {
          it(`should support ${placement} placement`, async () => {
            const el = await fixture<WaToast>(html`<wa-toast placement="${placement}"></wa-toast>`);
            await el.updateComplete;

            expect(el.placement).to.equal(placement);
            expect(el.getAttribute('placement')).to.equal(placement);
          });
        }
      });

      describe('create() method', () => {
        it('should create a toast item with default options', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('Test message');

          expect(toastItem).to.exist;
          expect(toastItem.textContent?.trim()).to.equal('Test message');
          expect(toastItem.variant).to.equal('neutral');
          expect(toastItem.duration).to.equal(5000);
        });

        it('should create a toast item with custom variant', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          const variants = ['brand', 'success', 'warning', 'danger', 'neutral'] as const;
          for (const variant of variants) {
            const toastItem = await el.create(`${variant} message`, { variant });
            expect(toastItem.variant).to.equal(variant);
            toastItem.remove();
          }
        });

        it('should create a toast item with custom duration', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('Test message', { duration: 10000 });

          expect(toastItem.duration).to.equal(10000);
        });

        it('should create a toast item with duration 0 (no auto-dismiss)', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('Test message', { duration: 0 });

          expect(toastItem.duration).to.equal(0);
        });

        it('should create a toast item with icon as string', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('Test message', { icon: 'check' });

          const icon = toastItem.querySelector('wa-icon[slot="icon"]');
          expect(icon).to.exist;
          expect(icon?.getAttribute('name')).to.equal('check');
        });

        it('should create a toast item with icon as object', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('Test message', {
            icon: {
              name: 'bell',
              family: 'duotone',
              variant: 'solid',
              library: 'custom',
            },
          });

          const icon = toastItem.querySelector('wa-icon[slot="icon"]');
          expect(icon).to.exist;
          expect(icon?.getAttribute('name')).to.equal('bell');
          expect(icon?.getAttribute('family')).to.equal('duotone');
          expect(icon?.getAttribute('variant')).to.equal('solid');
          expect(icon?.getAttribute('library')).to.equal('custom');
        });

        it('should create a toast item with HTML content when allowHtml is true', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('<strong>Bold</strong> message', { allowHtml: true });

          const strong = toastItem.querySelector('strong');
          expect(strong).to.exist;
          expect(strong?.textContent).to.equal('Bold');
        });

        it('should escape HTML content when allowHtml is false', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('<strong>Bold</strong> message', { allowHtml: false });

          const strong = toastItem.querySelector('strong');
          expect(strong).to.not.exist;
          expect(toastItem.textContent).to.include('<strong>');
        });

        it('should prepend new toast items to the stack', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          await el.create('First message');
          await el.create('Second message');
          await el.create('Third message');

          const toastItems = el.querySelectorAll('wa-toast-item');
          expect(toastItems.length).to.equal(3);
          expect(toastItems[0].textContent?.trim()).to.equal('Third message');
          expect(toastItems[2].textContent?.trim()).to.equal('First message');
        });

        it('should show the popover when creating a toast', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          expect(el.matches(':popover-open')).to.be.false;

          await el.create('Test message');

          expect(el.matches(':popover-open')).to.be.true;
        });

        it('should set visible custom state when toast is shown', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          expect(el.customStates.has('visible')).to.be.false;

          await el.create('Test message');

          expect(el.customStates.has('visible')).to.be.true;
        });
      });

      describe('accessibility announcements', () => {
        it('should mount a visually hidden live region container in the document body', async () => {
          await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          const container = document.querySelector('[data-wa-toast-live-region]');
          expect(container).to.exist;
          expect(container?.id).to.match(/^wa-toast-live-region-/);
        });

        it('should add a polite announcer for non-danger toasts and inject text on a later frame', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          await el.create('Hello world', { variant: 'success' });

          const announcer = document.querySelector('[data-wa-toast-live-region] [aria-live="polite"]');
          expect(announcer).to.exist;
          expect(announcer?.getAttribute('role')).to.equal('status');

          await waitUntil(() => announcer?.textContent === 'Hello world', 'Announcer should be populated', {
            timeout: 500,
          });
          expect(announcer?.textContent).to.equal('Hello world');
        });

        it('should add an assertive announcer for danger toasts', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          await el.create('Something failed', { variant: 'danger' });

          const announcer = document.querySelector('[data-wa-toast-live-region] [aria-live="assertive"]');
          expect(announcer).to.exist;
          expect(announcer?.getAttribute('role')).to.equal('alert');
        });

        it('should add a separate announcer node for each toast', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          await el.create('First');
          await el.create('Second');
          await el.create('Third');

          const announcers = document.querySelectorAll('[data-wa-toast-live-region] > div');
          expect(announcers.length).to.equal(3);
        });

        it('should clean up the live region container when removed from the DOM', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          expect(document.querySelector('[data-wa-toast-live-region]')).to.exist;

          el.remove();
          await aTimeout(0);

          expect(document.querySelector('[data-wa-toast-live-region]')).to.not.exist;
        });
      });

      describe('toast item lifecycle', () => {
        it('should remove toast item from DOM after wa-after-hide', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('Test message', { duration: 0 });

          expect(el.querySelectorAll('wa-toast-item').length).to.equal(1);

          toastItem.hide();

          await waitUntil(() => el.querySelectorAll('wa-toast-item').length === 0, 'Toast item should be removed', {
            timeout: 1000,
          });

          expect(el.querySelectorAll('wa-toast-item').length).to.equal(0);
        });

        it('should hide the stack when all toast items are removed', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const toastItem = await el.create('Test message', { duration: 0 });

          expect(el.matches(':popover-open')).to.be.true;

          toastItem.hide();

          await waitUntil(() => !el.matches(':popover-open'), 'Popover should be hidden', {
            timeout: 1000,
          });

          expect(el.matches(':popover-open')).to.be.false;
          expect(el.customStates.has('visible')).to.be.false;
        });

        it('should keep stack visible when there are remaining toast items', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          await el.create('First message', { duration: 0 });
          const secondToast = await el.create('Second message', { duration: 0 });

          secondToast.hide();

          await waitUntil(() => el.querySelectorAll('wa-toast-item').length === 1, 'One toast item should remain', {
            timeout: 1000,
          });

          expect(el.matches(':popover-open')).to.be.true;
          expect(el.customStates.has('visible')).to.be.true;
        });
      });

      describe('manual toast items via slot', () => {
        it('should activate slotted toast items', async () => {
          const el = await fixture<WaToast>(html`
            <wa-toast>
              <wa-toast-item>Slotted message</wa-toast-item>
            </wa-toast>
          `);

          // Give time for slot change handler
          await aTimeout(50);
          await el.updateComplete;

          expect(el.matches(':popover-open')).to.be.true;
        });

        it('should handle dynamically added toast items', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          expect(el.matches(':popover-open')).to.be.false;

          const toastItem = document.createElement('wa-toast-item') as WaToastItem;
          toastItem.textContent = 'Dynamic message';
          el.prepend(toastItem);

          await aTimeout(50);
          await el.updateComplete;

          expect(el.matches(':popover-open')).to.be.true;
        });
      });

      describe('keyboard interaction', () => {
        it('should dismiss the oldest toast item when Escape is pressed', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          await el.create('First message', { duration: 0 });
          await el.create('Second message', { duration: 0 });
          await el.create('Third message', { duration: 0 });

          expect(el.querySelectorAll('wa-toast-item').length).to.equal(3);

          // Need to click first to make sure the page is focused
          await clickOnElement(el);
          await sendKeys({ press: 'Escape' });

          await waitUntil(
            () => el.querySelectorAll('wa-toast-item').length === 2,
            'One toast item should be dismissed',
            { timeout: 1000 },
          );

          expect(el.querySelectorAll('wa-toast-item').length).to.equal(2);
          // The oldest (last in DOM order) should be dismissed, leaving the two most recent
          const remainingItems = el.querySelectorAll('wa-toast-item');
          expect(remainingItems[0].textContent?.trim()).to.equal('Third message');
          expect(remainingItems[1].textContent?.trim()).to.equal('Second message');
        });

        it('should not dismiss toast item when Escape is already handled', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          await el.create('Test message', { duration: 0 });

          // Add a handler that prevents default
          document.addEventListener(
            'keydown',
            event => {
              if (event.key === 'Escape') {
                event.preventDefault();
              }
            },
            { once: true },
          );

          await clickOnElement(el);
          await sendKeys({ press: 'Escape' });

          await aTimeout(100);

          // Toast should still be there since Escape was prevented
          expect(el.querySelectorAll('wa-toast-item').length).to.equal(1);
        });
      });

      describe('multiple toast instances', () => {
        it('should work with multiple toast containers on the page', async () => {
          const container = await fixture<HTMLDivElement>(html`
            <div>
              <wa-toast id="toast1" placement="top-start"></wa-toast>
              <wa-toast id="toast2" placement="bottom-end"></wa-toast>
            </div>
          `);

          const toast1 = container.querySelector<WaToast>('#toast1')!;
          const toast2 = container.querySelector<WaToast>('#toast2')!;

          await toast1.create('Message in toast 1');
          await toast2.create('Message in toast 2');

          expect(toast1.querySelectorAll('wa-toast-item').length).to.equal(1);
          expect(toast2.querySelectorAll('wa-toast-item').length).to.equal(1);
        });
      });

      describe('events from toast items', () => {
        it('should bubble wa-show event from toast item', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const showHandler = sinon.spy();

          el.addEventListener('wa-show', showHandler);

          await el.create('Test message');

          await waitUntil(() => showHandler.calledOnce);
          expect(showHandler).to.have.been.calledOnce;
        });

        it('should bubble wa-after-show event from toast item', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const afterShowHandler = sinon.spy();

          el.addEventListener('wa-after-show', afterShowHandler);

          await el.create('Test message');

          await waitUntil(() => afterShowHandler.calledOnce);
          expect(afterShowHandler).to.have.been.calledOnce;
        });

        it('should bubble wa-hide event from toast item', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const hideHandler = sinon.spy();

          el.addEventListener('wa-hide', hideHandler);

          const toastItem = await el.create('Test message', { duration: 0 });
          toastItem.hide();

          await waitUntil(() => hideHandler.calledOnce);
          expect(hideHandler).to.have.been.calledOnce;
        });

        it('should bubble wa-after-hide event from toast item', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);
          const afterHideHandler = sinon.spy();

          el.addEventListener('wa-after-hide', afterHideHandler);

          const toastItem = await el.create('Test message', { duration: 0 });
          toastItem.hide();

          await waitUntil(() => afterHideHandler.calledOnce);
          expect(afterHideHandler).to.have.been.calledOnce;
        });
      });

      describe('auto-dismiss behavior', () => {
        it('should auto-dismiss toast item after duration', async () => {
          const el = await fixture<WaToast>(html`<wa-toast></wa-toast>`);

          await el.create('Test message', { duration: 100 });

          expect(el.querySelectorAll('wa-toast-item').length).to.equal(1);

          await waitUntil(() => el.querySelectorAll('wa-toast-item').length === 0, 'Toast should auto-dismiss', {
            timeout: 1000,
          });

          expect(el.querySelectorAll('wa-toast-item').length).to.equal(0);
        });
      });
    });
  }
});
