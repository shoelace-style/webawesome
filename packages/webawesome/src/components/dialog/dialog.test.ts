import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import { html } from 'lit';
import sinon from 'sinon';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement } from '../../internal/test/pointer-utilities.js';
import type WaDialog from './dialog.js';

describe('<wa-dialog>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be hidden when closed', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog>Content</wa-dialog>`);
          expect(getComputedStyle(el).display).to.equal('none');
        });

        it('should be visible when open', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(getComputedStyle(el).display).to.not.equal('none');
        });

        it('should focus the element with autofocus when opened', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog><wa-input autofocus></wa-input></wa-dialog>`);
          const input = el.querySelector('wa-input')!;

          el.open = true;
          await aTimeout(250);

          expect(document.activeElement).to.equal(input);
        });
      });

      describe('properties', () => {
        it('should default open to false', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog>Content</wa-dialog>`);
          expect(el.open).to.be.false;
        });

        it('should reflect open attribute', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(el.open).to.be.true;
          expect(el.hasAttribute('open')).to.be.true;
        });

        it('should set label text in the header', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open label="Test Label">Content</wa-dialog>`);
          const title = el.shadowRoot!.querySelector('[part="title"]')!;
          expect(title.textContent).to.contain('Test Label');
        });

        it('should hide the header when without-header is set', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open without-header>Content</wa-dialog>`);
          const header = el.shadowRoot!.querySelector('[part="header"]');
          expect(header).to.be.null;
        });

        it('should show the header by default', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          const header = el.shadowRoot!.querySelector('[part="header"]');
          expect(header).to.not.be.null;
        });

        it('should default lightDismiss to false', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog>Content</wa-dialog>`);
          expect(el.lightDismiss).to.be.false;
        });
      });

      describe('events', () => {
        it('should emit wa-show and wa-after-show when setting open = true', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog>Content</wa-dialog>`);

          await expectEvent(el, ['wa-show', 'wa-after-show'], () => {
            el.open = true;
          });

          expect(el.open).to.be.true;
          expect(getComputedStyle(el).display).to.not.equal('none');
        });

        it('should emit wa-hide and wa-after-hide when setting open = false', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);

          await expectEvent(el, ['wa-hide', 'wa-after-hide'], () => {
            el.open = false;
          });

          expect(el.open).to.be.false;
          expect(getComputedStyle(el).display).to.equal('none');
        });

        it('should not close when wa-hide is prevented', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);

          el.addEventListener('wa-hide', event => {
            event.preventDefault();
          });

          await clickOnElement(el);
          await sendKeys({ press: 'Escape' });
          await aTimeout(250);

          expect(el.open).to.be.true;
        });

        it('should include source in wa-hide event detail', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);

          const [hideEvent] = await expectEvent(el, 'wa-hide', async () => {
            await clickOnElement(el);
            await sendKeys({ press: 'Escape' });
          });

          expect((hideEvent as CustomEvent).detail.source).to.exist;
        });
      });

      describe('slots', () => {
        it('should render the default slot content', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Dialog body content</wa-dialog>`);
          const body = el.shadowRoot!.querySelector('[part="body"]')!;
          expect(body).to.not.be.null;
        });

        it('should render the label slot', async () => {
          const el = await fixture<WaDialog>(html`
            <wa-dialog open>
              <span slot="label">Custom Label</span>
              Content
            </wa-dialog>
          `);
          const labelSlot = el.shadowRoot!.querySelector('slot[name="label"]') as HTMLSlotElement;
          expect(labelSlot).to.not.be.null;
        });

        it('should render the header-actions slot', async () => {
          const el = await fixture<WaDialog>(html`
            <wa-dialog open>
              <wa-button slot="header-actions">Action</wa-button>
              Content
            </wa-dialog>
          `);
          const headerActionsSlot = el.shadowRoot!.querySelector('slot[name="header-actions"]') as HTMLSlotElement;
          expect(headerActionsSlot).to.not.be.null;
        });

        it('should render the footer slot', async () => {
          const el = await fixture<WaDialog>(html`
            <wa-dialog open>
              Content
              <wa-button slot="footer">OK</wa-button>
            </wa-dialog>
          `);
          // Trigger a re-render so the HasSlotController detects the footer
          el.requestUpdate();
          await el.updateComplete;
          const footer = el.shadowRoot!.querySelector('[part="footer"]');
          expect(footer).to.not.be.null;
        });
      });

      describe('keyboard navigation', () => {
        it('should close when pressing Escape', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);

          await expectEvent(el, 'wa-after-hide', async () => {
            await clickOnElement(el);
            await sendKeys({ press: 'Escape' });
          });

          expect(el.open).to.be.false;
        });

        it('should not close when a bubbled cancel event originates from within the dialog', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open><input type="file" /></wa-dialog>`);
          const input = el.querySelector('input')!;

          const cancelEvent = new Event('cancel', { bubbles: true });
          input.dispatchEvent(cancelEvent);
          await aTimeout(250);

          expect(el.open).to.be.true;
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the dialog part', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(el.shadowRoot!.querySelector('[part="dialog"]')).to.not.be.null;
        });

        it('should expose the header part', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(el.shadowRoot!.querySelector('[part="header"]')).to.not.be.null;
        });

        it('should expose the title part', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(el.shadowRoot!.querySelector('[part="title"]')).to.not.be.null;
        });

        it('should expose the header-actions part', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(el.shadowRoot!.querySelector('[part="header-actions"]')).to.not.be.null;
        });

        it('should expose the close-button part', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(el.shadowRoot!.querySelector('[part="close-button"]')).to.not.be.null;
        });

        it('should expose the body part', async () => {
          const el = await fixture<WaDialog>(html`<wa-dialog open>Content</wa-dialog>`);
          expect(el.shadowRoot!.querySelector('[part="body"]')).to.not.be.null;
        });

        it('should expose the footer part when footer slot is used', async () => {
          const el = await fixture<WaDialog>(html`
            <wa-dialog open>
              Content
              <wa-button slot="footer">OK</wa-button>
            </wa-dialog>
          `);
          el.requestUpdate();
          await el.updateComplete;
          expect(el.shadowRoot!.querySelector('[part="footer"]')).to.not.be.null;
        });
      });
    });
  }
});
