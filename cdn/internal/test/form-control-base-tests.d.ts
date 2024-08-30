import type { WebAwesomeFormControl } from '../webawesome-element.js';
/** Runs a set of generic tests for Web Awesome form controls */
export declare function runFormControlBaseTests<T extends WebAwesomeFormControl = WebAwesomeFormControl>(tagNameOrConfig: string | {
    tagName: string;
    init?: (control: T) => void;
    variantName: string;
}): void;
