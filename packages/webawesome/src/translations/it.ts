import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'it',
  $name: 'Italiano',
  $dir: 'ltr',

  am: 'AM',
  carousel: 'Carosello',
  captions: 'Sottotitoli',
  chooseDate: 'Scegli data',
  chooseDecade: 'Scegli decennio',
  chooseMonth: 'Scegli mese',
  chooseTime: 'Scegli ora',
  chooseYear: 'Scegli anno',
  clearEntry: 'Cancella inserimento',
  createOption: value => `Crea "${value}"`,
  close: 'Chiudi',
  closeCalendar: 'Chiudi calendario',
  closeTimeInput: 'Chiudi selettore ora',
  copied: 'Copiato',
  copy: 'Copia',
  currentValue: 'Valore attuale',
  date: 'Data',
  datePickerKeyboardHelp:
    'Usa i tasti freccia per modificare i valori; premi Alt+Freccia giù per aprire il calendario.',
  day: 'Giorno',
  dayPeriod: 'AM/PM',
  decrement: 'Diminuisci',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Vuoto',
  endDate: 'Data di fine',
  error: 'Errore',
  enterFullscreen: 'Entra in modalità a schermo intero',
  exitFullscreen: 'Esci dalla modalità a schermo intero',
  goToSlide: (slide, count) => `Vai alla diapositiva ${slide} di ${count}`,
  hidePassword: 'Nascondi password',
  hour: 'Ora',
  incompleteDate: 'Inserisci una data completa.',
  increment: 'Aumenta',
  loading: 'In caricamento',
  minute: 'Minuto',
  month: 'Mese',
  moreOptions: 'Altre opzioni',
  mute: 'Disattiva audio',
  nextDecade: 'Decennio successivo',
  nextMonth: 'Mese successivo',
  nextSlide: 'Prossima diapositiva',
  nextVideo: 'Video successivo',
  nextYear: 'Anno successivo',
  now: 'Adesso',
  numCharacters: num => {
    if (num === 1) return '1 carattere';
    return `${num} caratteri`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 carattere rimanente';
    return `${num} caratteri rimanenti`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nessuna opzione selezionata';
    if (num === 1) return '1 opzione selezionata';
    return `${num} opzioni selezionate`;
  },
  pause: 'Pausa',
  pauseAnimation: 'Metti in pausa animazione',
  pictureInPicture: `Immagine nell'immagine`,
  play: 'Riproduci',
  playbackSpeed: 'Velocità di riproduzione',
  playlist: 'Playlist',
  playAnimation: 'Riproduci animazione',
  pm: 'PM',
  previousDecade: 'Decennio precedente',
  previousMonth: 'Mese precedente',
  previousSlide: 'Diapositiva precedente',
  previousVideo: 'Video precedente',
  previousYear: 'Anno precedente',
  progress: 'Avanzamento',
  rangeTooLong: max => {
    if (max === 1) return 'Seleziona un intervallo non superiore a 1 giorno';
    return `Seleziona un intervallo non superiore a ${max} giorni`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Seleziona un intervallo di almeno 1 giorno';
    return `Seleziona un intervallo di almeno ${min} giorni`;
  },
  readonly: 'Sola lettura',
  remove: 'Rimuovi',
  resize: 'Ridimensiona',
  scrollableRegion: 'Area scorrevole',
  scrollToEnd: 'Scorri alla fine',
  scrollToStart: "Scorri all'inizio",
  second: 'Secondo',
  selectAColorFromTheScreen: 'Seleziona un colore dalla schermo',
  selected: 'Selezionato',
  selectedDateLabel: date => `Selezionato: ${date}`,
  selectedRangeLabel: range => `Intervallo selezionato: ${range}`,
  selectionCleared: 'Selezione cancellata',
  showPassword: 'Mostra password',
  slideNum: slide => `Diapositiva ${slide}`,
  startDate: 'Data di inizio',
  time: 'Ora',
  timeInputKeyboardHelp:
    'Usa i tasti freccia per modificare i valori; premi Alt+Freccia giù per aprire il selettore ora.',
  today: 'Oggi',
  toggleColorFormat: 'Cambia formato colore',
  seek: 'Cerca',
  seekProgress: (current, duration) => `${current} di ${duration}`,
  currentlyPlaying: 'in riproduzione',
  unmute: 'Attiva audio',
  videoPlayer: 'Lettore video',
  volume: 'Volume',
  year: 'Anno',
  zoomIn: 'Ingrandire',
  zoomOut: 'Rimpicciolire',
};

registerTranslation(translation);

export default translation;
