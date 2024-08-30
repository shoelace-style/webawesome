/**
 * This is the intended way of using fixtures since it has some nice ways of catching hydration errors.
 * These fixtures will also auto-load all of our components.
 */
import type { TemplateResult } from 'lit';
declare global {
    interface Window {
        clientComponents: string[];
        serverComponents: string[];
        SSR_ONLY: boolean;
        CSR_ONLY: boolean;
    }
}
/**
 * Loads up a fixture and loads all client components
 */
export declare function clientFixture<T extends HTMLElement = HTMLElement>(template: TemplateResult | string): Promise<T>;
export declare namespace clientFixture {
    var type: "client-only";
}
/**
 * Loads up a fixture with SSR, using all unbundled modules, then when it finishes, calls hydration scripts, and then when hydration completes, returns the element.
 */
export declare function hydratedFixture<T extends HTMLElement = HTMLElement>(template: TemplateResult): Promise<T>;
export declare namespace hydratedFixture {
    var type: "ssr-client-hydrated";
}
export declare const fixtures: (typeof clientFixture | typeof hydratedFixture)[];
