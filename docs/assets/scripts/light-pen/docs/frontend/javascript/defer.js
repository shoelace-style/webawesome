import "../styles/defer.css"
import { BridgetownNinjaKeys } from "@konnorr/bridgetown-quick-search/ninja-keys.js"

;(window.requestIdleCallback || window.setTimeout)(async () => {
  // const { BridgetownNinjaKeys } = await import("@konnorr/bridgetown-quick-search/ninja-keys.js")

  /** @type {import("konnors-ninja-keys").INinjaAction[]} */
  const staticData = [
    {
      id: "theme-light",
      icon: "<sl-icon name='sun'></sl-icon>",
      title: "Light Mode",
      section: "Theme",
      keywords: "theme",
      handler () {
        window.applyTheme("light");
        return {keepOpen: true}
      }
    },
    {
      id: "theme-dark",
      icon: "<sl-icon name='moon'></sl-icon>",
      title: "Dark Mode",
      section: "Theme",
      keywords: "theme",
      handler () {
        window.applyTheme("dark");
        return {keepOpen: true}
      }
    },
    {
      id: "theme-system",
      icon: "<sl-icon name='display'></sl-icon>",
      title: "System",
      section: "Theme",
      keywords: "theme",
      handler () {
        window.applyTheme("system");
        return {keepOpen: true}
      }
    },
  ]

  ;(class extends BridgetownNinjaKeys {
    constructor (...args) {
      super(...args)
      this.staticData = staticData
    }

    createData() {
      this.results = this.showResultsForQuery(this._search || "*").reverse()

      this.results.forEach((result) => {
        result.icon = `<sl-icon name="link-45deg"></sl-icon>`
      })

      return [
        ...this.staticData,
        ...this.results,
      ]
    }

    open () {
      this.scrollTop = window.scrollY;
      document.body.classList.add('fixed-body');
      // Scroll the wrapper, rather than setting an offset
      // via `top` or `transform`.
      document.body.scroll(0, this.scrollTop);

      this.nonModals.forEach((el) => {
        el.setAttribute("inert", "")
      })
      super.open()
    }

    close () {
      document.body.classList.remove('fixed-body');
      window.scrollTo(0, this.scrollTop);
      super.close()
      this.nonModals.forEach((el) => el.removeAttribute("inert"))
    }

    get nonModals () {
      return [...document.body.children].filter((el) => el.localName !== "bridgetown-ninja-keys")
    }
  }).define("bridgetown-ninja-keys")
})
