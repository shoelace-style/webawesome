import { createGrammarLoader, type LoadedGrammars } from 'microlighter/grammar-dependencies.js';
import type { Grammar } from 'microlighter/grammar.js';
import { getBasePath } from '../../utilities/base-path.js';
import type WaCodeHighlighter from './code-highlighter.js';

export type { Grammar, LoadedGrammars };

// Registered grammars, including the ones the component ships with. The component registers those, not this module,
// so importing registerCodeGrammar() from the library entry doesn't pull them in.
const registry = new Map<string, Grammar>();
const watchedHighlighters = new Set<WaCodeHighlighter>();

/** Resolves a grammar from the registry or, failing that, from the base path. */
function importGrammar(name: string): Promise<Grammar | null> {
  const grammar = registry.get(name);

  if (grammar) {
    return Promise.resolve(grammar);
  }

  // The loader only passes names matching [a-z0-9_-], so the path needs no escaping
  return import(/* @vite-ignore */ getBasePath(`assets/grammars/${name}.js`))
    .then((module: { default?: Grammar }) => module.default ?? null)
    .catch(() => null);
}

// The loader caches results, including misses, so it's replaced whenever a grammar is registered
let loader = createGrammarLoader(importGrammar);

/** @internal Adds grammars that ship with the component, without overriding registered ones. */
export function preloadCodeGrammars(grammars: Record<string, Grammar>) {
  for (const [name, grammar] of Object.entries(grammars)) {
    if (!registry.has(name)) {
      registry.set(name, grammar);
    }
  }
}

/** Adds a code highlighter to the list of watched highlighters. */
export function watchCodeHighlighter(highlighter: WaCodeHighlighter) {
  watchedHighlighters.add(highlighter);
}

/** Removes a code highlighter from the list of watched highlighters. */
export function unwatchCodeHighlighter(highlighter: WaCodeHighlighter) {
  watchedHighlighters.delete(highlighter);
}

/** Loads the grammars for the given normalized language names, plus the grammars they include. */
export function loadCodeGrammars(languages: string[]): Promise<LoadedGrammars> {
  return loader(languages);
}

/**
 * Registers a TextMate grammar for `<wa-code-highlighter>`, or overrides a built-in one. Names may contain lowercase
 * letters, numbers, hyphens, and underscores. Highlighters already using the language update right away.
 */
export function registerCodeGrammar(name: string, grammar: Grammar) {
  const language = name.toLowerCase();

  registry.set(language, grammar);
  loader = createGrammarLoader(importGrammar);

  watchedHighlighters.forEach(highlighter => {
    if (highlighter.grammarName === language) {
      highlighter.ensureGrammar();
    }
  });
}
