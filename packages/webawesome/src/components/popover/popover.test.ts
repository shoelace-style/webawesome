import { aTimeout, expect, fixture, html, waitUntil } from '@open-wc/testing';
import { sendKeys } from '@web/test-runner-commands';
import sinon from 'sinon';
import type WaDropdown from '../dropdown/dropdown.js';
import type WaPopover from './popover.js';
import type WaTooltip from '../tooltip/tooltip.js';

describe('<wa-popover>', () => {
  it('should render a component', async () => {
    const el = await fixture(html` <wa-popover></wa-popover> `);

    expect(el).to.exist;
  });

  describe('dismissible stack', () => {
    it('should only close the dropdown when pressing Escape on a popover with a dropdown inside', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <wa-button id="popover-anchor">Open Popover</wa-button>
          <wa-popover id="test-popover" for="popover-anchor">
            <div style="padding: 1rem;">
              <wa-dropdown id="test-dropdown">
                <wa-button slot="trigger" caret>Open Dropdown</wa-button>
                <wa-dropdown-item>Item 1</wa-dropdown-item>
              </wa-dropdown>
            </div>
          </wa-popover>
        </div>
      `);

      const popover = el.querySelector<WaPopover>('#test-popover')!;
      const dropdown = el.querySelector<WaDropdown>('#test-dropdown')!;

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      dropdown.open = true;
      await waitUntil(() => dropdown.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(dropdown.open).to.be.false;
      expect(popover.open).to.be.true;
    });

    it('should only close the tooltip when pressing Escape on a popover with a tooltip inside', async () => {
      const el = await fixture<HTMLDivElement>(html`
        <div>
          <wa-button id="popover-anchor">Open Popover</wa-button>
          <wa-popover id="test-popover" for="popover-anchor">
            <div style="padding: 1rem;">
              <wa-button id="tooltip-anchor">Hover me</wa-button>
              <wa-tooltip id="test-tooltip" for="tooltip-anchor" trigger="click">Tooltip content</wa-tooltip>
            </div>
          </wa-popover>
        </div>
      `);

      const popover = el.querySelector<WaPopover>('#test-popover')!;
      const tooltip = el.querySelector<WaTooltip>('#test-tooltip')!;

      popover.open = true;
      await waitUntil(() => popover.open);
      await aTimeout(200);

      tooltip.open = true;
      await waitUntil(() => tooltip.open);
      await aTimeout(200);

      await sendKeys({ press: 'Escape' });
      await aTimeout(200);

      expect(tooltip.open).to.be.false;
      expect(popover.open).to.be.true;
    });
  });
});
