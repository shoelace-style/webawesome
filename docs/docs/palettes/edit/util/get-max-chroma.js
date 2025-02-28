// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { interpolate, progress, progressAngle, roundTo } from '/assets/scripts/tweak/util.js';

/** Max oklch.c per h and l (rounded to 1 significant digit) */
const maxChroma = {};
const OOG_CHROMA = 0.4; // guaranteed to be OOG for every P3 color
const H_STEP = 10;
const L_STEP = 0.1;
const H_STEPS = [-H_STEP, 0, H_STEP];
const L_STEPS = [-L_STEP, 0, L_STEP];

export default function getMaxChroma(l, h, { gamut = 'p3' } = {}) {
  let hRounded = roundTo(h, 10);
  let lRounded = roundTo(l, 0.1);
  maxChroma[hRounded] ?? {};

  // Calculate gamut boundary around this point
  let hProgress = progressAngle(h - hRounded, H_STEPS);
  let lProgress = progress(l - lRounded, L_STEPS);
  let maxChromaH = [];

  for (let hDelta of H_STEPS) {
    let h = roundTo(hRounded + hDelta, H_STEP);
    maxChroma[h] ??= {};

    for (let lDelta of L_STEPS) {
      let l = roundTo(lRounded + lDelta, L_STEP);
      if (maxChroma[h][l] !== undefined) {
        continue;
      }

      let gamutBoundary = new Color('oklch', [l, OOG_CHROMA, h]).toGamut(gamut, { method: 'oklch.c' });
      maxChroma[h][l] = gamutBoundary.get('c');
    }

    maxChromaH.push(interpolate(lProgress, Object.values(maxChroma[h])));
  }

  // Interpolate between the 9 points using bilinear interpolation
  let c = interpolate(hProgress, maxChromaH);
  return c;
}
