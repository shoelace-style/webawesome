import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'fr',
  $name: 'Français',
  $dir: 'ltr',

  am: 'AM',
  carousel: 'Carrousel',
  captions: 'Sous-titres',
  chooseDate: 'Choisir la date',
  chooseDecade: 'Choisir la décennie',
  chooseMonth: 'Choisir le mois',
  chooseTime: `Choisir l'heure`,
  chooseYear: `Choisir l'année`,
  clearEntry: `Effacer l'entrée`,
  createOption: value => `Créer « ${value} »`,
  close: 'Fermer',
  closeCalendar: 'Fermer le calendrier',
  closeTimePicker: `Fermer le sélecteur d'heure`,
  copied: 'Copié',
  copy: 'Copier',
  currentValue: 'Valeur actuelle',
  date: 'Date',
  datePickerKeyboardHelp:
    'Utilisez les touches fléchées pour modifier les valeurs ; appuyez sur Alt+Flèche bas pour ouvrir le calendrier.',
  day: 'Jour',
  dayPeriod: 'AM/PM',
  decrement: 'Diminuer',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Vide',
  endDate: 'Date de fin',
  error: 'Erreur',
  enterFullscreen: 'Passer en plein écran',
  exitFullscreen: 'Quitter le plein écran',
  goToSlide: (slide, count) => `Aller à la diapositive ${slide} de ${count}`,
  hidePassword: 'Masquer le mot de passe',
  hour: 'Heure',
  incompleteDate: 'Saisissez une date complète.',
  increment: 'Augmenter',
  loading: 'Chargement',
  minute: 'Minute',
  month: 'Mois',
  moreOptions: "Plus d'options",
  mute: 'Couper le son',
  nextDecade: 'Décennie suivante',
  nextMonth: 'Mois suivant',
  nextSlide: 'Diapositive suivante',
  nextVideo: 'Vidéo suivante',
  nextYear: 'Année suivante',
  now: 'Maintenant',
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
  pm: 'PM',
  previousDecade: 'Décennie précédente',
  previousMonth: 'Mois précédent',
  previousSlide: 'Diapositive précédente',
  previousVideo: 'Vidéo précédente',
  previousYear: 'Année précédente',
  progress: 'Progrès',
  rangeTooLong: max => {
    if (max === 1) return 'Sélectionnez une plage ne dépassant pas 1 jour';
    return `Sélectionnez une plage ne dépassant pas ${max} jours`;
  },
  rangeTooShort: min => {
    if (min === 1) return `Sélectionnez une plage d'au moins 1 jour`;
    return `Sélectionnez une plage d'au moins ${min} jours`;
  },
  readonly: 'Lecture seule',
  remove: 'Retirer',
  resize: 'Redimensionner',
  scrollableRegion: 'Région défilante',
  scrollToEnd: `Faire défiler jusqu'à la fin`,
  scrollToStart: `Faire défiler jusqu'au début`,
  second: 'Seconde',
  selectAColorFromTheScreen: `Sélectionnez une couleur à l'écran`,
  selected: 'Sélectionné',
  selectedDateLabel: date => `Sélectionné : ${date}`,
  selectedRangeLabel: range => `Plage sélectionnée : ${range}`,
  selectionCleared: 'Sélection effacée',
  showPassword: 'Montrer le mot de passe',
  slideNum: slide => `Diapositive ${slide}`,
  startDate: 'Date de début',
  time: 'Heure',
  timePickerKeyboardHelp: `Utilisez les touches fléchées pour modifier les valeurs ; appuyez sur Alt+Flèche bas pour ouvrir le sélecteur d'heure.`,
  today: `Aujourd'hui`,
  toggleColorFormat: 'Changer le format de couleur',
  seek: 'Rechercher',
  seekProgress: (current, duration) => `${current} sur ${duration}`,
  currentlyPlaying: 'en cours de lecture',
  unmute: 'Rétablir le son',
  videoPlayer: 'Lecteur vidéo',
  volume: 'Volume',
  year: 'Année',
  zoomIn: 'Zoomer',
  zoomOut: 'Dézoomer',
};

registerTranslation(translation);

export default translation;
