import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'cs',
  $name: 'Čeština',
  $dir: 'ltr',

  carousel: 'Karusel',
  captions: 'Titulky',
  clearEntry: 'Smazat položku',
  close: 'Zavřít',
  copied: 'Zkopírováno',
  copy: 'Kopírovat',
  currentValue: 'Současná hodnota',
  decrement: 'Snížit',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Chyba',
  enterFullscreen: 'Přejít na celou obrazovku',
  exitFullscreen: 'Ukončit celou obrazovku',
  goToSlide: (slide, count) => `Přejít na slide ${slide} z ${count}`,
  hidePassword: 'Skrýt heslo',
  increment: 'Zvýšit',
  loading: 'Nahrává se',
  mute: 'Ztlumit',
  nextSlide: 'Další slide',
  nextVideo: 'Další video',
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
  previousSlide: 'Předchozí slide',
  previousVideo: 'Předchozí video',
  progress: 'Průběh',
  remove: 'Odstranit',
  resize: 'Změnit velikost',
  scrollableRegion: 'Posunovatelná oblast',
  scrollToEnd: 'Scrollovat na konec',
  scrollToStart: 'Scrollovat na začátek',
  selectAColorFromTheScreen: 'Vybrat barvu z obrazovky',
  showPassword: 'Zobrazit heslo',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Přepnout formát barvy',
  seek: 'Přejít',
  seekProgress: (current, duration) => `${current} z ${duration}`,
  currentlyPlaying: 'právě se přehrává',
  unmute: 'Zapnout zvuk',
  videoPlayer: 'Přehrávač videa',
  volume: 'Hlasitost',
  zoomIn: 'Přiblížit',
  zoomOut: 'Oddálit',
};

registerTranslation(translation);

export default translation;
