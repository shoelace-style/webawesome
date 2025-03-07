// TODO move these to local imports
import generateGrays from './generate-grays.js';
import { tints } from '/assets/scripts/tweak/data.js';

export function applyTweaks(baseColors, tweaks, tweaked) {
  let ret = {};
  let { hueShifts, chromaScale = 1, grayColor, grayChroma } = tweaks;

  if (!tweaked) {
    return baseColors;
  }

  if (tweaked.grayChroma) {
    grayChroma = this.computedGrayChroma;
  }

  for (let hue in baseColors) {
    let originalScale = baseColors[hue];
    let scale = (ret[hue] = {});
    let descriptors = Object.getOwnPropertyDescriptors(originalScale);
    Object.defineProperties(scale, {
      maxChromaTint: { ...descriptors.maxChromaTint, enumerable: false },
      maxChromaTintRaw: { ...descriptors.maxChromaTintRaw, enumerable: false },
    });

    if (hue === 'gray') {
      if (tweaked.grayChroma || tweaked.grayColor) {
        ret.gray = generateGrays(baseColors, { grayColor, grayChroma });
      } else {
        ret.gray = originalScale;
      }
      continue;
    }

    for (let tint of tints) {
      let color = originalScale[tint].clone();

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
        color = color.to('oklch').set(tweak);
      }

      scale[tint] = color;
    }
  }

  return ret;
}

export default applyTweaks;
