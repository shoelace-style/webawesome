import { getCoreTint, getHueShift, getLightness, identifyColor } from './util.js';
import {
  CHROMA_CURVES,
  CHROMA_SCALE_LIGHTEST,
  L_RANGES,
  MAX_CHROMA_BY_TINT,
  tints,
} from '/assets/scripts/tweak/data.js';
import { clamp, interpolate, progress } from '/assets/scripts/tweak/util.js';

/**
 * Generate a scale of tints from one or more key colors
 * @param {Color | Record<number | string, Color>} seedColors
 * @returns {Record<number | string, Color>}
 */
export function generateScale(seedColors) {
  if (seedColors.constructor.name === 'Color') {
    // Single color given
    let { level } = identifyColor(seedColors);
    seedColors = { [level]: seedColors };
  }

  // Find core color
  let coreLevel = getCoreTint(seedColors);
  let coreColor = seedColors[coreLevel];
  let coreChroma = coreColor.get('oklch.c');

  let scale = {};

  Object.defineProperties(scale, {
    maxChromaTint: { value: coreLevel, enumerable: false, configurable: true },
    maxChromaTintRaw: { value: coreLevel, enumerable: false, configurable: true },
    maxChroma: { value: coreChroma, enumerable: false, configurable: true },
    maxChromaRaw: { value: coreChroma, enumerable: false, configurable: true },
    core: {
      get() {
        return this[this.maxChromaTint];
      },
      enumerable: false,
    },
  });

  // First, add pinned colors
  for (let tint in seedColors) {
    scale[tint] = seedColors[tint];
  }

  // For finding lightest and darkest pinned colors
  let pinnedTints = Object.keys(seedColors).sort((a, b) => a - b);
  let chromaCurve = CHROMA_CURVES[clamp(50, coreLevel, 90)];

  // Now generate the rest, starting from the edges
  if (!('95' in scale)) {
    let lightestPinnedTint = pinnedTints.at(-1);
    let lightest = seedColors[lightestPinnedTint];
    let lOffset = lightest.get('oklch.l') - L_RANGES[lightestPinnedTint].mid;
    let chromaScale = CHROMA_SCALE_LIGHTEST[lightestPinnedTint];
    let hueShift = getHueShift(lightest, lightestPinnedTint, '95');

    let color = lightest.clone().to('oklch');
    color.set({
      l: getLightness(95, lOffset),
      c: clamp(0, lightest.get('oklch.c') * chromaScale, MAX_CHROMA_BY_TINT[95]),
      h: h => h + hueShift,
    });

    scale[95] = color;
  }

  if (!('05' in scale)) {
    let darkestPinnedTint = pinnedTints[0];
    let darkest = seedColors[darkestPinnedTint];
    let lOffset = darkest.get('oklch.l') - L_RANGES[darkestPinnedTint].mid;
    let color = darkest.clone().to('oklch');
    let hueShift = getHueShift(darkest, darkestPinnedTint, '05');

    color.set({
      l: getLightness('05', lOffset),
      // TODO c
      h: h => h + hueShift,
    });

    scale['05'] = color;
  }

  let tintBefore = '05';

  for (let tint of tints) {
    if (tint in scale) {
      // Pinned or already generated
      tintBefore = tint;
      continue;
    }

    // Generated color
    // First, find closest pinned colors before and after
    let tintAfter = pinnedTints.find(level => level > tint) ?? '95';
    let neighboringTints = [tintBefore, tintAfter];
    let neighboringColors = neighboringTints.map(t => scale[t]);
    let tintProgress = progress(tint, neighboringTints);

    let color = coreColor.clone().to('oklch');

    // Lightness
    let lOffset = interpolate(
      tintProgress,
      neighboringTints.map(t => scale[t].get('oklch.l') - L_RANGES[t].mid),
    );

    // Interpolate hue linearly and chroma with a power curve
    color.set({
      l: getLightness(tint, lOffset),
      c: interpolate(
        tintProgress,
        neighboringColors.map(c => c.get('oklch.c')),
        {
          progression: tint > coreLevel ? p => p ** chromaCurve.light : undefined,
        },
      ),
      h: interpolate(
        tintProgress,
        neighboringColors.map(c => c.get('oklch.h')),
      ),
    });

    scale[tint] = color;
  }

  for (let tint in scale) {
    if (!(tint in seedColors) && scale[tint].toGamut) {
      scale[tint] = scale[tint].toGamut('p3');
    }
  }

  return scale;
}

export default generateScale;
