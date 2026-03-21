import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  carousel: 'Carrusel',
  clearEntry: 'Borrar entrada',
  createOption: value => `Crear "${value}"`,
  close: 'Cerrar',
  copied: 'Copiado',
  copy: 'Copiar',
  currentValue: 'Valor actual',
  decrement: 'Disminuir',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Error',
  goToSlide: (slide, count) => `Ir a la diapositiva ${slide} de ${count}`,
  hidePassword: 'Ocultar contraseña',
  increment: 'Aumentar',
  loading: 'Cargando',
  nextSlide: 'Siguiente diapositiva',
  numOptionsSelected: num => {
    if (num === 0) return 'No hay opciones seleccionadas';
    if (num === 1) return '1 opción seleccionada';
    return `${num} opción seleccionada`;
  },
  pauseAnimation: 'Pausar animación',
  playAnimation: 'Reproducir animación',
  previousSlide: 'Diapositiva anterior',
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
  zoomIn: 'Acercar',
  zoomOut: 'Alejar',
};

registerTranslation(translation);

export default translation;
