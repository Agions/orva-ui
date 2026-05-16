import type * as React from 'react';
import type { BaseProps } from '@/types/component';

export interface MessageProps extends BaseProps {
	/** 消息类型 */
  type?: 'success' | 'error' | 'warning' | 'info';
	/** 标题 */
  title?: string;
	/** 内容 */
  content?: string;
	/** 图标 */
  icon?: React.ReactNode;
	/** 是否可关闭 */
  closable?: boolean;
	/** 自动关闭时长（毫秒） */
  duration?: number;
	/** 关闭回调 */
  onClose?: () => void;
}

export interface MessageRef {
	/** 显示消息 */
  show: () => void;
	/** 隐藏消息 */
  hide: () => void;
	/** 更新消息内容 */
  update: (_props: Partial<MessageProps>) => void;
}
