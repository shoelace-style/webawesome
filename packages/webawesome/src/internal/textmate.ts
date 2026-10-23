/*!
 * Portions of this file are derived from microlighter 2.2.0 (https://github.com/davatron5000/microlighter).
 *
 * MIT License
 *
 * Copyright (c) 2026 Dave Rupert
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * A TextMate tokenizer ported from microlighter. It works on a string and returns tokens instead of registering CSS
 * highlights, so each caller owns its ranges. Keep getCategory() in sync with upstream so the ::highlight() names stay
 * valid.
 */
import type { LoadedGrammars } from 'microlighter/grammar-dependencies.js';
import type { Grammar, GrammarCaptures, GrammarRule } from 'microlighter/grammar.js';

export interface Token {
  start: number;
  end: number;
  category: string;
}

// Start and end offsets per capture group. The d flag provides these.
type MatchIndices = Array<[number, number] | undefined> & { 0: [number, number] };
type MatchOffsets = { indices: MatchIndices };
type Match = RegExpExecArray & MatchOffsets;
type RuleContext = { grammar: Grammar; rule: GrammarRule };

const noMatch = { indices: [[Infinity, Infinity]] } as unknown as MatchOffsets;

/** Flattens a TextMate scope to a stable semantic highlight category. */
export const getCategory = (scope: string): string | undefined => {
  const parts = scope.split('.');
  const [first, second, third] = parts;
  const last = parts[parts.length - 1];

  if (first === 'markup' && ['quote', 'inserted', 'deleted', 'raw'].includes(second)) return second;
  if (first === 'entity' && second === 'name') return third;
  if (scope.startsWith('constant.character.entity')) return 'character-entity';
  if (parts.includes('numeric')) return 'numeric';
  if (scope.startsWith('support.type.property-name')) return 'property';
  if (parts.includes('attribute-value')) return 'attribute-value';
  if (scope.startsWith('string.other.link')) return 'link';

  if (['doctype', 'at-rule', 'important', 'regexp', 'boolean', 'symbol', 'operator', 'attribute-name'].includes(last))
    return last;

  if (
    ['comment', 'string', 'constant', 'storage', 'keyword', 'variable', 'punctuation', 'entity', 'support'].includes(
      first,
    )
  )
    return first;

  return undefined;
};

/** Escapes text before inserting it into a regular expression. */
const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Replaces TextMate end-pattern backreferences with escaped begin captures. */
const expandEnd = (pattern: string, beginMatch: Match) =>
  pattern.replace(/\\(\d+)/g, (reference, index: string) => {
    return beginMatch[+index] === undefined ? reference : escapeRegex(beginMatch[+index]);
  });

/** Normalizes a grammar rule or repository entry to a rule array. */
const getRules = (rule: GrammarRule | GrammarRule[] | { patterns: GrammarRule[] } | undefined): GrammarRule[] => {
  if (!rule) return [];
  if (Array.isArray(rule)) return rule;

  const single = rule as GrammarRule;
  if (single.match || single.begin || single.include) return [single];
  return rule.patterns || [];
};

