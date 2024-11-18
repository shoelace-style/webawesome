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
    const cdnUrl = document.documentElement.dataset.cdnUrl;
    const html =
      `<script type="module" src="${cdnUrl}webawesome.loader.js"></script>\n` +
      `<link rel="stylesheet" href="${cdnUrl}themes/default.css">\n\n` +
      `<link rel="stylesheet" href="${cdnUrl}themes/applied.css">\n\n` +
      `${code.textContent}`;
    const css = 'body {\n  font: 16px sans-serif;\n  padding: 2rem;\n}';
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
      js
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
