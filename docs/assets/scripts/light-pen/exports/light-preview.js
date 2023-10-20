// @ts-check

import HighlightJS from 'highlight.js/lib/core';
import HTML from 'highlight.js/lib/languages/xml';
import JavaScript from 'highlight.js/lib/languages/javascript';
import CSS from 'highlight.js/lib/languages/css';
import { theme } from './default-theme.styles.js'
import LightPreviewBase from './light-preview-base.js';
import { dedent } from '../internal/dedent.js';

HighlightJS.registerLanguage('html', HTML);
HighlightJS.registerLanguage('css', CSS);
HighlightJS.registerLanguage('javascript', JavaScript);

/**
 * LightPreview is a very lightweight code previewer designed to load your code sample
 *   inside of an iFrame for encapsulated viewing. `<light-preview>` uses HighlightJS as it's
 *   default highlighter, but has a base class intended for extending.
 * @customElement
 * @tagname light-preview
 * @extends LightPreviewBase
 */
export default class LightPreview extends LightPreviewBase {
  static baseName = "light-preview"
  static styles = LightPreviewBase.styles.concat([theme])

  /**
   * @override
   */
  highlight (code = this.code) {
    return HighlightJS.highlight(dedent(this.unescapeCharacters(code)), {language: this.highlightLanguage}).value
  }
}
