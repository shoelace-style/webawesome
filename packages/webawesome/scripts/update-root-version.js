#!/usr/bin/env node

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const monorepoRoot = path.resolve(__dirname, '..', '..', '..');
const rootPackageJSONFile = path.join(monorepoRoot, 'package.json');
const webawesomePackageJSONFile = path.join(path.resolve(__dirname, '..'), 'package.json');

const rootPackageJSON = JSON.parse(fs.readFileSync(rootPackageJSONFile, { encoding: 'utf8' }));
const webawesomePackageJSON = JSON.parse(fs.readFileSync(webawesomePackageJSONFile, { encoding: 'utf8' }));

const currentVersion = webawesomePackageJSON.version;
rootPackageJSON.version = currentVersion;

fs.writeFileSync(rootPackageJSONFile, JSON.stringify(rootPackageJSON, null, 2));

const versionsFile = path.join(monorepoRoot, 'VERSIONS.txt');

// TODO: Make this smart and understand semver and "insert" in the correct spot instead of locale comparing.
const versions = fs
  .readFileSync(versionsFile, { encoding: 'utf8' })
  .split(/\r?\n/)
  .filter(Boolean)
  .sort((a, b) => {
    return a.localeCompare(b);
  });

if (!versions.includes(currentVersion)) {
  versions.push(currentVersion);
}

fs.writeFileSync(versionsFile, versions.join('\n'));
