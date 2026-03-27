import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'hu',
  $name: 'Magyar',
  $dir: 'ltr',

  carousel: 'Körhinta',
  clearEntry: 'Bejegyzés törlése',
  createOption: value => `„${value}" létrehozása`,
  close: 'Bezárás',
  copied: 'Másolva',
  copy: 'Másolás',
  currentValue: 'Aktuális érték',
  decrement: 'Csökkentés',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Hiba',
  goToSlide: (slide, count) => `Ugrás a ${count}/${slide}. diára`,
  hidePassword: 'Jelszó elrejtése',
  increment: 'Növelés',
  loading: 'Betöltés',
  nextSlide: 'Következő dia',
  numOptionsSelected: num => {
    if (num === 0) return 'Nincsenek kiválasztva opciók';
    if (num === 1) return '1 lehetőség kiválasztva';
    return `${num} lehetőség kiválasztva`;
  },
  pauseAnimation: 'Animáció szüneteltetése',
  playAnimation: 'Animáció lejátszása',
  previousSlide: 'Előző dia',
  progress: 'Folyamat',
  remove: 'Eltávolítás',
  resize: 'Átméretezés',
  scrollableRegion: 'Görgethető terület',
  scrollToEnd: 'Görgessen a végére',
  scrollToStart: 'Görgessen az elejére',
  selectAColorFromTheScreen: 'Szín választása a képernyőről',
  showPassword: 'Jelszó megjelenítése',
  slideNum: slide => `${slide}. dia`,
  toggleColorFormat: 'Színformátum változtatása',
  zoomIn: 'Nagyítás',
  zoomOut: 'Kicsinyítés',
};

registerTranslation(translation);

export default translation;
