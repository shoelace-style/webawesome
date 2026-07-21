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

  lang() {
    // @ts-expect-error
    if (this.host.didSSR && !this.host.hasUpdated) {
      // On the server and on first hydration we can't rely on the document language (right now)
      // TODO: We should write a custom renderer that can understand a lang tree.
      return this.host.lang || 'en';
    }

    return super.lang();
  }
}

// Export functions from the localize lib so we have one central place to import them from
export { registerTranslation } from '@shoelace-style/localize';

export interface Translation extends DefaultTranslation {
  $code: string; // e.g. en, en-GB
  $name: string; // e.g. English, Español
  $dir: 'ltr' | 'rtl';

  am: string;
  autosizeColumn: string;
  captions: string;
  carousel: string;
  chooseDate: string;
  chooseDecade: string;
  chooseMonth: string;
  chooseTime: string;
  chooseYear: string;
  clearEntry: string;
  clearFilter?: string;
  clearSort: string;
  close: string;
  closeCalendar: string;
  closeTimeInput: string;
  collapseRow: string;
  columnMenu: string;
  columnMovedToPosition: (label: string, position: number, total: number) => string;
  columns: string;
  compactPageXOfY: (page: number, total: number) => string;
  copied: string;
  copy: string;
  createOption: (value: string) => string;
  currentlyPlaying: string;
  currentValue: string;
  date: string;
  datePickerKeyboardHelp: string;
  day: string;
  dayPeriod: string;
  decrement: string;
  deselectAllRows: string;
  dropFileHere: string;
  dropFilesHere: string;
  empty: string;
  endDate: string;
  enterFullscreen: string;
  error: string;
  exitFullscreen: string;
  expandRow: string;
  filterByColumn: (label: string) => string;
  filterFrom: string;
  filterMax: string;
  filterMin: string;
  filterTo: string;
  firstPage: string;
  goToSlide: (slide: number, count: number) => string;
  hideColumn: string;
  hidePassword: string;
  hour: string;
  incompleteDate: string;
  increment: string;
  jumpBackwardX: (count: number) => string;
  jumpForwardX: (count: number) => string;
  lastPage: string;
  loading: string;
  minute: string;
  month: string;
  moreOptions: string;
  mute: string;
  nextDecade: string;
  nextMonth: string;
  nextPage: string;
  nextSlide: string;
  nextVideo: string;
  nextYear: string;
  noData: string;
  now: string;
  numCharacters: (num: number) => string;
  numCharactersRemaining: (num: number) => string;
  numOptionsSelected: (num: number) => string;
  numRowsCopied: (num: number) => string;
  numRowsSelected: (num: number) => string;
  pageXOfY: (page: number, total: number) => string;
  pagination: string;
  pause: string;
  pauseAnimation: string;
  pictureInPicture: string;
  pinLeft: string;
  pinRight: string;
  play: string;
  playAnimation: string;
  playbackSpeed: string;
  playlist: string;
  pm: string;
  previousDecade: string;
  previousMonth: string;
  previousPage: string;
  previousSlide: string;
  previousVideo: string;
  previousYear: string;
  progress: string;
  rangeTooLong: (max: number) => string;
  rangeTooShort: (min: number) => string;
  readonly: string;
  remove: string;
  resize: string;
  resizeColumn: string;
  rowsPerPage: string;
  scrollableRegion: string;
  scrollToEnd: string;
  scrollToStart: string;
  search: string;
  second: string;
  seek: string;
  seekProgress: (current: string, duration: string) => string;
  selectAColorFromTheScreen: string;
  selectAllRows: string;
  selected: string;
  selectedDateLabel: (date: string) => string;
  selectedRangeLabel: (range: string) => string;
  selectGroup: string;
  selectionCleared: string;
  selectRow: string;
  showingNofMRows: (shown: number, total: number) => string;
  showingXtoYofZ: (start: number, end: number, total: number) => string;
  showPassword: string;
  slideNum: (slide: number) => string;
  sortAscending: string;
  sortColumn: string;
  sortDescending: string;
  startDate: string;
  time: string;
  timeInputKeyboardHelp: string;
  today: string;
  toggleColorFormat: string;
  unmute: string;
  unpin: string;
  unpinColumn: string;
  videoPlayer: string;
  volume: string;
  year: string;
  zoomIn: string;
  zoomOut: string;
}
