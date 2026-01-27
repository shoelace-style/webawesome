import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nl',
  $name: 'Nederlands',
  $dir: 'ltr',

  carousel: 'Carrousel',
  clearEntry: 'Invoer wissen',
  close: 'Sluiten',
  copied: 'Gekopieerd',
  copy: 'Kopiëren',
  currentValue: 'Huidige waarde',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Fout',
  goToSlide: (slide, count) => `Ga naar slide ${slide} van ${count}`,
  hidePassword: 'Verberg wachtwoord',
  loading: 'Bezig met laden',
  nextSlide: 'Volgende dia',
  numOptionsSelected: num => {
    if (num === 0) return 'Geen optie geselecteerd';
    if (num === 1) return '1 optie geselecteerd';
    return `${num} opties geselecteerd`;
  },
  pauseAnimation: 'Animatie pauzeren',
  playAnimation: 'Animatie afspelen',
  previousSlide: 'Vorige dia',
  progress: 'Voortgang',
  remove: 'Verwijderen',
  resize: 'Formaat wijzigen',
  scrollableRegion: 'Scrollbaar gebied',
  scrollToEnd: 'Scroll naar einde',
  scrollToStart: 'Scroll naar begin',
  selectAColorFromTheScreen: 'Selecteer een kleur van het scherm',
  showPassword: 'Laat wachtwoord zien',
  slideNum: slide => `Schuif ${slide}`,
  toggleColorFormat: 'Wissel kleurnotatie',
  zoomIn: 'Inzoomen',
  zoomOut: 'Uitzoomen',
};

registerTranslation(translation);

export default translation;
