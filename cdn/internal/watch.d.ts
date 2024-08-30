import type { LitElement } from 'lit';
type UpdateHandler = (prev?: unknown, next?: unknown) => void;
type NonUndefined<A> = A extends undefined ? never : A;
type UpdateHandlerFunctionKeys<T extends object> = {
    [K in keyof T]-?: NonUndefined<T[K]> extends UpdateHandler ? K : never;
}[keyof T];
interface WatchOptions {
    /**
     * If true, will only start watching after the initial update/render
     */
    waitUntilFirstUpdate?: boolean;
}
/**
 * Runs when observed properties change, e.g. @property or @state, but before the component updates. To wait for an
 * update to complete after a change occurs, use `await this.updateComplete` in the handler. To start watching after the
 * initial update/render, use `{ waitUntilFirstUpdate: true }` or `this.hasUpdated` in the handler.
 *
 * Usage:
 *
 * @watch('propName')
 * handlePropChange(oldValue, newValue) {
 *   ...
 * }
 */
export declare function watch(propertyName: string | string[], options?: WatchOptions): <ElemClass extends LitElement>(proto: ElemClass, decoratedFnName: UpdateHandlerFunctionKeys<ElemClass>) => void;
export {};
