import { getKitCode } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

function getIconUrl(name: string, family: string, variant: string) {
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

  // Brands
  if (family === 'brands') {
    folder = 'brands';
  }

  // Duotone
  if (family === 'duotone') {
    folder = 'duotone';
  }

  // Use the default CDN
  return isPro
    ? `https://ka-p.fontawesome.com/releases/v6.4.0/svgs/${folder}/${name}.svg?token=${encodeURIComponent(kitCode)}`
    : `https://ka-f.fontawesome.com/releases/v6.4.0/svgs/${folder}/${name}.svg`;
}

const library: IconLibrary = {
  name: 'default',
  resolver: (name: string, family = 'classic', variant = 'solid') => {
    return getIconUrl(name, family, variant);
  }
};

export default library;
