import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'da',
  $name: 'Dansk',
  $dir: 'ltr',

  carousel: 'Karrusel',
  captions: 'Undertekster',
  clearEntry: 'Ryd indtastning',
  close: 'Luk',
  copied: 'Kopieret',
  copy: 'Kopier',
  currentValue: 'Nuværende værdi',
  decrement: 'Formindsk',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Fejl',
  enterFullscreen: 'Gå til fuldskærm',
  exitFullscreen: 'Afslut fuldskærm',
  goToSlide: (slide, count) => `Gå til dias ${slide} af ${count}`,
  hidePassword: 'Skjul adgangskode',
  increment: 'Forøg',
  loading: 'Indlæser',
  mute: 'Slå lyd fra',
  nextSlide: 'Næste slide',
  nextVideo: 'Næste video',
  numOptionsSelected: (num: number) => {
    if (num === 0) return 'Ingen valgt';
    if (num === 1) return '1 valgt';
    return `${num} valgt`;
  },
  pause: 'Sæt på pause',
  pauseAnimation: 'Pause animation',
  pictureInPicture: 'Billede i billede',
  play: 'Afspil',
  playbackSpeed: 'Afspilningshastighed',
  playlist: 'Afspilningsliste',
  playAnimation: 'Afspil animation',
  previousSlide: 'Forrige dias',
  previousVideo: 'Forrige video',
  progress: 'Status',
  remove: 'Fjern',
  resize: 'Tilpas størrelse',
  scrollableRegion: 'Rullebar region',
  scrollToEnd: 'Scroll til slut',
  scrollToStart: 'Scroll til start',
  selectAColorFromTheScreen: 'Vælg en farve fra skærmen',
  showPassword: 'Vis adgangskode',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Skift farveformat',
  seek: 'Søg',
  seekProgress: (current, duration) => `${current} af ${duration}`,
  currentlyPlaying: 'afspilles nu',
  unmute: 'Slå lyd til',
  videoPlayer: 'Videoafspiller',
  volume: 'Lydstyrke',
  zoomIn: 'Zoom ind',
  zoomOut: 'Zoom ud',
};

registerTranslation(translation);

export default translation;
