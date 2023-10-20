// @ts-check

import { LitElement, html } from "lit"
import { styles } from "./light-pen.styles.js"
import { when } from "lit/directives/when.js";

import { theme } from './default-theme.styles.js'

import HighlightJS from 'highlight.js/lib/core';
import JavaScript from 'highlight.js/lib/languages/javascript';
import HTML from 'highlight.js/lib/languages/xml';
import CSS from 'highlight.js/lib/languages/css';
import { unsafeHTML } from "lit/directives/unsafe-html.js";
import { ref } from "lit/directives/ref.js";
import { DefineableMixin } from "web-component-define";
import { baseStyles, buttonStyles } from "./base-styles.js";

import { clamp } from '../internal/clamp.js'
import { dedent } from "../internal/dedent.js";
import { drag } from "../internal/drag.js";
// import { defaultSandboxSettings } from "../internal/default-sandbox-settings.js";
import { resizeIcon } from "../internal/resize-icon.js";

// Then register the languages you need
HighlightJS.registerLanguage('javascript', JavaScript);
HighlightJS.registerLanguage('xml', HTML);
HighlightJS.registerLanguage('css', CSS);

/**
 * @typedef {"html" | "css" | "js"} SupportedLanguages
 * @typedef {HTMLTextAreaElement | HTMLScriptElement | HTMLTemplateElement} SafeTemplateElements
 */


/**
 * @customElement
 * @tagname light-pen
 * @slot html - HTML to insert
 * @slot css - CSS to insert
 * @slot js - JavaScript to insert
 * @slot title - The title to appear at the top of the editor
 *
 * @part base - The base wrapper
 * @part sandbox - The wrapper around the editor and the iframe
 * @part sandbox-header - The wrapper around the header area
 */
export default class LightPen extends DefineableMixin(LitElement) {
  // Static
  static baseName = "light-pen"

  static styles = [baseStyles, buttonStyles, theme, styles]

  static languageMap = {
    html: "xml",
    css: "css",
    js: "javascript"
  }

  static properties = {
    openLanguages: { reflect: true, attribute: "open-languages" },
    resizePosition: { attribute: "resize-position", reflect: true, type: Number },
    console: { reflect: true },
    // sandboxSettings: { reflect: true, attribute: "sandbox-settings"},
    languages: { attribute: false, type: Array },
    cssCode: { attribute: false },
    htmlCode: { attribute: false },
    jsCode: { attribute: false },
    htmlResizeObserver: { attribute: false },
    jsResizeObserver: { attribute: false },
    cssResizeObserver: { attribute: false },
    resizing: { attribute: false },
    iframeSrcDoc: { attribute: false }
  }
  // Overrides

  /**
   * @override
   */
  constructor() {
    super()

    /**
     * @property
     * @type {ResizeObserver}
     */
    this.resizeObserver = new ResizeObserver((entries) => this.handleResize(entries));

    /**
     * @property
     * @type {ResizeObserver}
     */
    this.htmlResizeObserver = new ResizeObserver((entries) => this.handleTextAreaResize(entries))

    /**
     * @property
     * @type {ResizeObserver}
     */
    this.jsResizeObserver = new ResizeObserver((entries) => this.handleTextAreaResize(entries))

    /**
     * @property
     * @type {ResizeObserver}
     */
    this.cssResizeObserver = new ResizeObserver((entries) => this.handleTextAreaResize(entries))

    /**
     * @attribute
     * @reflect
     * @type {number}
     */
    this.resizePosition = 50

    /**
     * Languages to have open on initial render
     * Comma separated list of elements to open on initial render "html,css,js" to open all.
     * @attribute
     * @reflect
     * @type {string}
     */
    this.openLanguages = ""

    /**
     * @type {Array<SupportedLanguages>}
     * @property
     */
    this.languages = ["html", "css", "js"]

    /**
     * Not implemented.
     * @property
     * @type {"enabled" | "disabled"}
     */
    this.console = "disabled"

    /**
     * Not implemented.
     * @property
     * @type {string}
     */
    this.consoleText = ""

    /**
     * What to reset the HTML to.
     * @property
     * @type {string}
     */
    this.htmlReset = ""

    /**
     * What to reset the CSS to.
     * @property
     * @type {string}
     */
    this.cssReset = ""

    /**
     * What to reset the JS to.
     * @property
     * @type {string}
     */
    this.jsReset = ""

    /**
     * @property
     * @internal
     * @type {number}
     */
    this.cachedWidth = 0

    /**
     * @property
     * @type {string}
     */
    this.sandboxSettings = ""

    /**
     * @internal
     */
    this.resizing = false

    /**
     * @property
     * srcdoc to pass to the <iframe>
     */
    this.iframeSrcDoc = ""
  }

