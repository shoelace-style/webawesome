#!/usr/bin/env node

import { cdnUrl } from "../docs/_utils/cdnUrl.js";
import { getComponents } from "../docs/_utils/manifest.js";
import { getRootDir } from "./utils.js"
import * as path from "node:path"
import * as fs from "node:fs"

import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

function trimPipes(str) {
  return str.replace(/^(\s|\|)/g, '').replace(/(\s|\|)$/g, '')
}

function getPackageData() {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
}

let packageData = getPackageData();
let allComponents = getComponents();

const componentDocs = []

allComponents.forEach((component) => {
  // `wa-dropdown-item` -> dropdown-item
  const componentName = component.tagName.split(/-/).slice(1).join("-")
  // `wa-dropdown-item` -> Dropdown Item
  const capitalizedName = component.tagName.split(/-/).slice(1).map((str) => str[0].toUpperCase() + str.slice(1)).join(" ")

  const componentHeading = `## Component documentation for: ${capitalizedName}`
  const htmlTag = `\`<${component.tagName}>\``
  const tagName = `HTML Tag Name: ${htmlTag}`
  const version = `Available since version: ${component.since}`
  const status = `Component Status: ${component.status}`
  const summary = `Summary: ${component.summary}`

  const apiHeading = `### API Documentation for ${htmlTag}`
  const slotHeading = "#### Slot Documentation"
  const slots = component.slots?.map((slot) => {
    const slotName = `Slot Name: ` + (slot.name || "(default)")
    const slotDescription = `Slot Description: ` + slot.description

    return [
      slotName,
      slotDescription
    ].join("\n")
  })?.join("\n\n") || "\n\n"

  const propertyHeading = `#### Properties and Attributes documentation`
  const properties = component.properties.map((property) => {
    const str = []

    str.push(`JS Property: ${property.name}`)
    if (property.attribute) {
      str.push(`HTML Attribute: ${property.attribute}`)
    }

    str.push(`Description: ${property.description}`)

    if (property?.type?.text) {
      str.push(`Expected Type: ${trimPipes(property.type.text)}`)
    }

    if (property.default) {
      str.push(`Default Property Value: ${property.default}`)
    }

    str.push(`Property Reflects to Attribute: ${property.reflects ?? false}`)

    return str.join("\n")
  }).join("\n\n")

  const methodHeading = `#### Methods on the element`
  const methods = component.methods.forEach((method) => {
    const str = []

    str.push(`Method: ${method.name}`)
    str.push("(")

    method.parameters?.forEach((param, index) => {
      str.push(`${param.name}: ${trimPipes(param?.type?.text || "")}`)
      if (index !== method.parameters.length - 1) {
        str.push(", ")
      }
    })
    str.push(")")

    return str.join("")
  })

  const eventsHeading = `#### Events`
  const events = component.events?.map((evt) => {
    if (!evt.name) {
      return null
    }

    return [
      `Event Name: ${evt.name}`,
      // `React Event Name: on${evt.name}`,
      `Event Description: ${evt.description || ""}`
    ].join("\n")
  })?.filter(Boolean)?.join("\n\n") || "\n\n"

  const cssCustomPropertiesHeading = `#### CSS Custom Properties`
  const cssCustomProperties = component.cssProperties?.map((cssProp) => {
    const str = []

    str.push(`CSS Property: var(${cssProp.name})`)
    str.push(`CSS Property Description ${cssProp.description}`)

    if (cssProp.default) {
      str.push(`Default Value: ${cssProp.default}`)
    }

    return str.join("\n")
  })?.join("\n\n") || "\n\n"

  const cssCustomStatesHeading = `#### CSS Custom States`

  const cssCustomStates = component.cssStates?.map((state) => {
    const str = []

    str.push(`State name: ${state.name}`)
    str.push(`State description: ${state.description}`)
    str.push(`State CSS selector: \`:state(${state.name})\``)

    return str.join("\n")
  }).join("\n\n")

  const cssPartsHeading = "#### CSS Parts"
  const cssParts = component.cssParts?.forEach((cssPart) => {
    const str = []

    str.push(`CSS Part Name: ${cssPart.name}`)
    str.push(`CSS Part Description: ${cssPart.description}`)
    str.push(`CSS Part Selector: \`${component.tagName}::part(${cssPart.name}\`)`)

    return str.join("\n")
  })?.join("\n\n") || ""

  const dependenciesHeading = `#### Other Web Awesome components required by ${htmlTag}`
  const dependencies = component.dependencies.map((dep) => {
    return `\`<${dep}>\``
  }).join("\n")

  const importingHeading = `#### Importing ${tagName} Web Component`

  const componentPath = `components/${componentName}/${componentName}.js`
  const importing = `
##### CDN Import Path

\`import '${cdnUrl(componentPath, packageData.version)}'\`

##### NPM Import Path

\`import '@awesome.me/webawesome/dist/${componentPath}';\`

##### React Import Path

\`import ${component.name} from '@awesome.me/webawesome/dist/react/${componentName}/index.js';\`
  `.trim()
  componentDocs.push([
    componentHeading,
    tagName,
    version,
    status,
    summary,
    apiHeading,
    slotHeading,
    slots,
    propertyHeading,
    properties,
    methodHeading,
    methods,
    eventsHeading,
    events,
    cssCustomPropertiesHeading,
    cssCustomProperties,
    cssCustomStatesHeading,
    cssCustomStates,
    cssPartsHeading,
    cssParts,
    dependenciesHeading,
    dependencies,
    importingHeading,
    importing
  ].join("\n\n") + "\n\n")
})

const str = componentDocs.join("\n\n")
const llmsTxt = path.join(getRootDir(), "dist-cdn", "llms.txt")
fs.writeFileSync(llmsTxt, str)
fs.copyFileSync(llmsTxt, path.join(getRootDir(), "dist", "llms.txt"))
