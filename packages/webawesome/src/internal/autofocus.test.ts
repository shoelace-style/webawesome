import { aTimeout, expect, fixture, waitUntil } from '@open-wc/testing';
import { html } from 'lit';

// Each test loads a page in a new frame, so the components see a fresh document, as on a real page load
let frame: HTMLIFrameElement | undefined;

async function loadPage(markup: string) {
  frame = document.createElement('iframe');
  frame.srcdoc = `<!doctype html><html lang="en"><body>${markup}</body></html>`;
  const loaded = new Promise(resolve => frame!.addEventListener('load', resolve, { once: true }));
  document.body.append(frame);
  await loaded;
  return frame.contentDocument!;
}

// Defines a component in the frame after its markup is parsed, as the autoloader does
async function define(doc: Document, name: string) {
  const script = doc.createElement('script');
  const loaded = new Promise(resolve => script.addEventListener('load', resolve, { once: true }));
  script.type = 'module';
  script.src = `/dist-cdn/components/${name}/${name}.js`;
  doc.head.append(script);
  await loaded;
  await doc.defaultView!.customElements.whenDefined(`wa-${name}`);

  // Let the components render and autofocus run
  await aTimeout(100);
}

describe('autofocus', () => {
  beforeEach(() => {
    (document.activeElement as HTMLElement | null)?.blur();
  });

  afterEach(() => {
    // Blur before removing the frame, or Firefox stops moving focus into the next frame
    (frame?.contentDocument?.activeElement as HTMLElement | null)?.blur();
    (document.activeElement as HTMLElement | null)?.blur();
    frame?.remove();
    frame = undefined;
    window.focus();
  });

  // Assertions compare tag names, since a failure message that prints these elements can hang the runner
  // WebKit can autofocus the native control inside `<wa-input>` on its own, so tests that expect no focus use `<wa-button>`

  it('should focus an element that is defined after the page loads', async () => {
    const doc = await loadPage('<wa-input label="Name" autofocus></wa-input>');

    await define(doc, 'input');

    expect(doc.activeElement?.localName).to.equal('wa-input');
  });

  it('should focus an element when its autofocus property is set', async () => {
    const doc = await loadPage('');
    await define(doc, 'input');
    const input = doc.createElement('wa-input');

    input.autofocus = true;
    doc.body.append(input);
    await waitUntil(() => doc.activeElement === input, 'The input was not focused', { timeout: 1000 });

    expect(input.hasAttribute('autofocus')).to.be.false;
  });

  it('should only focus the first element with autofocus', async () => {
    const doc = await loadPage('<wa-input label="Name" autofocus></wa-input><wa-button autofocus>Button</wa-button>');

    await define(doc, 'input');
    expect(doc.activeElement?.localName).to.equal('wa-input');

    (doc.activeElement as HTMLElement).blur();
    await define(doc, 'button');

    expect(doc.activeElement?.localName).to.equal('body');
  });

  it('should not take focus from another element', async () => {
    const doc = await loadPage('<input aria-label="Other" /><wa-button autofocus>Button</wa-button>');
    const other = doc.querySelector('input')!;

    other.focus();
    await define(doc, 'button');

    expect(doc.activeElement?.localName).to.equal('input');
  });

  it('should not focus after the user has moved focus, even when it has moved away again', async () => {
    const doc = await loadPage('<input aria-label="Other" /><wa-button autofocus>Button</wa-button>');
    const other = doc.querySelector('input')!;

    // Another component loads first, as with the autoloader
    await define(doc, 'input');
    other.focus();
    other.blur();
    (document.activeElement as HTMLElement | null)?.blur();
    await define(doc, 'button');

    expect(doc.activeElement?.localName).to.equal('body');
  });

  it('should not take focus from an ancestor that has focus', async () => {
    // A router focuses the new view. This runs in the top document, which is the one the helper checks for focus.
    const main = await fixture<HTMLElement>(
      html`<main tabindex="-1"><wa-autofocus-test-button autofocus>Button</wa-autofocus-test-button></main>`,
    );

    main.focus();
    customElements.define('wa-autofocus-test-button', class extends (customElements.get('wa-button')!) {});
    await aTimeout(100);

    expect(document.activeElement?.localName).to.equal('main');
  });

  it('should focus an element in a dialog that is open when the page loads', async () => {
    const doc = await loadPage(
      '<wa-dialog label="Dialog" open><wa-input label="Name" autofocus></wa-input></wa-dialog>',
    );

    await define(doc, 'dialog');
    await define(doc, 'input');

    expect(doc.activeElement?.localName).to.equal('wa-input');
  });

  it('should not focus the element when the URL fragment points to an element', async () => {
    const doc = await loadPage('<wa-button autofocus>Button</wa-button><p id="target"></p>');

    doc.defaultView!.location.hash = 'target';
    await define(doc, 'button');

    expect(doc.activeElement?.localName).to.equal('body');
  });

  it('should wait for an ancestor to be defined before focusing', async () => {
    const doc = await loadPage(
      '<wa-autofocus-test-ancestor><wa-button autofocus>Button</wa-button></wa-autofocus-test-ancestor>',
    );
    const win = doc.defaultView! as Window & typeof globalThis;
    const button = doc.querySelector('wa-button')!;
    let focusedEarly = false;

    // Chromium can autofocus the button natively, so check when the helper calls focus() instead
    button.focus = () => (focusedEarly ||= !win.customElements.get('wa-autofocus-test-ancestor'));

    await define(doc, 'button');
    win.customElements.define(
      'wa-autofocus-test-ancestor',
      class extends win.HTMLElement {
        connectedCallback() {
          this.hidden = true;
        }
      },
    );
    await aTimeout(100);

    expect(focusedEarly).to.be.false;
  });
});
