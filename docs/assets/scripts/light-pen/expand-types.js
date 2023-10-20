// @ts-check
import typeScript from "typescript"
// import * as fs from "fs"

import { globSync } from "glob"


/**
 * @typedef {Array<string | TypeArray>} TypeArray
 */

/** @typedef {{
  name?: string;
  fileName?: string;
  documentation?: string;
  type?: string;
  constructors?: DocEntry[];
  parameters?: DocEntry[];
  returnType?: string;
}} DocEntry */


class ExpandTypes {
  /**
   * @param {Object} options
   * @param {string | string[]} options.globs
   * @param {import("typescript") | null | undefined} [options.ts]
   * @param {import("typescript").Program | null | undefined} [options.program]
   */
  constructor ({ globs, ts = null, program = null}) {
    this.name = "expand-types-plugin"
    this.ts = ts || typeScript
    this.program = program

    this.globs = globSync(globs)

    /**
     * @type {import("typescript").TypeChecker | null | undefined}
     */
    this.typeChecker = this.program?.getTypeChecker()
    this.sourceFiles = new Map()
  }

  createProgram = () => {
    if (!this.ts) throw Error("no TS instance Found")

    const program = this.ts.createProgram(this.globs, {target: this.ts.ScriptTarget.ESNext, module: this.ts.ModuleKind.ESNext, allowJs: true, checkJs: true});
    return program
  }

  collectPhase = ({ ts, node, context }) => {
    if (this.checked) return

    if (!this.ts) {
      this.ts = ts
    }

    if (!this.program) {
      this.program = this.createProgram()
    }

    if (!this.program) {
      throw Error("Could not find program")
    }

    if (!this.ts) {
      throw Error("Could not find TS Instance")
    }

    const program = this.program

    if (!this.typeChecker) {
      this.typeChecker = program.getTypeChecker()
    }

    this.checked = true

    const sourceFilesMap = this.sourceFiles
    const sourceFiles = this.program.getSourceFiles()
      .filter(sf => this.globs.find(glob => {
        return sf.fileName.includes(glob)
      }))

    for (const sourceFile of sourceFiles) {
      if (!sourceFile) return

      const types = new Map()

      // Walk the tree to search for classes
      this.ts.forEachChild(sourceFile, (node) => this.__processNode(node, types))

      sourceFilesMap.set(sourceFile.fileName, types)
    }

    // console.log([...[sourceFilesMap.entries()].values()])
  }

  /**
   * @param {import("typescript").Node} node
   * @param {Map<string, string>} types
   */
  __processNode = (node, types) => {
    if (!this.typeChecker) return
    if (!this.ts) return

    const ts = this.ts

    if (ts.isTypeAliasDeclaration(node)) {
      const type = this.typeChecker.getTypeAtLocation(node.name);

      const originalProperty = this.typeChecker.typeToString(type)
      const processedStr = this.__processProperty(type, node)
      types.set(originalProperty, processedStr)
    }
    ts.forEachChild(node, (node) => this.__processNode(node, types))
  }

  /**
  * Typescript can help us to spot types from outside of our local source files
  * which we don't want to process like literals string (think of trim(), length etc) or entire classes like Date.
  * @param {import("typescript").Symbol} symbol
  */
  __isTypeLocal = (symbol) => {
    if (!this.program) return false

    const sourceFile = symbol?.valueDeclaration?.getSourceFile();

    const isStandardLibrary = !!sourceFile && this.program.isSourceFileDefaultLibrary(sourceFile)
    const isExternal = !!sourceFile && this.program.isSourceFileFromExternalLibrary(sourceFile);
    const hasDeclaration = !!symbol?.declarations?.[0];

    return !(isStandardLibrary || isExternal) && hasDeclaration;
  }

  /**
   * @param {import("typescript").Type} type
   * @param {import("typescript").Node} node
   * @param {number} [level=0]
   * @return {string}
   */
  __processProperty = (type, node, level = 0) => {
    if (!this.ts) return ""
    if (!this.typeChecker) return ""

    const ts = this.ts
    const checker = this.typeChecker

    if (!ts.isTypeAliasDeclaration(node)) return ""

    const group = []

    if (ts.isIntersectionTypeNode(node.type) || ts.isUnionTypeNode(node.type)) {
      const type = checker.getTypeAtLocation(node.type)

      if (type.isLiteral()) {
        return checker.typeToString(type)
      }

      let separator = ""

      if (type.isUnion() || type.isIntersection()) {
        if (type.isUnion()) separator = "|"
        if (type.isIntersection()) separator = "&"

        for (const t of type.types) {
          group.push(checker.typeToString(t))
        }
      }

      return group.filter(Boolean).join(` ${separator} `)
    }

    // return checker.typeToString(type)

    // Flattens objects
    const obj = {}

    for (const property of type.getProperties()) {
      const propertyType = checker.getTypeOfSymbolAtLocation(property, node);
      const propertySymbol = propertyType.getSymbol();
      const propertyTypeName = checker.typeToString(propertyType);

      /**
      * If it's a local type belonging to our sources we are interested in
      * further analysis, so we process all properties again like we did for the current given property.
      */
      if(propertySymbol && this.__isTypeLocal(propertySymbol)) {
        const properties = this.__processProperty(propertyType, node, level + 1)

        obj[property.name] = properties
      }else {
        group.push(property.name)
        obj[property.name] = propertyTypeName
      }
    }

    return JSON.stringify(obj, null, 2)
  }
}

/**
 * @param {Object} options
 * @param {string[]} options.globs
 * @param {import("typescript") | null | undefined} [options.ts]
 * @param {import("typescript").Program | null | undefined} [options.program]
 */
export function expandTypesPlugin ({ globs, ts = null, program = null}) {
  return new ExpandTypes({ globs, ts, program })
}
