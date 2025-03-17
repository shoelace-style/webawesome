/**
 * Analyze palettes and export the results.
 * ✅ Convert colors to OKLCH
 * ✅ Find accent tint (real and clamped)
 * More later.
 */
import rawPalettes from './palettes.js';
import { clamp } from './util.js';

// Default accent tint if all chromas are 0, but also the tint accent colors will be nudged towards (see chromaTolerance)
const DEFAULT_ACCENT = 60;

// Min and max allowed tints
const MIN_ACCENT = 40;
const MAX_ACCENT = 90;

// Chroma tolerance: Chroma will need to differ more than this to gravitate away from defaultAccent
const CHROMA_TOLERANCE = 0.000001;

const palettes = Object.assign({}, rawPalettes);

for (let paletteId in palettes) {
  const tokens = Object.assign({}, palettes[paletteId]);
  palettes[paletteId] = tokens;

  for (let hue in tokens) {
    let scale = Object.assign({}, tokens[hue]);
    tokens[hue] = scale;

    let maxChromaTint = DEFAULT_ACCENT; // TODO handle scale.core
    let maxChroma = scale.core?.get('oklch.c') ?? (scale[DEFAULT_ACCENT].c || 0);

    for (let tint in scale) {
      let color = scale[tint];

      if (!color || color.constructor.name !== 'Color') {
        // Not a color
        continue;
      }

      color = color.to('oklch');
      scale[tint] = color;

      if (tint === '05') {
        // The object has both '5' and '05' keys, but '05' is out of order
        continue;
      }

      tint = tint.padStart(2, '0');

      if (color.c > maxChroma + CHROMA_TOLERANCE) {
        maxChroma = color.c;
        maxChromaTint = tint;
      }
    }

    scale['05'] = scale['5'];

    scale.maxChroma = scale.maxChromaRaw = maxChroma;
    scale.maxChromaTint = scale.maxChromaTintRaw = maxChromaTint;

    if (maxChromaTint < MIN_ACCENT || maxChromaTint > MAX_ACCENT) {
      scale.maxChromaTint = clamp(MIN_ACCENT, maxChromaTint, MAX_ACCENT);
      scale.maxChroma = scale[maxChromaTint].c;
    }
  }
}

export default palettes;
export { rawPalettes };
