import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { allDefined } from './defined.js';

describe('allDefined', () => {
  const warn = console.warn;
  let warnings: string[];

  beforeEach(() => {
    warnings = [];
    console.warn = (...args: unknown[]) => warnings.push(args.join(' '));
  });

  afterEach(() => {
    console.warn = warn;
  });

  it('should resolve without warning when every element is defined', async () => {
    customElements.define('wa-defined-test', class extends HTMLElement {});
    await fixture(html`<wa-defined-test></wa-defined-test>`);

    await allDefined({ timeout: 50 });

    expect(warnings.some(w => w.includes('allDefined()'))).to.be.false;
  });

  it('should warn and resolve when an element is never defined', async () => {
    await fixture(html`<wa-never-defined></wa-never-defined>`);

    await allDefined({ timeout: 50 });

    expect(warnings).to.include('allDefined() timed out after 50ms waiting for: wa-never-defined');
  });

  it('should keep waiting when timeout is Infinity', async () => {
    await fixture(html`<wa-never-defined></wa-never-defined>`);
    let resolved = false;

    allDefined({ timeout: Infinity }).then(() => (resolved = true));
    await aTimeout(100);

    expect(resolved).to.be.false;
  });
});
