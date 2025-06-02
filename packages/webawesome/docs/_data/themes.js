import fs from 'fs';
import path from 'path';
// import { inlined } from '../../dist/components/icon/library.wa.js';
const distDirectory = process.env.UNBUNDLED_DIST_DIRECTORY || path.join(path.resolve(), 'dist');

const THEME_DIR = path.join(distDirectory, 'styles', 'themes');

const themeFiles = fs.readdirSync(THEME_DIR).filter(file => file.endsWith('.css') && !file.endsWith('base.css'));

const declarationRegex = /^\s*--wa-(?<property>[a-z-]+)?:\s*(?<value>.+?)\s*(\/\*.+?\*\/)?\s*;$/gm;
const importRegex = /^\s*@import\s+url\(['"](?<path>.+?)['"]\);$/gm;
const themes = {};

for (const file of themeFiles) {
  const id = file.replace('.css', '');
  const { imports, declarations } = readCSSFile(file);
  let theme = { palette: 'default', declarations, imports };

  for (const url of imports) {
    if (url.endsWith('/color.css')) {
      // Color settings
      const color = readCSSFile(url);
      for (const colorUrl of color.imports) {
        if (colorUrl.startsWith('../../color/')) {
          // Color palette
          theme.palette = getFileSlug(colorUrl);
        } else if (colorUrl.startsWith('../../brand/')) {
          // Brand color
          theme.brand = getFileSlug(colorUrl);
        }
      }
    } else if (url.endsWith('/dimension.css')) {
      theme.dimension = true;
    }
  }

  let icon = {};
  icon.family = theme.declarations['icon-family'] ?? theme.default?.iconFamily ?? 'classic';
  icon.variant = theme.declarations['icon-variant'] ?? theme.default?.iconVariant ?? 'solid';
  theme.icons = icon;

  theme.rounding = Number(theme.declarations['border-radius-scale'] ?? theme.default?.rounding ?? 1);
  theme.spacing = Number(theme.declarations['space-scale'] ?? theme.default?.spacing ?? 1);
  theme.borderWidth = Number(theme.declarations['border-width-scale'] ?? theme.default?.borderWidth ?? 1);

  themes[id] = theme;
}

export default themes;

function readCSSFile(url) {
  const contents = fs.readFileSync(path.join(THEME_DIR, url), 'utf8');
  const imports = [...contents.matchAll(importRegex)].map(match => match.groups.path);
  const declarations = Object.fromEntries(
    [...contents.matchAll(declarationRegex)].map(match => [match.groups.property, match.groups.value]),
  );
  return { imports, declarations };
}

function getFileSlug(url) {
  return url.split('/').pop().replace('.css', '');
}
