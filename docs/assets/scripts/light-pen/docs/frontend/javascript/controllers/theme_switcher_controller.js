import { Controller } from "@hotwired/stimulus"


export default class ThemeSwitcher extends Controller {
  constructor (...args) {
    super(...args)

    this.handleSelect = (e) => {
      window.applyTheme(e.detail.item.value)
    }

    this.handleShortcut = (event) => {
      if (
        event.key === '\\' &&
        !event.composedPath().some(el => {
          return (
            ['input', 'textarea'].includes(el?.tagName?.toLowerCase()) ||
            el.hasAttribute?.("contenteditable") ||
            el.getAttribute?.("role") === "textbox"
          )
        })
      ) {
        event.preventDefault();

        window.applyTheme(window.themeIsDark() ? 'light' : 'dark');
      }
    }

    this.setLight = () => {
      window.applyTheme("light")
    }

    this.setDark = () => {
      window.applyTheme("dark")
    }

    // Set the initial theme and sync the UI
    window.applyTheme(window.getTheme());
  }

  connect () {
    this.element.addEventListener("sl-select", this.handleSelect)
    document.addEventListener("keydown", this.handleShortcut)

    // Update the theme when the preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', this.setDark);
    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', this.setLight);

    // Set the initial theme and sync the UI
    window.applyTheme(window.getTheme());
  }

  disconnect () {
    this.element.removeEventListener("sl-select", this.handleSelect)
    document.removeEventListener("keydown", this.handleShortcut)
  }

}