  /**
   * @override
   */
  connectedCallback () {
    super.connectedCallback()

    this.updateCachedWidth()

    this.updateComplete.then(() => {
      this.resizeObserver.observe(this)

      /*
       * Grab reset values so we can reset the inputs
       */
      this.htmlReset = this.htmlTextArea?.value || ""
      this.cssReset = this.cssTextArea?.value || ""
      this.jsReset = this.jsTextArea?.value || ""
    });
  }

  /**
   * @param {ResizeObserverEntry[]} entries
   */
  handleTextAreaResize (entries) {
    const { target } = entries[0]
    const {
      // left, right,
      top, bottom
    } = entries[0].contentRect;
    // const width = left + right
    const height = top + bottom

    // @ts-expect-error
    target.parentElement.style.setProperty("--textarea-height", `${height}px`)

    // One day we'll allow the textarea to resize the width.
    // target.parentElement.style.setProperty("--textarea-width", `${width}px`)
  }

  /**
   * Sets an initial width so we dont need to keep computing getBoundingClientRect
   */
  updateCachedWidth () {
    const { left, right } = this.getBoundingClientRect()
    const width = left + right
    this.cachedWidth = width
  }

  /**
   * @param {ResizeObserverEntry[]} entries
   */
  handleResize (entries) {
    const { left, right } = entries[0].contentRect;

    const width = left + right
    // Resize when a primary panel is set
    this.cachedWidth = width
  }

  /** Getters / Setters */

  /**
   * @returns {null | undefined | HTMLIFrameElement}
   */
  get iframeElem () {
    return this.shadowRoot?.querySelector("iframe")
  }

  /**
   * Override this to use a highlighter of your choice.
   * @param {{code: string, language: SupportedLanguages}} options
   */
  highlightCode (options) {
    let { code, language } = options

    const highlightJsLanguage = /** @type {typeof LightPen} */ (this.constructor).languageMap[language]

    code = this.unescapeCharacters(code)
    code = this.injectNewLine(code)

    return HighlightJS.highlight(code, {language: highlightJsLanguage}).value
  }

  /**
   * @param {string} text
   */
  unescapeCharacters (text) {
    // Update code
    return text.replaceAll("&lt;/script>", "</script>")
  }

  /**
   * Highlighters strip newlines. But you can see new lines in <textarea>, this fixes that.
   * @param {string} text
   */
  injectNewLine (text) {
    // Handle final newlines (see article)
    if(text[text.length-1] == "\n") { // If the last character is a newline character
      text += "\n"; // Add a placeholder space character to the final line
    }

    return text
  }

  updateIframeContent () {
    const iframeElem= this.iframeElem
    if (iframeElem == null) return

    // this.setupIframeLogging();

    let page = `
      <!doctype html><html>
        <head><meta charset="utf-8">
          <style>${this.cssCode}<\/style>
        </head>
        <body>
          ${this.htmlCode}
          <script type="module">
            ${this.jsCode}
          </script>
        </body>
      </html>
    `

    // this.iframeSrcDoc = page
    iframeElem.contentWindow?.document.open()
    iframeElem.contentWindow?.document.writeln(page)
    iframeElem.contentWindow?.document.close()
  }

  inputHandler () {
    this.updateCode()
  }

  /**
   * @param {import("lit").PropertyValues} changedProperties
   */
  willUpdate (changedProperties) {
    if (["cssCode", "htmlCode", "jsCode"].some((str) => changedProperties.has(str))) {
      if (this._iframeDebounce != null) window.clearTimeout(this._iframeDebounce)
      this._iframeDebounce = setTimeout(() => this.updateIframeContent(), 300)
    }

    if (changedProperties.has("resizePosition")) {
      this.updateResizePosition()
    }

    super.willUpdate(changedProperties)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.htmlTextArea && this.htmlResizeObserver.disconnect()
    this.cssTextArea && this.cssResizeObserver.disconnect()
    this.jsTextArea && this.jsResizeObserver.disconnect()
  }

  /**
   * @param {HTMLTextAreaElement} textarea
   */
  htmlTextAreaChanged (textarea) {
    if (!textarea) return
    this.htmlTextArea = textarea
    this.htmlResizeObserver.observe(textarea)
  }

  /**
   * @param {HTMLTextAreaElement} textarea
   */
  cssTextAreaChanged (textarea) {
    if (!textarea) return
    this.cssTextArea = textarea
    this.cssResizeObserver.observe(textarea)
  }

  /**
   * @param {HTMLTextAreaElement} textarea
   */
  jsTextAreaChanged (textarea) {
    if (!textarea) return
    this.jsTextArea = textarea
    this.jsResizeObserver.observe(textarea)
  }

  /**
   * @param {KeyboardEvent} event
   */
  handleResizerKeydown (event) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
      let newPosition = this.resizePosition;
      const incr = (event.shiftKey ? 10 : 1) * (1);

