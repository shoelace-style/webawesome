import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sv',
  $name: 'Svenska',
  $dir: 'ltr',

  am: 'FM',
  carousel: 'Karusell',
  captions: 'Undertexter',
  chooseDate: 'Välj datum',
  chooseDecade: 'Välj decennium',
  chooseMonth: 'Välj månad',
  chooseYear: 'Välj år',
  chooseTime: 'Välj tid',
  clearEntry: 'Återställ val',
  createOption: value => `Skapa "${value}"`,
  close: 'Stäng',
  closeCalendar: 'Stäng kalender',
  closeTimeInput: 'Stäng tidsväljare',
  copied: 'Kopierade',
  copy: 'Kopiera',
  currentValue: 'Nuvarande värde',
  date: 'Datum',
  datePickerKeyboardHelp: 'Använd piltangenterna för att ändra värden; tryck Alt+Pil ned för att öppna kalendern.',
  day: 'Dag',
  dayPeriod: 'FM/EM',
  decrement: 'Minska',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Tom',
  endDate: 'Slutdatum',
  error: 'Fel',
  enterFullscreen: 'Gå till helskärm',
  exitFullscreen: 'Avsluta helskärm',
  goToSlide: (slide, count) => `Gå till bild ${slide} av ${count}`,
  hidePassword: 'Dölj lösenord',
  hour: 'Timme',
  incompleteDate: 'Ange ett fullständigt datum.',
  increment: 'Öka',
  loading: 'Läser in',
  minute: 'Minut',
  month: 'Månad',
  moreOptions: 'Fler alternativ',
  mute: 'Stäng av ljud',
  nextDecade: 'Nästa decennium',
  nextMonth: 'Nästa månad',
  nextSlide: 'Nästa bild',
  nextVideo: 'Nästa video',
  nextYear: 'Nästa år',
  now: 'Nu',
  numCharacters: num => {
    if (num === 1) return '1 tecken';
    return `${num} tecken`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 tecken kvar';
    return `${num} tecken kvar`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Inga alternativ har valts';
    if (num === 1) return '1 alternativ valt';
    return `${num} alternativ valda`;
  },
  pause: 'Pausa',
  pauseAnimation: 'Pausa animation',
  pm: 'EM',
  pictureInPicture: 'Bild i bild',
  play: 'Spela',
  playbackSpeed: 'Uppspelningshastighet',
  playlist: 'Spellista',
  playAnimation: 'Spela upp animation',
  previousDecade: 'Föregående decennium',
  previousMonth: 'Föregående månad',
  previousSlide: 'Föregående bild',
  previousVideo: 'Föregående video',
  previousYear: 'Föregående år',
  progress: 'Framsteg',
  rangeTooLong: max => {
    if (max === 1) return 'Välj ett intervall som inte är längre än 1 dag';
    return `Välj ett intervall som inte är längre än ${max} dagar`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Välj ett intervall som är minst 1 dag långt';
    return `Välj ett intervall som är minst ${min} dagar långt`;
  },
  readonly: 'Skrivskyddad',
  remove: 'Ta bort',
  resize: 'Ändra storlek',
  scrollableRegion: 'Scrollbart område',
  scrollToEnd: 'Skrolla till slutet',
  scrollToStart: 'Skrolla till början',
  second: 'Sekund',
  selectAColorFromTheScreen: 'Välj en färg från skärmen',
  selected: 'Vald',
  selectedDateLabel: date => `Valt: ${date}`,
  selectedRangeLabel: range => `Valt intervall: ${range}`,
  selectionCleared: 'Valet rensat',
  showPassword: 'Visa lösenord',
  slideNum: slide => `Bild ${slide}`,
  startDate: 'Startdatum',
  time: 'Tid',
  timeInputKeyboardHelp: 'Använd piltangenterna för att ändra värden; tryck Alt+Pil ned för att öppna tidsväljaren.',
  today: 'Idag',
  toggleColorFormat: 'Växla färgformat',
  seek: 'Sök',
  seekProgress: (current, duration) => `${current} av ${duration}`,
  currentlyPlaying: 'spelas nu',
  unmute: 'Slå på ljud',
  videoPlayer: 'Videospelare',
  volume: 'Volym',
  year: 'År',
  zoomIn: 'Zooma in',
  zoomOut: 'Zooma ut',
};

registerTranslation(translation);

export default translation;
