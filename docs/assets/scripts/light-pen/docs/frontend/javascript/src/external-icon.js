class ExternalIcon extends HTMLElement {
  connectedCallback () {
    this.attachShadow({ mode: "open" })
    this.shadowRoot.innerHTML = `<sl-icon name="box-arrow-up-right"></sl-icon><sl-visually-hidden>Opens in new window</sl-visually-hidden>`
  }
}

if (!window.customElements.get("external-icon")) {
  window.customElements.define("external-icon", ExternalIcon)
}
