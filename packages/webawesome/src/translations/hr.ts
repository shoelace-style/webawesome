import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hr',
  $name: 'Hrvatski',
  $dir: 'ltr',

  carousel: 'Vrtuljak',
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
  goToSlide: (slide, count) => `Idi na slajd ${slide} od ${count}`,
  hidePassword: 'Sakrij lozinku',
  increment: 'Povećaj',
  loading: 'Učitavanje',
  nextSlide: 'Sljedeći slajd',
  numOptionsSelected: num => {
    if (num === 0) return 'Nije odabrana nijedna opcija';
    if (num === 1) return '1 opcija je odabrana';
    return `${num} odabranih opcija`;
  },
  pauseAnimation: 'Pauziraj animaciju',
  playAnimation: 'Reproduciraj animaciju',
  previousSlide: 'Prethodni slajd',
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
  zoomIn: 'Povećaj',
  zoomOut: 'Smanji',
};

registerTranslation(translation);

export default translation;
