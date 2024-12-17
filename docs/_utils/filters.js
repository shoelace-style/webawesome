import { parse } from 'path';

export function stripExtension(string) {
  return parse(string).name;
}

export function stripPrefix(content) {
  return content.replace(/^wa-/, '');
}

// Trims whitespace and pipes from the start and end of a string. Useful for CEM types, which can be pipe-delimited.
// With Prettier 3, this means a leading pipe will exist be present when the line wraps.
export function trimPipes(content) {
  return typeof content === 'string' ? content.replace(/^(\s|\|)/g, '').replace(/(\s|\|)$/g, '') : content;
}

export function keys(obj) {
  return Object.keys(obj);
}

export function log(firstArg, ...rest) {
  console.log(firstArg, ...rest);
  return firstArg;
}
