import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sl',
  $name: 'Slovenski',
  $dir: 'ltr',

  am: 'AM',
  carousel: 'Vrtiljak',
  captions: 'Podnapisi',
  chooseDate: 'Izberite datum',
  chooseDecade: 'Izberite desetletje',
  chooseMonth: 'Izberite mesec',
  chooseYear: 'Izberite leto',
  chooseTime: 'Izberite čas',
  clearEntry: 'Počisti vnos',
  createOption: value => `Ustvari "${value}"`,
  close: 'Zapri',
  closeCalendar: 'Zapri koledar',
  closeTimeInput: 'Zapri izbirnik časa',
  copied: 'Kopirano',
  copy: 'Kopiraj',
  currentValue: 'Trenutna vrednost',
  date: 'Datum',
  dayPeriod: 'AM/PM',
  datePickerKeyboardHelp:
    'S puščičnimi tipkami spreminjajte vrednosti; pritisnite Alt+Puščica navzdol za odpiranje koledarja.',
  day: 'Dan',
  decrement: 'Zmanjšaj',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Prazno',
  error: 'Napaka',
  enterFullscreen: 'Vstopi v celozaslonski način',
  endDate: 'Končni datum',
  exitFullscreen: 'Zapusti celozaslonski način',
  goToSlide: (slide, count) => `Pojdi na diapozitiv ${slide} od ${count}`,
  hidePassword: 'Skrij geslo',
  hour: 'Ura',
  incompleteDate: 'Vnesite veljaven datum.',
  increment: 'Povečaj',
  loading: 'Nalaganje',
  minute: 'Minuta',
  moreOptions: 'Več možnosti',
  month: 'Mesec',
  mute: 'Utišaj',
  nextDecade: 'Naslednje desetletje',
  nextMonth: 'Naslednji mesec',
  nextSlide: 'Naslednji diapozitiv',
  nextVideo: 'Naslednji videoposnetek',
  nextYear: 'Naslednje leto',
  now: 'Zdaj',
  numCharacters: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `${num} znak`;
    if (mod100 === 2) return `${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `${num} znaki`;
    return `${num} znakov`;
  },
  numCharactersRemaining: num => {
    const mod100 = num % 100;
    if (mod100 === 1) return `Preostane ${num} znak`;
    if (mod100 === 2) return `Preostaneta ${num} znaka`;
    if (mod100 === 3 || mod100 === 4) return `Preostanejo ${num} znaki`;
    return `Preostane ${num} znakov`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nobena možnost ni izbrana';
    if (num === 1) return '1 možnost izbrana';
    if (num === 2) return '2 možnosti izbrani';
    if (num === 3 || num === 4) return `${num} možnosti izbrane`;
    return `${num} možnosti izbranih`;
  },
  pause: 'Premor',
  pauseAnimation: 'Zaustavi animacijo',
  pictureInPicture: 'Slika v sliki',
  play: 'Predvajaj',
  playbackSpeed: 'Hitrost predvajanja',
  playlist: 'Seznam predvajanja',
  playAnimation: 'Predvajaj animacijo',
  pm: 'PM',
  previousDecade: 'Prejšnje desetletje',
  previousMonth: 'Prejšnji mesec',
  previousSlide: 'Prejšnji diapozitiv',
  previousVideo: 'Prejšnji videoposnetek',
  previousYear: 'Prejšnje leto',
  progress: 'Napredek',
  rangeTooLong: max => {
    const mod100 = max % 100;
    if (mod100 === 1) return `Izberite obdobje, ki ni daljše od ${max} dneva`;
    if (mod100 === 2) return `Izberite obdobje, ki ni daljše od ${max} dni`;
    if (mod100 === 3 || mod100 === 4) return `Izberite obdobje, ki ni daljše od ${max} dni`;
    return `Izberite obdobje, ki ni daljše od ${max} dni`;
  },
  rangeTooShort: min => {
    const mod100 = min % 100;
    if (mod100 === 1) return `Izberite obdobje, dolgo vsaj ${min} dan`;
    if (mod100 === 2) return `Izberite obdobje, dolgo vsaj ${min} dneva`;
    if (mod100 === 3 || mod100 === 4) return `Izberite obdobje, dolgo vsaj ${min} dni`;
    return `Izberite obdobje, dolgo vsaj ${min} dni`;
  },
  readonly: 'Samo za branje',
  remove: 'Odstrani',
  resize: 'Spremeni velikost',
  scrollableRegion: 'Področje za drsenje',
  scrollToEnd: 'Pomakni se na konec',
  scrollToStart: 'Pomakni se na začetek',
  second: 'Sekunda',
  selectAColorFromTheScreen: 'Izberite barvo z zaslona',
  selected: 'Izbrano',
  selectedDateLabel: date => `Izbrano: ${date}`,
  selectedRangeLabel: range => `Izbrano obdobje: ${range}`,
  selectionCleared: 'Izbira počiščena',
  showPassword: 'Prikaži geslo',
  slideNum: slide => `Diapozitiv ${slide}`,
  startDate: 'Začetni datum',
  time: 'Čas',
  timeInputKeyboardHelp:
    'S puščičnimi tipkami spreminjajte vrednosti; pritisnite Alt+Puščica navzdol za odpiranje izbirnika časa.',
  today: 'Danes',
  toggleColorFormat: 'Preklopi format barve',
  seek: 'Išči',
  seekProgress: (current, duration) => `${current} od ${duration}`,
  currentlyPlaying: 'se trenutno predvaja',
  unmute: 'Vklopi zvok',
  videoPlayer: 'Videopredvajalnik',
  volume: 'Glasnost',
  year: 'Leto',
  zoomIn: 'Povečaj',
  zoomOut: 'Pomanjšaj',
};

registerTranslation(translation);

export default translation;
