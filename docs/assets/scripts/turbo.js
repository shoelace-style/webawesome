import 'https://cdn.jsdelivr.net/npm/@hotwired/turbo@8.0.10/+esm';
import { preventTurboFouce } from '/dist/webawesome.js';

if (!window.___turboScrollPositions___) {
  window.___turboScrollPositions___ = {};
}

const positions = window.___turboScrollPositions___;

function saveScrollPosition() {
  document.querySelectorAll('[data-remember-scroll]').forEach(element => {
    if (element.id) {
      positions[element.id] = {
        top: element.scrollTop,
        left: element.scrollLeft,
      };
    } else {
      console.warn(`Can't save scroll position for elements without an id.`, el);
    }
  });
}

function restoreScrollPosition(event) {
  if (event.detail && event.detail.newBody) {
    event.detail.newBody.querySelectorAll('[data-remember-scroll]').forEach(element => {
      if (!positions[element.id]) {
        return;
      }

      const { top, left } = positions[element.id];

      element.scrollTop = top;
      element.scrollLeft = left;
    });
  }

  document.querySelectorAll('[data-remember-scroll]').forEach(element => {
    if (!positions[element.id]) {
      return;
    }

    const { top, left } = positions[element.id];

    element.scrollTop = top;
    element.scrollLeft = left;
  });
}

function fixDSD(e) {
  const newElement = e.detail.newBody || e.detail.newFrame || e.detail.newStream;
  if (!newElement) {
    return;
  }

  // https://developer.chrome.com/docs/css-ui/declarative-shadow-dom#polyfill
  (function attachShadowRoots(root) {
    root.querySelectorAll('template[shadowrootmode]').forEach(template => {
      const mode = template.getAttribute('shadowrootmode');
      const shadowRoot = template.parentNode.attachShadow({ mode });
      shadowRoot.appendChild(template.content);
      template.remove();
      attachShadowRoots(shadowRoot);
    });
  })(newElement);
}

// Fixes an issue with DSD keeping the `<template>` elements hanging around in the lightdom.
// https://github.com/hotwired/turbo/issues/1292
['turbo:before-render', 'turbo:before-stream-render', 'turbo:before-frame-render'].forEach(eventName => {
  document.addEventListener(eventName, fixDSD);
});

window.addEventListener('turbo:before-cache', saveScrollPosition);
window.addEventListener('turbo:before-render', restoreScrollPosition);
window.addEventListener('turbo:render', restoreScrollPosition);
preventTurboFouce();
