import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'kk',
  $name: 'Қазақ',
  $dir: 'ltr',

  carousel: 'Карусель',
  captions: 'Субтитрлер',
  clearEntry: 'Жазбаны жою',
  createOption: value => `"${value}" жасау`,
  close: 'Жабу',
  copied: 'Көшірілді',
  copy: 'Көшіру',
  currentValue: 'Қазіргі мән',
  decrement: 'Азайту',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Қате',
  enterFullscreen: 'Толық экранға өту',
  exitFullscreen: 'Толық экраннан шығу',
  goToSlide: (slide, count) => `${slide}/${count} слайдқа өту`,
  hidePassword: 'Құпиясөзді жасыру',
  increment: 'Арттыру',
  loading: 'Жүктелуде',
  moreOptions: 'Қосымша опциялар',
  mute: 'Дыбысты өшіру',
  nextSlide: 'Келесі слайд',
  nextVideo: 'Келесі бейне',
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
  previousSlide: 'Алдыңғы слайд',
  previousVideo: 'Алдыңғы бейне',
  progress: 'Прогресс',
  remove: 'Жою',
  resize: 'Өлшемін өзгерту',
  scrollableRegion: 'Көтеру/түсіруге болатын аймақ (скролл)',
  scrollToEnd: 'Соңына түсіру',
  scrollToStart: 'Басына көтеру',
  selectAColorFromTheScreen: 'Экраннан түсті таңдаңыз',
  showPassword: 'Құпиясөзді көрсету',
  slideNum: slide => `${slide}-слайд`,
  toggleColorFormat: 'Түс пішімін ауыстыру',
  seek: 'Іздеу',
  seekProgress: (current, duration) => `${current} / ${duration}`,
  currentlyPlaying: 'қазір ойнатылуда',
  unmute: 'Дыбысты қосу',
  videoPlayer: 'Бейне ойнатқыш',
  volume: 'Дыбыс деңгейі',
  zoomIn: 'Жақындату',
  zoomOut: 'Алыстату',
};

registerTranslation(translation);

export default translation;
