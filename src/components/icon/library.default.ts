import { getKitCode } from '../../utilities/base-path.js';
import type { IconLibrary } from './library.js';

type IconFamily = 'classic' | 'duotone' | 'sharp' | 'sharp-duotone';
type IconVariant = 'solid' | 'regular' | 'light' | 'thin' | 'brands';

type IconLookup = {
  [key in IconFamily]: Partial<Record<IconVariant, string>>;
};

const lookup: IconLookup = {
  classic: {
    solid: 'solid',
    regular: 'regular',
    light: 'light',
    thin: 'thin',
    brands: 'brands',
  },
  duotone: {
    solid: 'duotone',
    regular: 'duotone-regular',
    light: 'duotone-light',
    thin: 'duotone-thin',
  },
  sharp: {
    solid: 'sharp-solid',
    regular: 'sharp-regular',
    light: 'sharp-light',
    thin: 'sharp-thin',
  },
  'sharp-duotone': {
    solid: 'sharp-duotone-solid',
    regular: 'sharp-duotone-regular',
    light: 'sharp-duotone-light',
    thin: 'sharp-duotone-thin',
  },
};

const version = '6.7.2';

function getIconUrl(name: string, family: string, variant: string) {
  const kitCode = getKitCode();
  // TODO this is not a good indicator of if the Kit is pro
  const isPro = kitCode.length > 0;
  let folder = (lookup as Record<string, Record<string, string>>)?.[family]?.[variant] ?? 'solid';

  if (family === 'kit' || family === 'kit-duotone') {
    return `https://kit.fontawesome.com/${kitCode}/icons/${family}/custom/${name}.svg`;
  }

  return isPro
    ? `https://ka-p.fontawesome.com/releases/v${version}/svgs/${folder}/${name}.svg?token=${encodeURIComponent(kitCode)}`
    : `https://ka-f.fontawesome.com/releases/v${version}/svgs/${folder}/${name}.svg`;
}

const library: IconLibrary = {
  name: 'default',
  resolver: (name: string, family = 'classic', variant = 'solid') => {
    return getIconUrl(name, family, variant);
  },
};

export default library;
