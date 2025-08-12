import { getKitCode } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

const FA_VERSION = '7.0.0';

function getIconUrl(name: string, family: string, variant: string, autoWidth: boolean) {
  const basePath = autoWidth ? 'svgs' : 'svgs-full';
  const kitCode = getKitCode();
  const isPro = kitCode.length > 0;
  let folder = 'solid';

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
    ? `https://ka-p.fontawesome.com/releases/v${FA_VERSION}/${basePath}/${folder}/${name}.svg?token=${encodeURIComponent(kitCode)}`
    : `https://ka-f.fontawesome.com/releases/v${FA_VERSION}/${basePath}/${folder}/${name}.svg`;
}

const library: IconLibrary = {
  name: 'default',
  resolver: (name: string, family = 'classic', variant = 'solid', autoWidth = false) => {
    return getIconUrl(name, family, variant, autoWidth);
  },
  mutator: (svg, hostEl) => {
    if (hostEl?.family === 'duotone' && !svg.hasAttribute('data-duotone-initialized')) {
      // Identify the primary and secondary paths. The secondary path is the one that has an opacity attribute.
      const paths = [...svg.querySelectorAll<SVGPathElement>('path')];
      const primaryPath = paths.find(p => !p.hasAttribute('opacity'));
      const secondaryPath = paths.find(p => p.hasAttribute('opacity'));

      primaryPath?.setAttribute('data-duotone-primary', '');
      secondaryPath?.setAttribute('data-duotone-secondary', '');

      // Swap the primary and secondary opacity using CSS custom properties
      if (hostEl.swapOpacity && primaryPath && secondaryPath) {
        const originalOpacity = secondaryPath.getAttribute('opacity') || '0.4';

        // Set path-specific opacity custom properties
        primaryPath.style.setProperty('--path-opacity', originalOpacity);
        secondaryPath.style.setProperty('--path-opacity', '1');
      }

      svg.setAttribute('data-duotone-initialized', '');
    }
  },
};

export default library;
