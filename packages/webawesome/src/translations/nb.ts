import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'nb',
  $name: 'Norwegian Bokmål',
  $dir: 'ltr',

  am: 'AM',
  carousel: 'Karusell',
  captions: 'Teksting',
  chooseDate: 'Velg dato',
  chooseDecade: 'Velg tiår',
  chooseMonth: 'Velg måned',
  chooseTime: 'Velg klokkeslett',
  chooseYear: 'Velg år',
  clearEntry: 'Tøm felt',
  createOption: value => `Opprett "${value}"`,
  close: 'Lukk',
  closeCalendar: 'Lukk kalender',
  closeTimePicker: 'Lukk tidsvelger',
  copied: 'Kopiert',
  copy: 'Kopier',
  currentValue: 'Nåværende verdi',
  date: 'Dato',
  datePickerKeyboardHelp: 'Bruk piltastene for å endre verdier; trykk Alt+Pil ned for å åpne kalenderen.',
  day: 'Dag',
  dayPeriod: 'AM/PM',
  decrement: 'Reduser',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Tom',
  endDate: 'Sluttdato',
  error: 'Feil',
  enterFullscreen: 'Gå til fullskjerm',
  exitFullscreen: 'Avslutt fullskjerm',
  goToSlide: (slide, count) => `Gå til visning ${slide} av ${count}`,
  hidePassword: 'Skjul passord',
  hour: 'Time',
  incompleteDate: 'Skriv inn en fullstendig dato.',
  increment: 'Øk',
  loading: 'Laster',
  minute: 'Minutt',
  month: 'Måned',
  moreOptions: 'Flere alternativer',
  mute: 'Demp lyd',
  nextDecade: 'Neste tiår',
  nextMonth: 'Neste måned',
  nextSlide: 'Neste visning',
  nextVideo: 'Neste video',
  nextYear: 'Neste år',
  now: 'Nå',
  numCharacters: num => {
    if (num === 1) return '1 tegn';
    return `${num} tegn`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 tegn gjenstår';
    return `${num} tegn gjenstår`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ingen alternativer valgt';
    if (num === 1) return 'Ett alternativ valgt';
    return `${num} alternativer valgt`;
  },
  pause: 'Pause',
  pauseAnimation: 'Sett animasjon på pause',
  pictureInPicture: 'Bilde i bilde',
  play: 'Spill av',
  playbackSpeed: 'Avspillingshastighet',
  playlist: 'Spilleliste',
  playAnimation: 'Spill av animasjon',
  pm: 'PM',
  previousDecade: 'Forrige tiår',
  previousMonth: 'Forrige måned',
  previousSlide: 'Forrige visning',
  previousVideo: 'Forrige video',
  previousYear: 'Forrige år',
  progress: 'Fremdrift',
  rangeTooLong: max => {
    if (max === 1) return 'Velg et område som ikke er lengre enn 1 dag';
    return `Velg et område som ikke er lengre enn ${max} dager`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Velg et område som er minst 1 dag langt';
    return `Velg et område som er minst ${min} dager langt`;
  },
  readonly: 'Skrivebeskyttet',
  remove: 'Fjern',
  resize: 'Endre størrelse',
  scrollableRegion: 'Rullbar region',
  scrollToEnd: 'Rull til slutten',
  scrollToStart: 'Rull til starten',
  second: 'Sekund',
  selectAColorFromTheScreen: 'Velg en farge fra skjermen',
  selected: 'Valgt',
  selectedDateLabel: date => `Valgt: ${date}`,
  selectedRangeLabel: range => `Valgt område: ${range}`,
  selectionCleared: 'Valg fjernet',
  showPassword: 'Vis passord',
  slideNum: slide => `Visning ${slide}`,
  startDate: 'Startdato',
  time: 'Klokkeslett',
  timePickerKeyboardHelp: 'Bruk piltastene for å endre verdier; trykk Alt+Pil ned for å åpne tidsvelgeren.',
  today: 'I dag',
  toggleColorFormat: 'Bytt fargeformat',
  seek: 'Søk',
  seekProgress: (current, duration) => `${current} av ${duration}`,
  currentlyPlaying: 'spilles nå',
  unmute: 'Skru på lyd',
  videoPlayer: 'Videospiller',
  volume: 'Volum',
  year: 'År',
  zoomIn: 'Zoom inn',
  zoomOut: 'Zoom ut',
};

registerTranslation(translation);

export default translation;
