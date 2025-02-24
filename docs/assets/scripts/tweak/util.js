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
      let delta = h - averageHue;

      if (Math.abs(equivalent[0] - prevHue) <= Math.abs(equivalent[1] - prevHue)) {
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
