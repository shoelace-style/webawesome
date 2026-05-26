import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  carousel: 'Carrusel',
  captions: 'Subtítulos',
  chooseDate: 'Elegir fecha',
  chooseDecade: 'Elegir década',
  chooseMonth: 'Elegir mes',
  chooseYear: 'Elegir año',
  clearEntry: 'Borrar entrada',
  createOption: value => `Crear "${value}"`,
  close: 'Cerrar',
  closeCalendar: 'Cerrar calendario',
  copied: 'Copiado',
  copy: 'Copiar',
  currentValue: 'Valor actual',
  date: 'Fecha',
  datePickerKeyboardHelp:
    'Use las teclas de flecha para cambiar los valores; presione Alt+Flecha abajo para abrir el calendario.',
  day: 'Día',
  decrement: 'Disminuir',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Vacío',
  endDate: 'Fecha de fin',
  error: 'Error',
  enterFullscreen: 'Entrar en pantalla completa',
  exitFullscreen: 'Salir de pantalla completa',
  goToSlide: (slide, count) => `Ir a la diapositiva ${slide} de ${count}`,
  hidePassword: 'Ocultar contraseña',
  increment: 'Aumentar',
  loading: 'Cargando',
  month: 'Mes',
  moreOptions: 'Más opciones',
  mute: 'Silenciar',
  nextDecade: 'Década siguiente',
  nextMonth: 'Mes siguiente',
  nextSlide: 'Siguiente diapositiva',
  nextVideo: 'Siguiente vídeo',
  nextYear: 'Año siguiente',
  numCharacters: num => {
    if (num === 1) return '1 carácter';
    return `${num} caracteres`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 carácter restante';
    return `${num} caracteres restantes`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'No hay opciones seleccionadas';
    if (num === 1) return '1 opción seleccionada';
    return `${num} opción seleccionada`;
  },
  pause: 'Pausar',
  pauseAnimation: 'Pausar animación',
  pictureInPicture: 'Imagen en imagen',
  play: 'Reproducir',
  playbackSpeed: 'Velocidad de reproducción',
  playlist: 'Lista de reproducción',
  playAnimation: 'Reproducir animación',
  previousDecade: 'Década anterior',
  previousMonth: 'Mes anterior',
  previousSlide: 'Diapositiva anterior',
  previousVideo: 'Vídeo anterior',
  previousYear: 'Año anterior',
  progress: 'Progreso',
  remove: 'Eliminar',
  resize: 'Cambiar el tamaño',
  scrollableRegion: 'Región desplazable',
  scrollToEnd: 'Desplazarse hasta el final',
  scrollToStart: 'Desplazarse al inicio',
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  showPassword: 'Mostrar contraseña',
  slideNum: slide => `Diapositiva ${slide}`,
  startDate: 'Fecha de inicio',
  toggleColorFormat: 'Alternar formato de color',
  seek: 'Buscar',
  seekProgress: (current, duration) => `${current} de ${duration}`,
  currentlyPlaying: 'reproduciendo actualmente',
  unmute: 'Activar sonido',
  videoPlayer: 'Reproductor de vídeo',
  volume: 'Volumen',
  year: 'Año',
  zoomIn: 'Acercar',
  zoomOut: 'Alejar',
};

registerTranslation(translation);

export default translation;
