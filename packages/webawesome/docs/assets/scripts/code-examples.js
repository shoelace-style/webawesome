const version = document.documentElement.getAttribute('data-version') || '';

const codeExampleAnimations = new WeakMap();

const directionObservers = new WeakMap();

function stampDirection(content, dir) {
  content.setAttribute('dir', dir);
  content.querySelectorAll('*').forEach(el => el.setAttribute('dir', dir));
}

function setPreviewDirection(content, dir) {
  directionObservers.get(content)?.disconnect();
  directionObservers.delete(content);

  stampDirection(content, dir);

  if (dir === 'rtl') {
    const observer = new MutationObserver(mutations => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          node.setAttribute('dir', 'rtl');
          node.querySelectorAll('*').forEach(el => el.setAttribute('dir', 'rtl'));
        });
      }
    });
    observer.observe(content, { childList: true, subtree: true });
    directionObservers.set(content, observer);
  }
}

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

function cancelSourceAnimations(source) {
  source.getAnimations().forEach(animation => animation.cancel());
}

function getCodeExampleDurations(source) {
  const style = getComputedStyle(source);
  const showDuration = parseDuration(style.getPropertyValue('--code-example-show-duration').trim() || '200ms');
  const hideDuration = parseDuration(style.getPropertyValue('--code-example-hide-duration').trim() || '200ms');

  return { showDuration, hideDuration };
}

function setCodeExampleSourceAccessibility(source, open) {
  if (open) {
    source.removeAttribute('aria-hidden');
    source.inert = false;
  } else {
    source.setAttribute('aria-hidden', 'true');
    source.inert = true;
  }
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

function resetCodeExampleElement(codeExample) {
  const source = codeExample.querySelector('.code-example-source');
  const preview = codeExample.querySelector('.code-example-preview');

  if (source) {
    cancelSourceAnimations(source);
    source.classList.remove('is-animating');
  }

  if (preview) {
    preview.classList.remove('is-dragging');
    preview.style.removeProperty('width');
  }
}

function initCodeExamples() {
  document.querySelectorAll('.code-example').forEach(codeExample => {
    const source = codeExample.querySelector('.code-example-source');
    if (!source) {
      return;
    }

    resetCodeExampleElement(codeExample);

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
  cancelSourceAnimations(source);
  source.classList.remove('is-animating');

  if (prefersReducedMotion()) {
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    codeExample.classList.toggle('open', open);
    setCodeExampleSourceCollapsed(source, !open);
    setCodeExampleSourceAccessibility(source, open);
    return;
  }

  const { showDuration, hideDuration } = getCodeExampleDurations(source);

  if (open) {
    toggle.setAttribute('aria-expanded', 'true');
    codeExample.classList.add('open');
    setCodeExampleSourceAccessibility(source, true);
    source.classList.add('is-animating');
    source.style.height = '0';
    source.style.opacity = '0';

    await new Promise(resolve => requestAnimationFrame(resolve));

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
    source.classList.remove('is-animating');
    return;
  }

  toggle.setAttribute('aria-expanded', 'false');
  source.classList.add('is-animating');
  // Remove .open before the animation so the chevron rotation and panel collapse run together,
  // mirroring the open path where .open is added before the panel animates.
  codeExample.classList.remove('open');
  // Setting an explicit pixel height flushes layout, so no rAF is needed here
  // (unlike the open path, which animates from height: 0 and must measure scrollHeight first).
  const startHeight = source.scrollHeight;
  source.style.height = `${startHeight}px`;

  await animate(
    source,
    [
      { height: `${startHeight}px`, opacity: '1' },
      { height: '0', opacity: '0' },
    ],
    { duration: hideDuration, easing: 'linear' },
  );

  if (getAnimationGeneration(codeExample) !== generation) {
    return;
  }

  setCodeExampleSourceCollapsed(source, true);
  source.classList.remove('is-animating');
  setCodeExampleSourceAccessibility(source, false);
}

// Initial pass for first paint; turbo:load re-syncs after client-side navigation.
initCodeExamples();
document.addEventListener('turbo:load', initCodeExamples);

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
  preview.classList.add('is-dragging');
  document.documentElement.addEventListener('mousemove', dragMove);
  document.documentElement.addEventListener('touchmove', dragMove);
  document.documentElement.addEventListener('mouseup', dragStop);
  document.documentElement.addEventListener('touchend', dragStop);

  function dragMove(event) {
    const width = startWidth + (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - startX;
    preview.style.width = `${width}px`;
  }

  function dragStop() {
    preview.classList.remove('is-dragging');
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
  const themeBtn = event.target?.closest('.code-example-theme');
  if (themeBtn) {
    const preview = themeBtn.closest('.code-example')?.querySelector('.code-example-preview');
    if (preview) {
      const effectiveDark =
        preview.classList.contains('wa-dark') ||
        (!preview.classList.contains('wa-light') && document.documentElement.classList.contains('wa-dark'));
      preview.classList.remove('wa-dark', 'wa-light');
      preview.classList.add(effectiveDark ? 'wa-light' : 'wa-dark');
    }
    return;
  }

  const dirBtn = event.target?.closest('.code-example-dir');
  if (dirBtn) {
    const content = dirBtn.closest('.code-example')?.querySelector('.code-example-content');
    if (content) {
      const toRtl = content.getAttribute('dir') !== 'rtl';
      setPreviewDirection(content, toRtl ? 'rtl' : 'ltr');
    }
    return;
  }

  const toggle = event.target?.closest('.code-example-toggle');
  const pen = event.target?.closest('.code-example-pen');

  // Toggle source
  if (toggle) {
    const codeExample = toggle.closest('.code-example');
    if (!codeExample) {
      return;
    }

    const open = !codeExample.classList.contains('open');
    void setCodeExampleOpen(codeExample, toggle, open);
  }

  // Edit in CodePen
  if (pen) {
    const codeExample = pen.closest('.code-example');
    if (!codeExample) {
      return;
    }

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
