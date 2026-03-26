import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  carousel: 'Carrousel',
  clearEntry: `Effacer l'entrée`,
  createOption: value => `Créer « ${value} »`,
  close: 'Fermer',
  copied: 'Copié',
  copy: 'Copier',
  currentValue: 'Valeur actuelle',
  decrement: 'Diminuer',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Erreur',
  goToSlide: (slide, count) => `Aller à la diapositive ${slide} de ${count}`,
  hidePassword: 'Masquer le mot de passe',
  increment: 'Augmenter',
  loading: 'Chargement',
  nextSlide: 'Diapositive suivante',
  numCharacters: num => {
    if (num === 1) return '1 caractère';
    return `${num} caractères`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 caractère restant';
    return `${num} caractères restants`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Aucune option sélectionnée';
    if (num === 1) return '1 option sélectionnée';
    return `${num} options sélectionnées`;
  },
  pauseAnimation: "Suspendre l'animation",
  playAnimation: "Lire l'animation",
  previousSlide: 'Diapositive précédente',
  progress: 'Progrès',
  remove: 'Retirer',
  resize: 'Redimensionner',
  scrollableRegion: 'Région défilante',
  scrollToEnd: `Faire défiler jusqu'à la fin`,
  scrollToStart: `Faire défiler jusqu'au début`,
  selectAColorFromTheScreen: `Sélectionnez une couleur à l'écran`,
  showPassword: 'Montrer le mot de passe',
  slideNum: slide => `Diapositive ${slide}`,
  toggleColorFormat: 'Changer le format de couleur',
  zoomIn: 'Zoomer',
  zoomOut: 'Dézoomer',
};

registerTranslation(translation);

export default translation;
