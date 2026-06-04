import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { expectEvent } from '../../internal/test/expect-event.js';
import { fixtures } from '../../internal/test/fixture.js';
import type WaAccordionItem from './accordion-item.js';

describe('<wa-accordion-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should be accessible when collapsed', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          await expect(el).to.be.accessible();
        });

        it('should be accessible when expanded', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );
          await expect(el).to.be.accessible();
        });

        it('should set aria-expanded to false when collapsed', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          const button = el.shadowRoot!.querySelector('[part~="button"]')!;
          expect(button.getAttribute('aria-expanded')).to.equal('false');
        });

        it('should set aria-expanded to true when expanded', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );
          const button = el.shadowRoot!.querySelector('[part~="button"]')!;
          expect(button.getAttribute('aria-expanded')).to.equal('true');
        });

        it('should set aria-disabled when disabled', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" disabled>Content</wa-accordion-item>`,
          );
          const button = el.shadowRoot!.querySelector('[part~="button"]')!;
          expect(button.getAttribute('aria-disabled')).to.equal('true');
        });

        it('should set tabindex to -1 on the button when disabled', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" disabled>Content</wa-accordion-item>`,
          );
          const button = el.shadowRoot!.querySelector('[part~="button"]')!;
          expect(button.getAttribute('tabindex')).to.equal('-1');
        });
      });

      describe('properties', () => {
        it('should default expanded to false', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.expanded).to.be.false;
        });

        it('should default disabled to false', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.disabled).to.be.false;
        });

        it('should default label to empty string', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item>Content</wa-accordion-item>`);
          expect(el.label).to.equal('');
        });

        it('should default iconPlacement to end', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.iconPlacement).to.equal('end');
        });

        it('should reflect the expanded property', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          el.expanded = true;
          await el.updateComplete;
          expect(el.hasAttribute('expanded')).to.be.true;
        });

        it('should reflect the disabled property', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          el.disabled = true;
          await el.updateComplete;
          expect(el.hasAttribute('disabled')).to.be.true;
        });

        it('should reflect the icon-placement property', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          el.iconPlacement = 'start';
          await el.updateComplete;
          expect(el.getAttribute('icon-placement')).to.equal('start');
        });

        it('should show the panel when expanded', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );
          const panel = el.shadowRoot!.querySelector<HTMLElement>('.body')!;
          expect(parseInt(getComputedStyle(panel).height)).to.be.greaterThan(0);
        });

        it('should hide the panel when collapsed', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          const panel = el.shadowRoot!.querySelector<HTMLElement>('.body')!;
          expect(parseInt(getComputedStyle(panel).height)).to.equal(0);
        });

        it('should use the label attribute as the header text', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="My Label">Content</wa-accordion-item>`,
          );
          const labelSlot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="label"]')!;
          expect(labelSlot.textContent).to.contain('My Label');
        });
      });

      describe('methods', () => {
        it('should expand when calling expand()', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          await el.expand();
          expect(el.expanded).to.be.true;
        });

        it('should collapse when calling collapse()', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );
          await el.collapse();
          expect(el.expanded).to.be.false;
        });

        it('should expand when calling toggle() on a collapsed item', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          await el.toggle();
          expect(el.expanded).to.be.true;
        });

        it('should collapse when calling toggle() on an expanded item', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );
          await el.toggle();
          expect(el.expanded).to.be.false;
        });

        it('should not expand when calling expand() on a disabled item', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" disabled>Content</wa-accordion-item>`,
          );
          await el.expand();
          expect(el.expanded).to.be.false;
        });

        it('should not collapse when calling collapse() on a disabled item', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded disabled>Content</wa-accordion-item>`,
          );
          await el.collapse();
          expect(el.expanded).to.be.true;
        });

        it('should be a no-op when calling expand() on an already-expanded item', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );
          await el.expand();
          expect(el.expanded).to.be.true;
        });

        it('should be a no-op when calling collapse() on an already-collapsed item', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          await el.collapse();
          expect(el.expanded).to.be.false;
        });

        it('should focus the trigger button when calling focus()', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          el.focus();
          await el.updateComplete;
          const button = el.shadowRoot!.querySelector('[part~="button"]')!;
          expect(el.shadowRoot!.activeElement).to.equal(button);
        });
      });

      describe('slots', () => {
        it('should render the default slot content', async () => {
          const el = await fixture<WaAccordionItem>(html`
            <wa-accordion-item label="Test" expanded><span id="content">Hello</span></wa-accordion-item>
          `);
          expect(el.querySelector('#content')).to.exist;
          expect(el.querySelector('#content')!.textContent).to.equal('Hello');
        });

        it('should render the label slot', async () => {
          const el = await fixture<WaAccordionItem>(html`
            <wa-accordion-item>
              <span slot="label">Custom Label</span>
              Content
            </wa-accordion-item>
          `);
          const slottedLabel = el.querySelector('[slot="label"]');
          expect(slottedLabel).to.exist;
          expect(slottedLabel!.textContent).to.equal('Custom Label');
        });

        it('should render the icon slot', async () => {
          const el = await fixture<WaAccordionItem>(html`
            <wa-accordion-item label="Test">
              <span slot="icon">*</span>
              Content
            </wa-accordion-item>
          `);
          expect(el.querySelector('[slot="icon"]')).to.exist;
        });
      });

      describe('CSS parts', () => {
        it('should expose the base part', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.shadowRoot!.querySelector('[part~="base"]')).to.exist;
        });

        it('should expose the heading part', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.shadowRoot!.querySelector('[part~="heading"]')).to.exist;
        });

        it('should expose the button part', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.shadowRoot!.querySelector('[part~="button"]')).to.exist;
        });

        it('should expose the label part', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.shadowRoot!.querySelector('[part~="label"]')).to.exist;
        });

        it('should expose the icon part', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.shadowRoot!.querySelector('[part~="icon"]')).to.exist;
        });

        it('should expose the panel part', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.shadowRoot!.querySelector('[part~="panel"]')).to.exist;
        });

        it('should expose the content part', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          expect(el.shadowRoot!.querySelector('[part~="content"]')).to.exist;
        });
      });

      describe('CSS states', () => {
        it('should set the animating state while the panel is animating', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          const expandPromise = el.expand();
          await el.updateComplete;
          expect(el.customStates.has('animating')).to.be.true;
          await expandPromise;
          expect(el.customStates.has('animating')).to.be.false;
        });
      });

      describe('rapid toggling', () => {
        it('should keep the panel in sync when collapsing is interrupted by expanding', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );
          const panel = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

          el.expanded = false;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.expanded = true;
          await new Promise(resolve => setTimeout(resolve, 300));

          expect(el.expanded).to.be.true;
          expect(panel.style.height).to.equal('auto');
        });

        it('should keep the panel in sync when expanding is interrupted by collapsing', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          const panel = el.shadowRoot!.querySelector<HTMLElement>('.body')!;

          el.expanded = true;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.expanded = false;
          await new Promise(resolve => setTimeout(resolve, 300));

          expect(el.expanded).to.be.false;
          expect(parseInt(getComputedStyle(panel).height)).to.equal(0);
        });

        it('should only fire the final after event when the animation is interrupted', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" expanded>Content</wa-accordion-item>`,
          );

          let expandedCount = 0;
          let collapsedCount = 0;
          el.addEventListener('wa-accordion-item-expanded', () => expandedCount++);
          el.addEventListener('wa-accordion-item-collapsed', () => collapsedCount++);

          el.expanded = false;
          await new Promise(resolve => setTimeout(resolve, 20));
          el.expanded = true;
          await new Promise(resolve => setTimeout(resolve, 300));

          expect(expandedCount).to.equal(1);
          expect(collapsedCount).to.equal(0);
        });
      });

      describe('trigger event', () => {
        it('should dispatch the internal trigger event when the button is clicked', async () => {
          const el = await fixture<WaAccordionItem>(html`<wa-accordion-item label="Test">Content</wa-accordion-item>`);
          const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="button"]')!;

          await expectEvent(el, 'wa-accordion-item-trigger', () => button.click());
        });

        it('should not dispatch the trigger event when disabled', async () => {
          const el = await fixture<WaAccordionItem>(
            html`<wa-accordion-item label="Test" disabled>Content</wa-accordion-item>`,
          );
          const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="button"]')!;
          let fired = false;
          el.addEventListener('wa-accordion-item-trigger', () => (fired = true));
          button.click();
          await el.updateComplete;
          expect(fired).to.be.false;
        });
      });
    });
  }
});
