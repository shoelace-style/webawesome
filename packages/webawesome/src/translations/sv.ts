import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'sv',
  $name: 'Svenska',
  $dir: 'ltr',

  carousel: 'Karusell',
  captions: 'Undertexter',
  clearEntry: 'Återställ val',
  close: 'Stäng',
  copied: 'Kopierade',
  copy: 'Kopiera',
  currentValue: 'Nuvarande värde',
  decrement: 'Minska',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Fel',
  enterFullscreen: 'Gå till helskärm',
  exitFullscreen: 'Avsluta helskärm',
  goToSlide: (slide, count) => `Gå till bild ${slide} av ${count}`,
  hidePassword: 'Dölj lösenord',
  increment: 'Öka',
  loading: 'Läser in',
  mute: 'Stäng av ljud',
  nextSlide: 'Nästa bild',
  nextVideo: 'Nästa video',
  numOptionsSelected: num => {
    if (num === 0) return 'Inga alternativ har valts';
    if (num === 1) return '1 alternativ valt';
    return `${num} alternativ valda`;
  },
  pause: 'Pausa',
  pauseAnimation: 'Pausa animation',
  pictureInPicture: 'Bild i bild',
  play: 'Spela',
  playbackSpeed: 'Uppspelningshastighet',
  playlist: 'Spellista',
  playAnimation: 'Spela upp animation',
  previousSlide: 'Föregående bild',
  previousVideo: 'Föregående video',
  progress: 'Framsteg',
  remove: 'Ta bort',
  resize: 'Ändra storlek',
  scrollableRegion: 'Scrollbart område',
  scrollToEnd: 'Skrolla till slutet',
  scrollToStart: 'Skrolla till början',
  selectAColorFromTheScreen: 'Välj en färg från skärmen',
  showPassword: 'Visa lösenord',
  slideNum: slide => `Bild ${slide}`,
  toggleColorFormat: 'Växla färgformat',
  unmute: 'Slå på ljud',
  videoPlayer: 'Videospelare',
  volume: 'Volym',
  zoomIn: 'Zooma in',
  zoomOut: 'Zooma ut',
};

registerTranslation(translation);

export default translation;
