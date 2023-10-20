// @ts-check
import { Controller } from "@hotwired/stimulus"

export default class ClipboardController extends Controller {
  connect () {
    this.element.addEventListener("clipboard-copy", this.showSuccess)
  }

  showSuccess = () => {
    this.element.classList.add("clipboard--success")
    this.element.classList.remove("clipboard--idle")
    if (this.timeout) {
      clearTimeout(this.timeout)
    }

    this.timeout = setTimeout(() => {
      this.element.classList.remove("clipboard--success")
      this.element.classList.add("clipboard--idle")
    }, 2_000)
  }
}
