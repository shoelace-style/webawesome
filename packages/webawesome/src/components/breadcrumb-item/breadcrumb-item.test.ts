import { expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaBreadcrumbItem from './breadcrumb-item.js';

describe('<wa-breadcrumb-item>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          if (fixture.type === "client-only") {
            await expect(el).to.be.accessible();
          }
        });

        it('should pass accessibility tests with href', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item href="https://example.com/">Home</wa-breadcrumb-item>
          `);
          if (fixture.type === "client-only") {
            await expect(el).to.be.accessible();
          }
        });

        it('should pass accessibility tests with href and target', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item href="https://example.com/" target="_blank">Home</wa-breadcrumb-item>
          `);
          await expect(el).to.be.accessible();
        });

        it('should hide the separator from screen readers', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          const separator = el.shadowRoot!.querySelector('[part~="separator"]');
          expect(separator).to.have.attribute('aria-hidden', 'true');
        });
      });

      describe('properties', () => {
        it('should have correct default property values', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          expect(el.href).to.be.undefined;
          expect(el.target).to.be.undefined;
          expect(el.rel).to.equal('noreferrer noopener');
        });

        it('should render a button when no href is provided', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          const button = el.shadowRoot!.querySelector<HTMLButtonElement>('[part~="label"]');
          expect(button).to.exist;
          expect(button!.tagName.toLowerCase()).to.equal('button');
          expect(button).to.have.attribute('type', 'button');
        });

        it('should render a link when href is provided', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item href="https://example.com/">Home</wa-breadcrumb-item>
          `);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
          expect(link).to.exist;
          expect(link!.tagName.toLowerCase()).to.equal('a');
          expect(link).to.have.attribute('href', 'https://example.com/');
        });

        it('should set the target attribute on the link', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item href="https://example.com/" target="_blank">Home</wa-breadcrumb-item>
          `);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
          expect(link).to.have.attribute('target', '_blank');
        });

        it('should default rel to "noreferrer noopener" when target is set', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item href="https://example.com/" target="_blank">Home</wa-breadcrumb-item>
          `);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
          expect(link).to.have.attribute('rel', 'noreferrer noopener');
        });

        it('should use a custom rel value when provided', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item href="https://example.com/" target="_blank" rel="alternate">Home</wa-breadcrumb-item>
          `);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
          expect(link).to.have.attribute('rel', 'alternate');
        });

        it('should not set rel or target on the link when no target is provided', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item href="https://example.com/">Home</wa-breadcrumb-item>
          `);
          const link = el.shadowRoot!.querySelector<HTMLAnchorElement>('[part~="label"]');
          expect(link).to.not.have.attribute('target');
          expect(link).to.not.have.attribute('rel');
        });
      });

      describe('slots', () => {
        it('should render slotted content in the default slot', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          expect(el.textContent!.trim()).to.equal('Home');
        });

        it('should accept content in the start slot', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              <span slot="start">Icon</span>
              Home
            </wa-breadcrumb-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="start"]')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.equal(1);
        });

        it('should accept content in the end slot', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              Home
              <span slot="end">Icon</span>
            </wa-breadcrumb-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="end"]')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.equal(1);
        });

        it('should accept content in the separator slot', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`
            <wa-breadcrumb-item>
              Home
              <span slot="separator">/</span>
            </wa-breadcrumb-item>
          `);
          const slot = el.shadowRoot!.querySelector<HTMLSlotElement>('slot[name="separator"]')!;
          const assignedNodes = slot.assignedNodes({ flatten: true });
          expect(assignedNodes.length).to.equal(1);
        });
      });

      describe('CSS parts', () => {
        it('should have a label part', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          expect(el.shadowRoot!.querySelector('[part~="label"]')).to.exist;
        });

        it('should have a start part', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          expect(el.shadowRoot!.querySelector('[part~="start"]')).to.exist;
        });

        it('should have an end part', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          expect(el.shadowRoot!.querySelector('[part~="end"]')).to.exist;
        });

        it('should have a separator part', async () => {
          const el = await fixture<WaBreadcrumbItem>(html`<wa-breadcrumb-item>Home</wa-breadcrumb-item>`);
          expect(el.shadowRoot!.querySelector('[part~="separator"]')).to.exist;
        });
      });
    });
  }
});
