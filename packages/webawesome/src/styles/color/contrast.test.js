// Get a list of all CSS files in repo
import chalk from 'chalk';
import Color from 'colorjs.io';
import palettes from './palettes.js';

let targetContrasts = {
  40: 3,
  50: 4.5,
  60: 7,
};

let result = { pass: 0, fail: 0, invalid: 0 };

for (let paletteId in palettes) {
  const tokens = palettes[paletteId];
  let prefix = chalk.dim(`[${paletteId}]`);

  for (let hue in tokens) {
    let tints = tokens[hue];

    for (let tint = 10; tint <= 50; tint += 10) {
      let color = tints[tint];

      if (!(color instanceof Color)) {
        result.invalid++;
        continue;
      }

      for (let difference in targetContrasts) {
        let targetContrast = targetContrasts[difference];
        let tint2 = tint + Number(difference);
        if (tint2 > 90) {
          continue;
        }

        let color2 = tints[tint2];

        if (!(color2 instanceof Color)) {
          result.invalid++;
          continue;
        }

        let contrast = color.contrast(color2, 'WCAG21');
        let pass = contrast >= targetContrast;
        if (pass) {
          result.pass++;
        } else {
          result.fail++;
          console.log(
            chalk.red(
              `${prefix} WCAG 2.1 contrast between ${hue}-${tint} and ${hue}-${tint2} is ${contrast.toLocaleString('en')} < ${targetContrast}`,
            ),
          );
        }
      }
    }
  }
}

let testCount = result.pass + result.fail;
console.info(
  `Ran ${testCount} tests: ${chalk.green(`${chalk.bold(result.pass)} passed`)}` +
    (result.fail ? `, ${chalk.red(`${chalk.bold(result.fail)} failed`)}` : '') +
    (result.invalid ? `, ${chalk.red(`${chalk.bold(result.invalid)} invalid colors`)}` : ''),
);

if (testCount === result.pass) {
  process.exit(0);
} else {
  process.exit(1);
}
