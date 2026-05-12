import { aTimeout, expect, waitUntil } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import { clickOnElement, moveMouseOnElement } from '../../internal/test/pointer-utilities.js';
import type WaTooltip from '../tooltip/tooltip.js';
import type WaCopyButton from './copy-button.js';
import { resetMouse } from '@web/test-runner-commands';

const ignoredRules: string[] = [];

describe('<wa-copy-button>', () => {
  afterEach(() => {
    sinon.restore();
  });

  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="something"></wa-copy-button>`);
          await expect(el).to.be.accessible({ ignoredRules });
        });
      });

      describe('properties', () => {
        it('should have a default value of empty string', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button></wa-copy-button>`);
          expect(el.value).to.equal('');
        });

        it('should accept a value property', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="hello world"></wa-copy-button>`);
          expect(el.value).to.equal('hello world');
        });

        it('should have a default from of empty string', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button></wa-copy-button>`);
          expect(el.from).to.equal('');
        });

        it('should accept a from property', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button from="my-input"></wa-copy-button>`);
          expect(el.from).to.equal('my-input');
        });

        it('should default disabled to false', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button></wa-copy-button>`);
          expect(el.disabled).to.be.false;
        });

        it('should reflect disabled to attribute', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button disabled></wa-copy-button>`);
          expect(el.hasAttribute('disabled')).to.be.true;
        });

        it('should default feedbackDuration to 1000', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button></wa-copy-button>`);
          expect(el.feedbackDuration).to.equal(1000);
        });

        it('should default tooltipPlacement to top', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button></wa-copy-button>`);
          expect(el.tooltipPlacement).to.equal('top');
        });

        it('should default tooltip to "full"', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button></wa-copy-button>`);
          expect(el.tooltip).to.equal('full');
        });

        it('should have a default status of rest', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button></wa-copy-button>`);
          expect(el.status).to.equal('rest');
        });

        it('should accept custom label properties', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button
              value="test"
              copy-label="Copy it"
              success-label="Done"
              error-label="Failed"
            ></wa-copy-button>
          `);
          expect(el.copyLabel).to.equal('Copy it');
          expect(el.successLabel).to.equal('Done');
          expect(el.errorLabel).to.equal('Failed');
        });
      });

      describe('events', () => {
        it('should emit wa-copy on successful copy', async () => {
          // Stub clipboard API
          sinon.stub(navigator.clipboard, 'writeText').resolves();

          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test value"></wa-copy-button>`);

          const events = await expectEvent(el, 'wa-copy', async () => {
            await clickOnElement(el);
          });

          expect(events.length).to.equal(1);
        });

        it('should emit wa-error when copy fails', async () => {
          // Stub clipboard API to reject
          sinon.stub(navigator.clipboard, 'writeText').rejects(new Error('denied'));

          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test value"></wa-copy-button>`);

          await expectEvent(el, 'wa-error', async () => {
            await clickOnElement(el);
          });
        });

        it('should emit wa-error when value is empty', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value=""></wa-copy-button>`);

          await expectEvent(el, 'wa-error', async () => {
            await clickOnElement(el);
          });
        });

        it('should not copy when disabled', async () => {
          const writeTextStub = sinon.stub(navigator.clipboard, 'writeText').resolves();

          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test" disabled></wa-copy-button>`);

          await clickOnElement(el);
          await aTimeout(50);

          expect(writeTextStub.called).to.be.false;
        });
      });

      describe('status states', () => {
        it('should change status to success after copying', async () => {
          sinon.stub(navigator.clipboard, 'writeText').resolves();

          const el = await fixture<WaCopyButton>(
            html`<wa-copy-button value="test" feedback-duration="200"></wa-copy-button>`,
          );

          await clickOnElement(el);
          await waitUntil(() => el.status === 'success');
          expect(el.status).to.equal('success');
        });

        it('should change status to error when copy fails', async () => {
          sinon.stub(navigator.clipboard, 'writeText').rejects(new Error('denied'));

          const el = await fixture<WaCopyButton>(
            html`<wa-copy-button value="test" feedback-duration="200"></wa-copy-button>`,
          );

          await clickOnElement(el);
          await waitUntil(() => el.status === 'error');
          expect(el.status).to.equal('error');
        });

        it('should reset status to rest after feedbackDuration', async () => {
          sinon.stub(navigator.clipboard, 'writeText').resolves();

          const el = await fixture<WaCopyButton>(
            html`<wa-copy-button value="test" feedback-duration="100"></wa-copy-button>`,
          );

          await clickOnElement(el);
          await waitUntil(() => el.status === 'success');
          await waitUntil(() => el.status === 'rest', 'Expected status to reset to rest', { timeout: 2000 });
          expect(el.status).to.equal('rest');
        });
      });

      describe('from property', () => {
        it('should copy textContent from referenced element', async () => {
          const writeTextStub = sinon.stub(navigator.clipboard, 'writeText').resolves();

          const container = await fixture<HTMLDivElement>(html`
            <div>
              <span id="source-el">Hello World</span>
              <wa-copy-button from="source-el"></wa-copy-button>
            </div>
          `);

          const el = container.querySelector<WaCopyButton>('wa-copy-button')!;
          await clickOnElement(el);
          await waitUntil(() => writeTextStub.called);

          expect(writeTextStub.firstCall.args[0]).to.equal('Hello World');
        });

        it('should copy attribute value using bracket syntax', async () => {
          const writeTextStub = sinon.stub(navigator.clipboard, 'writeText').resolves();

          const container = await fixture<HTMLDivElement>(html`
            <div>
              <input id="source-input" value="input-value" />
              <wa-copy-button from="source-input[value]"></wa-copy-button>
            </div>
          `);

          const el = container.querySelector<WaCopyButton>('wa-copy-button')!;
          await clickOnElement(el);
          await waitUntil(() => writeTextStub.called);

          expect(writeTextStub.firstCall.args[0]).to.equal('input-value');
        });

        it('should copy property value using dot syntax', async () => {
          const writeTextStub = sinon.stub(navigator.clipboard, 'writeText').resolves();

          const container = await fixture<HTMLDivElement>(html`
            <div>
              <input id="source-prop" />
              <wa-copy-button from="source-prop.value"></wa-copy-button>
            </div>
          `);

          const input = container.querySelector<HTMLInputElement>('#source-prop')!;
          input.value = 'prop-value';

          const el = container.querySelector<WaCopyButton>('wa-copy-button')!;
          await clickOnElement(el);
          await waitUntil(() => writeTextStub.called);

          expect(writeTextStub.firstCall.args[0]).to.equal('prop-value');
        });

        it('should emit wa-error when referenced element is not found', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button from="nonexistent-element"></wa-copy-button>`);

          // Fires twice: once for missing target, once for empty value
          await expectEvent(
            el,
            'wa-error',
            async () => {
              await clickOnElement(el);
            },
            { count: 2 },
          );
        });
      });

      describe('slots', () => {
        it('should accept a custom trigger via default slot', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);

          expect(el).to.contain.text('Custom Copy');
        });
      });

      describe('custom trigger tooltip', () => {
        it('should auto-assign an id to a custom trigger that has none', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;

          const trigger = el.querySelector<HTMLButtonElement>('button')!;
          expect(trigger.id).to.match(/^wa-copy-button-trigger-/);
        });

        it('should preserve a pre-existing id on a custom trigger', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test">
              <button id="my-trigger">Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;

          const trigger = el.querySelector<HTMLButtonElement>('button')!;
          expect(trigger.id).to.equal('my-trigger');
        });

        it('should append a light-DOM tooltip anchored to the custom trigger', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;

          const trigger = el.querySelector<HTMLButtonElement>('button')!;
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip[slot="wa-internal-tooltip"]')!;

          expect(tooltip).to.exist;
          expect(tooltip.getAttribute('for')).to.equal(trigger.id);
          // The tooltip should resolve and store its anchor
          await tooltip.updateComplete;
          expect(tooltip.anchor).to.equal(trigger);
        });

        it('should activate tooltip on hover of custom trigger when tooltip="full"', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test" tooltip="full">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);

          await el.updateComplete;

          const trigger = el.querySelector<HTMLButtonElement>('button')!;
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip[slot="wa-internal-tooltip"]')!;

          expect(tooltip).to.exist;
          expect(tooltip.anchor).to.equal(trigger);
          expect(tooltip.open).to.be.false;

          await resetMouse()
          await moveMouseOnElement(trigger, "center")

          // Wait for showDelay (150ms default) + buffer
          await aTimeout(250);

          expect(tooltip.open).to.be.true;
          // The tooltip body must actually render — catches the case where the tooltip is in the
          // light DOM but unprojected, so it has no rendered box even when `open` is true.
          const body = tooltip.shadowRoot!.querySelector<HTMLElement>('.body')!;
          expect(body.offsetHeight).to.be.greaterThan(0);
        });

        it('should render a tooltip with hover/focus trigger when tooltip="full" on the default trigger', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test" tooltip="full"></wa-copy-button>`);
          await el.updateComplete;
          const tooltip = el.shadowRoot!.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip).to.exist;
          expect(tooltip.getAttribute('trigger')).to.equal('hover focus');
        });

        it('should render a tooltip with hover/focus trigger when tooltip="full" on a custom trigger', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test" tooltip="full">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip[slot="wa-internal-tooltip"]')!;
          expect(tooltip).to.exist;
          expect(tooltip.getAttribute('trigger')).to.equal('hover focus');
        });

        it('should render a tooltip with manual trigger when tooltip="copy" on the default trigger', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test" tooltip="copy"></wa-copy-button>`);
          await el.updateComplete;
          const tooltip = el.shadowRoot!.querySelector<WaTooltip>('wa-tooltip')!;
          expect(tooltip).to.exist;
          expect(tooltip.getAttribute('trigger')).to.equal('manual');
        });

        it('should render a tooltip with manual trigger when tooltip="copy" on a custom trigger', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test" tooltip="copy">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip[slot="wa-internal-tooltip"]')!;
          expect(tooltip).to.exist;
          expect(tooltip.getAttribute('trigger')).to.equal('manual');
        });

        it('should not open the feedback-mode tooltip on hover', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test" tooltip="copy">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;

          const trigger = el.querySelector<HTMLButtonElement>('button')!;
          const tooltip = el.querySelector<WaTooltip>('wa-tooltip[slot="wa-internal-tooltip"]')!;

          trigger.dispatchEvent(new MouseEvent('mouseover', { bubbles: true, composed: true }));
          await aTimeout(250);

          expect(tooltip.open).to.be.false;
        });

        it('should open the feedback-mode tooltip during copy', async () => {
          sinon.stub(navigator.clipboard, 'writeText').resolves();

          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test" tooltip="copy" feedback-duration="2000">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;

          const tooltip = el.querySelector<WaTooltip>('wa-tooltip[slot="wa-internal-tooltip"]')!;
          await clickOnElement(el);
          await waitUntil(() => tooltip.open === true, 'expected tooltip to open during copy', { timeout: 2000 });
          expect(tooltip.open).to.be.true;
        });

        it('should not render any tooltip when tooltip="none" on a custom trigger', async () => {
          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test" tooltip="none">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;

          expect(el.querySelector('wa-tooltip[slot="wa-internal-tooltip"]')).to.be.null;
        });

        it('should not render any tooltip when tooltip="none" on the default trigger', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test" tooltip="none"></wa-copy-button>`);
          expect(el.shadowRoot!.querySelector('wa-tooltip')).to.be.null;
        });

        it('should not render or open a tooltip during copy when tooltip="none"', async () => {
          sinon.stub(navigator.clipboard, 'writeText').resolves();

          const el = await fixture<WaCopyButton>(html`
            <wa-copy-button value="test" tooltip="none" feedback-duration="200">
              <button>Custom Copy</button>
            </wa-copy-button>
          `);
          await el.updateComplete;

          await clickOnElement(el);
          await waitUntil(() => el.status === 'success');
          expect(el.querySelector('wa-tooltip[slot="wa-internal-tooltip"]')).to.be.null;
          expect(el.shadowRoot!.querySelector('wa-tooltip')).to.be.null;
        });

        it('should clean up the light-DOM tooltip on disconnect', async () => {
          const container = await fixture<HTMLDivElement>(html`
            <div>
              <wa-copy-button value="test">
                <button>Custom Copy</button>
              </wa-copy-button>
            </div>
          `);
          const el = container.querySelector<WaCopyButton>('wa-copy-button')!;
          await el.updateComplete;

          expect(container.querySelector('wa-tooltip[slot="wa-internal-tooltip"]')).to.exist;

          el.remove();

          expect(container.querySelector('wa-tooltip[slot="wa-internal-tooltip"]')).to.be.null;
        });
      });

      describe('CSS parts and states', () => {
        it('should expose the button CSS part', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test"></wa-copy-button>`);
          expect(el.shadowRoot!.querySelector('[part~="button"]')).to.exist;
        });

        it('should expose the copy-icon CSS part', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test"></wa-copy-button>`);
          expect(el.shadowRoot!.querySelector('[part~="copy-icon"]')).to.exist;
        });

        it('should expose the success-icon CSS part', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test"></wa-copy-button>`);
          expect(el.shadowRoot!.querySelector('[part~="success-icon"]')).to.exist;
        });

        it('should expose the error-icon CSS part', async () => {
          const el = await fixture<WaCopyButton>(html`<wa-copy-button value="test"></wa-copy-button>`);
          expect(el.shadowRoot!.querySelector('[part~="error-icon"]')).to.exist;
        });
      });
    });
  }
});
