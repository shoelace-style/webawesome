import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hr',
  $name: 'Hrvatski',
  $dir: 'ltr',

  carousel: 'Vrtuljak',
  captions: 'Titlovi',
  clearEntry: 'Očisti unos',
  createOption: value => `Stvori "${value}"`,
  close: 'Zatvori',
  copied: 'Kopirano',
  copy: 'Kopiraj',
  currentValue: 'Trenutna vrijednost',
  decrement: 'Smanji',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Greška',
  enterFullscreen: 'Uđi u cijeli zaslon',
  exitFullscreen: 'Izađi iz cijelog zaslona',
  goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
  hidePassword: 'Sakrij lozinku',
  increment: 'Povećaj',
  loading: 'Učitavanje',
  moreOptions: 'Više opcija',
  mute: 'Utišaj',
  nextSlide: 'Sljedeći slajd',
  nextVideo: 'Sljedeći video',
  numOptionsSelected: num => {
    if (num === 0) return 'Nije odabrana nijedna opcija';
    if (num === 1) return '1 opcija je odabrana';
    return `${num} odabranih opcija`;
  },
  pause: 'Pauziraj',
  pauseAnimation: 'Pauziraj animaciju',
  pictureInPicture: 'Slika u slici',
  play: 'Reproduciraj',
  playbackSpeed: 'Brzina reprodukcije',
  playlist: 'Popis za reprodukciju',
  playAnimation: 'Reproduciraj animaciju',
  previousSlide: 'Prethodni slajd',
  previousVideo: 'Prethodni video',
  progress: 'Napredak',
  remove: 'Makni',
  resize: 'Promijeni veličinu',
  scrollableRegion: 'Područje s mogućnošću pomicanja',
  scrollToEnd: 'Skrolaj do kraja',
  scrollToStart: 'Skrolaj na početak',
  selectAColorFromTheScreen: 'Odaberi boju sa ekrana',
  showPassword: 'Pokaži lozinku',
  slideNum: slide => `Slajd ${slide}`,
  toggleColorFormat: 'Zamijeni format boje',
  seek: 'Traži',
  seekProgress: (current, duration) => `${current} od ${duration}`,
  currentlyPlaying: 'trenutno se reproducira',
  unmute: 'Uključi zvuk',
  videoPlayer: 'Video player',
  volume: 'Glasnoća',
  zoomIn: 'Povećaj',
  zoomOut: 'Smanji',
};

registerTranslation(translation);

export default translation;
