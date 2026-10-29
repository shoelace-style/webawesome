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

  alignCenter: string;
  alignEnd: string;
  alignJustify: string;
  alignment: string;
  alignStart: string;
  allTagsRemoved: string;
  alternativeText: string;
  am: string;
  apply: string;
  autosizeColumn: string;
  blockquote: string;
  bold: string;
  bulletList: string;
  caption: string;
  captions: string;
  carousel: string;
  chooseDate: string;
  chooseDecade: string;
  chooseMonth: string;
  chooseTime: string;
  chooseYear: string;
  clearEntry: string;
  clearFilter: string;
  clearFormatting: string;
  clearSort: string;
  close: string;
  closeCalendar: string;
  closeTimeInput: string;
  code: string;
  codeBlock: string;
  collapseRow: string;
  colorBlue: string;
  colorGray: string;
  colorGreen: string;
  colorOrange: string;
  colorPink: string;
  colorPurple: string;
  colorRed: string;
  colorYellow: string;
  columnMenu: string;
  columnMovedToPosition: (label: string, position: number, total: number) => string;
  columns: string;
  compactPageXOfY: (page: number, total: number) => string;
  completed: string;
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
  deleteColumn: string;
  deleteRow: string;
  deleteTable: string;
  deselectAllRows: string;
  disabled: string;
  dropFileHere: string;
  dropFilesHere: string;
  editEmbed: string;
  editImage: string;
  editLink: string;
  embed: string;
  embedPlaceholder: string;
  embedRemoved: string;
  embedUrl: string;
  empty: string;
  endDate: string;
  enterAtLeastNumCharacters: (min: number) => string;
  enterFullscreen: string;
  enterUpToNumCharacters: (max: number) => string;
  error: string;
  exitFullscreen: string;
  expandRow: string;
  filterByColumn: (label: string) => string;
  filterFrom: string;
  filterMax: string;
  filterMin: string;
  filterTo: string;
  firstPage: string;
  formatMenu: string;
  formatting: string;
  goToSlide: (slide: number, count: number) => string;
  heading: string;
  headingLevel: (level: number) => string;
  hideColumn: string;
  hidePassword: string;
  highlight: string;
  highlightColor: string;
  horizontalRule: string;
  hour: string;
  image: string;
  imageRemoved: string;
  imageUrl: string;
  incompleteDate: string;
  increment: string;
  indent: string;
  insertColumnAfter: string;
  insertColumnBefore: string;
  insertEmbed: string;
  insertImage: string;
  insertLink: string;
  insertRowAbove: string;
  insertRowBelow: string;
  insertTable: string;
  insertTableOfSize: (rows: number, columns: number) => string;
  italic: string;
  jumpBackwardX: (count: number) => string;
  jumpForwardX: (count: number) => string;
  keyAlt: string;
  keyCtrl: string;
  keyShift: string;
  lastPage: string;
  link: string;
  linkRemoved: string;
  linkUrl: string;
  lists: string;
  loading: string;
  locked: string;
  mergeCells: string;
  minute: string;
  month: string;
  moreOptions: string;
  moveColumnAfter: string;
  moveColumnBefore: string;
  moveRowDown: string;
  moveRowUp: string;
  mute: string;
  nextDecade: string;
  nextMonth: string;
  nextPage: string;
  nextSlide: string;
  nextVideo: string;
  nextYear: string;
  noData: string;
  noOptions: string;
  noResults: string;
  noSuggestions: string;
  notCompleted: string;
  now: string;
  numCharacters: (num: number) => string;
  numCharactersRemaining: (num: number) => string;
  numOptionsAvailable: (num: number) => string;
  numOptionsSelected: (num: number) => string;
  numRowsCopied: (num: number) => string;
  numRowsSelected: (num: number) => string;
  openInNewTab: string;
  openLink: string;
  optionPosition: (label: string, position: number, total: number) => string;
  optionsLoadError: string;
  orderedList: string;
  outdent: string;
  pageXOfY: (page: number, total: number) => string;
  pagination: string;
  paragraph: string;
  pasteAsPlainText: string;
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
  redo: string;
  remove: string;
  removeColors: string;
  removeLink: string;
  resetColumns: string;
  resize: string;
  resizeColumn: string;
  rowsAndColumns: (rows: number, columns: number) => string;
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
  selectCell: string;
  selected: string;
  selectedDateLabel: (date: string) => string;
  selectedRangeLabel: (range: string) => string;
  selectGroup: string;
  selectionCleared: string;
  selectRow: string;
  selectTable: string;
  showingNofMRows: (shown: number, total: number) => string;
  showingXtoYofZ: (start: number, end: number, total: number) => string;
  showPassword: string;
  slideNum: (slide: number) => string;
  sortAscending: string;
  sortColumn: string;
  sortDescending: string;
  splitCell: string;
  startDate: string;
  steps: string;
  stepXOfY: (step: number, total: number) => string;
  strikethrough: string;
  subscript: string;
  suggestions: string;
  suggestionsAvailable: (count: number) => string;
  suggestionsLoadError: string;
  superscript: string;
  tableInserted: string;
  tableOptions: string;
  tableSize: string;
  tagAdded: (tag: string) => string;
  tagAlreadyAdded: (tag: string) => string;
  tagInputKeyboardHelp: string;
  tagRemoved: (tag: string) => string;
  textColor: string;
  textStyle: string;
  time: string;
  timeInputKeyboardHelp: string;
  title: string;
  today: string;
  toggleColorFormat: string;
  toggleHeaderColumn: string;
  toggleHeaderRow: string;
  tooFewTags: (min: number) => string;
  tooManyTags: (max: number) => string;
  underline: string;
  undo: string;
  unmute: string;
  unpin: string;
  unpinColumn: string;
  url: string;
  videoPlayer: string;
  volume: string;
  wrapTextEnd: string;
  wrapTextStart: string;
  year: string;
  zoomIn: string;
  zoomOut: string;
}
