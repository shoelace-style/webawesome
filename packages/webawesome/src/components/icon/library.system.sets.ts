import type { SystemIcons } from './library.system.js';

//
// Alternate system icon sets, keyed by Font Awesome folder name (e.g. sharp-light). The free package ships none.
// The pro package replaces this file with loaders for its inlined Font Awesome Pro sets.
//
export const systemIconSets: { [folder: string]: () => Promise<{ default: SystemIcons }> } = {};
