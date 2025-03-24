// TODO move these to local imports
import generateGrays from './generate-grays.js';
import { tints } from '/assets/scripts/tweak/data.js';

export function tweakPalette(baseColors, tweaks, tweaked) {
  let ret = {};

  if (!tweaked) {
    return baseColors;
  }

  for (let hue in baseColors) {
    let originalScale = baseColors[hue];
    let scale = (ret[hue] = {});
    let descriptors = Object.getOwnPropertyDescriptors(originalScale);
    Object.defineProperties(scale, {
      maxChromaTint: { ...descriptors.maxChromaTint, enumerable: false },
      maxChromaTintRaw: { ...descriptors.maxChromaTintRaw, enumerable: false },
      core: {
        get() {
          return this[this.maxChromaTint];
        },
        enumerable: false,
      },
    });

    if (hue === 'gray') {
      if (tweaked.grayChroma || tweaked.grayColor) {
        let grayColor = tweaks.grayColor ?? this.originalGrayColor;
        let grayChroma = this.computedGrayChroma;
        let grayLevel = baseColors.gray?.maxChromaTint;
        ret.gray = generateGrays(baseColors, { grayColor, grayChroma, grayLevel });
      } else {
        ret.gray = originalScale;
      }
      continue;
    }

    for (let tint of tints) {
      scale[tint] = tweakColor(hue, originalScale[tint], tweaks, tweaked);
    }
  }

  return ret;
}

export function tweakColor(hue, originalColor, tweaks, tweaked) {
  if (!tweaked) {
    return originalColor;
  }

  let color = originalColor;
  let { hueShifts, chromaScale = 1, grayColor, grayChroma } = tweaks;

  let tweak = {};
  let thisTweaked = false;

  if (tweaked.hue && hueShifts[hue]) {
    tweak.h = h => h + hueShifts[hue];
    thisTweaked = true;
  }

  if (tweaked.chromaScale && chromaScale !== 1) {
    tweak.c = c => c * chromaScale;
    thisTweaked = true;
  }

  if (thisTweaked) {
    color = color.clone().to('oklch').set(tweak);
  }

  return color;
}

export default tweakPalette;
