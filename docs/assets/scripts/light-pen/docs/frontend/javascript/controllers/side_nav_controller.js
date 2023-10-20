import { Controller } from "@hotwired/stimulus"

export default class SideNavController extends Controller {
  async open() {
    document.addEventListener("sl-hide", this.reset)
    this.drawer.removeAttribute("hidden")

    this.scrollTop = window.scrollY;
    document.body.classList.add('fixed-body');
    // Scroll the wrapper, rather than setting an offset
    // via `top` or `transform`.
    document.body.scroll(0, this.scrollTop);
    await this.drawer.show()
  }

  reset = () => {
    window.scrollTo(0, this.scrollTop);
    document.body.classList.remove('fixed-body');
  }

  async close () {
    document.removeEventListener("sl-hide", this.reset)
    this.reset()
    await this.drawer.hide()
  }

  async toggle() {
    if (this.drawer.open) {
      await this.open()
    } else {
      await this.close()
    }
  }

  get drawer() {
    return document.querySelector("#side-nav-drawer")
  }
}

