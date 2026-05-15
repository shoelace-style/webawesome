import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  carousel: 'Karuzela',
  captions: 'Napisy',
  chooseDecade: 'Wybierz dekadę',
  chooseMonth: 'Wybierz miesiąc',
  chooseYear: 'Wybierz rok',
  clearEntry: 'Wyczyść wpis',
  createOption: value => `Utwórz "${value}"`,
  close: 'Zamknij',
  copied: 'Skopiowane',
  copy: 'Kopiuj',
  currentValue: 'Aktualna wartość',
  decrement: 'Zmniejsz',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Błąd',
  enterFullscreen: 'Włącz pełny ekran',
  exitFullscreen: 'Wyłącz pełny ekran',
  goToSlide: (slide, count) => `Przejdź do slajdu ${slide} z ${count}`,
  hidePassword: 'Ukryj hasło',
  increment: 'Zwiększ',
  loading: 'Ładowanie',
  moreOptions: 'Więcej opcji',
  mute: 'Wycisz',
  nextDecade: 'Następna dekada',
  nextMonth: 'Następny miesiąc',
  nextSlide: 'Następny slajd',
  nextVideo: 'Następny film',
  nextYear: 'Następny rok',
  numCharacters: num => {
    if (num === 1) return '1 znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `${num} znaki`;
    return `${num} znaków`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return 'Pozostał 1 znak';
    const mod10 = num % 10;
    const mod100 = num % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return `Pozostały ${num} znaki`;
    return `Pozostało ${num} znaków`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nie wybrano opcji';
    if (num === 1) return 'Wybrano 1 opcję';
    return `Wybrano ${num} opcje`;
  },
  pause: 'Wstrzymaj',
  pauseAnimation: 'Wstrzymaj animację',
  pictureInPicture: 'Obraz w obrazie',
  play: 'Odtwórz',
  playbackSpeed: 'Prędkość odtwarzania',
  playlist: 'Lista odtwarzania',
  playAnimation: 'Odtwórz animację',
  previousDecade: 'Poprzednia dekada',
  previousMonth: 'Poprzedni miesiąc',
  previousSlide: 'Poprzedni slajd',
  previousVideo: 'Poprzedni film',
  previousYear: 'Poprzedni rok',
  progress: 'Postęp',
  remove: 'Usunąć',
  resize: 'Zmień rozmiar',
  scrollableRegion: 'Obszar przewijalny',
  scrollToEnd: 'Przewiń do końca',
  scrollToStart: 'Przewiń do początku',
  selectAColorFromTheScreen: 'Próbkuj z ekranu',
  showPassword: 'Pokaż hasło',
  slideNum: slide => `Slajd ${slide}`,
  toggleColorFormat: 'Przełącz format',
  seek: 'Szukaj',
  seekProgress: (current, duration) => `${current} z ${duration}`,
  currentlyPlaying: 'aktualnie odtwarzane',
  unmute: 'Włącz dźwięk',
  videoPlayer: 'Odtwarzacz wideo',
  volume: 'Głośność',
  zoomIn: 'Powiększ',
  zoomOut: 'Pomniejsz',
};

registerTranslation(translation);

export default translation;
