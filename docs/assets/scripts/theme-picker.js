// Helper for view transitions
export function domChange(fn, { behavior = 'smooth' } = {}) {
  const canUseViewTransitions =
    document.startViewTransition && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (canUseViewTransitions && behavior === 'smooth') {
    document.startViewTransition(fn);
  } else {
    fn(true);
  }
}

export function nextFrame() {
  return new Promise(resolve => requestAnimationFrame(resolve));
}

export class ThemeAspect {
  constructor(options) {
    Object.assign(this, options);
    this.set();

    // Update when local storage changes.
    // That way changes in one window will propagate to others (including iframes).
    window.addEventListener('storage', event => {
      if (event.key === this.key) {
        this.set();
      }
    });

    // Listen for selections
    document.addEventListener('wa-change', event => {
      const picker = event.target.closest(this.picker);
      if (picker) {
        this.set(picker.value);
      }
    });

    ['turbo:before-render', 'turbo:before-stream-render', 'turbo:before-frame-render'].forEach(eventName => {
      document.addEventListener(eventName, e => {
        const newElement = e.detail.newBody || e.detail.newFrame || e.detail.newStream;
        if (newElement) {
          this.syncUI(newElement);
        }
      });
    });
  }

  get() {
    return localStorage.getItem(this.key) ?? this.defaultValue;
  }

  computed = {};

  get computedValue() {
    if (this.value in this.computed) {
      return this.computed[this.value];
    }

    return this.value;
  }

  set(value = this.get()) {
    if (value === this.value) {
      return;
    }

    this.value = value;

    if (this.value === this.defaultValue) {
      localStorage.removeItem(this.key);
    } else {
      localStorage.setItem(this.key, this.value);
    }

    this.applyChange();
    this.syncUI();
  }

  syncUI(container = document) {
    for (let picker of container.querySelectorAll(this.picker)) {
      picker.setAttribute('value', this.value);
      picker.value = this.value;
    }
  }
}

const colorScheme = new ThemeAspect({
  defaultValue: 'auto',
  key: 'colorScheme',
  picker: 'wa-select.color-scheme-selector',

  computed: {
    get auto() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    },
  },

  applyChange() {
    // Toggle the dark mode class
    domChange(() => {
      let dark = this.computedValue === 'dark';
      document.documentElement.classList.toggle(`wa-dark`, dark);
    });
  },
});

// Update the color scheme when the preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => colorScheme.set());

// Toggle color scheme with backslash
document.addEventListener('keydown', event => {
  if (
    event.key === '\\' &&
    !event.composedPath().some(el => ['input', 'textarea'].includes(el?.tagName?.toLowerCase()))
  ) {
    event.preventDefault();
    colorScheme.set(theming.colorScheme.resolvedValue === 'dark' ? 'light' : 'dark');
  }
});
