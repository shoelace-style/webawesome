import { tints } from '/assets/scripts/tweak/data.js';

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

export default generateGrays;
