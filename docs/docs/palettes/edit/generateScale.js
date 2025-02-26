import { HUE_SHIFTS, L_RANGES, tints } from '/assets/scripts/tweak/data.js';
import { clamp, mapRange, subtractAngles } from '/assets/scripts/tweak/util.js';

const chromaScaleLightest = {
  95: 1,
  90: 0.8,
  80: 0.5,
  70: 0.2,
  60: 0.2,
  50: 0.15,
};

export function generateScale(seedColors) {
  // Find core color
  let coreColor, maxChroma, coreLevel;

  for (let level in seedColors) {
    let color = seedColors[level];
    let chroma = color.get('oklch.c');

    if (!(chroma < maxChroma)) {
      // not < will also kick in when they are empty
      coreColor = color;
      maxChroma = chroma;
      coreLevel = level;
    }
  }

  let distance = coreColor.get('oklch.l') - L_RANGES[coreLevel].mid;
  let coreChroma = coreColor.get('oklch.c');

  let scale = {
    maxChromaTint: coreLevel,
    maxChromaTintRaw: coreLevel,
    maxChroma: coreChroma,
    maxChromaRaw: coreChroma,
  };

  // Find if any hue shift applies to this hue (we assume defined hue shift ranges are mutually exclusive)
  let hueShift = { dark: 0, light: 0, intensity: 0 };
  let autoHueShift = HUE_SHIFTS.find(
    ({ range }) =>
      subtractAngles(range[0], coreColor.get('oklch.h')) <= 0 &&
      subtractAngles(coreColor.get('oklch.h'), range[1]) <= 0,
  );

  if (autoHueShift) {
    hueShift = { ...autoHueShift.shift };
    let hueRange = [autoHueShift.range[0], ...autoHueShift.peak, autoHueShift.range[1]];
    hueShift.intensity = mapRange(coreColor.get('oklch.h'), hueRange, [0, 1, 1, 0]);
  }

  // First, add pinned colors
  for (let tint in seedColors) {
    scale[tint] = seedColors[tint];
  }

  // Now generate the rest, starting from the edges
  if (!('95' in scale)) {
    let color = coreColor.clone().to('oklch');
    let chromaScale = chromaScaleLightest[coreLevel] ?? 0.1;

    color.set({
      l: L_RANGES[95].mid + distance,
      c: clamp(0, coreChroma * chromaScale, 0.1),
      h: h => h + hueShift.light * hueShift.intensity,
    });

    scale[95] = color;
  }

  if (!('05' in scale)) {
    let color = coreColor.clone().to('oklch');

    color.set({
      l: L_RANGES['05'].mid + distance,
      // TODO c
      h: h => h + hueShift.dark * hueShift.intensity,
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
      l: L_RANGES[tint].mid + distance,
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
          progression: p => p ** 1.2,
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

export default generateScale;
