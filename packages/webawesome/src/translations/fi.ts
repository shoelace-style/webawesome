import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fi',
  $name: 'Suomi',
  $dir: 'ltr',

  am: 'ap.',
  carousel: 'Karuselli',
  captions: 'Tekstitys',
  chooseDate: 'Valitse päivämäärä',
  chooseDecade: 'Valitse vuosikymmen',
  chooseMonth: 'Valitse kuukausi',
  chooseTime: 'Valitse aika',
  chooseYear: 'Valitse vuosi',
  clearEntry: 'Poista merkintä',
  createOption: value => `Luo "${value}"`,
  close: 'Sulje',
  closeCalendar: 'Sulje kalenteri',
  closeTimePicker: 'Sulje ajanvalitsin',
  copied: 'Kopioitu',
  copy: 'Kopioi',
  currentValue: 'Nykyinen arvo',
  date: 'Päivämäärä',
  datePickerKeyboardHelp: 'Muuta arvoja nuolinäppäimillä; avaa kalenteri painamalla Alt+Nuoli alas.',
  day: 'Päivä',
  dayPeriod: 'ap./ip.',
  decrement: 'Vähennä',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Tyhjä',
  endDate: 'Päättymispäivä',
  error: 'Virhe',
  enterFullscreen: 'Siirry koko näytölle',
  exitFullscreen: 'Poistu koko näytöltä',
  goToSlide: (slide, count) => `Siirry diaan ${slide} / ${count}`,
  hidePassword: 'Piilota salasana',
  hour: 'Tunti',
  incompleteDate: 'Anna täydellinen päivämäärä.',
  increment: 'Lisää',
  loading: 'Ladataan',
  minute: 'Minuutti',
  month: 'Kuukausi',
  moreOptions: 'Lisää vaihtoehtoja',
  mute: 'Mykistä',
  nextDecade: 'Seuraava vuosikymmen',
  nextMonth: 'Seuraava kuukausi',
  nextSlide: 'Seuraava dia',
  nextVideo: 'Seuraava video',
  nextYear: 'Seuraava vuosi',
  now: 'Nyt',
  numCharacters: num => {
    if (num === 1) return '1 merkki';
    return `${num} merkkiä`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 merkki jäljellä';
    return `${num} merkkiä jäljellä`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ei valittuja vaihtoehtoja';
    if (num === 1) return 'Yksi vaihtoehto valittu';
    return `${num} vaihtoehtoa valittu`;
  },
  pause: 'Keskeytä',
  pauseAnimation: 'Keskeytä animaatio',
  pictureInPicture: 'Kuva kuvassa',
  play: 'Toista',
  playbackSpeed: 'Toistonopeus',
  playlist: 'Soittolista',
  playAnimation: 'Toista animaatio',
  pm: 'ip.',
  previousDecade: 'Edellinen vuosikymmen',
  previousMonth: 'Edellinen kuukausi',
  previousSlide: 'Edellinen dia',
  previousVideo: 'Edellinen video',
  previousYear: 'Edellinen vuosi',
  progress: 'Edistyminen',
  rangeTooLong: max => {
    if (max === 1) return 'Valitse enintään 1 päivän pituinen ajanjakso';
    return `Valitse enintään ${max} päivän pituinen ajanjakso`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Valitse vähintään 1 päivän pituinen ajanjakso';
    return `Valitse vähintään ${min} päivän pituinen ajanjakso`;
  },
  remove: 'Poista',
  resize: 'Muuta kokoa',
  scrollableRegion: 'Vieritettävä alue',
  scrollToEnd: 'Vieritä loppuun',
  scrollToStart: 'Vieritä alkuun',
  second: 'Sekunti',
  selectAColorFromTheScreen: 'Valitse väri näytöltä',
  showPassword: 'Näytä salasana',
  slideNum: slide => `Dia ${slide}`,
  startDate: 'Alkamispäivä',
  time: 'Aika',
  timePickerKeyboardHelp: 'Muuta arvoja nuolinäppäimillä; avaa ajanvalitsin painamalla Alt+Nuoli alas.',
  today: 'Tänään',
  toggleColorFormat: 'Vaihda väriformaattia',
  seek: 'Siirry',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'toistetaan parhaillaan',
  unmute: 'Poista mykistys',
  videoPlayer: 'Videosoitin',
  volume: 'Äänenvoimakkuus',
  year: 'Vuosi',
  zoomIn: 'Lähennä',
  zoomOut: 'Loitonna',
};

registerTranslation(translation);

export default translation;
