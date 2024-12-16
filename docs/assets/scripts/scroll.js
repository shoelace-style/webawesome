// Smooth links
document.addEventListener('click', event => {
  const link = event.target.closest('a');
  const id = (link?.hash ?? '').substr(1);

  if (!link || link.getAttribute('data-smooth-link') === 'off') {
    return;
  }

  if (id) {
    const target = document.getElementById(id);
    const headerHeight = document.querySelector('wa-page > header').clientHeight;

    if (target) {
      event.preventDefault();
      window.scroll({
        top: target.offsetTop - headerHeight,
        behavior: 'smooth',
      });
      history.pushState(undefined, undefined, `#${id}`);
    }
  }
});

// Scroll classes
function updateScrollClass() {
  document.body.classList.toggle('scrolled-down', window.scrollY >= 10);
}

window.addEventListener('scroll', updateScrollClass);
window.addEventListener('turbo:render', updateScrollClass);
updateScrollClass();
