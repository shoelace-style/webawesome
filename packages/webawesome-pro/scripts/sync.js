import * as fs from "node:fs"
import * as path from "node:path"
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
const obj = {
  "//": "This file is auto generated. Do not edit it manually. If something seems wrong here, check packages/webawesome/package.json or packages/webawesome-pro/package-merges.json",
  "type": "module"
}

const webawesomePackageJson = fs.readFileSync(path.resolve(__dirname, "..", "..", "webawesome", "package.json"))
const webawesomeJson = JSON.parse(webawesomePackageJson)

const overridesPackageJson = fs.readFileSync(path.resolve(__dirname, "..", "package-merges.json"))
const overridesJson = JSON.parse(overridesPackageJson)
// Dont use the merged top level comment.
delete overridesJson["//"]

function deepMerge (target, merge) {
  const obj = structuredClone(target)
  mergeObject(obj, merge)
  return obj
}

function mergeObject (target, merge) {
  Object.keys(merge).forEach((key) => {
    if (target[key] === undefined) {
      target[key] = merge[key]
      return
    }

    if (Array.isArray(target[key]) && Array.isArray(merge[key])) {
      target[key] = [...new Set(target.concat(merge[key]))]
      return
    }

    if (target[key] instanceof Object && merge[key] instanceof Object) {
      mergeObject(target[key], merge[key])
      return
    } else {
      target[key] = merge[key]
    }
  })
}

fs.writeFileSync(path.resolve(__dirname, "..", "package.json"), JSON.stringify({
  ...obj,
  ...deepMerge(webawesomeJson, overridesJson)
}, null, 2))


