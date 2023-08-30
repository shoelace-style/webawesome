import SlLayout from "./layout.component.js"
export * from"./layout.component.js"
export default SlLayout
SlLayout.define("sl-layout")

declare global {
  interface HTMLElementTagNameMap {
    'sl-layout': SlLayout;
  }
}
