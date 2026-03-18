import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pl',
  $name: 'Polski',
  $dir: 'ltr',

  carousel: 'Karuzela',
  captions: 'Napisy',
  clearEntry: 'Wyczyść wpis',
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
  nextSlide: 'Następny slajd',
  nextVideo: 'Następny film',
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
  previousSlide: 'Poprzedni slajd',
  previousVideo: 'Poprzedni film',
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
