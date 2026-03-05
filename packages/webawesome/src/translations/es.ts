import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  carousel: 'Carrusel',
  captions: 'Subtítulos',
  clearEntry: 'Borrar entrada',
  close: 'Cerrar',
  copied: 'Copiado',
  copy: 'Copiar',
  currentValue: 'Valor actual',
  decrement: 'Disminuir',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Error',
  enterFullscreen: 'Entrar en pantalla completa',
  exitFullscreen: 'Salir de pantalla completa',
  goToSlide: (slide, count) => `Ir a la diapositiva ${slide} de ${count}`,
  hidePassword: 'Ocultar contraseña',
  increment: 'Aumentar',
  loading: 'Cargando',
  mute: 'Silenciar',
  nextSlide: 'Siguiente diapositiva',
  nextVideo: 'Siguiente vídeo',
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
  previousSlide: 'Diapositiva anterior',
  previousVideo: 'Vídeo anterior',
  progress: 'Progreso',
  remove: 'Eliminar',
  resize: 'Cambiar el tamaño',
  scrollableRegion: 'Región desplazable',
  scrollToEnd: 'Desplazarse hasta el final',
  scrollToStart: 'Desplazarse al inicio',
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  showPassword: 'Mostrar contraseña',
  slideNum: slide => `Diapositiva ${slide}`,
  toggleColorFormat: 'Alternar formato de color',
  unmute: 'Activar sonido',
  videoPlayer: 'Reproductor de vídeo',
  volume: 'Volumen',
  zoomIn: 'Acercar',
  zoomOut: 'Alejar',
};

registerTranslation(translation);

export default translation;
