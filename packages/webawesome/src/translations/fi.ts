import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fi',
  $name: 'Suomi',
  $dir: 'ltr',

  carousel: 'Karuselli',
  clearEntry: 'Poista merkintä',
  createOption: value => `Luo "${value}"`,
  close: 'Sulje',
  copied: 'Kopioitu',
  copy: 'Kopioi',
  currentValue: 'Nykyinen arvo',
  decrement: 'Vähennä',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Virhe',
  goToSlide: (slide, count) => `Siirry diaan ${slide} / ${count}`,
  hidePassword: 'Piilota salasana',
  increment: 'Lisää',
  loading: 'Ladataan',
  nextSlide: 'Seuraava dia',
  numCharacters: num => {
    if (num === 1) return '1 merkki';
    return `${num} merkkiä`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 merkki jäljellä';
    return `${num} merkkiä jäljellä`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ei valittuja vaihtoehtoja';
    if (num === 1) return 'Yksi vaihtoehto valittu';
    return `${num} vaihtoehtoa valittu`;
  },
  pauseAnimation: 'Keskeytä animaatio',
  playAnimation: 'Toista animaatio',
  previousSlide: 'Edellinen dia',
  progress: 'Edistyminen',
  remove: 'Poista',
  resize: 'Muuta kokoa',
  scrollableRegion: 'Vieritettävä alue',
  scrollToEnd: 'Vieritä loppuun',
  scrollToStart: 'Vieritä alkuun',
  selectAColorFromTheScreen: 'Valitse väri näytöltä',
  showPassword: 'Näytä salasana',
  slideNum: slide => `Dia ${slide}`,
  toggleColorFormat: 'Vaihda väriformaattia',
  zoomIn: 'Lähennä',
  zoomOut: 'Loitonna',
};

registerTranslation(translation);

export default translation;
