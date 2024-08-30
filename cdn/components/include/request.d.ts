interface IncludeFile {
    ok: boolean;
    status: number;
    html: string;
}
/** Fetches an include file from a remote source. Caching is enabled so the origin is only pinged once. */
export declare function requestInclude(src: string, mode?: 'cors' | 'no-cors' | 'same-origin'): Promise<IncludeFile>;
export {};
