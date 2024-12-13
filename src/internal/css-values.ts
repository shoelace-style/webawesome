import { getComputedStyle } from './computedStyle.js';

const definedProperties = new Set();
const initialValues: Record<string, string> = {
  length: '0px',
  time: '0s',
  angle: '0deg',
  color: 'transparent'
};

interface ResolveOptions {
  on?: HTMLElement | SVGElement;
  as?: string;
  initialValue?: string;
}

export function resolve(
  value: string,
  { on = document.documentElement, as = 'length', initialValue = initialValues[as] }: ResolveOptions = {}
) {
  const resolver = `--wa-${as}-resolver`;

  if (!window.CSS || !CSS.registerProperty) {
    return value;
  }

  if (!definedProperties.has(resolver)) {
    CSS.registerProperty({
      name: resolver,
      syntax: `<${as}>`,
      inherits: false,
      initialValue
    });

    definedProperties.add(resolver);
  }

  const previousValue = on.style.getPropertyValue(resolver);
  on.style.setProperty(resolver, value);
  const ret = getComputedStyle(on)?.getPropertyValue(resolver);
  on.style.setProperty(resolver, previousValue);

  return ret ?? value;
}

export function toPx(value: string | number, element: HTMLElement | SVGElement = document.documentElement): number {
  if (!Number.isNaN(Number(value))) {
    // Number of string containing a pure number
    return Number(value);
  }

  const resolved = resolve(value as string, { on: element });

  if (resolved?.endsWith('px')) {
    return parseFloat(resolved);
  }

  return Number(resolved);
}

export function toLength(px: number | string): string {
  return Number.isNaN(Number(px)) ? (px as string) : `${px}px`;
}
