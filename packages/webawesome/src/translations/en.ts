import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  carousel: 'Carousel',
  clearEntry: 'Clear entry',
  close: 'Close',
  createOption: value => `Create "${value}"`,
  copied: 'Copied',
  copy: 'Copy',
  currentValue: 'Current value',
  dropFileHere: 'Drop file here or click to browse',
  decrement: 'Decrement',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Error',
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: 'Hide password',
  increment: 'Increment',
  loading: 'Loading',
  nextSlide: 'Next slide',
  numCharacters: num => {
    if (num === 1) return '1 character';
    return `${num} characters`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 character remaining';
    return `${num} characters remaining`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'No options selected';
    if (num === 1) return '1 option selected';
    return `${num} options selected`;
  },
  pauseAnimation: 'Pause animation',
  playAnimation: 'Play animation',
  previousSlide: 'Previous slide',
  progress: 'Progress',
  remove: 'Remove',
  resize: 'Resize',
  scrollableRegion: 'Scrollable region',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select a color from the screen',
  showPassword: 'Show password',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Toggle color format',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
};

registerTranslation(translation);

export default translation;
