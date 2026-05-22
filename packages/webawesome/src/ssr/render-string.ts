import { render as litRender } from '@lit-labs/ssr';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { trimOuterMarkers } from './trim-outer-markers.js';

/**
 * Takes a string and turns it into a lit template and removes the outer markers to make it able to SSR.
 */
export function renderString(html: string): string {
  const iterator = litRender(unsafeHTML(html));
  let result = [];
  for (const chunk of iterator)  { result.push(chunk) }
  return trimOuterMarkers(result.join(''));
}
