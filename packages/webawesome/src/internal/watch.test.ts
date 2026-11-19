import { expect, fixture, html } from '@open-wc/testing';
import { LitElement } from 'lit';
import { watch } from './watch.js';

// Test files compile with standard decorators and native class fields, so properties are declared statically and
// the legacy @watch decorator is applied by hand in the order the decorators would be declared.

class TestWatchOrder extends LitElement {
  static properties = {
    disabled: { type: Boolean },
    open: { type: Boolean },
    value: { type: Number },
  };

  declare disabled: boolean;
  declare open: boolean;
  declare value: number;
  openCalls: [unknown, unknown][] = [];
  valueCalls: [unknown, unknown][] = [];

  constructor() {
    super();
    this.disabled = false;
    this.open = false;
    this.value = 0;
  }

  handleDisabledChange() {
    if (this.disabled) {
      this.open = false;
    }
  }

  handleOpenChange(oldValue: unknown, newValue: unknown) {
    this.openCalls.push([oldValue, newValue]);
  }

  handleValueChange(oldValue: unknown, newValue: unknown) {
    this.valueCalls.push([oldValue, newValue]);
    this.value = Math.min(this.value, 10);
  }
}

// The disabled watcher is declared before the open watcher it affects.
watch('disabled', { waitUntilFirstUpdate: true })(TestWatchOrder.prototype, 'handleDisabledChange');
watch('open', { waitUntilFirstUpdate: true })(TestWatchOrder.prototype, 'handleOpenChange');
watch('value', { waitUntilFirstUpdate: true })(TestWatchOrder.prototype, 'handleValueChange');
customElements.define('test-watch-order', TestWatchOrder);

class TestWatchLoop extends LitElement {
  static properties = {
    a: { type: Number },
    b: { type: Number },
  };

  declare a: number;
  declare b: number;
  calls = 0;

  constructor() {
    super();
    this.a = 0;
    this.b = 0;
  }

  handleAChange() {
    this.calls++;
    this.b++;
  }

  handleBChange() {
    this.calls++;
    this.a++;
  }
}

watch('a', { waitUntilFirstUpdate: true })(TestWatchLoop.prototype, 'handleAChange');
watch('b', { waitUntilFirstUpdate: true })(TestWatchLoop.prototype, 'handleBChange');
customElements.define('test-watch-loop', TestWatchLoop);

describe('@watch', () => {
  it('runs a watcher when an earlier-declared watcher changes its property', async () => {
    const el = await fixture<TestWatchOrder>(html`<test-watch-order></test-watch-order>`);

    el.open = true;
    await el.updateComplete;
    el.disabled = true;
    await el.updateComplete;

    expect(el.open).to.equal(false);
    expect(el.openCalls).to.deep.equal([
      [false, true],
      [true, false],
    ]);
  });

  it('passes the value a watcher last handled as the old value', async () => {
    const el = await fixture<TestWatchOrder>(html`<test-watch-order></test-watch-order>`);

    el.open = true;
    el.disabled = true;
    await el.updateComplete;

    expect(el.open).to.equal(false);
    expect(el.openCalls).to.deep.equal([
      [false, true],
      [true, false],
    ]);
  });

  it('does not run a watcher again for a change it made itself', async () => {
    const el = await fixture<TestWatchOrder>(html`<test-watch-order></test-watch-order>`);

    el.value = 50;
    await el.updateComplete;

    expect(el.value).to.equal(10);
    expect(el.valueCalls).to.deep.equal([[0, 50]]);
  });

  it('stops when watchers keep changing each other', async () => {
    const el = await fixture<TestWatchLoop>(html`<test-watch-loop></test-watch-loop>`);

    el.a = 1;
    await el.updateComplete;

    expect(el.calls).to.be.greaterThan(0).and.lessThan(100);
  });
});
