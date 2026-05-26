import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'kk',
  $name: 'Қазақ',
  $dir: 'ltr',

  carousel: 'Карусель',
  captions: 'Субтитрлер',
  chooseDate: 'Күнді таңдау',
  chooseDecade: 'Онжылдықты таңдау',
  chooseMonth: 'Айды таңдау',
  chooseYear: 'Жылды таңдау',
  clearEntry: 'Жазбаны жою',
  createOption: value => `"${value}" жасау`,
  close: 'Жабу',
  closeCalendar: 'Күнтізбені жабу',
  copied: 'Көшірілді',
  copy: 'Көшіру',
  currentValue: 'Қазіргі мән',
  date: 'Күн',
  datePickerKeyboardHelp: 'Мәндерді өзгерту үшін көрсеткі пернелерін пайдаланыңыз; күнтізбені ашу үшін Alt+Төмен көрсеткі пернесін басыңыз.',
  day: 'Күн',
  decrement: 'Азайту',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Бос',
  endDate: 'Аяқталу күні',
  error: 'Қате',
  enterFullscreen: 'Толық экранға өту',
  exitFullscreen: 'Толық экраннан шығу',
  goToSlide: (slide, count) => `${slide}/${count} слайдқа өту`,
  hidePassword: 'Құпиясөзді жасыру',
  increment: 'Арттыру',
  loading: 'Жүктелуде',
  moreOptions: 'Қосымша опциялар',
  month: 'Ай',
  mute: 'Дыбысты өшіру',
  nextDecade: 'Келесі онжылдық',
  nextMonth: 'Келесі ай',
  nextSlide: 'Келесі слайд',
  nextVideo: 'Келесі бейне',
  nextYear: 'Келесі жыл',
  numCharacters: num => {
    if (num === 1) return '1 таңба';
    return `${num} таңба`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 таңба қалды';
    return `${num} таңба қалды`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Ештеңе таңдалмады';
    if (num < 6 || num === 7) return `${num}-еу таңдалды`;
    if (num === 6) return `${num}-ау таңдалды`;
    return `${num} таңдалды`;
  },
  pause: 'Тоқтату',
  pauseAnimation: 'Анимацияны тоқтату',
  pictureInPicture: 'Суретте сурет',
  play: 'Ойнату',
  playbackSpeed: 'Ойнату жылдамдығы',
  playlist: 'Ойнату тізімі',
  playAnimation: 'Анимацияны ойнату',
  previousDecade: 'Алдыңғы онжылдық',
  previousMonth: 'Алдыңғы ай',
  previousSlide: 'Алдыңғы слайд',
  previousVideo: 'Алдыңғы бейне',
  previousYear: 'Алдыңғы жыл',
  progress: 'Прогресс',
  remove: 'Жою',
  resize: 'Өлшемін өзгерту',
  scrollableRegion: 'Көтеру/түсіруге болатын аймақ (скролл)',
  scrollToEnd: 'Соңына түсіру',
  scrollToStart: 'Басына көтеру',
  selectAColorFromTheScreen: 'Экраннан түсті таңдаңыз',
  showPassword: 'Құпиясөзді көрсету',
  slideNum: slide => `${slide}-слайд`,
  startDate: 'Басталу күні',
  toggleColorFormat: 'Түс пішімін ауыстыру',
  seek: 'Іздеу',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'қазір ойнатылуда',
  unmute: 'Дыбысты қосу',
  videoPlayer: 'Бейне ойнатқыш',
  volume: 'Дыбыс деңгейі',
  year: 'Жыл',
  zoomIn: 'Жақындату',
  zoomOut: 'Алыстату',
};

registerTranslation(translation);

export default translation;
