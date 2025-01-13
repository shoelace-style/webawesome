/**
 * Sync iframe height with its content page (for same-origin iframes)
 * NOT CURRENTLY USED ANYWHERE
 */
for (let iframe of document.querySelectorAll('iframe')) {
  if (iframe.contentDocument) {
    // Already loaded
    syncIframeHeight(iframe);
  }

  iframe.onload = () => {
    console.log('iframe loaded');
    if (iframe.contentDocument) {
      // Same origin
      iframe.contentWindow.iframe = iframe;
      syncIframeHeight(iframe);
      const resizeObserver = new ResizeObserver(entries => {
        for (let entry of entries) {
          if (entry.target === iframe.contentDocument.body) {
            syncIframeHeight(iframe);
          }
        }
      });

      resizeObserver.observe(iframe.contentDocument.body);
      window.addEventListener('turbo:render', syncIframeHeight(iframe));
    }
  };
}

function syncIframeHeight(iframe) {
  iframe.style.height = '0px';

  requestAnimationFrame(() => {
    iframe.style.height = iframe.contentDocument.body.scrollHeight + 'px';
  });
}
