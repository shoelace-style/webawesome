import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nl',
  $name: 'Nederlands',
  $dir: 'ltr',

  carousel: 'Carrousel',
  captions: 'Ondertiteling',
  clearEntry: 'Invoer wissen',
  close: 'Sluiten',
  copied: 'Gekopieerd',
  copy: 'Kopiëren',
  currentValue: 'Huidige waarde',
  decrement: 'Verlagen',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Fout',
  enterFullscreen: 'Volledig scherm openen',
  exitFullscreen: 'Volledig scherm sluiten',
  goToSlide: (slide, count) => `Ga naar slide ${slide} van ${count}`,
  hidePassword: 'Verberg wachtwoord',
  increment: 'Verhogen',
  loading: 'Bezig met laden',
  moreOptions: 'Meer opties',
  mute: 'Dempen',
  nextSlide: 'Volgende dia',
  nextVideo: 'Volgende video',
  numOptionsSelected: num => {
    if (num === 0) return 'Geen optie geselecteerd';
    if (num === 1) return '1 optie geselecteerd';
    return `${num} opties geselecteerd`;
  },
  pause: 'Pauzeren',
  pauseAnimation: 'Animatie pauzeren',
  pictureInPicture: 'Beeld in beeld',
  play: 'Afspelen',
  playbackSpeed: 'Afspeelsnelheid',
  playlist: 'Afspeellijst',
  playAnimation: 'Animatie afspelen',
  previousSlide: 'Vorige dia',
  previousVideo: 'Vorige video',
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
  seek: 'Zoeken',
  seekProgress: (current, duration) => `${current} van ${duration}`,
  currentlyPlaying: 'wordt nu afgespeeld',
  unmute: 'Dempen opheffen',
  videoPlayer: 'Videospeler',
  volume: 'Volume',
  zoomIn: 'Inzoomen',
  zoomOut: 'Uitzoomen',
};

registerTranslation(translation);

export default translation;
