import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sl',
  $name: 'Slovenski',
  $dir: 'ltr',

  carousel: 'Vrtiljak',
  captions: 'Podnapisi',
  chooseDate: 'Izberite datum',
  chooseDecade: 'Izberite desetletje',
  chooseMonth: 'Izberite mesec',
  chooseYear: 'Izberite leto',
  clearEntry: 'Počisti vnos',
  createOption: value => `Ustvari "${value}"`,
  close: 'Zapri',
  closeCalendar: 'Zapri koledar',
  copied: 'Kopirano',
  copy: 'Kopiraj',
  currentValue: 'Trenutna vrednost',
  date: 'Datum',
  datePickerKeyboardHelp: 'S puščičnimi tipkami spreminjajte vrednosti; pritisnite Alt+Puščica navzdol za odpiranje koledarja.',
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
  increment: 'Povečaj',
  loading: 'Nalaganje',
  moreOptions: 'Več možnosti',
  month: 'Mesec',
  mute: 'Utišaj',
  nextDecade: 'Naslednje desetletje',
  nextMonth: 'Naslednji mesec',
  nextSlide: 'Naslednji diapozitiv',
  nextVideo: 'Naslednji videoposnetek',
  nextYear: 'Naslednje leto',
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
  previousDecade: 'Prejšnje desetletje',
  previousMonth: 'Prejšnji mesec',
  previousSlide: 'Prejšnji diapozitiv',
  previousVideo: 'Prejšnji videoposnetek',
  previousYear: 'Prejšnje leto',
  progress: 'Napredek',
  remove: 'Odstrani',
  resize: 'Spremeni velikost',
  scrollableRegion: 'Področje za drsenje',
  scrollToEnd: 'Pomakni se na konec',
  scrollToStart: 'Pomakni se na začetek',
  selectAColorFromTheScreen: 'Izberite barvo z zaslona',
  showPassword: 'Prikaži geslo',
  slideNum: slide => `Diapozitiv ${slide}`,
  startDate: 'Začetni datum',
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
