import { getKitCode } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

const FA_VERSION = '7.1.0';

function getIconUrl(name: string, family: string, variant: string) {
  const kitCode = getKitCode();
  const isPro = kitCode.length > 0;
  let folder = 'solid';

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

  // Chisel (Pro+)
  if (family === 'chisel') {
    folder = 'chisel-regular';
  }

  // Etch (Pro+)
  if (family === 'etch') {
    folder = 'etch-solid';
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

  // Whiteboard (Pro+)
  if (family === 'whiteboard') {
    folder = 'whiteboard-semibold';
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

  // Classic
  if (family === 'classic') {
    if (variant === 'thin') folder = 'thin';
    if (variant === 'light') folder = 'light';
    if (variant === 'regular') folder = 'regular';
    if (variant === 'solid') folder = 'solid';
  }

  // Sharp
  if (family === 'sharp') {
    if (variant === 'thin') folder = 'sharp-thin';
    if (variant === 'light') folder = 'sharp-light';
    if (variant === 'regular') folder = 'sharp-regular';
    if (variant === 'solid') folder = 'sharp-solid';
  }

  // Duotone
  if (family === 'duotone') {
    if (variant === 'thin') folder = 'duotone-thin';
    if (variant === 'light') folder = 'duotone-light';
    if (variant === 'regular') folder = 'duotone-regular';
    if (variant === 'solid') folder = 'duotone';
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

  // Use the default CDN
  return isPro
    ? `https://ka-p.fontawesome.com/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg?token=${encodeURIComponent(kitCode)}`
    : `https://ka-f.fontawesome.com/releases/v${FA_VERSION}/svgs/${folder}/${name}.svg`;
}

const library: IconLibrary = {
  name: 'default',
  resolver: (name: string, family = 'classic', variant = 'solid') => {
    return getIconUrl(name, family, variant);
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
