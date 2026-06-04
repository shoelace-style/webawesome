import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';
import baseTranslation from './en.js';

const translation: Translation = {
  ...baseTranslation,
  $code: 'en-GB',
  $name: 'English (United Kingdom)',

  captions: 'Captions',
  chooseDate: 'Choose date',
  chooseDecade: 'Choose decade',
  chooseMonth: 'Choose month',
  chooseYear: 'Choose year',
  closeCalendar: 'Close calendar',
  date: 'Date',
  datePickerKeyboardHelp: 'Use arrow keys to change values; press Alt+Down Arrow to open the calendar.',
  day: 'Day',
  empty: 'Empty',
  endDate: 'End date',
  enterFullscreen: 'Enter fullscreen',
  exitFullscreen: 'Exit fullscreen',
  month: 'Month',
  mute: 'Mute',
  nextDecade: 'Next decade',
  nextMonth: 'Next month',
  nextVideo: 'Next video',
  nextYear: 'Next year',
  pause: 'Pause',
  pictureInPicture: 'Picture in picture',
  play: 'Play',
  playbackSpeed: 'Playback speed',
  playlist: 'Playlist',
  previousDecade: 'Previous decade',
  previousMonth: 'Previous month',
  previousVideo: 'Previous video',
  previousYear: 'Previous year',
  selectAColorFromTheScreen: 'Select a colour from the screen',
  startDate: 'Start date',
  toggleColorFormat: 'Toggle colour format',
  seek: 'Seek',
  seekProgress: (current, duration) => `${current} of ${duration}`,
  currentlyPlaying: 'currently playing',
  unmute: 'Unmute',
  videoPlayer: 'Video player',
  volume: 'Volume',
  year: 'Year',
};

registerTranslation(translation);

export default translation;
