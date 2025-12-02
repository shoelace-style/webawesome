#!/usr/bin/env node

import * as fs from "node:fs"
import * as path from "node:path"
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const rootPackageJSONFile = path.join(path.resolve(__dirname, "..", "..", ".."), "package.json")
const webawesomePackageJSONFile = path.join(path.resolve(__dirname, ".."), "package.json")

const rootPackageJSON = JSON.parse(fs.readFileSync(rootPackageJSONFile))
const webawesomePackageJSON = JSON.parse(fs.readFileSync(webawesomePackageJSONFile))

rootPackageJSON.version = webawesomePackageJSON.version

fs.writeFileSync(rootPackageJSONFile, JSON.stringify(rootPackageJSON, null, 2))

