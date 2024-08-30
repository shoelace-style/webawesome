import type { Validator } from '../webawesome-element.js';
export interface RequiredValidatorOptions {
    /** This is a cheap way for us to get translation strings for the user without having proper translations. */
    validationElement?: HTMLSelectElement | HTMLInputElement;
    /**
     * The property to check if its not null-ish. For most elements this will be "value".
     * For "checkbox" for example it will be "checked"
     */
    validationProperty?: string;
}
export declare const RequiredValidator: (options?: RequiredValidatorOptions) => Validator;
