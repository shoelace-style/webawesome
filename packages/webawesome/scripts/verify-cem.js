/**
 * Validates the Custom Elements Manifest output to catch common issues.
 *
 * This script checks for:
 * - Events without names (which would generate "onundefined" in JSX types)
 * - Other potential CEM generation issues
 *
 * See: https://github.com/shoelace-style/webawesome/issues/1919
 */

import { readFile } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { getCdnDir } from './utils.js';

export async function verifyCem() {
  const errors = [];

  // Check custom-elements.json for events without names
  const cemPath = join(getCdnDir(), 'custom-elements.json');
  const cem = JSON.parse(await readFile(cemPath, 'utf-8'));

  for (const module of cem.modules || []) {
    for (const declaration of module.declarations || []) {
      if (declaration.kind === 'class' && declaration.events) {
        for (const event of declaration.events) {
          if (!event.name) {
            errors.push(
              `Component "${declaration.name}" has an event without a name (type: ${event.type?.text || 'unknown'}). ` +
                `This will generate "onundefined" in JSX types. Add an @event JSDoc tag with the event name.`
            );
          }
        }
      }
    }
  }

  // Check custom-elements-jsx.d.ts for "onundefined"
  const jsxTypesPath = join(getCdnDir(), 'custom-elements-jsx.d.ts');
  const jsxTypes = await readFile(jsxTypesPath, 'utf-8');

  if (jsxTypes.includes('onundefined')) {
    errors.push(
      'custom-elements-jsx.d.ts contains "onundefined" event handlers. ' +
        'This indicates events are missing names in the Custom Elements Manifest.'
    );
  }

  if (errors.length > 0) {
    throw new Error(`CEM verification failed:\n\n${errors.map(e => `  - ${e}`).join('\n')}`);
  }
}

// Allow running as standalone script: node scripts/verify-cem.js
const isMain = process.argv[1] === fileURLToPath(import.meta.url);
if (isMain) {
  verifyCem()
    .then(() => {
      console.log('CEM verification passed.');
      process.exit(0);
    })
    .catch(err => {
      console.error(err.message);
      process.exit(1);
    });
}
