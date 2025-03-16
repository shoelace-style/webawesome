// https://lea.verou.me/blog/2016/12/resolve-promises-externally-with-this-one-weird-trick/
export function promise() {
  let res, rej;

  let promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  return Object.assign(promise, { resolve: res, reject: rej });
}

export function normalizeAngles(angles) {
  // First, normalize
  angles = angles.map(h => ((h % 360) + 360) % 360);

  // Remove top and bottom 25% and find average
  let averageHue =
    angles
      .toSorted((a, b) => a - b)
      .slice(angles.length / 4, -angles.length / 4)
      .reduce((a, b) => a + b, 0) / angles.length;

  for (let i = 0; i < angles.length; i++) {
    let h = angles[i];
    let prevHue = angles[i - 1];
    let delta = h - prevHue;

    if (Math.abs(delta) > 180) {
      let equivalent = [h + 360, h - 360];
      // Offset hue to minimize difference in the direction that brings it closer to the average
      if (Math.abs(equivalent[0] - averageHue) <= Math.abs(equivalent[1] - averageHue)) {
        angles[i] = equivalent[0];
      } else {
        angles[i] = equivalent[1];
      }
    }
  }

  return angles;
}

export function subtractAngles(θ1, θ2) {
  let [a, b] = normalizeAngles([θ1, θ2]);
  return a - b;
}

/**
 * Given an object of keys to ranges, find the closest range.
 * Ranges are assumed to be mutually exclusive.
 * @param {Object<string, {min: number, max: number}>} ranges
 * @param {number} value
 * @param {object} options
 * @param {"angle" | undefined} options.type
 * @param {number} [options.tolerance=Infinity] If value is not within any range, how close can it be?
 * @param {(range: {min: number, max: number}) => {min: number, max: number}} options.getRange
 * @returns {{key: string, distance: number}} The key of the closest range. Distance is 0 if the value is within the range, negative if below, positive if above.
 */
export function getRange(ranges, value, options) {
  let { type } = options || {};
  let keys = Object.keys(ranges);
  let closest = { key: keys[0], distance: Infinity };

  for (let key of keys) {
    let range = ranges[key];

    if (options?.getRange) {
      range = options.getRange(range);
    }

    let { min, max } = range;

    if (Array.isArray(range)) {
      [min, max] = range;
    }

    let deltaMin = type === 'angle' ? subtractAngles(value, min) : value - min;
    let deltaMax = type === 'angle' ? subtractAngles(value, max) : value - max;

    if (deltaMin >= 0 && deltaMax <= 0) {
      return { key, distance: 0 };
    }

    if (Math.abs(deltaMin) < Math.abs(closest.distance)) {
      closest = { key, distance: deltaMin };
    }

    if (deltaMax > 0 && Math.abs(deltaMax) < Math.abs(closest.distance)) {
      closest = { key, distance: deltaMax };
    }
  }

  // TODO use angle functions to check tolerance against angles
  if (options?.tolerance !== undefined && Math.abs(closest.distance) > options.tolerance) {
    return;
  }

  return closest;
}

