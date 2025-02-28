// TODO move these to local imports
import Color from 'https://colorjs.io/dist/color.js';
import { generateGrays, generateScale, getCoreTint, placeColor } from './generateScale.js';
import { HUE_RANGES, HUE_TOP_TINT, L_RANGES, tints } from '/assets/scripts/tweak/data.js';
import { clampAngle, interpolate, progressAngle, roundTo, subtractAngles } from '/assets/scripts/tweak/util.js';

export default function generatePalette(seedHues, { huesAfter: allHuesAfter, ...options } = {}) {
  let ret = {};

  // Generate scales from seed hues
  let firstSeedHue;

  let coreLevels = {};
  let coreLOffsets = {};

  for (let hue in seedHues) {
    let seedColors = seedHues[hue];

    if (!seedColors) {
      continue;
    }

    firstSeedHue ??= hue;

    let coreLevel = (coreLevels[hue] = getCoreTint(seedColors));
    let coreColor = seedColors[coreLevel];
    coreLOffsets[hue] = coreColor.get('oklch.l') - L_RANGES[coreLevel].mid;

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
    let pinnedHue = [pinnedHuesAfter.at(-1), pinnedHuesAfter[0]];
    let pinnedHueOffsets = pinnedHue.map(hue => coreLevels[hue] - HUE_TOP_TINT[hue]);

    let hueProgress =
      pinnedHuesAfter.length === 1
        ? 0
        : progressAngle(
            HUE_RANGES[hue].mid,
            pinnedHue.map(hue => HUE_RANGES[hue].mid),
          );

    let pinnedScale = pinnedHue.map(hue => ret[hue]);
    let h = HUE_RANGES[hue].mid;

    let hBefore = ret[hueBefore][ret[hueBefore].maxChromaTint].get('oklch.h');
    let hDelta = subtractAngles(h, hBefore);

    if (hDelta < 40) {
      h = hBefore + 40;
    }

    h = clampAngle(HUE_RANGES[hue].min, h, HUE_RANGES[hue].max);

    let c = interpolate(
      hueProgress,
      pinnedScale.map(scale => scale.maxChroma),
    );

    let coreLevelOffset = interpolate(hueProgress, pinnedHueOffsets);
    let coreLevel = (coreLevels[hue] = roundTo(HUE_TOP_TINT[hue] + coreLevelOffset, 10));
    let lOffset = (coreLOffsets[hue] = interpolate(
      hueProgress,
      pinnedHue.map(hue => coreLOffsets[hue]),
    ));

    let l = L_RANGES[coreLevel].mid + lOffset;

    let coreColor = new Color('oklch', [l, c, h]).toGamut('p3');

    ret[hue] = generateScale(coreColor);
    hueBefore = hue;
  }

  ret.gray = generateGrays(ret, options);

  return ret;
}
