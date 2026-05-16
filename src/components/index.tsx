/**
 * Orva UI 组件库统一导出文件
 * 提供完整的组件库访问接口
 *
 * @module components
 * @description 导出所有 UI 组件
 *
 * 注意：form 目录下的 Input/Select/Modal 是增强版（带动画/验证等），
 * 与 basic 目录下的同名组件冲突时，优先导出 form 版本。
 * basic 版本可通过路径导入：import { Input } from 'orva-ui/basic'
 */

// ==================== 表单组件（优先导出，覆盖 basic 同名组件） ====================
export * from './form';

// ==================== 基础组件（排除与 form 冲突的 Input/Select/Modal） ====================
export { Button } from './basic';
export type { ButtonProps, ButtonRef } from './basic';
export { Ripple } from './basic';
export type { RippleProps, RippleRef } from './basic';
export { Divider } from './basic';
export type { DividerProps } from './basic';
export { Icon } from './basic';
export type { IconProps, IconName } from './basic';
export { Text } from './basic';
export type { TextProps } from './basic';
export { Typography } from './basic';
export type { TypographyProps } from './basic';
export { Video } from './basic';
export type { VideoProps } from './basic';

// ==================== 展示组件 ====================
export * from './display';

// ==================== 反馈组件 ====================
export * from './feedback';

// ==================== 布局组件 ====================
export * from './layout';

// ==================== 导航组件 ====================
export * from './navigation';

// ==================== 通用组件和提供者 ====================
export * from './common';
