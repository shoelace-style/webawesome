import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pt',
  $name: 'Português',
  $dir: 'ltr',

  carousel: 'Carrossel',
  captions: 'Legendas',
  chooseDate: 'Escolher data',
  chooseDecade: 'Escolher década',
  chooseMonth: 'Escolher mês',
  chooseYear: 'Escolher ano',
  clearEntry: 'Limpar entrada',
  createOption: value => `Criar "${value}"`,
  close: 'Fechar',
  closeCalendar: 'Fechar calendário',
  copied: 'Copiado',
  copy: 'Copiar',
  currentValue: 'Valor atual',
  date: 'Data',
  datePickerKeyboardHelp:
    'Use as teclas de seta para alterar os valores; pressione Alt+Seta para baixo para abrir o calendário.',
  day: 'Dia',
  decrement: 'Diminuir',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  empty: 'Vazio',
  endDate: 'Data de fim',
  error: 'Erro',
  enterFullscreen: 'Entrar em ecrã inteiro',
  exitFullscreen: 'Sair do ecrã inteiro',
  goToSlide: (slide, count) => `Vá para o slide ${slide} de ${count}`,
  hidePassword: 'Esconder a senha',
  increment: 'Aumentar',
  loading: 'Carregando',
  month: 'Mês',
  moreOptions: 'Mais opções',
  mute: 'Sem som',
  nextDecade: 'Próxima década',
  nextMonth: 'Próximo mês',
  nextSlide: 'Próximo slide',
  nextVideo: 'Próximo vídeo',
  nextYear: 'Próximo ano',
  numCharacters: num => {
    if (num === 1) return '1 caractere';
    return `${num} caracteres`;
  },
  numCharactersRemaining: num => {
    if (num === 1) return '1 caractere restante';
    return `${num} caracteres restantes`;
  },
  numOptionsSelected: num => {
    if (num === 0) return 'Nenhuma opção selecionada';
    if (num === 1) return '1 opção selecionada';
    return `${num} opções selecionadas`;
  },
  pause: 'Pausar',
  pauseAnimation: 'Pausar animação',
  pictureInPicture: 'Imagem em imagem',
  play: 'Reproduzir',
  playbackSpeed: 'Velocidade de reprodução',
  playlist: 'Lista de reprodução',
  playAnimation: 'Reproduzir animação',
  previousDecade: 'Década anterior',
  previousMonth: 'Mês anterior',
  previousSlide: 'Slide anterior',
  previousVideo: 'Vídeo anterior',
  previousYear: 'Ano anterior',
  progress: 'Progresso',
  remove: 'Remover',
  resize: 'Mudar o tamanho',
  scrollableRegion: 'Região rolável',
  scrollToEnd: 'Rolar até o final',
  scrollToStart: 'Rolar até o início',
  selectAColorFromTheScreen: 'Selecionar uma cor da tela',
  showPassword: 'Mostrar senha',
  slideNum: slide => `Slide ${slide}`,
  startDate: 'Data de início',
  toggleColorFormat: 'Trocar o formato de cor',
  seek: 'Procurar',
  seekProgress: (current, duration) => `${current} de ${duration}`,
  currentlyPlaying: 'a reproduzir',
  unmute: 'Ativar som',
  videoPlayer: 'Leitor de vídeo',
  volume: 'Volume',
  year: 'Ano',
  zoomIn: 'Aumentar zoom',
  zoomOut: 'Diminuir zoom',
};

registerTranslation(translation);

export default translation;
