import { inlined } from '../../dist/components/icon/library.wa.js';

let { classic } = inlined;
let { solid, regular } = classic;

export default [
  ...Object.entries(solid).map(([name, svg]) => ({ name, family: 'solid', variant: 'solid', svg })),
  ...Object.entries(regular).map(([name, svg]) => ({ name, family: 'regular', variant: 'regular', svg })),
];
