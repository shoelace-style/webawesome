import { elementUpdated, expect } from '@open-wc/testing';
import { html } from 'lit';
import { fixtures } from '../../internal/test/fixture.js';
import type WaButtonGroup from './button-group.js';

describe('<wa-button-group>', () => {
  for (const fixture of fixtures) {
    describe(`with "${fixture.type}" rendering`, () => {
      describe('accessibility', () => {
        it('should pass accessibility tests', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group label="Actions">
              <wa-button>Button 1</wa-button>
              <wa-button>Button 2</wa-button>
              <wa-button>Button 3</wa-button>
            </wa-button-group>
          `);

          if (fixture.type === 'client-only') {
            await expect(el).to.be.accessible();
          }
        });

        it('should have role="group" on the base part by default', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group label="Actions">
              <wa-button>Button 1</wa-button>
            </wa-button-group>
          `);
          const base = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base.getAttribute('role')).to.equal('group');
        });

        it('should set aria-label from the label property', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group label="My Group">
              <wa-button>Button 1</wa-button>
            </wa-button-group>
          `);
          const base = el.shadowRoot!.querySelector('[part~="base"]')!;
          expect(base.getAttribute('aria-label')).to.equal('My Group');
        });
      });

      describe('properties', () => {
        it('should have an empty label by default', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1</wa-button>
            </wa-button-group>
          `);
          expect(el.label).to.equal('');
        });

        it('should default orientation to "horizontal"', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1</wa-button>
            </wa-button-group>
          `);
          expect(el.orientation).to.equal('horizontal');
          expect(el.getAttribute('orientation')).to.equal('horizontal');
        });

        it('should reflect orientation to the attribute', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group orientation="vertical">
              <wa-button>Button 1</wa-button>
            </wa-button-group>
          `);
          expect(el.orientation).to.equal('vertical');
          expect(el.getAttribute('orientation')).to.equal('vertical');
        });

        it('should set aria-orientation when orientation changes', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1</wa-button>
            </wa-button-group>
          `);
          expect(el.getAttribute('aria-orientation')).to.equal('horizontal');

          el.orientation = 'vertical';
          await elementUpdated(el);
          expect(el.getAttribute('aria-orientation')).to.equal('vertical');
        });
      });

      describe('slots', () => {
        it('should render slotted buttons', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1</wa-button>
              <wa-button>Button 2</wa-button>
              <wa-button>Button 3</wa-button>
            </wa-button-group>
          `);
          const buttons = el.querySelectorAll('wa-button');
          expect(buttons.length).to.equal(3);
        });
      });

      describe('CSS parts and states', () => {
        it('should expose a "base" part', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1</wa-button>
            </wa-button-group>
          `);
          const base = el.shadowRoot!.querySelector('[part~="base"]');
          expect(base).to.exist;
        });
      });

      describe('focus and hover behavior', () => {
        it('should add button-focus class on focusin and remove on focusout', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1</wa-button>
              <wa-button>Button 2</wa-button>
            </wa-button-group>
          `);

          const button = el.querySelector('wa-button')!;
          button.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
          await elementUpdated(button);
          expect(button.classList.contains('button-focus')).to.be.true;

          button.dispatchEvent(new FocusEvent('focusout', { bubbles: true }));
          await elementUpdated(button);
          expect(button.classList.contains('button-focus')).to.be.false;
        });

        it('should add button-hover class on mouseover and remove on mouseout', async () => {
          const el = await fixture<WaButtonGroup>(html`
            <wa-button-group>
              <wa-button>Button 1</wa-button>
              <wa-button>Button 2</wa-button>
            </wa-button-group>
          `);

          const button = el.querySelector('wa-button')!;
          button.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
          await elementUpdated(button);
          expect(button.classList.contains('button-hover')).to.be.true;

          button.dispatchEvent(new MouseEvent('mouseout', { bubbles: true }));
          await elementUpdated(button);
          expect(button.classList.contains('button-hover')).to.be.false;
        });
      });
    });
  }
});
