const version = document.documentElement.getAttribute('data-version') || '';

const codeExampleAnimations = new WeakMap();

function parseDuration(duration) {
  duration = String(duration).toLowerCase();

  if (duration.includes('ms')) {
    return parseFloat(duration) || 0;
  }

  if (duration.includes('s')) {
    return (parseFloat(duration) || 0) * 1000;
  }

  return parseFloat(duration) || 0;
}

async function animate(el, keyframes, options) {
  return el.animate(keyframes, options).finished.catch(() => {
    /* suppress errors in Safari */
  });
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getAnimationGeneration(codeExample) {
  return codeExampleAnimations.get(codeExample) || 0;
}

function bumpAnimationGeneration(codeExample) {
  const generation = getAnimationGeneration(codeExample) + 1;
  codeExampleAnimations.set(codeExample, generation);
  return generation;
}

function getCodeExampleDurations(codeExample) {
  const style = getComputedStyle(codeExample);
  const showDuration = parseDuration(style.getPropertyValue('--show-duration').trim() || '200ms');
  const hideDuration = parseDuration(style.getPropertyValue('--hide-duration').trim() || '200ms');

  return { showDuration, hideDuration };
}

function setCodeExampleSourceAccessibility(source, open) {
  source.setAttribute('aria-hidden', open ? 'false' : 'true');
}

function setCodeExampleSourceCollapsed(source, collapsed) {
  if (collapsed) {
    source.style.height = '0';
    source.style.opacity = '0';
    return;
  }

  source.style.height = 'auto';
  source.style.opacity = '';
}

function initCodeExamples() {
  document.querySelectorAll('.code-example').forEach(codeExample => {
    const source = codeExample.querySelector('.code-example-source');
    if (!source) {
      return;
    }

    const open = codeExample.classList.contains('open');
    setCodeExampleSourceCollapsed(source, !open);
    setCodeExampleSourceAccessibility(source, open);
  });
}

async function setCodeExampleOpen(codeExample, toggle, open) {
  const source = codeExample.querySelector('.code-example-source');
  if (!source) {
    return;
  }

  const generation = bumpAnimationGeneration(codeExample);

  if (prefersReducedMotion()) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    codeExample.classList.toggle('open', open);
    setCodeExampleSourceCollapsed(source, !open);
    setCodeExampleSourceAccessibility(source, open);
    return;
  }

  const { showDuration, hideDuration } = getCodeExampleDurations(codeExample);

  if (open) {
    toggle.setAttribute('aria-expanded', 'true');
    codeExample.classList.add('open');
    setCodeExampleSourceAccessibility(source, true);
    source.classList.add('code-example-source--animating');
    source.style.height = '0';
    source.style.opacity = '0';

    await animate(
      source,
      [
        { height: '0', opacity: '0' },
        { height: `${source.scrollHeight}px`, opacity: '1' },
      ],
      { duration: showDuration, easing: 'linear' },
    );

    if (getAnimationGeneration(codeExample) !== generation) {
      return;
    }

    source.style.height = 'auto';
    source.style.opacity = '';
    source.classList.remove('code-example-source--animating');
    return;
  }

  source.classList.add('code-example-source--animating');
  source.style.height = `${source.scrollHeight}px`;

  await animate(
    source,
    [
      { height: `${source.scrollHeight}px`, opacity: '1' },
      { height: '0', opacity: '0' },
    ],
    { duration: hideDuration, easing: 'linear' },
  );

  if (getAnimationGeneration(codeExample) !== generation) {
    return;
  }

  setCodeExampleSourceCollapsed(source, true);
  source.classList.remove('code-example-source--animating');
  toggle.setAttribute('aria-expanded', 'false');
  codeExample.classList.remove('open');
  setCodeExampleSourceAccessibility(source, false);
}

initCodeExamples();

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
    const open = !codeExample.classList.contains('open');

    void setCodeExampleOpen(codeExample, toggle, open);
  }

  // Edit in CodePen
  if (pen) {
    const codeExample = pen.closest('.code-example');
    const code = codeExample.querySelector('code');
    const html =
      `<link rel="stylesheet" href="https://ka-p.webawesome.com/kit/b9bfcf2dca544e85/webawesome@${version}/styles/webawesome.css">\n` +
      `<script type="module" src="https://ka-p.webawesome.com/kit/b9bfcf2dca544e85/webawesome@${version}/webawesome.loader.js"></script>\n\n` +
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
