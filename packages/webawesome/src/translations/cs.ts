import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'cs',
  $name: 'Čeština',
  $dir: 'ltr',

  carousel: 'Karusel',
  captions: 'Titulky',
  chooseDate: 'Vyberte datum',
  chooseDecade: 'Vyberte desetiletí',
  chooseMonth: 'Vyberte měsíc',
  chooseYear: 'Vyberte rok',
  clearEntry: 'Smazat položku',
  createOption: value => `Vytvořit "${value}"`,
  close: 'Zavřít',
  closeCalendar: 'Zavřít kalendář',
  copied: 'Zkopírováno',
  copy: 'Kopírovat',
  currentValue: 'Současná hodnota',
  date: 'Datum',
  datePickerKeyboardHelp: 'Pomocí šipek změňte hodnoty; stisknutím Alt+Šipka dolů otevřete kalendář.',
  day: 'Den',
  decrement: 'Snížit',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Prázdné',
  error: 'Chyba',
  enterFullscreen: 'Přejít na celou obrazovku',
  endDate: 'Datum ukončení',
  exitFullscreen: 'Ukončit celou obrazovku',
  goToSlide: (slide, count) => `Přejít na slide ${slide} z ${count}`,
  hidePassword: 'Skrýt heslo',
  increment: 'Zvýšit',
  loading: 'Nahrává se',
  moreOptions: 'Další možnosti',
  month: 'Měsíc',
  mute: 'Ztlumit',
  nextDecade: 'Další desetiletí',
  nextMonth: 'Další měsíc',
  nextSlide: 'Další slide',
  nextVideo: 'Další video',
  nextYear: 'Další rok',
  numCharacters: num => {
    if (num === 1) return '1 znak';
    if (num >= 2 && num <= 4) return `${num} znaky`;
    return `${num} znaků`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 zbývající znak';
    if (num >= 2 && num <= 4) return `${num} zbývající znaky`;
    return `${num} zbývajících znaků`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nejsou vybrány žádné možnosti';
    if (num === 1) return 'Je vybrána jedna možnost';
    return `Počet vybraných možností: ${num}`;
  },
  pause: 'Pozastavit',
  pauseAnimation: 'Pozastavit animaci',
  pictureInPicture: 'Obraz v obraze',
  play: 'Přehrát',
  playbackSpeed: 'Rychlost přehrávání',
  playlist: 'Playlist',
  playAnimation: 'Přehrát animaci',
  previousDecade: 'Předchozí desetiletí',
  previousMonth: 'Předchozí měsíc',
  previousSlide: 'Předchozí slide',
  previousVideo: 'Předchozí video',
  previousYear: 'Předchozí rok',
  progress: 'Průběh',
  remove: 'Odstranit',
  resize: 'Změnit velikost',
  scrollableRegion: 'Posunovatelná oblast',
  scrollToEnd: 'Scrollovat na konec',
  scrollToStart: 'Scrollovat na začátek',
  selectAColorFromTheScreen: 'Vybrat barvu z obrazovky',
  showPassword: 'Zobrazit heslo',
  slideNum: slide => `Slide ${slide}`,
  startDate: 'Datum zahájení',
  toggleColorFormat: 'Přepnout formát barvy',
  seek: 'Přejít',
  seekProgress: (current, duration) => `${current} z ${duration}`,
  currentlyPlaying: 'právě se přehrává',
  unmute: 'Zapnout zvuk',
  videoPlayer: 'Přehrávač videa',
  volume: 'Hlasitost',
  year: 'Rok',
  zoomIn: 'Přiblížit',
  zoomOut: 'Oddálit',
};

registerTranslation(translation);

export default translation;
