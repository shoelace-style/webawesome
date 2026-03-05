import type { Translation } from '../utilities/localize.js';
import { registerTranslation } from '../utilities/localize.js';

const translation: Translation = {
  $code: 'zh-cn',
  $name: '简体中文',
  $dir: 'ltr',

  carousel: '跑马灯',
  captions: '字幕',
  clearEntry: '清空',
  close: '关闭',
  copied: '已复制',
  copy: '复制',
  currentValue: '当前值',
  decrement: '减少',
  dropFileHere: 'Drop file here or click to browse',
  dropFilesHere: 'Drop files here or click to browse',
  error: '错误',
  enterFullscreen: '进入全屏',
  exitFullscreen: '退出全屏',
  goToSlide: (slide, count) => `转到第 ${slide} 张幻灯片，共 ${count} 张`,
  hidePassword: '隐藏密码',
  increment: '增加',
  loading: '加载中',
  mute: '静音',
  nextSlide: '下一张幻灯片',
  nextVideo: '下一个视频',
  numOptionsSelected: num => {
    if (num === 0) return '未选择任何项目';
    if (num === 1) return '已选择 1 个项目';
    return `${num} 选择项目`;
  },
  pause: '暂停',
  pauseAnimation: '暂停动画',
  pictureInPicture: '画中画',
  play: '播放',
  playbackSpeed: '播放速度',
  playlist: '播放列表',
  playAnimation: '播放动画',
  previousSlide: '上一张幻灯片',
  previousVideo: '上一个视频',
  progress: '进度',
  remove: '删除',
  resize: '调整大小',
  scrollableRegion: '可滚动区域',
  scrollToEnd: '滚动至页尾',
  scrollToStart: '滚动至页首',
  selectAColorFromTheScreen: '从屏幕中选择一种颜色',
  showPassword: '显示密码',
  slideNum: slide => `幻灯片 ${slide}`,
  toggleColorFormat: '切换颜色模式',
  unmute: '取消静音',
  videoPlayer: '视频播放器',
  volume: '音量',
  zoomIn: '放大',
  zoomOut: '缩小',
};

registerTranslation(translation);

export default translation;
