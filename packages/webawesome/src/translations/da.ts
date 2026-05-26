import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'da',
  $name: 'Dansk',
  $dir: 'ltr',

  carousel: 'Karrusel',
  captions: 'Undertekster',
  chooseDate: 'Vælg dato',
  chooseDecade: 'Vælg årti',
  chooseMonth: 'Vælg måned',
  chooseYear: 'Vælg år',
  clearEntry: 'Ryd indtastning',
  createOption: value => `Opret "${value}"`,
  close: 'Luk',
  closeCalendar: 'Luk kalender',
  copied: 'Kopieret',
  copy: 'Kopier',
  currentValue: 'Nuværende værdi',
  date: 'Dato',
  datePickerKeyboardHelp: 'Brug piletasterne til at ændre værdier; tryk Alt+Pil ned for at åbne kalenderen.',
  day: 'Dag',
  decrement: 'Formindsk',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Tom',
  endDate: 'Slutdato',
  error: 'Fejl',
  enterFullscreen: 'Gå til fuldskærm',
  exitFullscreen: 'Afslut fuldskærm',
  goToSlide: (slide, count) => `Gå til dias ${slide} af ${count}`,
  hidePassword: 'Skjul adgangskode',
  increment: 'Forøg',
  loading: 'Indlæser',
  month: 'Måned',
  moreOptions: 'Flere muligheder',
  mute: 'Slå lyd fra',
  nextDecade: 'Næste årti',
  nextMonth: 'Næste måned',
  nextSlide: 'Næste slide',
  nextVideo: 'Næste video',
  nextYear: 'Næste år',
  numCharacters: num => {
    if (num === 1) return '1 tegn';
    return `${num} tegn`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 tegn tilbage';
    return `${num} tegn tilbage`;
  },
  numOptionsSelected: (num: number) => {
    if (num === 0) return 'Ingen valgt';
    if (num === 1) return '1 valgt';
    return `${num} valgt`;
  },
  pause: 'Sæt på pause',
  pauseAnimation: 'Pause animation',
  pictureInPicture: 'Billede i billede',
  play: 'Afspil',
  playbackSpeed: 'Afspilningshastighed',
  playlist: 'Afspilningsliste',
  playAnimation: 'Afspil animation',
  previousDecade: 'Forrige årti',
  previousMonth: 'Forrige måned',
  previousSlide: 'Forrige dias',
  previousVideo: 'Forrige video',
  previousYear: 'Forrige år',
  progress: 'Status',
  remove: 'Fjern',
  resize: 'Tilpas størrelse',
  scrollableRegion: 'Rullebar region',
  scrollToEnd: 'Scroll til slut',
  scrollToStart: 'Scroll til start',
  selectAColorFromTheScreen: 'Vælg en farve fra skærmen',
  showPassword: 'Vis adgangskode',
  slideNum: slide => `Slide ${slide}`,
  startDate: 'Startdato',
  toggleColorFormat: 'Skift farveformat',
  seek: 'Søg',
  seekProgress: (current, duration) => `${current} af ${duration}`,
  currentlyPlaying: 'afspilles nu',
  unmute: 'Slå lyd til',
  videoPlayer: 'Videoafspiller',
  volume: 'Lydstyrke',
  year: 'År',
  zoomIn: 'Zoom ind',
  zoomOut: 'Zoom ud',
};

registerTranslation(translation);

export default translation;
