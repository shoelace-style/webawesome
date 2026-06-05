import { render as litRender, type RenderInfo } from '@lit-labs/ssr';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { trimOuterMarkers } from './trim-outer-markers.js';

/**
 * Takes a string and turns it into a lit template and removes the outer markers to make it able to SSR.
 */
export function renderString(html: string, renderInfo: Partial<RenderInfo> = {}): string {
  const iterator = litRender(unsafeHTML(html), renderInfo);
  let result = [];
  for (const chunk of iterator) {
    result.push(chunk);
  }
  return trimOuterMarkers(result.join(''));
}
