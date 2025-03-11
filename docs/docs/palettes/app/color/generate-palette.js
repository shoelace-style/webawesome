// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import generateGrays from './generate-grays.js';
import generateScale from './generate-scale.js';
import { getCoreTint } from './util.js';
import {
  HUE_CHROMA_SCALE,
  HUE_RANGES,
  HUE_TOP_TINT,
  L_RANGES,
  MAX_ACCENT,
  MIN_ACCENT,
} from '/assets/scripts/tweak/data.js';
import { clamp, clampAngle, interpolate, progressAngle, roundTo, subtractAngles } from '/assets/scripts/tweak/util.js';

/** An OKLCh chroma value that is guaranteed to be OOG for every P3 color */
const OOG_CHROMA = 0.4;

export default function generatePalette(seedHues, { huesAfter: allHuesAfter, ...options } = {}) {
  let ret = {};

  // Generate scales from seed hues
  let firstSeedHue;

  let coreLevels = {};
  let seedMeta = {};

  for (let hue in seedHues) {
    let seedColors = seedHues[hue];

    if (!seedColors) {
      continue;
    }

    firstSeedHue ??= hue;

    let coreLevel = (coreLevels[hue] = getCoreTint(seedColors));
    let coreColor = seedColors[coreLevel];

    let lOffset = coreColor.get('oklch.l') - L_RANGES[coreLevel].mid;
    let cScale = coreColor.get('oklch.c') / coreColor.to('oklch').clone().set('c', OOG_CHROMA).toGamut('p3').c;
    let relativeCScale = cScale / HUE_CHROMA_SCALE[hue];
    let levelOffset = coreLevel - HUE_TOP_TINT[hue];
    seedMeta[hue] = { lOffset, cScale, relativeCScale, levelOffset };

    ret[hue] = generateScale(seedColors);
  }

  if (!firstSeedHue) {
    // No valid seed colors, abort mission
    return null;
  }

  // Fill in remaining hues
  let hueBefore = firstSeedHue;

  for (let hue of allHuesAfter[firstSeedHue]) {
    if (hue in ret) {
      continue;
    }

    let huesAfter = allHuesAfter[hue];
    let seedHuesAfter = huesAfter.filter(hue => seedHues[hue]);
    let neighboringSeedHues = [seedHuesAfter.at(-1), seedHuesAfter[0]];

    let hueProgress =
      seedHuesAfter.length === 1
        ? 0
        : progressAngle(
            HUE_RANGES[hue].mid,
            neighboringSeedHues.map(hue => HUE_RANGES[hue].mid),
          );

    let hBefore = ret[hueBefore][ret[hueBefore].maxChromaTint].get('oklch.h');
    let h = HUE_RANGES[hue].mid;
    let hDelta = subtractAngles(h, hBefore);

    if (hDelta < 40) {
      // Shift if too close to seed hues
      h = hBefore + 40;
    }

    h = clampAngle(HUE_RANGES[hue].min, h, HUE_RANGES[hue].max);

    let coreLevelOffset = interpolate(
      hueProgress,
      neighboringSeedHues.map(hue => seedMeta[hue].levelOffset),
    );
    let coreLevel = clamp(MIN_ACCENT, roundTo(HUE_TOP_TINT[hue] + coreLevelOffset, 10), MAX_ACCENT);

    coreLevels[hue] = coreLevel;
    let lOffsets = neighboringSeedHues.map(hue => seedMeta[hue].lOffset);
    let lOffset = interpolate(hueProgress, lOffsets);
    let l = L_RANGES[coreLevel].mid + lOffset;

    let cScale = 1;

    if (hue === 'yellow') {
      // Yellow tends to be the brighest hue in the palette
      cScale = Math.max(
        ...Object.values(seedMeta)
          .map(meta => meta.relativeCScale)
          .filter(c => c > 0),
      );
    } else {
      cScale = interpolate(
        hueProgress,
        neighboringSeedHues.map(neighboringHue => seedMeta[neighboringHue].relativeCScale),
      );
    }

    cScale *= HUE_CHROMA_SCALE[hue];

    let maxC = new Color('oklch', [l, OOG_CHROMA, h]).toGamut('p3').c;
    let c = cScale * maxC;
    // let c = interpolate(
    //   hueProgress,
    //   pinnedScale.map(scale => scale.maxChroma),
    // );

    let coreColor = new Color('oklch', [l, c, h]).toGamut('p3');

    ret[hue] = generateScale(coreColor);
    hueBefore = hue;
  }

  if ('gray' in seedHues) {
    ret.gray = generateScale(seedHues.gray);
  } else {
    ret.gray = generateGrays(ret, options);
  }

  return ret;
}
