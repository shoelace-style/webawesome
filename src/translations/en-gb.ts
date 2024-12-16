import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';
import baseTranslation from './en.js';

const translation: Translation = {
  ...baseTranslation,
  $code: 'en-GB',
  $name: 'English (United Kingdom)',

  selectAColorFromTheScreen: 'Select a colour from the screen',
  toggleColorFormat: 'Toggle colour format',
};

registerTranslation(translation);

export default translation;