export function camelCase(str) {
  return (str + '').replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function capitalize(str) {
  if (!str) {
    return str;
  }

  str = str + '';
  return str[0].toUpperCase() + str.slice(1);
}

export function arrayNext(array, element) {
  let index = array.indexOf(element);
  return array[(index + 1) % array.length];
}

export function arrayPrevious(array, element) {
  let index = array.indexOf(element);
  return array[(index - 1 + array.length) % array.length];
}

export function levelToIndex(level) {
  if (level === '05') {
    return 0;
  }

  return level === '95' ? 10 : +level / 10;
}

export function indexToLevel(i) {
  if (i === 0) {
    return '05';
  }

  return (i === 10 ? 95 : i * 10) + '';
}

export function previousLevel(level) {
  if (level === '05') {
    return;
  }

  return indexToLevel(levelToIndex(level) - 1);
}

export function nextLevel(level) {
  if (level === '95') {
    return;
  }

  return indexToLevel(levelToIndex(level) + 1);
}

export function relativeLevel(level, steps) {
  if (level == 100) {
    // loose intentional
    return relativeLevel(95, ++steps);
  }

  if (level == 95) {
    // loose intentional
    return relativeLevel(90, ++steps);
  }

  if (level == 0) {
    // loose intentional
    return relativeLevel(5, --steps);
  }

  if (level == 5) {
    // loose intentional
    return relativeLevel(10, --steps);
  }

  let index = clamp(0, levelToIndex(level) + steps, 10);

  return indexToLevel(index);
}

/**
 *
 * @param {number} p Number from 0-1 where 0 is start and 1 is end
 * @param {*} start Number for p=0
 * @param {*} end Number for p=1
 * @returns
 */
export function interpolate(p, range = [0, 1], options) {
  let [start, end] = range;

  if (p <= 0 || p >= 1 || range.length === 2) {
    let value = start + p * (end - start);
    return options?.unclamped ? value : clamp(start, value, end);
  }

  // If we're here, there are more points in the range
  let interval = 1 / (range.length - 1);
  let index = Math.floor(p / interval);
  let intervalProgress = progress(p, [index * interval, (index + 1) * interval]);
  return interpolate(intervalProgress, range.slice(index, index + 2), options);
}

/**
 * Inverse of interpolate: given a value, find the progress between start and end.
 * @param {*} value
 * @param {*} range
 * @returns
 */
export function progress(value, range = [0, 1], options) {
  let [start, end] = range;

  if (value <= start || value >= end || range.length === 2) {
    let ret = (value - start) / (end - start);

    return options?.unclamped ? ret : clamp(0, ret, 1);
  }

  // If we're here, there are more points in the range
  let index = range.findIndex((v, i) => value > range[i - 1] && value <= v);
  return (index - 1) / (range.length - 1);
}

export function mapRange(value, { from, to, progression }) {
  let p = progress(value, from);

  if (progression) {
    p = progression(p);
  }

  return interpolate(p, to);
}

export function clamp(min, value, max) {
  if (max < min) {
    [min, max] = [max, min];
  }

  if (min !== undefined) {
    value = Math.max(min, value);
  }

  if (max !== undefined) {
    value = Math.min(max, value);
  }

  return value;
}

export function clampAngle(min, value, max) {
  [min, value, max] = normalizeAngles([min, value, max]);
  return clamp(min, value, max);
}

export function interpolateAngles(p, range) {
  range = normalizeAngles(range);
  return interpolate(p, range, { unclamped: true });
}

export function progressAngle(angle, range) {
  [angle, ...range] = normalizeAngles([angle, ...range]);
  return progress(angle, range, { unclamped: true });
}

/**
 * Round a number to the nearest multiple of `roundTo` or to the closest number in an array of numbers
 * @param {number} value
 * @param {number | number[]} roundTo
 * @returns
 */
export function roundTo(value, roundTo = 1) {
  if (Array.isArray(roundTo)) {
    let closest = roundTo[0];
    let closestDistance = Math.abs(value - closest);

    for (let candidate of roundTo) {
      let distance = Math.abs(value - candidate);

      if (distance < closestDistance) {
        closest = candidate;
        closestDistance = distance;
      }
    }

    return closest;
  }

  let decimals = roundTo.toString().split('.')[1]?.length ?? 0;
  let ret = Math.round(value / roundTo) * roundTo;

  if (decimals > 0) {
    // Eliminate IEEE 754 floating point errors
    ret = +ret.toFixed(decimals);
  }

  return ret;
}

export function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Convert accented letters to ASCII
    .replace(/[^\w\s-]/g, '') // Remove remaining non-ASCII characters
    .trim()
    .replace(/\s+/g, '-') // Convert whitespace to hyphens
    .toLowerCase();
}
