import { getIconPath, getKitCode } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

const FA_VERSION = '7.2.0';
const FREE_CDN_HOST = 'ka-f.fontawesome.com';
const PRO_CDN_HOST = 'ka-p.fontawesome.com';

let hasWarnedAboutProKitCode = false;

/** Returns the folder name used by Font Awesome for a given icon family and variant combination. */
export function getIconFolder(_name: string, family: string, variant: string) {
  let folder = 'solid';

  // Chisel (Pro+)
  if (family === 'chisel') {
    folder = 'chisel-regular';
  }

  // Etch (Pro+)
  if (family === 'etch') {
    folder = 'etch-solid';
  }

  // Graphite (Pro+)
  if (family === 'graphite') {
    folder = 'graphite-thin';
  }

  // Jelly (Pro+)
  // Correct usage: family="jelly", family="jelly-duo", or family="jelly-fill", variant="regular"
  if (family === 'jelly') {
    // NOTE: variant="duo-regular" and variant="fill-regular" are deprecated
    // Use family="jelly-duo" variant="regular" or family="jelly-fill" variant="regular" instead
    folder = 'jelly-regular';
    if (variant === 'duo-regular') folder = 'jelly-duo-regular';
    if (variant === 'fill-regular') folder = 'jelly-fill-regular';
  }
  if (family === 'jelly-duo') {
    folder = 'jelly-duo-regular';
  }
  if (family === 'jelly-fill') {
    folder = 'jelly-fill-regular';
  }

  // Notdog (Pro+)
  // Correct usage: family="notdog" or family="notdog-duo", variant="solid"
  if (family === 'notdog') {
    // NOTE: variant="duo-solid" is deprecated, use family="notdog-duo" variant="solid" instead
    if (variant === 'solid') folder = 'notdog-solid';
    if (variant === 'duo-solid') folder = 'notdog-duo-solid';
  }
  if (family === 'notdog-duo') {
    folder = 'notdog-duo-solid';
  }

  // Slab (Pro+)
  // Correct usage: family="slab" or family="slab-press", variant="regular"
  if (family === 'slab') {
    // NOTE: variant="press-regular" is deprecated, use family="slab-press" variant="regular" instead
    if (variant === 'solid' || variant === 'regular') folder = 'slab-regular';
    if (variant === 'press-regular') folder = 'slab-press-regular';
  }
  if (family === 'slab-press') {
    folder = 'slab-press-regular';
  }

  // Thumbprint (Pro+)
  if (family === 'thumbprint') {
    folder = 'thumbprint-light';
  }

  // Utility (Pro+)
  // Correct usage: family="utility", family="utility-duo", or family="utility-fill", variant="semibold"
  if (family === 'utility') {
    folder = 'utility-semibold';
  }
  if (family === 'utility-duo') {
    folder = 'utility-duo-semibold';
  }
  if (family === 'utility-fill') {
    folder = 'utility-fill-semibold';
  }

  // Whiteboard (Pro+)
  if (family === 'whiteboard') {
    folder = 'whiteboard-semibold';
  }

  // Classic
  if (family === 'classic') {
    if (variant === 'thin') folder = 'thin';
    if (variant === 'light') folder = 'light';
    if (variant === 'regular') folder = 'regular';
    if (variant === 'solid') folder = 'solid';
  }

  // Duotone
  if (family === 'duotone') {
    if (variant === 'thin') folder = 'duotone-thin';
    if (variant === 'light') folder = 'duotone-light';
    if (variant === 'regular') folder = 'duotone-regular';
    if (variant === 'solid') folder = 'duotone';
  }

  // Sharp
  if (family === 'sharp') {
    if (variant === 'thin') folder = 'sharp-thin';
    if (variant === 'light') folder = 'sharp-light';
    if (variant === 'regular') folder = 'sharp-regular';
    if (variant === 'solid') folder = 'sharp-solid';
  }

  // Sharp Duotone
  if (family === 'sharp-duotone') {
    if (variant === 'thin') folder = 'sharp-duotone-thin';
    if (variant === 'light') folder = 'sharp-duotone-light';
    if (variant === 'regular') folder = 'sharp-duotone-regular';
    if (variant === 'solid') folder = 'sharp-duotone-solid';
  }

  // Brands
  if (family === 'brands') {
    folder = 'brands';
  }

  return folder;
}

