/**
 * DebugPanel 类型定义
 * @module components/_debug/DebugPanel.types
 */

import type { BaseComponentProps } from '@/types/componentBase';

export interface DebugPanelProps extends BaseComponentProps {
  /** 是否显示 */
  visible?: boolean;
  /** 面板标题 */
  title?: string;
  /** 调试信息 */
  debugInfo?: Record<string, unknown>;
  /** 关闭回调 */
  onClose?: () => void;
  /** 主题 */
  theme?: 'light' | 'dark';
}

export interface DebugPanelRef {
  /** 显示面板 */
  show: () => void;
  /** 隐藏面板 */
  hide: () => void;
  /** 切换显示状态 */
  toggle: () => void;
}
