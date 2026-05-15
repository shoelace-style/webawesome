import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  carousel: 'Carrousel',
  captions: 'Sous-titres',
  chooseDecade: 'Choisir la décennie',
  chooseMonth: 'Choisir le mois',
  chooseYear: `Choisir l'année`,
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
  enterFullscreen: 'Passer en plein écran',
  exitFullscreen: 'Quitter le plein écran',
  goToSlide: (slide, count) => `Aller à la diapositive ${slide} de ${count}`,
  hidePassword: 'Masquer le mot de passe',
  increment: 'Augmenter',
  loading: 'Chargement',
  moreOptions: "Plus d'options",
  mute: 'Couper le son',
  nextDecade: 'Décennie suivante',
  nextMonth: 'Mois suivant',
  nextSlide: 'Diapositive suivante',
  nextVideo: 'Vidéo suivante',
  nextYear: 'Année suivante',
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
  pause: 'Pause',
  pauseAnimation: "Suspendre l'animation",
  pictureInPicture: `Image dans l'image`,
  play: 'Lecture',
  playbackSpeed: 'Vitesse de lecture',
  playlist: 'Liste de lecture',
  playAnimation: "Lire l'animation",
  previousDecade: 'Décennie précédente',
  previousMonth: 'Mois précédent',
  previousSlide: 'Diapositive précédente',
  previousVideo: 'Vidéo précédente',
  previousYear: 'Année précédente',
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
  seek: 'Rechercher',
  seekProgress: (current, duration) => `${current} sur ${duration}`,
  currentlyPlaying: 'en cours de lecture',
  unmute: 'Rétablir le son',
  videoPlayer: 'Lecteur vidéo',
  volume: 'Volume',
  zoomIn: 'Zoomer',
  zoomOut: 'Dézoomer',
};

registerTranslation(translation);

export default translation;
