// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { generateGrays, generateScale, getCoreTint } from './generateScale.js';
import { HUE_CHROMA_SCALE, HUE_RANGES, HUE_TOP_TINT, L_RANGES } from '/assets/scripts/tweak/data.js';
import { clampAngle, interpolate, progressAngle, roundTo, subtractAngles } from '/assets/scripts/tweak/util.js';

/** An OKLCh chroma value that is guaranteed to be OOG for every P3 color */
const OOG_CHROMA = 0.4;

export default function generatePalette(seedHues, { huesAfter: allHuesAfter, ...options } = {}) {
  let ret = {};

  // Generate scales from seed hues
  let firstSeedHue;

  let coreLevels = {};
  let hueLOffsets = {};

  for (let hue in seedHues) {
    let seedColors = seedHues[hue];

    if (!seedColors) {
      continue;
    }

    firstSeedHue ??= hue;

    let coreLevel = (coreLevels[hue] = getCoreTint(seedColors));
    let coreColor = seedColors[coreLevel];
    hueLOffsets[hue] = coreColor.get('oklch.l') - L_RANGES[coreLevel].mid;

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

    // Shift if too close to pinned hues
    let huesAfter = allHuesAfter[hue];
    let pinnedHuesAfter = huesAfter.filter(hue => hue in ret);
    let neighboringPinnedHues = [pinnedHuesAfter.at(-1), pinnedHuesAfter[0]];
    let pinnedHueOffsets = neighboringPinnedHues.map(hue => coreLevels[hue] - HUE_TOP_TINT[hue]);

    let hueProgress =
      pinnedHuesAfter.length === 1
        ? 0
        : progressAngle(
            HUE_RANGES[hue].mid,
            neighboringPinnedHues.map(hue => HUE_RANGES[hue].mid),
          );

    let hBefore = ret[hueBefore][ret[hueBefore].maxChromaTint].get('oklch.h');
    let h = HUE_RANGES[hue].mid;
    let hDelta = subtractAngles(h, hBefore);

    if (hDelta < 40) {
      h = hBefore + 40;
    }

    h = clampAngle(HUE_RANGES[hue].min, h, HUE_RANGES[hue].max);

    let lOffsets = neighboringPinnedHues.map(hue => hueLOffsets[hue]);
    let coreLevelOffset = interpolate(hueProgress, pinnedHueOffsets);
    let coreLevel = (coreLevels[hue] = roundTo(HUE_TOP_TINT[hue] + coreLevelOffset, 10));
    let lOffset = (hueLOffsets[hue] = interpolate(hueProgress, lOffsets));
    let l = L_RANGES[coreLevel].mid + lOffset;

    let neighborCScale = neighboringPinnedHues.map(hue => {
      let scale = ret[hue];
      let coreColor = scale[scale.maxChromaTint].to('oklch');
      let maxC = coreColor.clone().set('c', OOG_CHROMA).toGamut('p3', { method: 'oklch.c' }).c;
      return coreColor.c / maxC;
    });

    let cScale = interpolate(hueProgress, neighborCScale);
    let maxC = new Color('oklch', [l, OOG_CHROMA, h]).toGamut('p3', { method: 'oklch.c' }).c;
    let c = cScale * maxC;
    // let c = interpolate(
    //   hueProgress,
    //   pinnedScale.map(scale => scale.maxChroma),
    // );

    let coreColor = new Color('oklch', [l, c, h]).toGamut('p3');

    ret[hue] = generateScale(coreColor);
    hueBefore = hue;
  }

  ret.gray = generateGrays(ret, options);

  return ret;
}
