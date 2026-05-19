import { render as litRender } from '@lit-labs/ssr';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

/**
 * Takes a string and turns it into a lit template and removes the outer markers to make it able to SSR.
 */
export function renderString(html: string): string {
  const iterator = litRender(unsafeHTML(html));
  let result = '';
  for (const chunk of iterator) result += chunk;
  return trimOuterMarkers(result);
}

// https://github.com/lit/lit/blob/6c051d517bd92761787897b2c8c060ed419126e2/packages/labs/eleventy-plugin-lit/src/index.ts#L238-L275
// Lit SSR includes comment markers to track the outer template from
// the template we've generated here, but it's not possible for this
// outer template to be hydrated, so they serve no purpose.

// TODO(aomarks) Maybe we should provide an option to SSR option to skip
// outer markers (though note there are 2 layers of markers due to the
// use of the unsafeHTML directive).
function trimOuterMarkers(renderedContent: string): string {
  const q = '<?>';
  const startMarker = '<!--lit-part '; // e.g. <!--lit-part HeR8tRCwgQQ=-->
  const endMarker = '<!--/lit-part-->';

  renderedContent = renderedContent.trim();

  let start;
  let end;

  if (renderedContent.startsWith(q)) {
    start = q.length;
  } else if (renderedContent.startsWith(startMarker)) {
    start = renderedContent.indexOf('-->') + 3;
  }

  if (renderedContent.endsWith(q)) {
    end = renderedContent.length - q.length;
  } else if (renderedContent.endsWith(endMarker)) {
    end = renderedContent.length - endMarker.length;
  }

  if (start || end) {
    // trim one or more
    return trimOuterMarkers(renderedContent.slice(start ?? 0, end ?? renderedContent.length));
  }

  return renderedContent;
}