/** Tokenizes text with a TextMate grammar. Grammars it includes by scope are looked up in the loaded set. */
export function tokenize(text: string, grammar: Grammar, grammars: LoadedGrammars): Token[] {
  const tokens: Token[] = [];
  const regexes = new Map<string, RegExp>();
  const matches = new Map<string, MatchOffsets>();

  const addRange = (start: number, end: number, scope: string) => {
    const category = getCategory(scope);
    if (!category || start === end) return;
    tokens.push({ start, end, category });
  };

  const addCaptures = (match: Match, captures: GrammarCaptures = {}) => {
    Object.entries(captures).forEach(([index, capture]) => {
      const offsets = match.indices[+index];
      if (offsets) addRange(offsets[0], offsets[1], capture.name);
    });
  };

  // Finds the next bounded match, reusing compiled expressions and the memoized match for each pattern
  const exec = (pattern: string, start: number, end: number): Match | null => {
    let match = matches.get(pattern);

    if (!match || match.indices[0][0] < start) {
      if (!regexes.has(pattern)) regexes.set(pattern, new RegExp(pattern, 'dgm'));
      const regex = regexes.get(pattern)!;
      regex.lastIndex = start;
      match = (regex.exec(text) as Match | null) || noMatch;
      matches.set(pattern, match);
    }

    return match.indices[0][0] < end && match.indices[0][1] <= end ? (match as Match) : null;
  };

  // Resolves local, base, and external include references
  const resolveInclude = (include: string, current: Grammar, baseGrammar: Grammar) => {
    if (include === '$self') return { grammar: current, rules: current.patterns };
    if (include === '$base') return { grammar: baseGrammar, rules: baseGrammar.patterns };

    if (include[0] === '#') {
      return { grammar: current, rules: getRules(current.repository?.[include.slice(1)]) };
    }

    const [scopeName, repositoryName] = include.split('#');
    const includedGrammar = grammars.scopes.get(scopeName);
    if (!includedGrammar) return null;

    return {
      grammar: includedGrammar,
      rules: repositoryName ? getRules(includedGrammar.repository?.[repositoryName]) : includedGrammar.patterns,
    };
  };

  // Expands include rules into directly matchable rule contexts
  const expandRules = (
    rules: GrammarRule[],
    current: Grammar,
    baseGrammar: Grammar,
    activeIncludes = new Set<string>(),
  ): RuleContext[] => {
    const expanded: RuleContext[] = [];

    rules.forEach(rule => {
      if (rule.include) {
        const includeKey = `${current.scopeName}:${rule.include}`;
        if (activeIncludes.has(includeKey)) return;

        const included = resolveInclude(rule.include, current, baseGrammar);
        if (!included) return;

        const nestedIncludes = new Set(activeIncludes);
        nestedIncludes.add(includeKey);
        expanded.push(...expandRules(included.rules, included.grammar, baseGrammar, nestedIncludes));
        return;
      }

      if (rule.match || (rule.begin && rule.end)) expanded.push({ grammar: current, rule });
    });

    return expanded;
  };

  // Selects the rule with the earliest match in a region
  const nextRule = (contexts: RuleContext[], start: number, end: number) => {
    let winner: (RuleContext & { match: Match }) | null = null;

    contexts.forEach(context => {
      const pattern = (context.rule.match || context.rule.begin) as string;
      const match = exec(pattern, start, end);
      if (!match) return;

      if (!winner || match.indices[0][0] < winner.match.indices[0][0]) {
        winner = { ...context, match };
      }
    });

    return winner as (RuleContext & { match: Match }) | null;
  };

  // Scans a bounded region, recursively handling begin/end rule pairs
  const scanRegion = (
    rules: GrammarRule[],
    start: number,
    end: number,
    current: Grammar,
    baseGrammar: Grammar = current,
    closing: { pattern: string; applyEndPatternLast?: boolean } | null = null,
  ): { contentEnd: number; end: number; match: Match | null } => {
    const contexts = expandRules(rules, current, baseGrammar);
    let cursor = start;

    while (cursor < end) {
      const candidate = nextRule(contexts, cursor, end);
      const endMatch = closing ? exec(closing.pattern, cursor, end) : null;
      const candidateStart = candidate?.match.indices[0][0] ?? Infinity;
      const endStart = endMatch?.indices[0][0] ?? Infinity;

      if (endMatch && (endStart < candidateStart || (endStart === candidateStart && !closing?.applyEndPatternLast))) {
        return { contentEnd: endStart, end: endMatch.indices[0][1], match: endMatch };
      }

      if (!candidate) return { contentEnd: end, end, match: null };

      const { rule, match, grammar: ruleGrammar } = candidate;
      if (rule.match) {
        if (rule.name) addRange(match.indices[0][0], match.indices[0][1], rule.name);
        addCaptures(match, rule.captures);
        cursor = match.indices[0][1] > cursor ? match.indices[0][1] : cursor + 1;
        continue;
      }

      const nested = scanRegion(rule.patterns || [], match.indices[0][1], end, ruleGrammar, baseGrammar, {
        pattern: expandEnd(rule.end as string, match),
        applyEndPatternLast: rule.applyEndPatternLast,
      });

      if (rule.name) addRange(match.indices[0][0], nested.end, rule.name);
      if (rule.contentName) addRange(match.indices[0][1], nested.contentEnd, rule.contentName);
      addCaptures(match, rule.beginCaptures || rule.captures);
      if (nested.match) addCaptures(nested.match, rule.endCaptures || rule.captures);

      cursor = nested.end > cursor ? nested.end : cursor + 1;
    }

    return { contentEnd: end, end, match: null };
  };

  scanRegion(grammar.patterns, 0, text.length, grammar);

  return tokens;
}
