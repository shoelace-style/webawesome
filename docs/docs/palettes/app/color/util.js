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

export function identifyColor(color) {
  let hue = getRange(HUE_RANGES, color.get('oklch.h'), { type: 'angle' }).key;
  let level = getRange(L_RANGES, color.get('oklch.l')).key;
  return { hue, level };
}

export function getLightness(level, distance) {
  return clamp(L_RANGES[level].min, L_RANGES[level].mid + distance, L_RANGES[level].max);
}

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

export function getContrasts(colors, originalContrasts) {
  let ret = {};

  for (let hue in colors) {
    ret[hue] = {};

    for (let tintBg of tints) {
      ret[hue][tintBg] = {};
      let bgColor = colors[hue][tintBg];

      if (!bgColor || !bgColor.contrast) {
        continue;
      }

      for (let tintFg of tints) {
        let fgColor = colors[hue][tintFg];
        let value = bgColor.contrast(fgColor, 'WCAG21');
        if (originalContrasts) {
          let original = originalContrasts[hue][tintBg][tintFg];
          ret[hue][tintBg][tintFg] = { value, original, bgColor, fgColor };
        } else {
          ret[hue][tintBg][tintFg] = value;
        }
      }
    }
  }

  return ret;
}

/**
 * Return hex code iff a color is within sRGB, otherwise fall back to its default string representation
 *
 * @param {Color} color
 * @returns {string}
 */
export function stringifyColor(color) {
  if (color?.constructor.name !== 'Color') {
    return color;
  }

  let format = color.inGamut('srgb') ? 'hex' : undefined;
  return color.toString({ format });
}
