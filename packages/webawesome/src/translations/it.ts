import { registerTranslation } from '@shoelace-style/localize';
import type { Translation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'it',
  $name: 'Italiano',
  $dir: 'ltr',

  carousel: 'Carosello',
  captions: 'Sottotitoli',
  chooseDecade: 'Scegli decennio',
  chooseMonth: 'Scegli mese',
  chooseYear: 'Scegli anno',
  clearEntry: 'Cancella inserimento',
  createOption: value => `Crea "${value}"`,
  close: 'Chiudi',
  copied: 'Copiato',
  copy: 'Copia',
  currentValue: 'Valore attuale',
  decrement: 'Diminuisci',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Errore',
  enterFullscreen: 'Entra in modalità a schermo intero',
  exitFullscreen: 'Esci dalla modalità a schermo intero',
  goToSlide: (slide, count) => `Vai alla diapositiva ${slide} di ${count}`,
  hidePassword: 'Nascondi password',
  increment: 'Aumenta',
  loading: 'In caricamento',
  moreOptions: 'Altre opzioni',
  mute: 'Disattiva audio',
  nextDecade: 'Decennio successivo',
  nextMonth: 'Mese successivo',
  nextSlide: 'Prossima diapositiva',
  nextVideo: 'Video successivo',
  nextYear: 'Anno successivo',
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
  previousDecade: 'Decennio precedente',
  previousMonth: 'Mese precedente',
  previousSlide: 'Diapositiva precedente',
  previousVideo: 'Video precedente',
  previousYear: 'Anno precedente',
  progress: 'Avanzamento',
  remove: 'Rimuovi',
  resize: 'Ridimensiona',
  scrollableRegion: 'Area scorrevole',
  scrollToEnd: 'Scorri alla fine',
  scrollToStart: "Scorri all'inizio",
  selectAColorFromTheScreen: 'Seleziona un colore dalla schermo',
  showPassword: 'Mostra password',
  slideNum: slide => `Diapositiva ${slide}`,
  toggleColorFormat: 'Cambia formato colore',
  seek: 'Cerca',
  seekProgress: (current, duration) => `${current} di ${duration}`,
  currentlyPlaying: 'in riproduzione',
  unmute: 'Attiva audio',
  videoPlayer: 'Lettore video',
  volume: 'Volume',
  zoomIn: 'Ingrandire',
  zoomOut: 'Rimpicciolire',
};

registerTranslation(translation);

export default translation;
