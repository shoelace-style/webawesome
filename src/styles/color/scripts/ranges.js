// Run via node ranges.js to analyze all palettes
// or node ranges.js <paletteId> to analyze a single palette
import palettes from './palettes-analyzed.js';
import { toPrecision } from './util.js';

let paletteId = process.argv[2];

/**
 * Each "test" consists of the following params to analyze:
 * - component: The color component to analyze (h, c, l)
 * - label: The label to display in the console
 * - by: The grouping to analyze by (tint, hue)
 * - levels: The number of tints from the core color to include in the analysis.
 *           Examples: undefined for all tints, 0 for the core color only, 10 for the core color and ±10 from it.
 */
let tests = [
  { component: 'h', label: 'Hue', by: 'hue', levels: paletteId ? undefined : 10 },
  { component: 'c', label: 'Chroma', by: 'tint' },
  { component: 'l', label: 'L', by: 'tint' },
];

if (!paletteId) {
  tests.push({ component: 'h', label: 'Core Hue', by: 'hue', levels: 0 });
}

const tints = ['95', '90', '80', '70', '60', '50', '40', '30', '20', '10', '05'];
const hues = ['red', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'gray'];

function analyzePalette(scales, results, { component, levels, by = 'tint' }) {
  for (let hue in scales) {
    let colors = scales[hue];
    let key = colors.maxChromaTint;
    let resultsByHue = by === 'hue' ? results[hue] : results;

    for (let tint of tints) {
      let color = colors[tint];
      let value = color[component];
      let resultsByTint = by === 'tint' ? resultsByHue[tint] : resultsByHue;

      if (levels === undefined || Math.abs(tint - key) <= levels) {
        if (resultsByTint.min > value) resultsByTint.min = value;
        if (resultsByTint.max < value) resultsByTint.max = value;
      }
    }
  }
}

function analyze(options = {}) {
  let results = {};
  let keys = options.by === 'hue' ? hues : tints;

  for (let key of keys) {
    results[key] = { min: Infinity, max: -Infinity };
  }

  if (paletteId) {
    analyzePalette(palettes[paletteId], results, options);
  } else {
    for (let paletteId in palettes) {
      analyzePalette(palettes[paletteId], results, options);
    }
  }

  // Add extent & mid, make numbers easier to read
  for (let key of keys) {
    let info = results[key];
    if (options.component === 'h') {
      // Fixup hues crossing 0
      if (Math.abs(info.max - info.min) > 180) {
        info.min += 360;

        if (info.min > info.max) {
          [info.min, info.max] = [info.max, info.min];
        }
      }
    }

    info.extent = info.max - info.min;
    info.mid = (info.min + info.max) / 2;

    for (let prop in info) {
      info[prop] = toPrecision(info[prop]);
    }
  }

  let label = `${options.label || options.component} ranges`;
  console.log(label + (options.levels !== undefined ? ` (±${options.levels} from core tint)` : '') + ':');
  console.table(results);
}

if (paletteId) {
  // Analyze a single palette
  console.log(`Analyzing palette '${paletteId}'`);
}

for (let test of tests) {
  analyze(test);
}