function getIconUrl(name: string, family: string, variant: string) {
  const folder = getIconFolder(name, family, variant);
  const iconBase = getIconPath();

  if (iconBase) {
    return `${iconBase}/${folder}/${name}.svg`;
  }

  const kitCode = getKitCode();
  const isPro = kitCode.length > 0;

  return isPro
    ? `https://${PRO_CDN_HOST}/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg?token=${encodeURIComponent(kitCode)}`
    : `https://${FREE_CDN_HOST}/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg`;
}

const library: IconLibrary = {
  name: 'default',
  resolver: (name: string, family = 'classic', variant = 'solid') => {
    return getIconUrl(name, family, variant);
  },
  onFetchError: (url, status, hostEl) => {
    // A 403 from the free Font Awesome CDN indicates a Pro icon was requested without a kit code. Requests made with a
    // kit code go to the Pro CDN, and self-hosted setups use a custom icon base, so this check skips those cases.
    if (hasWarnedAboutProKitCode) return;
    if (status !== 403) return;
    if (!url.includes(FREE_CDN_HOST)) return;

    hasWarnedAboutProKitCode = true;
    setTimeout(() => {
      console.warn(
        `A Font Awesome Pro icon was requested without a kit code (other icons may be affected). ` +
          `Add your kit code to load Pro icons via CDN. ` +
          `See https://webawesome.com/docs/#using-font-awesome-pro-and-pro for details.`,
        hostEl,
      );
    }, 500); // this helps the warning show BELOW the 403 errors so it's not buried when multiple icons are requested
  },
  mutator: (svg, hostEl) => {
    // Duotone families
    if (hostEl?.family && !svg.hasAttribute('data-duotone-initialized')) {
      const { family, variant } = hostEl;

      if (
        // Duotone
        family === 'duotone' ||
        // Sharp duotone
        family === 'sharp-duotone' ||
        // Notdog duo (correct usage: family="notdog-duo")
        family === 'notdog-duo' ||
        // NOTE: family="notdog" variant="duo-solid" is deprecated
        (family === 'notdog' && variant === 'duo-solid') ||
        // Jelly duo (correct usage: family="jelly-duo")
        family === 'jelly-duo' ||
        // NOTE: family="jelly" variant="duo-regular" is deprecated
        (family === 'jelly' && variant === 'duo-regular') ||
        // Utility duo (correct usage: family="utility-duo")
        family === 'utility-duo' ||
        // Thumbprint
        family === 'thumbprint'
      ) {
        // Identify the primary and secondary paths. The secondary path is the one that has an opacity attribute.
        const paths = [...svg.querySelectorAll<SVGPathElement>('path')];
        const primaryPath = paths.find(p => !p.hasAttribute('opacity'));
        const secondaryPath = paths.find(p => p.hasAttribute('opacity'));

        if (!primaryPath || !secondaryPath) return;

        primaryPath.setAttribute('data-duotone-primary', '');
        secondaryPath.setAttribute('data-duotone-secondary', '');

        // Swap the primary and secondary opacity using CSS custom properties
        if (hostEl.swapOpacity && primaryPath && secondaryPath) {
          const originalOpacity = secondaryPath.getAttribute('opacity') || '0.4';

          // Set path-specific opacity custom properties
          primaryPath.style.setProperty('--path-opacity', originalOpacity);
          secondaryPath.style.setProperty('--path-opacity', '1');
        }

        svg.setAttribute('data-duotone-initialized', '');
      }
    }
  },
};

export default library;
