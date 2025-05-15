// @ts-check
import {
  bundleEverything
} from "./utils/build.js"

;(async () => {
  await bundleEverything()
  // await buildPackage()
  // await buildDocs()
  // await copyCdnBuild()
})()
