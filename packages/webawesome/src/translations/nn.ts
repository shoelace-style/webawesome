import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nn',
  $name: 'Norwegian Nynorsk',
  $dir: 'ltr',

  carousel: 'Karusell',
  captions: 'Teksting',
  chooseDate: 'Vel dato',
  chooseDecade: 'Vel tiår',
  chooseMonth: 'Vel månad',
  chooseYear: 'Vel år',
  clearEntry: 'Tøm felt',
  createOption: value => `Opprett "${value}"`,
  close: 'Lukk',
  closeCalendar: 'Lukk kalender',
  copied: 'Kopiert',
  copy: 'Kopier',
  currentValue: 'Nåverande verdi',
  date: 'Dato',
  datePickerKeyboardHelp: 'Bruk piltastane for å endre verdiar; trykk Alt+Pil ned for å opne kalenderen.',
  day: 'Dag',
  decrement: 'Reduser',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Tom',
  endDate: 'Sluttdato',
  error: 'Feil',
  enterFullscreen: 'Gå til fullskjerm',
  exitFullscreen: 'Avslutt fullskjerm',
  goToSlide: (slide, count) => `Gå til visning ${slide} av ${count}`,
  hidePassword: 'Gøym passord',
  increment: 'Auk',
  loading: 'Lastar',
  month: 'Månad',
  moreOptions: 'Fleire alternativ',
  mute: 'Demp lyd',
  nextDecade: 'Neste tiår',
  nextMonth: 'Neste månad',
  nextSlide: 'Neste visning',
  nextVideo: 'Neste video',
  nextYear: 'Neste år',
  numCharacters: num => {
    if (num === 1) return '1 teikn';
    return `${num} teikn`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 teikn att';
    return `${num} teikn att`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen alternativ valt';
    if (num === 1) return 'Eitt alternativ valt';
    return `${num} alternativ valt`;
  },
  pause: 'Pause',
  pauseAnimation: 'Set animasjon på pause',
  pictureInPicture: 'Bilete i bilete',
  play: 'Spel av',
  playbackSpeed: 'Avspelingshastigheit',
  playlist: 'Speljeliste',
  playAnimation: 'Spel av animasjon',
  previousDecade: 'Førre tiår',
  previousMonth: 'Førre månad',
  previousSlide: 'Førre visning',
  previousVideo: 'Førre video',
  previousYear: 'Førre år',
  progress: 'Framdrift',
  remove: 'Fjern',
  resize: 'Endre storleik',
  scrollableRegion: 'Rullbar region',
  scrollToEnd: 'Rull til slutten',
  scrollToStart: 'Rull til starten',
  selectAColorFromTheScreen: 'Vel ein farge frå skjermen',
  showPassword: 'Vis passord',
  slideNum: slide => `Visning ${slide}`,
  startDate: 'Startdato',
  toggleColorFormat: 'Byt fargeformat',
  seek: 'Søk',
  seekProgress: (current, duration) => `${current} av ${duration}`,
  currentlyPlaying: 'spelar no',
  unmute: 'Skru på lyd',
  videoPlayer: 'Videospelar',
  volume: 'Volum',
  year: 'År',
  zoomIn: 'Zoom inn',
  zoomOut: 'Zoom ut',
};

registerTranslation(translation);

export default translation;
