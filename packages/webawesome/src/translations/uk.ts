import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'uk',
  $name: 'Українська',
  $dir: 'ltr',

  am: 'AM',
  carousel: 'Карусель',
  captions: 'Субтитри',
  chooseDate: 'Виберіть дату',
  chooseDecade: 'Виберіть десятиліття',
  chooseMonth: 'Виберіть місяць',
  chooseTime: 'Виберіть час',
  chooseYear: 'Виберіть рік',
  clearEntry: 'Очистити поле',
  createOption: value => `Створити «${value}»`,
  close: 'Закрити',
  closeCalendar: 'Закрити календар',
  closeTimePicker: 'Закрити вибір часу',
  copied: 'Скопійовано',
  copy: 'Скопіювати',
  currentValue: 'Поточне значення',
  date: 'Дата',
  datePickerKeyboardHelp:
    'Використовуйте стрілки для зміни значень; натисніть Alt+Стрілка вниз, щоб відкрити календар.',
  day: 'День',
  dayPeriod: 'AM/PM',
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
  hour: 'Година',
  incompleteDate: 'Введіть повну дату.',
  increment: 'Збільшити',
  loading: 'Завантаження',
  minute: 'Хвилина',
  moreOptions: 'Більше параметрів',
  month: 'Місяць',
  mute: 'Вимкнути звук',
  nextDecade: 'Наступне десятиліття',
  nextMonth: 'Наступний місяць',
  nextSlide: 'Наступний слайд',
  nextVideo: 'Наступне відео',
  nextYear: 'Наступний рік',
  now: 'Зараз',
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
  pm: 'PM',
  previousDecade: 'Попереднє десятиліття',
  previousMonth: 'Попередній місяць',
  previousSlide: 'Попередній слайд',
  previousVideo: 'Попереднє відео',
  previousYear: 'Попередній рік',
  progress: 'Поступ',
  rangeTooLong: max => {
    const mod10 = max % 10;
    const mod100 = max % 100;
    if (mod10 === 1 && mod100 !== 11) return `Виберіть діапазон не довший за ${max} день`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Виберіть діапазон не довший за ${max} дні`;
    return `Виберіть діапазон не довший за ${max} днів`;
  },
  rangeTooShort: min => {
    const mod10 = min % 10;
    const mod100 = min % 100;
    if (mod10 === 1 && mod100 !== 11) return `Виберіть діапазон завдовжки щонайменше ${min} день`;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14))
      return `Виберіть діапазон завдовжки щонайменше ${min} дні`;
    return `Виберіть діапазон завдовжки щонайменше ${min} днів`;
  },
  readonly: 'Лише для читання',
  remove: 'Видалити',
  resize: 'Змінити розмір',
  scrollableRegion: 'Область з можливістю прокрутки',
  scrollToEnd: 'Прокрутити в кінець',
  scrollToStart: 'Прокрутити на початок',
  second: 'Секунда',
  selectAColorFromTheScreen: 'Виберіть колір на екрані',
  selected: 'Вибрано',
  selectedDateLabel: date => `Вибрано: ${date}`,
  selectedRangeLabel: range => `Вибраний діапазон: ${range}`,
  selectionCleared: 'Вибір очищено',
  showPassword: 'Показати пароль',
  slideNum: slide => `Слайд ${slide}`,
  startDate: 'Дата початку',
  time: 'Час',
  timePickerKeyboardHelp:
    'Використовуйте стрілки для зміни значень; натисніть Alt+Стрілка вниз, щоб відкрити засіб вибору часу.',
  today: 'Сьогодні',
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
