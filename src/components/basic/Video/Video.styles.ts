/**
 * Video 组件样式定义
 * 按子组件拆分样式，提高可维护性和可扩展性
 * @module components/basic/Video/styles
 */

// 类型定义
export interface ViewStyle {
  position?: 'absolute' | 'relative' | 'fixed' | 'sticky';
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  width?: number | string;
  height?: number | string;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'bolder' | 'lighter' | number;
  fontFamily?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  display?: 'flex' | 'block' | 'inline' | 'none';
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  gap?: number | string;
  padding?: number | string;
  paddingVertical?: number | string;
  paddingHorizontal?: number | string;
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  borderRadius?: number | string;
  overflow?: 'visible' | 'hidden' | 'scroll';
  cursor?: 'pointer' | 'default' | 'not-allowed';
  zIndex?: number;
  opacity?: number;
  transition?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'scale-down';
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundImage?: string;
  transform?: string;
  pointerEvents?: 'none' | 'auto';
  [key: string]: any;
}

export interface TextStyle extends ViewStyle {
  fontStyle?: 'normal' | 'italic';
  textDecorationLine?: 'none' | 'underline' | 'line-through';
  letterSpacing?: number;
  lineHeight?: number;
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize';
  whiteSpace?: 'normal' | 'nowrap';
  textOverflow?: 'clip' | 'ellipsis';
  verticalAlign?: 'auto' | 'middle' | 'top' | 'bottom';
}

// ==================== Video 容器样式 ====================
export const videoContainer: Record<string, ViewStyle> = {
  container: {
    position: 'relative',
    width: '100%',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  wrapper: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
};

// ==================== VideoPlayer 样式 ====================
export const videoPlayer: Record<string, ViewStyle> = {
  video: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  videoPoster: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    objectFit: 'cover',
  },
};

// ==================== VideoControls 样式 ====================
export const videoControls: Record<string, ViewStyle | TextStyle> = {
  controlsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    transition: 'bottom 0.3s ease',
    zIndex: 10,
  },
  controlsHidden: {
    bottom: -60,
  },
  progressBar: {
    marginBottom: 12,
    position: 'relative',
  },
  progressSlider: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  bufferProgress: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  controlsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlsLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  controlsRight: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  controlButton: {
    padding: 8,
    backgroundColor: 'transparent',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  timeDisplay: {
    minWidth: 100,
  },
  timeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'monospace',
  },
  volumeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  volumeSlider: {
    width: 80,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  ratePicker: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8,
    padding: 8,
    minWidth: 80,
  },
  rateOption: {
    padding: 8,
    cursor: 'pointer',
  },
};

// ==================== VideoOverlay 样式 ====================
export const videoOverlay: Record<string, ViewStyle | TextStyle> = {
  overlayContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 5,
  },
  loadingText: {
    marginTop: 16,
    color: '#fff',
    fontSize: 14,
  },
  errorContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 5,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
  },
  errorMessage: {
    color: '#aaa',
    fontSize: 12,
    marginBottom: 24,
    textAlign: 'center',
  },
  retryButton: {
    padding: '8px 24px',
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    cursor: 'pointer',
  },
  endedContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 5,
  },
  endedIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  endedText: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 8,
  },
  replayButton: {
    padding: '8px 24px',
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    cursor: 'pointer',
  },
  posterContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: 'hidden',
    zIndex: 4,
  },
  poster: {
    width: '100%',
    height: '100%',
    backgroundColor: '#000',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
};

// ==================== VideoAd 样式 ====================
export const videoAd: Record<string, ViewStyle | TextStyle> = {
  adContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000',
    zIndex: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  adContent: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  adImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  },
  adInfo: {
    color: '#fff',
    fontSize: 18,
  },
  adControl: {
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  adDescription: {
    color: '#aaa',
    fontSize: 12,
    marginTop: 4,
  },
  adCountdown: {
    color: '#fff',
    fontSize: 14,
  },
  skipButton: {
    padding: '6px 16px',
    backgroundColor: '#0ea5e9',
    borderRadius: 20,
    cursor: 'pointer',
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  adProgress: {
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  adProgressFill: {
    height: '100%',
    backgroundColor: '#0ea5e9',
    transition: 'width 1s linear',
  },
};

// ==================== VideoChapterMarkers 样式 ====================
export const videoChapterMarkers: Record<string, ViewStyle | TextStyle> = {
  container: {
    position: 'relative',
  },
  menuButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    zIndex: 15,
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    cursor: 'pointer',
  },
  chapterList: {
    position: 'absolute',
    top: 40,
    right: 0,
    width: 200,
    maxHeight: 300,
    overflowY: 'auto',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    borderRadius: 8,
    padding: 8,
  },
  chapterItem: {
    padding: 10,
    borderRadius: 4,
    cursor: 'pointer',
    marginBottom: 4,
  },
  chapterTitle: {
    color: '#fff',
    fontSize: 13,
  },
  chapterTime: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 11,
    marginTop: 2,
  },
  chapterDescription: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 10,
    marginTop: 2,
  },
  markersContainer: {
    position: 'absolute',
    bottom: 60,
    left: 12,
    right: 12,
    display: 'flex',
    gap: 4,
    zIndex: 10,
  },
  marker: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: '50%',
    cursor: 'pointer',
    transform: 'translateX(-50%)',
  },
  markerActive: {
    backgroundColor: '#0ea5e9',
  },
  markerInactive: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  currentChapterHint: {
    position: 'absolute',
    top: 12,
    left: 12,
    padding: '4px 12px',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 4,
    zIndex: 10,
  },
  currentChapterText: {
    color: '#fff',
    fontSize: 12,
  },
};

// ==================== 导出所有样式 ====================
export const styles = {
  videoContainer,
  videoPlayer,
  videoControls,
  videoOverlay,
  videoAd,
  videoChapterMarkers,
};
