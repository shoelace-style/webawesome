import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  carousel: 'Karussell',
  captions: 'Untertitel',
  chooseDecade: 'Jahrzehnt auswählen',
  chooseMonth: 'Monat auswählen',
  chooseYear: 'Jahr auswählen',
  clearEntry: 'Eingabe löschen',
  createOption: value => `„${value}" erstellen`,
  close: 'Schließen',
  copied: 'Kopiert',
  copy: 'Kopieren',
  currentValue: 'Aktueller Wert',
  decrement: 'Verringern',
  dropFileHere: 'Datei hier ablegen oder zum Durchsuchen klicken',
  dropFilesHere: 'Dateien hier ablegen oder zum Durchsuchen klicken',
  error: 'Fehler',
  enterFullscreen: 'Vollbildmodus aktivieren',
  exitFullscreen: 'Vollbildmodus beenden',
  goToSlide: (slide, count) => `Zu Folie ${slide} von ${count} gehen`,
  hidePassword: 'Passwort verbergen',
  increment: 'Erhöhen',
  loading: 'Wird geladen',
  moreOptions: 'Weitere Optionen',
  mute: 'Stummschalten',
  nextDecade: 'Nächstes Jahrzehnt',
  nextMonth: 'Nächster Monat',
  nextSlide: 'Nächste Folie',
  nextVideo: 'Nächstes Video',
  nextYear: 'Nächstes Jahr',
  numCharacters: num => {
    if (num === 1) return '1 Zeichen';
    return `${num} Zeichen`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 Zeichen verbleibend';
    return `${num} Zeichen verbleibend`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Keine Optionen ausgewählt';
    if (num === 1) return '1 Option ausgewählt';
    return `${num} Optionen ausgewählt`;
  },
  pause: 'Pausieren',
  pauseAnimation: 'Animation pausieren',
  pictureInPicture: 'Bild im Bild',
  play: 'Abspielen',
  playbackSpeed: 'Abspielgeschwindigkeit',
  playlist: 'Wiedergabeliste',
  playAnimation: 'Animation abspielen',
  previousDecade: 'Vorheriges Jahrzehnt',
  previousMonth: 'Vorheriger Monat',
  previousSlide: 'Vorherige Folie',
  previousVideo: 'Vorheriges Video',
  previousYear: 'Vorheriges Jahr',
  progress: 'Fortschritt',
  remove: 'Entfernen',
  resize: 'Größe ändern',
  scrollableRegion: 'Scrollbarer Bereich',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  selectAColorFromTheScreen: 'Farbe vom Bildschirm auswählen',
  showPassword: 'Passwort anzeigen',
  slideNum: slide => `Folie ${slide}`,
  toggleColorFormat: 'Farbformat wechseln',
  seek: 'Suchen',
  seekProgress: (current, duration) => `${current} von ${duration}`,
  currentlyPlaying: 'wird gerade abgespielt',
  unmute: 'Stummschaltung aufheben',
  videoPlayer: 'Videoplayer',
  volume: 'Lautstärke',
  zoomIn: 'Hineinzoomen',
  zoomOut: 'Herauszoomen',
};

registerTranslation(translation);

export default translation;
