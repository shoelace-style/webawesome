import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nn',
  $name: 'Norwegian Nynorsk',
  $dir: 'ltr',

  carousel: 'Karusell',
  clearEntry: 'Tøm felt',
  close: 'Lukk',
  copied: 'Kopiert',
  copy: 'Kopier',
  currentValue: 'Nåverande verdi',
  error: 'Feil',
  goToSlide: (slide, count) => `Gå til visning ${slide} av ${count}`,
  hidePassword: 'Gøym passord',
  loading: 'Lastar',
  nextSlide: 'Neste visning',
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen alternativ valt';
    if (num === 1) return 'Eitt alternativ valt';
    return `${num} alternativ valt`;
  },
  pauseAnimation: 'Set animasjon på pause',
  playAnimation: 'Spel av animasjon',
  previousSlide: 'Førre visning',
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
  zoomIn: 'Zoom inn',
  zoomOut: 'Zoom ut',
};

registerTranslation(translation);

export default translation;
