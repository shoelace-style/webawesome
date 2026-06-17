import { html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { HasSlotController } from '../../internal/slot.js';
import WebAwesomeElement from '../../internal/webawesome-element.js';
import formControlStyles from '../../styles/component/form-control.styles.js';
import '../checkbox/checkbox.js';
import styles from './checkbox-group.styles.js';

/**
 * @summary Checkbox groups wrap a set of related checkboxes or switches so they share a label, hint, and grouping
 *  semantics.
 * @documentation https://webawesome.com/docs/components/checkbox-group
 * @status stable
 * @since 3.9
 *
 * @dependency wa-checkbox
 *
 * @slot - The default slot where `<wa-checkbox>` or `<wa-switch>` elements are placed.
 * @slot label - The checkbox group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot hint - Text that describes how to use the checkbox group. Alternatively, you can use the `hint` attribute.
 *
 * @csspart form-control - The form control that wraps the label, group, and hint.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The element that wraps the grouped checkboxes, exposed as a `role="group"`.
 * @csspart hint - The hint's wrapper.
 *
 * @cssproperty [--gap=0.5em] - The gap between grouped checkboxes.
 */
@customElement('wa-checkbox-group')
export default class WaCheckboxGroup extends WebAwesomeElement {
  static css = [formControlStyles, styles];

  private readonly hasSlotController = new HasSlotController(this, 'hint', 'label');

  /**
   * The checkbox group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
   * instead.
   */
  @property() label = '';

  /** The checkbox group's hint. If you need to display HTML, use the `hint` slot instead. */
  @property({ attribute: 'hint' }) hint = '';

  /** The orientation in which to show grouped checkboxes. */
  @property({ reflect: true }) orientation: 'horizontal' | 'vertical' = 'vertical';

  /**
   * Indicates that at least one option should be selected. This only adds a visual indicator to the label. To enforce
   * the requirement, use the `required` attribute on the individual checkboxes and/or their `setCustomValidity()`
   * method.
   */
  @property({ type: Boolean, reflect: true }) required = false;

  /**
   * Only required for SSR. Set to `true` if you're slotting in a `label` element so the server-rendered markup includes
   * the label before the component hydrates on the client.
   */
  @property({ type: Boolean, attribute: 'with-label' }) withLabel = false;

  /**
   * Only required for SSR. Set to `true` if you're slotting in a `hint` element so the server-rendered markup includes
   * the hint before the component hydrates on the client.
   */
  @property({ type: Boolean, attribute: 'with-hint' }) withHint = false;

  render() {
    const hasLabelSlot = this.hasSlotController.test('label', 'withLabel');
    const hasHintSlot = this.hasSlotController.test('hint', 'withHint');
    const hasLabel = this.label ? true : !!hasLabelSlot;
    const hasHint = this.hint ? true : !!hasHintSlot;

    return html`
      <fieldset
        part="form-control"
        class=${classMap({
          'form-control': true,
          'checkbox-group-required': this.required,
          'form-control-has-label': hasLabel,
        })}
      >
        <label
          part="form-control-label"
          id="label"
          class=${classMap({
            label: true,
            'has-label': hasLabel,
          })}
          aria-hidden=${hasLabel ? 'false' : 'true'}
        >
          <slot name="label">${this.label}</slot>
        </label>

        <div part="form-control-input" role="group" aria-labelledby="label" aria-describedby="hint">
          <slot></slot>
        </div>

        <slot
          id="hint"
          name="hint"
          part="hint"
          class=${classMap({
            'has-slotted': hasHint,
          })}
          aria-hidden=${hasHint ? 'false' : 'true'}
          >${this.hint}</slot
        >
      </fieldset>
    `;
  }
}

// HasSlotController calls requestUpdate() in response to slotchange events after first render. See
// https://lit.dev/docs/tools/development/#development-build-runtime-warnings
WaCheckboxGroup.disableWarning?.('change-in-update');

declare global {
  interface HTMLElementTagNameMap {
    'wa-checkbox-group': WaCheckboxGroup;
  }
}
