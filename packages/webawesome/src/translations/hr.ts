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
