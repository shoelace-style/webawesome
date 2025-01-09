const iframe = document.getElementById('myIframe');

for (let iframe of document.querySelectorAll('iframe')) {
  iframe.onload = () => {
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
    }
  };
}

function syncIframeHeight(iframe) {
  iframe.style.height = '0px';

  requestAnimationFrame(() => {
    iframe.style.height = iframe.contentDocument.body.scrollHeight + 'px';
  });
}
