import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nl',
  $name: 'Nederlands',
  $dir: 'ltr',

  carousel: 'Carrousel',
  captions: 'Ondertiteling',
  chooseDate: 'Datum kiezen',
  chooseDecade: 'Decennium kiezen',
  chooseMonth: 'Maand kiezen',
  chooseYear: 'Jaar kiezen',
  clearEntry: 'Invoer wissen',
  createOption: value => `"${value}" aanmaken`,
  close: 'Sluiten',
  closeCalendar: 'Kalender sluiten',
  copied: 'Gekopieerd',
  copy: 'Kopiëren',
  currentValue: 'Huidige waarde',
  date: 'Datum',
  datePickerKeyboardHelp: 'Gebruik de pijltjestoetsen om waarden te wijzigen; druk op Alt+Pijl omlaag om de kalender te openen.',
  day: 'Dag',
  decrement: 'Verlagen',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Leeg',
  endDate: 'Einddatum',
  error: 'Fout',
  enterFullscreen: 'Volledig scherm openen',
  exitFullscreen: 'Volledig scherm sluiten',
  goToSlide: (slide, count) => `Ga naar slide ${slide} van ${count}`,
  hidePassword: 'Verberg wachtwoord',
  increment: 'Verhogen',
  loading: 'Bezig met laden',
  month: 'Maand',
  moreOptions: 'Meer opties',
  mute: 'Dempen',
  nextDecade: 'Volgend decennium',
  nextMonth: 'Volgende maand',
  nextSlide: 'Volgende dia',
  nextVideo: 'Volgende video',
  nextYear: 'Volgend jaar',
  numCharacters: num => {
    if (num === 1) return '1 teken';
    return `${num} tekens`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 teken resterend';
    return `${num} tekens resterend`;
  },
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
  previousDecade: 'Vorig decennium',
  previousMonth: 'Vorige maand',
  previousSlide: 'Vorige dia',
  previousVideo: 'Vorige video',
  previousYear: 'Vorig jaar',
  progress: 'Voortgang',
  remove: 'Verwijderen',
  resize: 'Formaat wijzigen',
  scrollableRegion: 'Scrollbaar gebied',
  scrollToEnd: 'Scroll naar einde',
  scrollToStart: 'Scroll naar begin',
  selectAColorFromTheScreen: 'Selecteer een kleur van het scherm',
  showPassword: 'Laat wachtwoord zien',
  slideNum: slide => `Schuif ${slide}`,
  startDate: 'Begindatum',
  toggleColorFormat: 'Wissel kleurnotatie',
  seek: 'Zoeken',
  seekProgress: (current, duration) => `${current} van ${duration}`,
  currentlyPlaying: 'wordt nu afgespeeld',
  unmute: 'Dempen opheffen',
  videoPlayer: 'Videospeler',
  volume: 'Volume',
  year: 'Jaar',
  zoomIn: 'Inzoomen',
  zoomOut: 'Uitzoomen',
};

registerTranslation(translation);

export default translation;
