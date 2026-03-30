import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nb',
  $name: 'Norwegian Bokmål',
  $dir: 'ltr',

  carousel: 'Karusell',
  captions: 'Teksting',
  clearEntry: 'Tøm felt',
  createOption: value => `Opprett "${value}"`,
  close: 'Lukk',
  copied: 'Kopiert',
  copy: 'Kopier',
  currentValue: 'Nåværende verdi',
  decrement: 'Reduser',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Feil',
  enterFullscreen: 'Gå til fullskjerm',
  exitFullscreen: 'Avslutt fullskjerm',
  goToSlide: (slide, count) => `Gå til visning ${slide} av ${count}`,
  hidePassword: 'Skjul passord',
  increment: 'Øk',
  loading: 'Laster',
  moreOptions: 'Flere alternativer',
  mute: 'Demp lyd',
  nextSlide: 'Neste visning',
  nextVideo: 'Neste video',
  numCharacters: num => {
    if (num === 1) return '1 tegn';
    return `${num} tegn`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 tegn gjenstår';
    return `${num} tegn gjenstår`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen alternativer valgt';
    if (num === 1) return 'Ett alternativ valgt';
    return `${num} alternativer valgt`;
  },
  pause: 'Pause',
  pauseAnimation: 'Sett animasjon på pause',
  pictureInPicture: 'Bilde i bilde',
  play: 'Spill av',
  playbackSpeed: 'Avspillingshastighet',
  playlist: 'Spilleliste',
  playAnimation: 'Spill av animasjon',
  previousSlide: 'Forrige visning',
  previousVideo: 'Forrige video',
  progress: 'Fremdrift',
  remove: 'Fjern',
  resize: 'Endre størrelse',
  scrollableRegion: 'Rullbar region',
  scrollToEnd: 'Rull til slutten',
  scrollToStart: 'Rull til starten',
  selectAColorFromTheScreen: 'Velg en farge fra skjermen',
  showPassword: 'Vis passord',
  slideNum: slide => `Visning ${slide}`,
  toggleColorFormat: 'Bytt fargeformat',
  seek: 'Søk',
  seekProgress: (current, duration) => `${current} av ${duration}`,
  currentlyPlaying: 'spilles nå',
  unmute: 'Skru på lyd',
  videoPlayer: 'Videospiller',
  volume: 'Volum',
  zoomIn: 'Zoom inn',
  zoomOut: 'Zoom ut',
};

registerTranslation(translation);

export default translation;
