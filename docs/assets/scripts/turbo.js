if (!window.___turboScrollPositions___) {
  window.___turboScrollPositions___ = {};
}

const positions = window.___turboScrollPositions___;

function saveScrollPosition() {
  document.querySelectorAll('[data-remember-scroll]').forEach(element => {
    if (element.id) {
      positions[element.id] = {
        top: element.scrollTop,
        left: element.scrollLeft
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

window.addEventListener('turbo:before-cache', saveScrollPosition);
window.addEventListener('turbo:before-render', restoreScrollPosition);
window.addEventListener('turbo:render', restoreScrollPosition);
