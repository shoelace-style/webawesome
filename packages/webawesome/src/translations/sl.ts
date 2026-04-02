import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sl',
  $name: 'Slovenski',
  $dir: 'ltr',

  carousel: 'Vrtiljak',
  clearEntry: 'Počisti vnos',
  createOption: value => `Ustvari "${value}"`,
  close: 'Zapri',
  copied: 'Kopirano',
  copy: 'Kopiraj',
  currentValue: 'Trenutna vrednost',
  decrement: 'Zmanjšaj',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Napaka',
  goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
  hidePassword: 'Skrij geslo',
  increment: 'Povečaj',
  loading: 'Nalaganje',
  nextSlide: 'Naslednji diapozitiv',
  numCharacters: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `${num} znak`;
    if (mod100 === 2) return `${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `${num} znaki`;
    return `${num} znakov`;
  },
  numCharactersRemaining: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `Preostane ${num} znak`;
    if (mod100 === 2) return `Preostaneta ${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `Preostanejo ${num} znaki`;
    return `Preostane ${num} znakov`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nobena možnost ni izbrana';
    if (num === 1) return '1 možnost izbrana';
    if (num === 2) return '2 možnosti izbrani';
    if (num === 3 || num === 4) return `${num} možnosti izbrane`;
    return `${num} možnosti izbranih`;
  },
  pauseAnimation: 'Zaustavi animacijo',
  playAnimation: 'Predvajaj animacijo',
  previousSlide: 'Prejšnji diapozitiv',
  progress: 'Napredek',
  remove: 'Odstrani',
  resize: 'Spremeni velikost',
  scrollableRegion: 'Področje za drsenje',
  scrollToEnd: 'Pomakni se na konec',
  scrollToStart: 'Pomakni se na začetek',
  selectAColorFromTheScreen: 'Izberite barvo z zaslona',
  showPassword: 'Prikaži geslo',
  slideNum: slide => `Diapozitiv ${slide}`,
  toggleColorFormat: 'Preklopi format barve',
  zoomIn: 'Povečaj',
  zoomOut: 'Pomanjšaj',
};

registerTranslation(translation);

export default translation;
