/** Canonical size values. */
export type Size = 'xs' | 's' | 'm' | 'l' | 'xl';

/** Deprecated long-form size aliases. */
export type DeprecatedSize = 'small' | 'medium' | 'large';

/** All accepted size values (canonical + deprecated). */
export type SizeWithDeprecated = Size | DeprecatedSize;

const DEPRECATION_MAP: Record<DeprecatedSize, Size> = {
  small: 's',
  medium: 'm',
  large: 'l',
};

/** Normalizes a size value, mapping deprecated long forms to short forms. Returns the value unchanged if already canonical. */
export function normalizeSize(size: SizeWithDeprecated): Size {
  return (DEPRECATION_MAP as Record<string, Size>)[size] ?? (size as Size);
}

const warned = new Set<string>();

/** Emits a one-time console warning for deprecated size values. */
export function warnDeprecatedSize(tagName: string, value: string): void {
  if (value in DEPRECATION_MAP && !warned.has(`${tagName}:${value}`)) {
    warned.add(`${tagName}:${value}`);
    console.warn(
      `[${tagName}] size="${value}" is deprecated. Use size="${DEPRECATION_MAP[value as DeprecatedSize]}" instead. ` +
        `The long-form value will be removed in the next major version.`,
    );
  }
}
