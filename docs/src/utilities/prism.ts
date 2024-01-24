import Prism from 'prismjs';
import PrismLoader from 'prismjs/components/index.js';

PrismLoader('diff');
PrismLoader.silent = true;

export function highlight(language: string, code: string) {
  const alias = language.replace(/^diff-/, '');
  const isDiff = /^diff-/i.test(language);
  if (!Prism.languages[alias]) {
    PrismLoader(alias);
    if (!Prism.languages[alias]) {
      throw new Error(`Unsupported language for code highlighting: "${language}"`);
    }
  }
  if (isDiff) {
    Prism.languages[language] = Prism.languages.diff;
  }
  return Prism.highlight(code, Prism.languages[language], language);
}
