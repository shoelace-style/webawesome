import {
  CHROMA_CURVES,
  CHROMA_SCALE_LIGHTEST,
  CHROMA_TOLERANCE,
  DEFAULT_ACCENT,
  HUE_RANGES,
  HUE_SHIFTS,
  L_RANGES,
  MAX_ACCENT,
  MAX_CHROMA_BY_TINT,
  MIN_ACCENT,
  tints,
} from '/assets/scripts/tweak/data.js';
import { clamp, getRange, mapRange } from '/assets/scripts/tweak/util.js';

export function generateScale(seedColors) {
  if (seedColors.constructor.name === 'Color') {
    let { level } = placeColor(seedColors);
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

export function generateGrays(colors, { grayColor, grayChroma }) {
  let ret = {};
  let undertoneScale = colors[grayColor];

  // These will be the same, since scaling them won't change the relationship
  ret.maxChromaTint = undertoneScale.maxChromaTint;
  ret.maxChromaTintRaw = undertoneScale.maxChromaTintRaw;

  for (let tint of tints) {
    let colorUndertone = undertoneScale[tint].clone().to('oklch');
    ret[tint] = colorUndertone.set({ c: c => c * grayChroma });
  }

  ret.maxChroma = ret[ret.maxChromaTint].get('oklch.c');
  ret.maxChromaRaw = ret[ret.maxChromaTintRaw].get('oklch.c');

  return ret;
}

export function placeColor(color) {
  let hue = getRange(HUE_RANGES, color.get('oklch.h'), { type: 'angle' }).key;
  let level = getRange(L_RANGES, color.get('oklch.l')).key;
  return { hue, level };
}

export default generateScale;

/**
 * How many tints are between two tints?
 * E.g. `getTintDistance('90', '95')` should return `1`
 * @param {number | string} tint1
 * @param {number | string} tint2
 * @returns {number}
 */
export function getTintDistance(tint1, tint2) {
  tint1 = String(tint1);
  tint2 = String(tint2);
  return tints.indexOf(tint2) - tints.indexOf(tint1);
}

export function getHueShift(color, fromTint, toTint) {
  let tintDistance = getTintDistance(fromTint, toTint);
  let hueShift = getRange(HUE_SHIFTS, color.get('oklch.h'), {
    getRange: v => v.range,
    type: 'angle',
    tolerance: 0,
  });

  if (!hueShift) {
    return 0;
  }

  hueShift = HUE_SHIFTS[hueShift.key];

  let { peak, range } = hueShift;
  let h = color.get('oklch.h');
  let breakpoints = [range[0], ...peak, range[1]];
  let intensity = mapRange(h, breakpoints, [0, 1, 1, 0]);
  let type = tintDistance < 0 ? 'dark' : 'light';
  let shift = hueShift.shift[type];

  let ret = shift * intensity;
  let maxConsecutive = hueShift.maxConsecutive[type] ?? hueShift.maxConsecutive;
  let maxShift = Math.sign(shift) * maxConsecutive * Math.abs(tintDistance);

  ret = clamp(undefined, ret, maxShift);

  return ret;
}

export function getCoreTint(scale) {
  let tintsInScale = Object.keys(scale);

  if (tintsInScale.length <= 1) {
    return tintsInScale[0];
  }

  let ret = DEFAULT_ACCENT in scale ? DEFAULT_ACCENT : tintsInScale[Math.floor(tintsInScale.length / 2)];
  let maxChroma = 0;

  for (let tint in scale) {
    let color = scale[tint];
    let chroma = color.get('oklch.c');

    if (chroma > maxChroma + CHROMA_TOLERANCE && tint >= MIN_ACCENT && tint <= MAX_ACCENT) {
      ret = tint;
      maxChroma = chroma;
    }
  }

  return ret;
}

export function getLightness(level, distance) {
  return clamp(L_RANGES[level].min, L_RANGES[level].mid + distance, L_RANGES[level].max);
}
