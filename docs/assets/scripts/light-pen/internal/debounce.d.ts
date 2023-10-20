/**
 * @template {(...args: any[]) => any} T
 * @param {T} callback
 * @param {number} wait
 */
export function debounce<T extends (...args: any[]) => any>(callback: T, wait?: number): (...args: any[]) => void;
