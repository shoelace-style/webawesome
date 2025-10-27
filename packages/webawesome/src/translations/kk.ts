import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'kk',
  $name: 'Қазақ',
  $dir: 'ltr',

  carousel: 'Карусель',
  clearEntry: 'Жазбаны жою',
  close: 'Жабу',
  copied: 'Көшірілді',
  copy: 'Көшіру',
  currentValue: 'Қазіргі мән',
  error: 'Қате',
  goToSlide: (slide, count) => `${slide}/${count} слайдқа өту`,
  hidePassword: 'Құпиясөзді жасыру',
  loading: 'Жүктелуде',
  nextSlide: 'Келесі слайд',
  numOptionsSelected: num => {
    if (num === 0) return 'Ештеңе таңдалмады';
    if (num < 6 || num === 7) return `${num}-еу таңдалды`;
    if (num === 6) return `${num}-ау таңдалды`;
    return `${num} таңдалды`;
  },
  pauseAnimation: 'Анимацияны тоқтату',
  playAnimation: 'Анимацияны ойнату',
  previousSlide: 'Алдыңғы слайд',
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
  zoomIn: 'Жақындату',
  zoomOut: 'Алыстату',
};

registerTranslation(translation);

export default translation;
