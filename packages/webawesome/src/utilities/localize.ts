import type { Translation as DefaultTranslation } from '@shoelace-style/localize';
import { LocalizeController as DefaultLocalizationController, registerTranslation } from '@shoelace-style/localize';
import en from '../translations/en.js'; // Register English as the default/fallback language

// Extend the controller and apply our own translation interface for better typings
export class LocalizeController extends DefaultLocalizationController<Translation> {
  // Technically '../translations/en.js' is supposed to work via side-effects. However, by some mystery sometimes the
  // translations don't get bundled as expected resulting in `no translation found` errors. This is basically some extra
  // assurance that our translations get registered prior to our localizer connecting in a component and we don't rely
  // on implicit import ordering.
  static {
    registerTranslation(en);
  }
}

// Export functions from the localize lib so we have one central place to import them from
export { registerTranslation } from '@shoelace-style/localize';

export interface Translation extends DefaultTranslation {
  $code: string; // e.g. en, en-GB
  $name: string; // e.g. English, Español
  $dir: 'ltr' | 'rtl';

  carousel: string;
  captions: string;
  clearEntry: string;
  close: string;
  createOption: (value: string) => string;
  copied: string;
  copy: string;
  currentValue: string;
  dropFileHere: string;
  decrement: string;
  dropFilesHere: string;
  enterFullscreen: string;
  error: string;
  exitFullscreen: string;
  goToSlide: (slide: number, count: number) => string;
  hidePassword: string;
  increment: string;
  loading: string;
  moreOptions: string;
  mute: string;
  nextSlide: string;
  nextVideo: string;
  numOptionsSelected: (num: number) => string;
  pause: string;
  pauseAnimation: string;
  pictureInPicture: string;
  play: string;
  playAnimation: string;
  playbackSpeed: string;
  playlist: string;
  previousSlide: string;
  previousVideo: string;
  progress: string;
  remove: string;
  resize: string;
  scrollableRegion: string;
  scrollToEnd: string;
  scrollToStart: string;
  selectAColorFromTheScreen: string;
  showPassword: string;
  slideNum: (slide: number) => string;
  toggleColorFormat: string;
  seek: string;
  seekProgress: (current: string, duration: string) => string;
  currentlyPlaying: string;
  unmute: string;
  videoPlayer: string;
  volume: string;
  zoomIn: string;
  zoomOut: string;
}
