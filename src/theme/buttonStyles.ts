/**
 * 按钮组件公共样式
 * 提取 Button 及其变体的共享样式
 * @module theme/buttonStyles
 */

import type { CSSProperties } from 'react';

/**
 * 按钮基础样式
 */
export const buttonBaseStyles: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  padding: '8px 16px',
  fontSize: 14,
  fontWeight: 500,
  border: '1px solid transparent',
  borderRadius: 4,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  whiteSpace: 'nowrap',
};

/**
 * 按钮尺寸变体
 */
export const buttonSizeStyles = {
  xs: {
    padding: '4px 8px',
    fontSize: 12,
    borderRadius: 2,
  },
  sm: {
    padding: '6px 12px',
    fontSize: 13,
    borderRadius: 3,
  },
  md: {
    padding: '8px 16px',
    fontSize: 14,
    borderRadius: 4,
  },
  lg: {
    padding: '10px 20px',
    fontSize: 15,
    borderRadius: 5,
  },
  xl: {
    padding: '12px 24px',
    fontSize: 16,
    borderRadius: 6,
  },
};

/**
 * 按钮形状变体
 */
export const buttonShapeStyles = {
  default: {
    borderRadius: 4,
  },
  round: {
    borderRadius: '9999px',
  },
  circle: {
    borderRadius: '9999px',
    padding: '8px',
  },
};

/**
 * 按钮类型样式
 */
export const buttonTypeStyles = {
  primary: {
    backgroundColor: '#1890ff',
    color: '#fff',
    borderColor: '#1890ff',
  },
  secondary: {
    backgroundColor: '#fff',
    color: '#333',
    borderColor: '#d9d9d9',
  },
  danger: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    borderColor: '#ff4d4f',
  },
  link: {
    backgroundColor: 'transparent',
    color: '#1890ff',
    borderColor: 'transparent',
    padding: '0',
  },
  text: {
    backgroundColor: 'transparent',
    color: '#333',
    borderColor: 'transparent',
    padding: '0',
  },
};

/**
 * 按钮交互状态
 */
export const buttonInteractionStyles = {
  hover: {
    opacity: 0.85,
    transform: 'translateY(-1px)',
  },
  active: {
    transform: 'translateY(0)',
    opacity: 0.7,
  },
  focus: {
    boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
    outline: 'none',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    color: 'rgba(0, 0, 0, 0.25)',
    borderColor: '#d9d9d9',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  loading: {
    opacity: 0.6,
    cursor: 'wait',
  },
};

/**
 * 按钮图标样式
 */
export const buttonIconStyles: CSSProperties = {
  fontSize: 14,
  lineHeight: 1,
};

/**
 * 默认导出
 */
export default {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonShapeStyles,
  buttonTypeStyles,
  buttonInteractionStyles,
  buttonIconStyles,
};
