import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'ru',
  $name: 'Русский',
  $dir: 'ltr',

  carousel: 'Карусель',
  captions: 'Субтитры',
  clearEntry: 'Очистить запись',
  createOption: value => `Создать «${value}»`,
  close: 'Закрыть',
  copied: 'Скопировано',
  copy: 'Скопировать',
  currentValue: 'Текущее значение',
  decrement: 'Уменьшить',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Ошибка',
  enterFullscreen: 'Перейти в полноэкранный режим',
  exitFullscreen: 'Выйти из полноэкранного режима',
  goToSlide: (slide, count) => `Перейти к слайду ${slide} из ${count}`,
  hidePassword: 'Скрыть пароль',
  increment: 'Увеличить',
  loading: 'Загрузка',
  moreOptions: 'Дополнительные параметры',
  mute: 'Выключить звук',
  nextSlide: 'Следующий слайд',
  nextVideo: 'Следующее видео',
  numCharacters: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} символа`;
    return `${num} символов`;
  },
  numCharactersRemaining: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Остался ${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Осталось ${num} символа`;
    return `Осталось ${num} символов`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'выбрано 0 вариантов';
    if (num === 1) return 'Выбран 1 вариант';
    return `выбрано ${num} варианта`;
  },
  pause: 'Пауза',
  pauseAnimation: 'Приостановить анимацию',
  pictureInPicture: 'Картинка в картинке',
  play: 'Воспроизвести',
  playbackSpeed: 'Скорость воспроизведения',
  playlist: 'Плейлист',
  playAnimation: 'Воспроизвести анимацию',
  previousSlide: 'Предыдущий слайд',
  previousVideo: 'Предыдущее видео',
  progress: 'Прогресс',
  remove: 'Удалить',
  resize: 'Изменить размер',
  scrollableRegion: 'Scrollable region',
  scrollToEnd: 'Пролистать до конца',
  scrollToStart: 'Пролистать к началу',
  selectAColorFromTheScreen: 'Выберите цвет на экране',
  showPassword: 'Показать пароль',
  slideNum: slide => `Слайд ${slide}`,
  toggleColorFormat: 'Переключить цветовую модель',
  seek: 'Поиск',
  seekProgress: (current, duration) => `${current} из ${duration}`,
  currentlyPlaying: 'воспроизводится сейчас',
  unmute: 'Включить звук',
  videoPlayer: 'Видеоплеер',
  volume: 'Громкость',
  zoomIn: 'Увеличить',
  zoomOut: 'Уменьшить',
};

registerTranslation(translation);

export default translation;
