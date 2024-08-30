/**
 * Serializes a form and returns a plain object. If a form control with the same name appears more than once, the
 * property will be converted to an array.
 */
export declare function serialize(form: HTMLFormElement): Record<string, unknown>;
