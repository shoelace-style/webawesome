// Run via node ranges.js to analyze all palettes
// Add palette ids, hue names, or tints to filter the analysis (e.g. node ranges.js red anodized -gray)
import palettes from './palettes-analyzed.js';
import { aggregates, normalizeAngles, toPrecision } from './util.js';

/**
 * Each "test" consists of the following params to analyze:
 * - component: The color component to analyze (h, c, l)
 * - label: The label to display in the console (optional)
 * - by: The grouping to analyze by (1-2 of 'tint', 'hue', 'palette')
 * - filter: Restrict to specific hues/tints/palettes or exclude them
 * - stats: The stats to calculate for each group (min, max, mid, extent, avg, median, count)
 */
let tests = [
  { component: 'h', by: 'hue', filter: ['core ± 10', '-gray'] },
  { component: 'h', by: 'hue', filter: ['core', '-gray'] },
  { component: 'h', by: 'palette', filter: ['core', 'gray'] },
  { component: 'c', by: 'tint', filter: '-gray' },
  { component: 'c', by: 'palette', filter: 'core', stats: ['max', 'avg', 'median', 'count'] },
  { component: 'l', by: 'tint' },
];

const COMPONENT_NAMES = { l: 'lightness', c: 'chroma', h: 'hue' };
const CORE_TINT_MICROSYNTAX = /^core\s*((?<op>[-+±])\s*(?<offset>\d+))?$/;

const all = {
  tints: ['95', '90', '80', '70', '60', '50', '40', '30', '20', '10', '05'],
  hues: ['red', 'yellow', 'green', 'cyan', 'blue', 'indigo', 'purple', 'pink', 'gray'],
  palettes: Object.keys(palettes),
};

let args = process.argv.slice(2);
let used = getSubset(all, args);

for (let key in used) {
  if (used[key].length < all[key].length) {
    // Subset of values
    console.log(`Analyzing only ${key}:`, used[key].join(', '));
  }
}

/**
 * Apply a list of args (hues, tints, palette ids) to add or exclude against the corresponding arrays
 */
function getSubset(all, args) {
  args = Array.isArray(args) ? args : [args];

  let used = {
    tints: [],
    hues: [],
    palettes: [],
  };

  if (args.length > 0) {
    for (let arg of args) {
      let isNegative = arg.startsWith('-');
      arg = isNegative ? arg.slice(1) : arg;
      let key = Object.entries(all).find(([key, values]) => values.includes(arg))?.[0];

      if (!key && CORE_TINT_MICROSYNTAX.test(arg)) {
        key = 'tints';
      }

      if (key) {
        if (isNegative) {
          let array = used[key].length === 0 ? all[key] : used[key];
          used[key] = array.filter(value => value !== arg);
        } else {
          used[key].push(arg);
        }
      }
    }
  }

  // If no filters, use all values
  for (let key in used) {
    if (used[key].length === 0) {
      used[key] = all[key].slice();
    }
  }

  return used;
}

function runTest(test = {}) {
  let { component, label, by = 'tint', filter, stats = ['min', 'max', 'median', 'count'], silent } = test;
  let results = {};
  let localUsed = filter ? getSubset(used, filter) : used;

  for (let palette of localUsed.palettes) {
    for (let hue of localUsed.hues) {
      let coreTint = palettes[palette][hue].maxChromaTint;
      // Resolve any core tint microsyntax
      let tints = localUsed.tints.flatMap(tint => {
        if (CORE_TINT_MICROSYNTAX.test(tint)) {
          let { op, offset } = CORE_TINT_MICROSYNTAX.exec(tint).groups;
          if (!offset) {
            return coreTint;
          }

          return localUsed.tints.filter(t => {
            let distance = t - coreTint;
            return Math.abs(distance) <= offset && !((op === '-' && distance > 0) || (op === '+' && distance < 0));
          });
        }

        return tint;
      });

      for (let tint of tints) {
        let key = getKey(by, { hue, tint, palette });
        let color = palettes[palette][hue][tint];
        let value = color[component];

        results[key] ??= [];
        results[key].push(value);
      }
    }
  }

  // Process results
  for (let key in results) {
    let values = results[key];

    if (component === 'h') {
      values = normalizeAngles(values);
    }

    results[key] = stats.reduce((acc, stat) => {
      acc[stat] = toPrecision(aggregates[stat](values, acc));
      return acc;
    }, {});

    if (key.startsWith('0')) {
      // Replace 05 with 5 so that it appears in the correct place
      let newKey = key.replace(/^0+/, '');
      results[newKey] = results[key];
      delete results[key];
    }
  }

  if (!label) {
    label = getLabel(test);
  }

  if (!silent) {
    console.log(label);
    console.table(results);
  }

  return results;
}

for (let test of tests) {
  runTest(test);
}

function getKey(by, things) {
  by = Array.isArray(by) ? by : [by];
  return by.map(thing => things[thing]).join('-');
}

function getLabel({ component, by, filter }) {
  let ret = COMPONENT_NAMES[component];

  by = Array.isArray(by) ? by : [by];
  ret += ` by ${by.join(' ')}`;

  if (filter) {
    filter = Array.isArray(filter) ? filter.join(', ') : filter;
    ret += ` (${filter})`;
  }

  ret = ret.replace('hue by hue', 'hue by color name');

  return capitalize(ret);
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
