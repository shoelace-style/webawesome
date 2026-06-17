import { expect, fixture, html } from '@open-wc/testing';
import type WaCheckboxGroup from './checkbox-group.js';

describe('<wa-checkbox-group>', () => {
  it('should render a labeled group of checkboxes', async () => {
    const el = await fixture<WaCheckboxGroup>(html`
      <wa-checkbox-group label="Toppings">
        <wa-checkbox value="cheese">Cheese</wa-checkbox>
        <wa-checkbox value="olives">Olives</wa-checkbox>
      </wa-checkbox-group>
    `);

    expect(el).to.exist;
  });

  it('should be accessible', async () => {
    const el = await fixture<WaCheckboxGroup>(html`
      <wa-checkbox-group label="Toppings" hint="Choose any you like.">
        <wa-checkbox value="cheese">Cheese</wa-checkbox>
        <wa-checkbox value="olives">Olives</wa-checkbox>
      </wa-checkbox-group>
    `);

    await expect(el).to.be.accessible();
  });

  it('should expose a role="group" wrapper labeled by the label', async () => {
    const el = await fixture<WaCheckboxGroup>(html`
      <wa-checkbox-group label="Toppings">
        <wa-checkbox value="cheese">Cheese</wa-checkbox>
      </wa-checkbox-group>
    `);

    const group = el.shadowRoot!.querySelector('[role="group"]')!;
    expect(group).to.exist;
    expect(group.getAttribute('aria-labelledby')).to.equal('label');
    expect(group.getAttribute('aria-describedby')).to.equal('hint');
  });

  it('should default to vertical orientation', async () => {
    const el = await fixture<WaCheckboxGroup>(html`
      <wa-checkbox-group label="Toppings">
        <wa-checkbox value="cheese">Cheese</wa-checkbox>
      </wa-checkbox-group>
    `);

    expect(el.orientation).to.equal('vertical');
  });

  it('should not change the size of grouped checkboxes', async () => {
    const el = await fixture<WaCheckboxGroup>(html`
      <wa-checkbox-group label="Toppings">
        <wa-checkbox value="cheese" size="xs">Cheese</wa-checkbox>
        <wa-checkbox value="olives" size="xl">Olives</wa-checkbox>
      </wa-checkbox-group>
    `);

    await el.updateComplete;
    const checkboxes = [...el.querySelectorAll('wa-checkbox')];
    expect(checkboxes[0].getAttribute('size')).to.equal('xs');
    expect(checkboxes[1].getAttribute('size')).to.equal('xl');
  });
});
