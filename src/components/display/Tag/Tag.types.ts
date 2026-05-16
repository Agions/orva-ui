import type { CSSProperties, ReactNode } from 'react';
import type { BaseProps } from '@/types/component';

export interface TagProps extends BaseProps {
  /** 标签内容 */
  children?: ReactNode;
  /** 标签颜色 */
  color?: string;
  /** 标签尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 标签变体 */
  variant?: 'solid' | 'outline' | 'light';
  /** 是否可关闭 */
  closable?: boolean;
  /** 是否可选择 */
  checkable?: boolean;
  /** 是否选中 */
  checked?: boolean;
  /** 标签图标 */
  icon?: ReactNode;
  /** 点击回调 */
  onClick?: (_event: any) => void;
  /** 关闭回调 */
  onClose?: (_event: any) => void;
  /** 选中状态变化回调 */
  onCheckedChange?: (_checked: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: CSSProperties;
}

export interface TagRef {
	/** DOM 元素 */
  element: any;
	/** 获取标签颜色 */
  getColor: () => string;
	/** 获取标签大小 */
  getSize: () => 'small' | 'medium' | 'large';
	/** 检查是否可关闭 */
  isClosable: () => boolean;
	/** 检查是否可选择 */
  isCheckable: () => boolean;
	/** 检查是否选中 */
  isChecked: () => boolean;
	/** 设置选中状态 */
  setChecked: (_checked: boolean) => void;
	/** 关闭标签 */
  close: () => void;
}
