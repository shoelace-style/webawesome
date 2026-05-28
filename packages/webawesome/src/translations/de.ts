import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'de',
  $name: 'Deutsch',
  $dir: 'ltr',

  am: 'AM',
  carousel: 'Karussell',
  captions: 'Untertitel',
  chooseDate: 'Datum auswählen',
  chooseDecade: 'Jahrzehnt auswählen',
  chooseMonth: 'Monat auswählen',
  chooseTime: 'Uhrzeit auswählen',
  chooseYear: 'Jahr auswählen',
  clearEntry: 'Eingabe löschen',
  createOption: value => `„${value}" erstellen`,
  close: 'Schließen',
  closeCalendar: 'Kalender schließen',
  closeTimePicker: 'Uhrzeitauswahl schließen',
  copied: 'Kopiert',
  copy: 'Kopieren',
  currentValue: 'Aktueller Wert',
  date: 'Datum',
  datePickerKeyboardHelp: 'Verwenden Sie die Pfeiltasten, um Werte zu ändern; drücken Sie Alt+Pfeil nach unten, um den Kalender zu öffnen.',
  day: 'Tag',
  dayPeriod: 'AM/PM',
  decrement: 'Verringern',
  dropFileHere: 'Datei hier ablegen oder zum Durchsuchen klicken',
  dropFilesHere: 'Dateien hier ablegen oder zum Durchsuchen klicken',
  empty: 'Leer',
  endDate: 'Enddatum',
  error: 'Fehler',
  enterFullscreen: 'Vollbildmodus aktivieren',
  exitFullscreen: 'Vollbildmodus beenden',
  goToSlide: (slide, count) => `Zu Folie ${slide} von ${count} gehen`,
  hidePassword: 'Passwort verbergen',
  hour: 'Stunde',
  incompleteDate: 'Geben Sie ein vollständiges Datum ein.',
  increment: 'Erhöhen',
  loading: 'Wird geladen',
  minute: 'Minute',
  month: 'Monat',
  moreOptions: 'Weitere Optionen',
  mute: 'Stummschalten',
  nextDecade: 'Nächstes Jahrzehnt',
  nextMonth: 'Nächster Monat',
  nextSlide: 'Nächste Folie',
  nextVideo: 'Nächstes Video',
  nextYear: 'Nächstes Jahr',
  now: 'Jetzt',
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
  pm: 'PM',
  previousDecade: 'Vorheriges Jahrzehnt',
  previousMonth: 'Vorheriger Monat',
  previousSlide: 'Vorherige Folie',
  previousVideo: 'Vorheriges Video',
  previousYear: 'Vorheriges Jahr',
  progress: 'Fortschritt',
  rangeTooLong: max => {
    if (max === 1) return 'Wählen Sie einen Zeitraum von höchstens 1 Tag';
    return `Wählen Sie einen Zeitraum von höchstens ${max} Tagen`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Wählen Sie einen Zeitraum von mindestens 1 Tag';
    return `Wählen Sie einen Zeitraum von mindestens ${min} Tagen`;
  },
  remove: 'Entfernen',
  resize: 'Größe ändern',
  scrollableRegion: 'Scrollbarer Bereich',
  scrollToEnd: 'Zum Ende scrollen',
  scrollToStart: 'Zum Anfang scrollen',
  second: 'Sekunde',
  selectAColorFromTheScreen: 'Farbe vom Bildschirm auswählen',
  showPassword: 'Passwort anzeigen',
  slideNum: slide => `Folie ${slide}`,
  startDate: 'Startdatum',
  time: 'Uhrzeit',
  timePickerKeyboardHelp: 'Verwenden Sie die Pfeiltasten, um Werte zu ändern; drücken Sie Alt+Pfeil nach unten, um die Uhrzeitauswahl zu öffnen.',
  today: 'Heute',
  toggleColorFormat: 'Farbformat wechseln',
  seek: 'Suchen',
  seekProgress: (current, duration) => `${current} von ${duration}`,
  currentlyPlaying: 'wird gerade abgespielt',
  unmute: 'Stummschaltung aufheben',
  videoPlayer: 'Videoplayer',
  volume: 'Lautstärke',
  year: 'Jahr',
  zoomIn: 'Hineinzoomen',
  zoomOut: 'Herauszoomen',
};

registerTranslation(translation);

export default translation;