      event.preventDefault();

      if (event.key === 'ArrowLeft') {
        newPosition -= incr;
      }

      if (event.key === 'ArrowRight') {
        newPosition += incr;
      }

      if (event.key === 'Home') {
        newPosition = 100;
      }

      if (event.key === 'End') {
        newPosition = 0;
      }

      this.resizePosition = clamp(newPosition, 0, 100);
    }
  }

  updateResizePosition (resizePosition = this.resizePosition) {
    const startWidth = resizePosition

    if (startWidth != null) {
      const endWidth = 100 - startWidth
      this.style.setProperty("--start-panel-width", `${startWidth}%`)
      this.style.setProperty("--end-panel-width", `${endWidth}%`)
    }
  }


  /**
   * Lovely helper to scoop up our html, css, and js code
   */
  updateCode () {
    this.cssCode = this.cssTextArea?.value
    this.htmlCode = this.htmlTextArea?.value
    this.jsCode = this.jsTextArea?.value
  }

  resetValues () {
    if (this.htmlTextArea) {
      this.htmlCode = this.htmlReset
      this.htmlTextArea.value = this.htmlReset
    }

    if (this.cssTextArea) {
      this.cssCode = this.cssReset
      this.cssTextArea.value = this.cssReset
    }

    if (this.jsTextArea) {
      this.jsCode = this.jsReset
      this.jsTextArea.value = this.jsReset
    }
  }

  /**
   * @param {KeyboardEvent} evt
   */
  keydownHandler(evt) {
    /**
     * @type {HTMLTextAreaElement}
     */
    // @ts-expect-error
    const target = evt.target

    const key = evt.key

    if (["Tab", "Escape"].includes(key)) {
      evt.preventDefault()

      if ('Tab' === evt.key) {
        return target.setRangeText('\t', target.selectionStart, target.selectionEnd, 'end')
      }

      if ('Escape' === evt.key) {
        let e = target.closest('details');
        if (!e) return;

        e.querySelector("summary")?.focus()
      }
    }
  }

  // setupIframeLogging() {
  //   if (!this.console && this.result !== 'console') return;
  //
  //   if (this.iframeElem == null) return
  //   if (this.iframeElem.contentWindow == null) return
  //
  //   this.iframeElem.contentWindow.document.open(),
  //   this.iframeElem.contentWindow.document.writeln(
  //     '<script>\n\t\t\t\tlet __console = Object.assign({}, console);\n\t\t\t\tlet __listener = function () {};\n\t\t\t\tfor (let type in console) {\n\t\t\t\t\tconsole[type] = function (...msg) {\n\t\t\t\t\t\t__listener({source: \'iframe\', msg, type}, \'*\');\n\t\t\t\t\t\t__console[type](...msg);\n\t\t\t\t\t};\n\t\t\t\t}\n\t\t\t\tconsole.listen = function (callback) {\n\t\t\t\t\t__listener = callback;\n\t\t\t\t};\n\t\t\t</script>'
  //   ),
  //   this.iframeElem.contentWindow.document.close();
  //   let e = this;
  //
  //
  //   // @ts-expect-error
  //   this.iframeElem.contentWindow.console.listen(
  //     function (t) {
  //       for (let n of t.msg) {
  //         let a = document.createElement('div');
  //         a.className = `log-${ t.type }`,
  //         a.textContent = this.getConsoleMessage(),
  //         e.loggerElem?.append(a)
  //       }
  //     }
  //   )
  // }

  /**
   * @param {Event} e
   */
  handleTemplate (e) {
    /**
     * @type {HTMLSlotElement}
     */
    // @ts-expect-error
    const slot = e.target

    const slotName = slot.getAttribute("name")
    if (slotName == null) return

    if (!this.languages.includes(/** @type {SupportedLanguages} */ (slotName))) {
      return
    }

    const codeType = /** @type {SupportedLanguages} */ (slotName)

    const templates = slot.assignedElements({flatten: true})

    const code = dedent(this.unescapeCharacters(templates.map((template) => template.innerHTML).join("\n")))

    this[`${codeType}Code`] = code

    const textArea = this[`${codeType}TextArea`]

    if (textArea && code) {
      textArea.value = code
    }
  }

  // Rendering
  renderConsole () {
    return html`<div part="sandbox-console-log"></div>`
  }

  /**
   * @override
   */
  render () {
		return html`
      <!-- Where users can declaratively provide templates -->
      <div style="display: none;">
        <slot name="html" @slotchange=${this.handleTemplate}></slot>
        <slot name="css" @slotchange=${this.handleTemplate}></slot>
        <slot name="js" @slotchange=${this.handleTemplate}></slot>
      </div>

      <div part="base" ?resizing=${this.resizing}>
			  <div part="sandbox">
				  <div part="sandbox-header">
            <slot name="title">
					    <strong>
                Code Editor
              </strong>
            </slot>

					  <span part="sandbox-controls">
						  <button part="sandbox-controls-button sandbox-reset" @click=${this.resetValues}>
                Reset
              </button>

						  ${when(this.console === "enabled", () => html`<button @click={}>Clear Console</button>`)}
					  </span>
				</div>
				<div part="sandbox-content">
					<div part="sandbox-code">
            ${this.renderDetails('html')}
            ${this.renderDetails('css')}
            ${this.renderDetails('js')}
					</div>

          <button
            id="panel-resizer"
            part="panel-resizer"
            role="separator"
            aria-valuenow=${this.resizePosition}
            aria-valuemin="0"
            aria-valuemax="100"
            @keydown=${this.handleResizerKeydown}
            @pointerdown=${this.handleDrag}
            @touchstart=${this.handleDrag}
            class=${this.resizing ? "is-active" : ""}
          >
            <slot name="panel-resize-icon">
              ${resizeIcon}
            </slot>
            <span class="visually-hidden">Resize Panel. Pull to left or right to resize.</span>
          </button>

					<div part="sandbox-iframe-wrapper">
						<iframe
              part="sandbox-iframe"
              frameborder="0"
             ></iframe>
					</div>
				</div>

        <!--
        ${when(
            this.console === "enabled",
            () => html`
              <details class="sandbox-console" ?open=${console}>
                <summary part="summary summary-console" tabindex="0">Console</summary>
                ${this.consoleText}
              </details>
            `
        )}
        -->
			</div>
		</div>`
	}

  /**
   * @param {PointerEvent} event
   */
	handleDrag (event) {
    // Prevent text selection when dragging
    if (event.cancelable) {
      event.preventDefault();
    }

    if (this.iframeElem) {
      // We need to disable pointerevents on the iframe to listen for mousemove over the top of it.
      this.iframeElem.style.pointerEvents = "none"
    }

    this.resizing = true

    drag(this, {
      onMove: (x, _y) => {
        this.resizing = true
        let newPositionInPixels = x;


        this.resizePosition = clamp(this.pixelsToPercentage(newPositionInPixels), 0, 100);
        this.updateResizePosition()
      },
      onStop: () => {
        if (this.iframeElem) {
        // Re-enable pointerevents so you can use tab keys etc.
          this.iframeElem.style.pointerEvents = "auto"
        }

        this.resizing = false
      },
      initialEvent: event
    });
  }

  /**
   * @param {number} pixels
   * @return {number}
   */
  pixelsToPercentage (pixels) {
    return (pixels / this.cachedWidth) * 100
  }

  /**
   * @param {SupportedLanguages} language
   */
  renderDetails (language) {
    let fullLanguage = language.toUpperCase()

    let code = this[`${language}Code`]

    // @ts-expect-error
    code = code ? unsafeHTML(this.highlightCode({ code, language })) : ""
    const open = this.openLanguages.split(",").includes(language)

		return html`
      <details ?open=${open} part="details details-${language}">
				<summary part="summary summary-${language}">
          ${fullLanguage}
        </summary>
				<label for="sandbox-${language}" class="visually-hidden">${fullLanguage} code</label>
				<div class="sandbox-editor" part="sandbox-editor">
          <!-- This is where the fancy syntax highlighting comes in -->
					<pre
            id="pre-${language}"
            data-code-lang=${language}
            aria-hidden="true"
            part="pre pre-${language}"
          ><code
              part="code code-${language}"
              class="language-${language}"
            >${code}</code></pre>
          <!-- IMPORTANT! There must be no white-space above. -->
					<textarea
            ${
              // @ts-expect-error
              ref(this[`${language}TextAreaChanged`])
            }
            id="textarea-${language}"
            data-code-lang=${language}
            part="textarea textarea-${language}"
            spellcheck="false"
            autocorrect="off"
            autocapitalize="off"
            translate="no"
            @keydown=${this.keydownHandler}
            @input=${this.inputHandler}
            @input=${this.syncScroll}
            @scroll=${this.syncScroll}
            value=${this[`${language}Code`]}
          ></textarea>
				</div>
			</details>
		`
  }

  /**
   * @internal
   * @param {Event} e
   */
  syncScroll (e) {
    /**
     * @type {null | HTMLTextAreaElement}
     */
    // @ts-expect-error
    const textarea = e.target

    if (textarea == null) return

    const lang = textarea.dataset.codeLang

    const pre = this.shadowRoot?.querySelector(`#pre-${lang}`)

    if (pre == null) return

    pre.scrollTop = textarea.scrollTop;
    pre.scrollLeft = textarea.scrollLeft;
  }
}

