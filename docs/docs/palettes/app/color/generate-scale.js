import { getCoreTint, getHueShift, getLightness, identifyColor } from './util.js';
import {
  CHROMA_CURVES,
  CHROMA_SCALE_LIGHTEST,
  L_RANGES,
  MAX_CHROMA_BY_TINT,
  tints,
} from '/assets/scripts/tweak/data.js';
import { clamp, mapRange } from '/assets/scripts/tweak/util.js';

export function generateScale(seedColors) {
  if (seedColors.constructor.name === 'Color') {
    let { level } = identifyColor(seedColors);
    seedColors = { [level]: seedColors };
  }

  // Find core color
  let coreLevel = getCoreTint(seedColors);
  let coreColor = seedColors[coreLevel];
  let distance = coreColor.get('oklch.l') - L_RANGES[coreLevel].mid;
  let coreChroma = coreColor.get('oklch.c');

  let scale = {
    maxChromaTint: coreLevel,
    maxChromaTintRaw: coreLevel,
    maxChroma: coreChroma,
    maxChromaRaw: coreChroma,
  };

  // First, add pinned colors
  for (let tint in seedColors) {
    scale[tint] = seedColors[tint];
  }

  // For finding lightest and darkest pinned colors
  let pinnedTints = Object.keys(seedColors).sort((a, b) => a - b);
  let chromaCurve = CHROMA_CURVES[clamp(50, coreLevel, 90)];

  // Now generate the rest, starting from the edges
  if (!('95' in scale)) {
    let lightest = seedColors[pinnedTints[0]];
    let color = lightest.clone().to('oklch');
    let chromaScale = CHROMA_SCALE_LIGHTEST[clamp(40, coreLevel, 95)];
    let hueShift = getHueShift(lightest, pinnedTints[0], '95');

    color.set({
      l: getLightness(95, distance),
      c: clamp(0, coreChroma * chromaScale, MAX_CHROMA_BY_TINT[95]),
      h: h => h + hueShift,
    });

    scale[95] = color;
  }

  if (!('05' in scale)) {
    let darkest = seedColors[pinnedTints.at(-1)];
    let color = darkest.clone().to('oklch');
    let hueShift = getHueShift(darkest, pinnedTints.at(-1), '05');

    color.set({
      l: getLightness('05', distance),
      // TODO c
      h: h => h + hueShift,
    });

    scale['05'] = color;
  }

  let pinnedLevels = Object.keys(seedColors).sort((a, b) => a - b);
  let levelBefore = '05';

  for (let tint of tints) {
    if (tint in scale) {
      // Pinned or already generated
      levelBefore = tint;
      continue;
    }

    // Generated color
    // First, find closest pinned colors before and after
    let levelAfter = pinnedLevels.find(level => level > tint) ?? '95';
    let colorBefore = scale[levelBefore];
    let colorAfter = scale[levelAfter];

    let color = coreColor.clone().to('oklch');

    // Lightness
    color.set('l', L_RANGES[tint].mid + distance);

    // Interpolate hue linearly and chroma with a power curve
    color.set({
      l: getLightness(tint, distance),
      h: mapRange(tint, {
        from: [levelBefore, levelAfter],
        to: [colorBefore.get('oklch.h'), colorAfter.get('oklch.h')],
      }),
    });

    if (tint > coreLevel) {
      color.set(
        'c',
        mapRange(tint, {
          from: [levelBefore, levelAfter],
          to: [colorBefore.get('oklch.c'), colorAfter.get('oklch.c')],
          progression: p => p ** chromaCurve.light,
        }),
      );
    }

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
