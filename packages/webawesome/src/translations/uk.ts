import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'uk',
  $name: 'Українська',
  $dir: 'ltr',

  carousel: 'Карусель',
  captions: 'Субтитри',
  chooseDate: 'Виберіть дату',
  chooseDecade: 'Виберіть десятиліття',
  chooseMonth: 'Виберіть місяць',
  chooseYear: 'Виберіть рік',
  clearEntry: 'Очистити поле',
  createOption: value => `Створити «${value}»`,
  close: 'Закрити',
  closeCalendar: 'Закрити календар',
  copied: 'Скопійовано',
  copy: 'Скопіювати',
  currentValue: 'Поточне значення',
  date: 'Дата',
  datePickerKeyboardHelp: 'Використовуйте стрілки для зміни значень; натисніть Alt+Стрілка вниз, щоб відкрити календар.',
  day: 'День',
  decrement: 'Зменшити',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Порожньо',
  error: 'Збій',
  enterFullscreen: 'Перейти в повноекранний режим',
  endDate: 'Дата завершення',
  exitFullscreen: 'Вийти з повноекранного режиму',
  goToSlide: (slide, count) => `Перейти до слайда №${slide} з ${count}`,
  hidePassword: 'Приховати пароль',
  increment: 'Збільшити',
  loading: 'Завантаження',
  moreOptions: 'Більше параметрів',
  month: 'Місяць',
  mute: 'Вимкнути звук',
  nextDecade: 'Наступне десятиліття',
  nextMonth: 'Наступний місяць',
  nextSlide: 'Наступний слайд',
  nextVideo: 'Наступне відео',
  nextYear: 'Наступний рік',
  numCharacters: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} символи`;
    return `${num} символів`;
  },
  numCharactersRemaining: num => {
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 === 1 && mod100 !== 11) return `Залишився ${num} символ`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Залишилося ${num} символи`;
    return `Залишилося ${num} символів`;
  },
  numOptionsSelected: num => {
    const n = num % 10;
    if (n === 0) return 'не вибрано варіантів';
    if (n === 1) return 'вибрано 1 варіант';
    if (n === 2 || n === 3 || n === 4) return `вибрано ${num} варіанти`;
    return `вибрано ${num} варіантів`;
  },
  pause: 'Пауза',
  pauseAnimation: 'Призупинити анімацію',
  pictureInPicture: 'Картинка в картинці',
  play: 'Відтворити',
  playbackSpeed: 'Швидкість відтворення',
  playlist: 'Плейлист',
  playAnimation: 'Відтворити анімацію',
  previousDecade: 'Попереднє десятиліття',
  previousMonth: 'Попередній місяць',
  previousSlide: 'Попередній слайд',
  previousVideo: 'Попереднє відео',
  previousYear: 'Попередній рік',
  progress: 'Поступ',
  remove: 'Видалити',
  resize: 'Змінити розмір',
  scrollableRegion: 'Область з можливістю прокрутки',
  scrollToEnd: 'Прокрутити в кінець',
  scrollToStart: 'Прокрутити на початок',
  selectAColorFromTheScreen: 'Виберіть колір на екрані',
  showPassword: 'Показати пароль',
  slideNum: slide => `Слайд ${slide}`,
  startDate: 'Дата початку',
  toggleColorFormat: 'Переключити кольорову модель',
  seek: 'Пошук',
  seekProgress: (current, duration) => `${current} з ${duration}`,
  currentlyPlaying: 'зараз відтворюється',
  unmute: 'Увімкнути звук',
  videoPlayer: 'Відеоплеєр',
  volume: 'Гучність',
  year: 'Рік',
  zoomIn: 'Збільшити',
  zoomOut: 'Зменшити',
};

registerTranslation(translation);

export default translation;
