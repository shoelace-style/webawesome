/**
 * Memoized calculation of OKLCH gamut boundary for a given L and H
 * Currently unused, but we can use it if existing code becomes too slow.
 */
import Color from 'https://colorjs.io/dist/color.js';
import { interpolate, progress, progressAngle, roundTo } from '/assets/scripts/tweak/util.js';

/** Max oklch.c per h and l (rounded to 1 significant digit) */
const maxChroma = {};
const OOG_CHROMA = 0.4; // guaranteed to be OOG for every P3 color
const C_THRESHOLD = 0.03;
const MIN_H_STEP = 0.1;
const MIN_L_STEP = 0.001;

export default function getMaxChroma(l, h) {
  let { hStep, lStep, count } = calculateBoundary(l, h);

  let hRounded = roundTo(h, hStep);
  let lRounded = roundTo(l, lStep);

  // Calculate gamut boundary around this point
  let hProgress = progressAngle(h - hRounded, [-hStep, 0, hStep]);
  let lProgress = progress(l - lRounded, [-lStep, 0, lStep]);
  let maxChromaH = [];

  for (let i of [-1, 0, 1]) {
    let h = roundTo(hRounded + i * hStep, hStep);

    let cs = [-1, 0, 1].map(j => {
      let l = roundTo(lRounded + j * lStep, lStep);

      return maxChroma[l][h];
    });

    maxChromaH.push(interpolate(lProgress, cs));
  }

  // Interpolate between the 9 points using bilinear interpolation
  let c = interpolate(hProgress, maxChromaH);

  return c;
}

function calculateBoundary(pointL, pointH, lStep = 0.1, hStep = 10) {
  let hRounded = roundTo(pointH, hStep);
  let lRounded = roundTo(pointL, lStep);
  let ret = { count: 0, hStep, lStep };

  for (let i of [-1, 0, 1]) {
    let l = roundTo(lRounded + i * lStep, lStep);
    maxChroma[l] ??= {};

    for (let j of [-1, 0, 1]) {
      let h = roundTo(hRounded + j * hStep, hStep);

      if (maxChroma[l][h] !== undefined) {
        continue;
      }

      let gamutBoundary = new Color('oklch', [l, OOG_CHROMA, h]).toGamut('p3', { method: 'oklch.c' });
      let c = gamutBoundary.get('c');
      maxChroma[l][h] = c;
      ret.count++;
      let tooFar = { h: false, l: false };

      if (i > -1) {
        let lPrev = roundTo(lRounded + (i - 1) * lStep, lStep);
        let cPrev = maxChroma[lPrev][h];
        tooFar.l = Math.abs(c - cPrev) > C_THRESHOLD && lStep > MIN_L_STEP;

        if (tooFar.l) {
          ret.lStep /= 2;
          ret.count += calculateBoundary(pointL, pointH, ret.lStep, ret.hStep).count;
        }
      }

      if (j > -1) {
        let hPrev = roundTo(hRounded + (j - 1) * hStep, hStep);
        let cPrev = maxChroma[l][hPrev];
        tooFar.h = Math.abs(c - cPrev) > C_THRESHOLD && hStep > MIN_H_STEP;

        if (tooFar.h) {
          ret.hStep /= 2;
          ret.count += calculateBoundary(pointL, pointH, ret.lStep, ret.hStep).count;
        }
      }
    }
  }

  return ret;
}
