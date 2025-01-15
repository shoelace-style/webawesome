// Get a list of all CSS files in repo
import chalk from 'chalk';
import Color from 'colorjs.io';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const paletteFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.css'));

function parse(contents) {
  // Regex for each declaration
  let regex = /^\s*--wa-color-(?<hue>[a-z]+)-(?<level>[0-9]+):\s*(?<color>[^;]+)\s*;$/gm;
  let matches = [...contents.matchAll(regex)];

  if (matches.length === 0) {
    throw new Error('Cound not extract colors');
  }

  let ret = {};

  for (let match of matches) {
    let { hue, level, color } = match.groups;
    ret[hue] ??= {};
    level = level.replace(/^0+/, ''); // Leading zeroes throw off sorting
    ret[hue][level] = color;
  }

  return ret;
}

let targetContrasts = {
  40: 3,
  50: 4.5,
  60: 7,
};

let result = { pass: 0, fail: 0, invalid: 0 };

for (let file of paletteFiles) {
  let css = fs.readFileSync(path.join(__dirname, file), 'utf8');
  let filePrefix = chalk.dim(`[${file}]`);
  let tokens = parse(css);

  for (let hue in tokens) {
    let tints = tokens[hue];

    for (let tint = 10; tint <= 50; tint += 10) {
      let color;

      try {
        color = new Color(tints[tint]);
      } catch (e) {
        console.error(`[${file}] Invalid color ${hue}-${tint}: ${tints[tint]}`);
        result.invalid++;
        continue;
      }

      for (let difference in targetContrasts) {
        let targetContrast = targetContrasts[difference];
        let tint2 = tint + Number(difference);
        if (tint2 > 90) {
          continue;
        }

        let color2;
        try {
          color2 = new Color(tints[tint2]);
        } catch (e) {
          if (tint2 > 50) {
            // If 50, we'll look at it at some point as color1
            console.error(`${filePrefix} Invalid color ${hue}-${tint2}: ${tints[tint2]}`);
            result.invalid++;
          }
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
              `${filePrefix} WCAG 2.1 contrast between ${hue}-${tint} and ${hue}-${tint2} is ${contrast.toLocaleString('en')} < ${targetContrast}`,
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
