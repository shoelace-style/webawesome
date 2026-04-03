import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'pt',
  $name: 'Português',
  $dir: 'ltr',

  carousel: 'Carrossel',
  clearEntry: 'Limpar entrada',
  createOption: value => `Criar "${value}"`,
  close: 'Fechar',
  copied: 'Copiado',
  copy: 'Copiar',
  currentValue: 'Valor atual',
  decrement: 'Diminuir',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: 'Erro',
  goToSlide: (slide, count) => `Vá para o slide ${slide} de ${count}`,
  hidePassword: 'Esconder a senha',
  increment: 'Aumentar',
  loading: 'Carregando',
  nextSlide: 'Próximo slide',
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
  pauseAnimation: 'Pausar animação',
  playAnimation: 'Reproduzir animação',
  previousSlide: 'Slide anterior',
  progress: 'Progresso',
  remove: 'Remover',
  resize: 'Mudar o tamanho',
  scrollableRegion: 'Região rolável',
  scrollToEnd: 'Rolar até o final',
  scrollToStart: 'Rolar até o início',
  selectAColorFromTheScreen: 'Selecionar uma cor da tela',
  showPassword: 'Mostrar senha',
  slideNum: slide => `Slide ${slide}`,
  toggleColorFormat: 'Trocar o formato de cor',
  zoomIn: 'Aumentar zoom',
  zoomOut: 'Diminuir zoom',
};

registerTranslation(translation);

export default translation;
