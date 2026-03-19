import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'da',
  $name: 'Dansk',
  $dir: 'ltr',

  carousel: 'Karrusel',
  clearEntry: 'Ryd indtastning',
  createOption: value => `Opret "${value}"`,
  close: 'Luk',
  copied: 'Kopieret',
  copy: 'Kopier',
  currentValue: 'Nuværende værdi',
  decrement: 'Formindsk',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Fejl',
  goToSlide: (slide, count) => `Gå til dias ${slide} af ${count}`,
  hidePassword: 'Skjul adgangskode',
  increment: 'Forøg',
  loading: 'Indlæser',
  nextSlide: 'Næste slide',
  numOptionsSelected: (num: number) => {
    if (num === 0) return 'Ingen valgt';
    if (num === 1) return '1 valgt';
    return `${num} valgt`;
  },
  pauseAnimation: 'Pause animation',
  playAnimation: 'Afspil animation',
  previousSlide: 'Forrige dias',
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
  zoomIn: 'Zoom ind',
  zoomOut: 'Zoom ud',
};

registerTranslation(translation);

export default translation;
