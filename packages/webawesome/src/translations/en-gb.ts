import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';
import baseTranslation from './en.js';

const translation: Translation = {
  ...baseTranslation,
  $code: 'en-GB',
  $name: 'English (United Kingdom)',

  captions: 'Captions',
  enterFullscreen: 'Enter fullscreen',
  exitFullscreen: 'Exit fullscreen',
  mute: 'Mute',
  nextVideo: 'Next video',
  pause: 'Pause',
  pictureInPicture: 'Picture in picture',
  play: 'Play',
  playbackSpeed: 'Playback speed',
  playlist: 'Playlist',
  previousVideo: 'Previous video',
  selectAColorFromTheScreen: 'Select a colour from the screen',
  toggleColorFormat: 'Toggle colour format',
  unmute: 'Unmute',
  videoPlayer: 'Video player',
  volume: 'Volume',
};

registerTranslation(translation);

export default translation;
