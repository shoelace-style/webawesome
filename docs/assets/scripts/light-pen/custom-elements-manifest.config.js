// @ts-check
// import { expandTypesPlugin } from './expand-types.js'

const globs = ['exports/**/*.{d.ts,js}', 'internal/**/*.{d.ts,js}', 'types/**/*.d.ts']

export default {
  /** Globs to analyze */
  globs,
  /** Globs to exclude */
  exclude: ['node_modules', 'docs'],
  /** Directory to output CEM to */
  outdir: '.',
  /** Run in dev mode, provides extra logging */
  dev: process.argv.includes("--verbose"),
  /** Run in watch mode, runs on file changes */
  watch: process.argv.includes("--watch"),
  /** Include third party custom elements manifests */
  dependencies: true,
  /** Output CEM path to `package.json`, defaults to true */
  packagejson: true,
  /** Enable special handling for litelement */
  litelement: true,
  /** Enable special handling for catalyst */
  catalyst: false,
  /** Enable special handling for fast */
  fast: false,
  /** Enable special handling for stencil */
  stencil: false,
  // overrideModuleCreation: ({ts, globs}) => {
  //   const program = ts.createProgram(globs, {target: ts.ScriptTarget.ESNext, module: ts.ModuleKind.ESNext, allowJs: true, checkJs: true});
  //
  //   // If we dont do this, everything blows up.
  //   program.getTypeChecker()
  //
  //   return program.getSourceFiles().filter(sf => globs.find(glob => {
  //     return sf.fileName.includes(glob)
  //   }))
  // },
  // /** Provide custom plugins */
  // plugins: [
  //   /** You can now pass the typeChecker to your plugins */
  //   expandTypesPlugin({ globs })
  // ],
}
