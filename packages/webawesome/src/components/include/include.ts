import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { WaIncludeErrorEvent } from '../../events/include-error.js';
import { WaLoadEvent } from '../../events/load.js';
import { watch } from '../../internal/watch.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import styles from './include.styles.js';
import { requestInclude } from './request.js';

/**
 * @summary Fetches an external HTML file and embeds its contents inline on the page. Useful for reusing shared markup
 *  like headers, footers, and partials across multiple pages.
 * @documentation https://webawesome.com/docs/components/include
 * @status stable
 * @since 2.0
 *
 * @event wa-load - Emitted when the included file is loaded.
 * @event {{ status: number }} wa-include-error - Emitted when the included file fails to load due to an error.
 *
 * @ssr - `<wa-include>` fetches its content asynchronously (like `<wa-icon>`), so the rendered output isn't available during SSR.
 */
@customElement('wa-include')
export default class WaInclude extends WebAwesomeElement {
  static css = styles;

  /**
   * The location of the content to include. This can be a URL to an HTML file, a same-page reference to an element's id
   * (e.g. `#my-id`), or a URL with a fragment that targets an element's id within the fetched file
   * (e.g. `/partials.html#my-id`). When targeting an element by id, its content is cloned. If the target is a
   * `<template>`, its child nodes are cloned. Be sure you trust the content you are including as it will be executed as
   * code and can result in XSS attacks.
   */
  @property() src: string;

  /** The fetch mode to use. */
  @property() mode: 'cors' | 'no-cors' | 'same-origin' = 'cors';

  /**
   * Allows included scripts to be executed. Be sure you trust the content you are including as it will be executed as
   * code and can result in XSS attacks.
   */
  @property({ attribute: 'allow-scripts', type: Boolean }) allowScripts = false;

  private executeScript(script: HTMLScriptElement) {
    // Create a copy of the script and swap it out so the browser executes it
    const newScript = document.createElement('script');
    [...script.attributes].forEach(attr => newScript.setAttribute(attr.name, attr.value));
    newScript.textContent = script.textContent;
    script.parentNode!.replaceChild(newScript, script);
  }

  /** Clones the contents of an element — a template's `content`, or any other element's children — for insertion. */
  private cloneFragment(element: Element, ownerDocument: Document): Node {
    const content =
      element.localName === 'template' ? (element as HTMLTemplateElement).content : this.childNodesToFragment(element);
    return ownerDocument.importNode(content, true);
  }

  private childNodesToFragment(element: Element): DocumentFragment {
    const fragment = element.ownerDocument.createDocumentFragment();
    element.childNodes.forEach(child => fragment.append(child.cloneNode(true)));
    return fragment;
  }

  @watch('src')
  async handleSrcChange() {
    try {
      const src = this.src;

      // Resolve against the current document so we can pull off the hash (id), if any
      const url = new URL(src, document.baseURI);
      const fragmentId = url.hash.slice(1);

      // A bare hash (e.g. "#id") has no file to fetch; pull the element from the current page
      if (src.startsWith('#')) {
        const element = fragmentId ? document.getElementById(decodeURIComponent(fragmentId)) : null;

        if (element) {
          this.replaceChildren(this.cloneFragment(element, document));
        } else {
          this.replaceChildren();
        }

        this.dispatchEvent(new WaLoadEvent());
        return;
      }

      // Drop the hash before fetching so the cache keys on the file, not the fragment. Without a hash, fetch src
      // verbatim to preserve the existing cache key.
      let fetchSrc = src;
      if (fragmentId) {
        url.hash = '';
        fetchSrc = url.href;
      }
      const file = await requestInclude(fetchSrc, this.mode);

      // If the src changed since the request started do nothing, otherwise we risk overwriting a subsequent response
      if (src !== this.src) {
        return;
      }

      if (!file.ok) {
        this.dispatchEvent(new WaIncludeErrorEvent({ status: file.status }));
        return;
      }

      if (fragmentId) {
        // Pull the requested element out of the fetched file
        const doc = new DOMParser().parseFromString(file.html, 'text/html');
        const element = doc.getElementById(decodeURIComponent(fragmentId));

        if (!element) {
          this.dispatchEvent(new WaIncludeErrorEvent({ status: file.status }));
          return;
        }

        this.replaceChildren(this.cloneFragment(element, document));
      } else {
        this.innerHTML = file.html;
      }

      if (this.allowScripts) {
        [...this.querySelectorAll('script')].forEach(script => this.executeScript(script));
      }

      this.dispatchEvent(new WaLoadEvent());
    } catch {
      this.dispatchEvent(new WaIncludeErrorEvent({ status: -1 }));
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wa-include': WaInclude;
  }
}
