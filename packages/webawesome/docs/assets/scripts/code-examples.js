const version = document.documentElement.getAttribute('data-version') || '';
const CDN_URL = `https://cdn.jsdelivr.net/npm/@awesome.me/webawesome@${version}/dist-cdn/`;

//
// Resizing previews
//
document.addEventListener('mousedown', handleResizerDrag);
document.addEventListener('touchstart', handleResizerDrag, { passive: true });

function handleResizerDrag(event) {
  const resizer = event.target.closest('.code-example-resizer');
  const preview = event.target.closest('.code-example-preview');

  if (!resizer || !preview) return;

  let startX = event.changedTouches ? event.changedTouches[0].pageX : event.clientX;
  let startWidth = parseInt(document.defaultView.getComputedStyle(preview).width, 10);

  event.preventDefault();
  preview.classList.add('code-example-preview--dragging');
  document.documentElement.addEventListener('mousemove', dragMove);
  document.documentElement.addEventListener('touchmove', dragMove);
  document.documentElement.addEventListener('mouseup', dragStop);
  document.documentElement.addEventListener('touchend', dragStop);

  function dragMove(event) {
    const width = startWidth + (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - startX;
    preview.style.width = `${width}px`;
  }

  function dragStop() {
    preview.classList.remove('code-example-preview--dragging');
    document.documentElement.removeEventListener('mousemove', dragMove);
    document.documentElement.removeEventListener('touchmove', dragMove);
    document.documentElement.removeEventListener('mouseup', dragStop);
    document.documentElement.removeEventListener('touchend', dragStop);
  }
}

//
// Toggle source and CodePen functionality
//
document.addEventListener('click', event => {
  const toggle = event.target?.closest('.code-example-toggle');
  const pen = event.target?.closest('.code-example-pen');

  // Toggle source
  if (toggle) {
    const codeExample = toggle.closest('.code-example');
    const isOpen = !codeExample.classList.contains('open');

    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    codeExample.classList.toggle('open', isOpen);
  }

  // Edit in CodePen
  if (pen) {
    const codeExample = pen.closest('.code-example');
    const code = codeExample.querySelector('code');
    const html =
      `<script data-fa-kit-code="38c11e3f20" type="module" src="${CDN_URL}webawesome.loader.js"></script>\n` +
      `<link rel="stylesheet" href="${CDN_URL}styles/webawesome.css">\n\n` +
      `${code.textContent}`;
    const css = 'html > body {\n  padding: 2rem !important;\n}';
    const js = '';

    const form = document.createElement('form');
    form.action = 'https://codepen.io/pen/define';
    form.method = 'POST';
    form.target = '_blank';

    const data = {
      title: '',
      description: '',
      tags: ['webawesome'],
      editors: '1000',
      head: '<meta name="viewport" content="width=device-width">',
      html_classes: '',
      css_external: '',
      js_external: '',
      js_module: true,
      js_pre_processor: 'none',
      html,
      css,
      js,
    };

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    input.value = JSON.stringify(data);
    form.append(input);

    document.documentElement.append(form);
    form.submit();
    form.remove();
  }
});
