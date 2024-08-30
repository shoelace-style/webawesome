import type { Validator } from '../webawesome-element.js';
/**
 * This validator is for if you have an exact copy of your element in the shadow DOM. Rather than needing
 * custom translations and error messages, you can simply rely on the element "formControl" in your shadow dom.
 */
export declare const MirrorValidator: () => Validator;
