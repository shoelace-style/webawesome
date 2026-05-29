import { render as litRender, type RenderInfo } from '@lit-labs/ssr';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { trimOuterMarkers } from './trim-outer-markers.js';

// tree-item-renderer.ts
import { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer.js';
import type { ThunkedRenderResult } from '@lit-labs/ssr/lib/render-result.js';

export class ParentElementRenderer extends LitElementRenderer {
  renderShadow (renderInfo: RenderInfo): ThunkedRenderResult | undefined {
    const stack = renderInfo.eventTargetStack
    const parentElement = stack[stack.length - 1];
    // console.log({ parentElement })
    // @ts-expect-error
    this.element.parentElement = parentElement

    return super.renderShadow(renderInfo)
  }
}

/**
 * Takes a string and turns it into a lit template and removes the outer markers to make it able to SSR.
 */
export function renderString(html: string, renderInfo: Partial<RenderInfo> = {}): string {
  if (renderInfo) {
    renderInfo.elementRenderers = [
      ParentElementRenderer
    ]

  }
  const iterator = litRender(unsafeHTML(html), renderInfo);
  let result = [];
  for (const chunk of iterator) {
    result.push(chunk);
  }
  return trimOuterMarkers(result.join(''));
}
