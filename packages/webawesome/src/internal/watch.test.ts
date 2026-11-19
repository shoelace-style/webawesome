import { expect, fixture, html } from '@open-wc/testing';
import { LitElement } from 'lit';
import sinon from 'sinon';
import { watch } from './watch.js';

// Test files compile with standard decorators and native class fields, so properties are declared statically and
// the legacy @watch decorator is applied by hand in the order the decorators would be declared.

class TestWatchOrder extends LitElement {
  static properties = {
    disabled: { type: Boolean },
    open: { type: Boolean },
    value: { type: Number },
    count: { type: Number },
  };

  declare disabled: boolean;
  declare open: boolean;
  declare value: number;
  declare count: number;
  countCalls: [unknown, unknown][] = [];
  openCalls: [unknown, unknown][] = [];
  valueCalls: [unknown, unknown][] = [];

  constructor() {
    super();
    this.disabled = false;
    this.open = false;
    this.value = 0;
    this.count = 0;
  }

  handleDisabledChange() {
    if (this.disabled) {
      this.open = false;
      this.count++;
    }
  }

  handleOpenChange(oldValue: unknown, newValue: unknown) {
    this.openCalls.push([oldValue, newValue]);
  }

  handleCountChange(oldValue: unknown, newValue: unknown) {
    this.countCalls.push([oldValue, newValue]);
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
watch('count', { waitUntilFirstUpdate: true })(TestWatchOrder.prototype, 'handleCountChange');
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

class TestWatchGetter extends LitElement {
  static properties = {
    items: { attribute: false, noAccessor: true },
    reset: { type: Boolean },
  };

  declare reset: boolean;
  private storedItems: string[] = [];
  itemsCalls = 0;

  constructor() {
    super();
    this.reset = false;
  }

  // Returns a new array on every read, like a multiple select's value.
  get items() {
    return [...this.storedItems];
  }

  set items(items: string[]) {
    const oldItems = this.storedItems;
    this.storedItems = items;
    this.requestUpdate('items', oldItems);
  }

  handleResetChange() {
    if (this.reset) {
      this.items = [];
    }
  }

  handleItemsChange() {
    this.itemsCalls++;
  }
}

watch('reset', { waitUntilFirstUpdate: true })(TestWatchGetter.prototype, 'handleResetChange');
watch('items', { waitUntilFirstUpdate: true })(TestWatchGetter.prototype, 'handleItemsChange');
customElements.define('test-watch-getter', TestWatchGetter);

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

    el.count = 1;
    el.disabled = true;
    await el.updateComplete;

    expect(el.count).to.equal(2);
    expect(el.countCalls).to.deep.equal([
      [0, 1],
      [1, 2],
    ]);
  });

  it('does not run a watcher again when another watcher sets the value back to where it started', async () => {
    const el = await fixture<TestWatchOrder>(html`<test-watch-order></test-watch-order>`);

    el.open = true;
    el.disabled = true;
    await el.updateComplete;

    expect(el.open).to.equal(false);
    expect(el.openCalls).to.deep.equal([[false, true]]);
  });

  it('does not run a watcher again for a change it made itself', async () => {
    const el = await fixture<TestWatchOrder>(html`<test-watch-order></test-watch-order>`);

    el.value = 50;
    await el.updateComplete;

    expect(el.value).to.equal(10);
    expect(el.valueCalls).to.deep.equal([[0, 50]]);
  });

  it('runs a watcher once when its getter returns a new array on every read', async () => {
    const el = await fixture<TestWatchGetter>(html`<test-watch-getter></test-watch-getter>`);

    el.items = ['a'];
    await el.updateComplete;
    expect(el.itemsCalls).to.equal(1);

    el.reset = true;
    await el.updateComplete;
    expect(el.itemsCalls).to.equal(2);
  });

  it('stops and warns when watchers keep changing each other', async () => {
    const warn = sinon.stub(console, 'warn');
    try {
      const el = await fixture<TestWatchLoop>(html`<test-watch-loop></test-watch-loop>`);

      el.a = 1;
      await el.updateComplete;

      expect(el.calls).to.be.greaterThan(0).and.lessThan(100);
      expect(warn).to.have.been.calledOnceWith(sinon.match('[test-watch-loop]'));
    } finally {
      warn.restore();
    }
  });
});
