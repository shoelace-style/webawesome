import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hr',
  $name: 'Hrvatski',
  $dir: 'ltr',

  carousel: 'Vrtuljak',
  captions: 'Titlovi',
  chooseDecade: 'Odaberi desetljeće',
  chooseMonth: 'Odaberi mjesec',
  chooseYear: 'Odaberi godinu',
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
  nextDecade: 'Sljedeće desetljeće',
  nextMonth: 'Sljedeći mjesec',
  nextSlide: 'Sljedeći slajd',
  nextVideo: 'Sljedeći video',
  nextYear: 'Sljedeća godina',
  numCharacters: num => {
    if (num === 1) return '1 znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} znaka`;
    return `${num} znakova`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 preostali znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} preostala znaka`;
    return `${num} preostalih znakova`;
  },
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
  previousDecade: 'Prethodno desetljeće',
  previousMonth: 'Prethodni mjesec',
  previousSlide: 'Prethodni slajd',
  previousVideo: 'Prethodni video',
  previousYear: 'Prethodna godina',
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
