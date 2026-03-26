import type { ReactiveController, ReactiveControllerHost } from 'lit';

export class ColorSchemeController implements ReactiveController {
  private host: ReactiveControllerHost & Element;
  private hiddenElement: HTMLElement;
  private onThemeChange: () => void;

  constructor(host: ReactiveControllerHost & Element, onThemeChange: () => void) {
    (this.host = host).addController(this);
    this.onThemeChange = onThemeChange;

    // Hidden element — inherits CSS from nearest themed ancestor
    this.hiddenElement = document.createElement('div');
    this.hiddenElement.setAttribute('aria-hidden', 'true');
    Object.assign(this.hiddenElement.style, {
      position: 'absolute',
      width: '0',
      height: '0',
      overflow: 'hidden',
      pointerEvents: 'none',
      opacity: '0',
      // Transition on a WA surface token — changes whenever the theme class changes
      color: 'var(--wa-color-surface-default, transparent)',
      transition: 'color 0.001ms',
    });
  }

  hostConnected() {
    this.host.appendChild(this.hiddenElement);
    this.hiddenElement.addEventListener('transitionend', this.handleTransitionEnd);
  }

  hostDisconnected() {
    this.hiddenElement.removeEventListener('transitionend', this.handleTransitionEnd);
    this.hiddenElement.remove();
  }

  private handleTransitionEnd = () => {
    this.onThemeChange();
  };
}
