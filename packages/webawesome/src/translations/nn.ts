import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nn',
  $name: 'Norwegian Nynorsk',
  $dir: 'ltr',

  carousel: 'Karusell',
  captions: 'Teksting',
  clearEntry: 'Tøm felt',
  createOption: value => `Opprett "${value}"`,
  close: 'Lukk',
  copied: 'Kopiert',
  copy: 'Kopier',
  currentValue: 'Nåverande verdi',
  decrement: 'Reduser',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Feil',
  enterFullscreen: 'Gå til fullskjerm',
  exitFullscreen: 'Avslutt fullskjerm',
  goToSlide: (slide, count) => `Gå til visning ${slide} av ${count}`,
  hidePassword: 'Gøym passord',
  increment: 'Auk',
  loading: 'Lastar',
  moreOptions: 'Fleire alternativ',
  mute: 'Demp lyd',
  nextSlide: 'Neste visning',
  nextVideo: 'Neste video',
  numCharacters: num => {
    if (num === 1) return '1 teikn';
    return `${num} teikn`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 teikn att';
    return `${num} teikn att`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen alternativ valt';
    if (num === 1) return 'Eitt alternativ valt';
    return `${num} alternativ valt`;
  },
  pause: 'Pause',
  pauseAnimation: 'Set animasjon på pause',
  pictureInPicture: 'Bilete i bilete',
  play: 'Spel av',
  playbackSpeed: 'Avspelingshastigheit',
  playlist: 'Speljeliste',
  playAnimation: 'Spel av animasjon',
  previousSlide: 'Førre visning',
  previousVideo: 'Førre video',
  progress: 'Framdrift',
  remove: 'Fjern',
  resize: 'Endre storleik',
  scrollableRegion: 'Rullbar region',
  scrollToEnd: 'Rull til slutten',
  scrollToStart: 'Rull til starten',
  selectAColorFromTheScreen: 'Vel ein farge frå skjermen',
  showPassword: 'Vis passord',
  slideNum: slide => `Visning ${slide}`,
  toggleColorFormat: 'Byt fargeformat',
  seek: 'Søk',
  seekProgress: (current, duration) => `${current} av ${duration}`,
  currentlyPlaying: 'spelar no',
  unmute: 'Skru på lyd',
  videoPlayer: 'Videospelar',
  volume: 'Volum',
  zoomIn: 'Zoom inn',
  zoomOut: 'Zoom ut',
};

registerTranslation(translation);

export default translation;
