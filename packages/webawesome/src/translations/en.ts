import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  carousel: 'Carousel',
  captions: 'Captions',
  chooseDate: 'Choose date',
  chooseDecade: 'Choose decade',
  chooseMonth: 'Choose month',
  chooseYear: 'Choose year',
  clearEntry: 'Clear entry',
  close: 'Close',
  closeCalendar: 'Close calendar',
  createOption: value => `Create "${value}"`,
  copied: 'Copied',
  copy: 'Copy',
  currentValue: 'Current value',
  date: 'Date',
  datePickerKeyboardHelp: 'Use arrow keys to change values; press Alt+Down Arrow to open the calendar.',
  day: 'Day',
  incompleteDate: 'Enter a complete date.',
  dropFileHere: 'Drop file here or click to browse',
  decrement: 'Decrement',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Empty',
  endDate: 'End date',
  error: 'Error',
  enterFullscreen: 'Enter fullscreen',
  exitFullscreen: 'Exit fullscreen',
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: 'Hide password',
  increment: 'Increment',
  loading: 'Loading',
  month: 'Month',
  moreOptions: 'More Options',
  mute: 'Mute',
  nextDecade: 'Next decade',
  nextMonth: 'Next month',
  nextSlide: 'Next slide',
  nextVideo: 'Next Video',
  nextYear: 'Next year',
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
  pause: 'Pause',
  pauseAnimation: 'Pause animation',
  pictureInPicture: 'Picture in picture',
  play: 'Play',
  playbackSpeed: 'Playback speed',
  playlist: 'Playlist',
  playAnimation: 'Play animation',
  previousDecade: 'Previous decade',
  previousMonth: 'Previous month',
  previousSlide: 'Previous slide',
  previousVideo: 'Previous video',
  previousYear: 'Previous year',
  progress: 'Progress',
  rangeTooLong: max => {
    if (max === 1) return 'Select a range no longer than 1 day';
    return `Select a range no longer than ${max} days`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Select a range at least 1 day long';
    return `Select a range at least ${min} days long`;
  },
  readonly: 'Read-only',
  selected: 'Selected',
  selectedDateLabel: date => `Selected: ${date}`,
  selectedRangeLabel: range => `Selected range: ${range}`,
  selectionCleared: 'Selection cleared',
  remove: 'Remove',
  resize: 'Resize',
  scrollableRegion: 'Scrollable region',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select a color from the screen',
  showPassword: 'Show password',
  slideNum: slide => `Slide ${slide}`,
  startDate: 'Start date',
  today: 'Today',
  toggleColorFormat: 'Toggle color format',
  seek: 'Seek',
  seekProgress: (current, duration) => `${current} of ${duration}`,
  currentlyPlaying: 'currently playing',
  unmute: 'Unmute',
  videoPlayer: 'Video player',
  volume: 'Volume',
  year: 'Year',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
  am: 'AM',
  chooseTime: 'Choose time',
  closeTimePicker: 'Close time picker',
  dayPeriod: 'AM/PM',
  hour: 'Hour',
  minute: 'Minute',
  now: 'Now',
  pm: 'PM',
  second: 'Second',
  time: 'Time',
  timePickerKeyboardHelp: 'Use arrow keys to change values; press Alt+Down Arrow to open the time picker.',
};

registerTranslation(translation);

export default translation;
