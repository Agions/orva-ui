/**
 * Select 选择器组件类型定义
 * @module components/basic/Select/Select.types
 */

import type { BaseProps } from '@/types/component';

/** Select 选项 */
export interface SelectOption {
  /** 选项值 */
  value: string | number;
  /** 选项标签 */
  label: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 选项分组 */
  group?: string;
}

/** Select 尺寸 */
export type SelectSize = 'xs' | 'sm' | 'md' | 'lg';

/** Select 属性 */
export interface SelectProps extends BaseProps {
  /** 选择器尺寸 */
  size?: SelectSize;
  
  /** 是否禁用 */
  disabled?: boolean;
  
  /** 占位符文本 */
  placeholder?: string;
  
  /** 当前值（受控模式） */
  value?: string | number | (string | number)[];
  
  /** 默认值（非受控模式） */
  defaultValue?: string | number | (string | number)[];
  
  /** 值变更回调 */
  onChange?: (value: string | number | (string | number)[]) => void;
  
  /** 选项列表 */
  options: SelectOption[];
  
  /** 是否多选 */
  multiple?: boolean;
  
  /** 是否显示清除按钮 */
  clearable?: boolean;
  
  /** 是否可搜索 */
  searchable?: boolean;
  
  /** 是否显示边框 */
  border?: boolean;
  
  /** 是否可聚焦 */
  focusable?: boolean;
  
  /** Tab 键顺序 */
  tabIndex?: number;
}

/** Select Ref */
export interface SelectRef {
  /** 聚焦选择器 */
  focus: () => void;
  /** 清空选择 */
  clear: () => void;
  /** 打开下拉菜单 */
  open: () => void;
  /** 关闭下拉菜单 */
  close: () => void;
}
