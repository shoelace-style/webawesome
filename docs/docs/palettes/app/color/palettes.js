// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { tints } from '/assets/scripts/tweak/data.js';

let palettes = await fetch('/docs/palettes/data.json').then(r => r.json());

for (let palette in palettes) {
  for (let hue in palettes[palette].colors) {
    let scale = palettes[palette].colors[hue];
    for (let tint of tints) {
      let color = scale[tint];

      if (Array.isArray(color)) {
        scale[tint] = new Color('oklch', color);
      }
    }

    Object.defineProperty(scale, 'core', {
      get() {
        return this[this.maxChromaTint];
      },
      enumerable: false,
    });
  }
}

globalThis.allPalettes = palettes;
export default palettes;
