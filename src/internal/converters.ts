import type { ComplexAttributeConverter } from 'lit';

export const setConverter: ComplexAttributeConverter<Set<string> | null, Set<string> | null> = {
  fromAttribute(value): Set<string> | null {
    if (value === null) {
      return null;
    }

    return new Set(value.split(/\s+/));
  },
  toAttribute: value => {
    if (value === null) {
      return null;
    }

    return [...(value as Set<string>)].join(' ');
  },
};
