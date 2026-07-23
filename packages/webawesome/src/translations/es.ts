import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'es',
  $name: 'Español',
  $dir: 'ltr',

  am: 'AM',
  autosizeColumn: 'Ajustar el tamaño de la columna al contenido',
  captions: 'Subtítulos',
  carousel: 'Carrusel',
  chooseDate: 'Elegir fecha',
  chooseDecade: 'Elegir década',
  chooseMonth: 'Elegir mes',
  chooseTime: 'Elegir hora',
  chooseYear: 'Elegir año',
  clearEntry: 'Borrar entrada',
  clearFilter: 'Borrar filtro',
  clearSort: 'Borrar orden',
  close: 'Cerrar',
  closeCalendar: 'Cerrar calendario',
  closeTimeInput: 'Cerrar selector de hora',
  collapseRow: 'Contraer fila',
  columnMenu: 'Opciones de columna',
  columnMovedToPosition: (label, position, total) => `${label} movida a la posición ${position} de ${total}`,
  columns: 'Columnas',
  compactPageXOfY: (page, total) => `${page} de ${total}`,
  copied: 'Copiado',
  copy: 'Copiar',
  createOption: value => `Crear "${value}"`,
  currentlyPlaying: 'reproduciendo actualmente',
  currentValue: 'Valor actual',
  date: 'Fecha',
  datePickerKeyboardHelp:
    'Use las teclas de flecha para cambiar los valores; presione Alt+Flecha abajo para abrir el calendario.',
  day: 'Día',
  dayPeriod: 'AM/PM',
  decrement: 'Disminuir',
  deselectAllRows: 'Deseleccionar todas las filas',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Vacío',
  endDate: 'Fecha de fin',
  enterFullscreen: 'Entrar en pantalla completa',
  error: 'Error',
  exitFullscreen: 'Salir de pantalla completa',
  expandRow: 'Expandir fila',
  filterByColumn: label => `Filtrar por ${label}`,
  filterFrom: 'Desde',
  filterMax: 'Máx',
  filterMin: 'Mín',
  filterTo: 'Hasta',
  firstPage: 'Primera página',
  goToSlide: (slide, count) => `Ir a la diapositiva ${slide} de ${count}`,
  hideColumn: 'Ocultar columna',
  hidePassword: 'Ocultar contraseña',
  hour: 'Hora',
  incompleteDate: 'Introduzca una fecha válida.',
  increment: 'Aumentar',
  jumpBackwardX: count => {
    if (count === 1) return 'Retroceder 1 página';
    return `Retroceder ${count} páginas`;
  },
  jumpForwardX: count => {
    if (count === 1) return 'Avanzar 1 página';
    return `Avanzar ${count} páginas`;
  },
  lastPage: 'Última página',
  loading: 'Cargando',
  minute: 'Minuto',
  month: 'Mes',
  moreOptions: 'Más opciones',
  mute: 'Silenciar',
  nextDecade: 'Década siguiente',
  nextMonth: 'Mes siguiente',
  nextPage: 'Página siguiente',
  nextSlide: 'Siguiente diapositiva',
  nextVideo: 'Siguiente vídeo',
  nextYear: 'Año siguiente',
  noData: 'No hay datos',
  noResults: 'No hay resultados coincidentes',
  now: 'Ahora',
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
  numRowsCopied: num => (num === 1 ? '1 fila copiada' : `${num} filas copiadas`),
  numRowsSelected: num => (num === 1 ? '1 fila seleccionada' : `${num} filas seleccionadas`),
  pageXOfY: (page, total) => `Página ${page} de ${total}`,
  pagination: 'Paginación',
  pause: 'Pausar',
  pauseAnimation: 'Pausar animación',
  pictureInPicture: 'Imagen en imagen',
  pinLeft: 'Fijar a la izquierda',
  pinRight: 'Fijar a la derecha',
  play: 'Reproducir',
  playAnimation: 'Reproducir animación',
  playbackSpeed: 'Velocidad de reproducción',
  playlist: 'Lista de reproducción',
  pm: 'PM',
  previousDecade: 'Década anterior',
  previousMonth: 'Mes anterior',
  previousPage: 'Página anterior',
  previousSlide: 'Diapositiva anterior',
  previousVideo: 'Vídeo anterior',
  previousYear: 'Año anterior',
  progress: 'Progreso',
  rangeTooLong: max => {
    if (max === 1) return 'Seleccione un intervalo no mayor de 1 día';
    return `Seleccione un intervalo no mayor de ${max} días`;
  },
  rangeTooShort: min => {
    if (min === 1) return 'Seleccione un intervalo de al menos 1 día';
    return `Seleccione un intervalo de al menos ${min} días`;
  },
  readonly: 'Solo lectura',
  remove: 'Eliminar',
  resetColumns: 'Restablecer columnas',
  resize: 'Cambiar el tamaño',
  resizeColumn: 'Cambiar el tamaño de la columna',
  rowsPerPage: 'Filas por página',
  scrollableRegion: 'Región desplazable',
  scrollToEnd: 'Desplazarse hasta el final',
  scrollToStart: 'Desplazarse al inicio',
  search: 'Buscar',
  second: 'Segundo',
  seek: 'Buscar',
  seekProgress: (current, duration) => `${current} de ${duration}`,
  selectAColorFromTheScreen: 'Seleccione un color de la pantalla',
  selectAllRows: 'Seleccionar todas las filas',
  selected: 'Seleccionado',
  selectedDateLabel: date => `Seleccionado: ${date}`,
  selectedRangeLabel: range => `Intervalo seleccionado: ${range}`,
  selectGroup: 'Seleccionar grupo',
  selectionCleared: 'Selección borrada',
  selectRow: 'Seleccionar fila',
  showingNofMRows: (shown, total) => `Mostrando ${shown} de ${total} filas`,
  showingXtoYofZ: (start, end, total) => `${start}–${end} de ${total}`,
  showPassword: 'Mostrar contraseña',
  slideNum: slide => `Diapositiva ${slide}`,
  sortAscending: 'Ordenar de forma ascendente',
  sortColumn: 'Ordenar columna',
  sortDescending: 'Ordenar de forma descendente',
  startDate: 'Fecha de inicio',
  time: 'Hora',
  timeInputKeyboardHelp:
    'Use las teclas de flecha para cambiar los valores; presione Alt+Flecha abajo para abrir el selector de hora.',
  today: 'Hoy',
  toggleColorFormat: 'Alternar formato de color',
  unmute: 'Activar sonido',
  unpin: 'Desfijar',
  unpinColumn: 'Desfijar columna',
  videoPlayer: 'Reproductor de vídeo',
  volume: 'Volumen',
  year: 'Año',
  zoomIn: 'Acercar',
  zoomOut: 'Alejar',
};

registerTranslation(translation);

export default translation;
