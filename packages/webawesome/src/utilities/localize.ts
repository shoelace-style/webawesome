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

  lang () {
    // @ts-expect-error
    if (this.host.didSSR && !this.host.hasUpdated)  {
      // On the server and on first hydration we can't rely on the document language (right now)
      // TODO: We should write a custom renderer that can understand a lang tree.
      return this.host.lang || "en"
    }

    return super.lang()
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
  // Date picker (optional so existing locales don't need updates; falls back to English)
  chooseDate?: string;
  chooseMonth?: string;
  chooseYear?: string;
  chooseDecade?: string;
  clearEntry: string;
  close: string;
  closeCalendar?: string;
  createOption: (value: string) => string;
  copied: string;
  copy: string;
  currentValue: string;
  date?: string;
  datePickerKeyboardHelp?: string;
  day?: string;
  // Date input
  incompleteDate?: string;
  dropFileHere: string;
  decrement: string;
  dropFilesHere: string;
  empty?: string;
  endDate?: string;
  enterFullscreen: string;
  error: string;
  exitFullscreen: string;
  goToSlide: (slide: number, count: number) => string;
  hidePassword: string;
  increment: string;
  loading: string;
  month?: string;
  moreOptions: string;
  mute: string;
  nextDecade?: string;
  nextMonth?: string;
  nextSlide: string;
  nextVideo: string;
  nextYear?: string;
  numCharacters: (num: number) => string;
  numCharactersRemaining: (num: number) => string;
  numOptionsSelected: (num: number) => string;
  pause: string;
  pauseAnimation: string;
  pictureInPicture: string;
  play: string;
  playAnimation: string;
  playbackSpeed: string;
  playlist: string;
  previousDecade?: string;
  previousMonth?: string;
  previousSlide: string;
  previousVideo: string;
  previousYear?: string;
  progress: string;
  rangeTooLong?: (max: number) => string;
  rangeTooShort?: (min: number) => string;
  readonly?: string;
  selected?: string;
  selectedDateLabel?: (date: string) => string;
  selectedRangeLabel?: (range: string) => string;
  selectionCleared?: string;
  remove: string;
  resize: string;
  scrollableRegion: string;
  scrollToEnd: string;
  scrollToStart: string;
  selectAColorFromTheScreen: string;
  showPassword: string;
  slideNum: (slide: number) => string;
  startDate?: string;
  today?: string;
  toggleColorFormat: string;
  seek: string;
  seekProgress: (current: string, duration: string) => string;
  currentlyPlaying: string;
  unmute: string;
  videoPlayer: string;
  volume: string;
  year?: string;
  zoomIn: string;
  zoomOut: string;
  // Time input (optional so existing locales don't need updates; falls back to English)
  am?: string;
  chooseTime?: string;
  closeTimeInput?: string;
  dayPeriod?: string;
  hour?: string;
  minute?: string;
  now?: string;
  pm?: string;
  second?: string;
  time?: string;
  timeInputKeyboardHelp?: string;
}
