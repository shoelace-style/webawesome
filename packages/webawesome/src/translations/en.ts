import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'en',
  $name: 'English',
  $dir: 'ltr',

  carousel: 'Carousel',
  captions: 'Captions',
  chooseDecade: 'Choose decade',
  chooseMonth: 'Choose month',
  chooseYear: 'Choose year',
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
  enterFullscreen: 'Enter fullscreen',
  exitFullscreen: 'Exit fullscreen',
  goToSlide: (slide, count) => `Go to slide ${slide} of ${count}`,
  hidePassword: 'Hide password',
  increment: 'Increment',
  loading: 'Loading',
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
  remove: 'Remove',
  resize: 'Resize',
  scrollableRegion: 'Scrollable region',
  scrollToEnd: 'Scroll to end',
  scrollToStart: 'Scroll to start',
  selectAColorFromTheScreen: 'Select a color from the screen',
  showPassword: 'Show password',
  slideNum: slide => `Slide ${slide}`,
  today: 'Today',
  toggleColorFormat: 'Toggle color format',
  seek: 'Seek',
  seekProgress: (current, duration) => `${current} of ${duration}`,
  currentlyPlaying: 'currently playing',
  unmute: 'Unmute',
  videoPlayer: 'Video player',
  volume: 'Volume',
  zoomIn: 'Zoom in',
  zoomOut: 'Zoom out',
};

registerTranslation(translation);

export default translation;
