/**
 * 表单组件公共样式
 * 提取 Input, Select, Checkbox, Radio 等表单组件的共享样式
 * @module theme/formStyles
 */

import type { CSSProperties } from 'react';

/**
 * 表单基础样式
 */
export const formBaseStyles: CSSProperties = {
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
};

/**
 * 表单标签样式
 */
export const formLabelStyles: CSSProperties = {
  fontSize: 14,
  fontWeight: 500,
  color: '#333',
  marginBottom: 4,
};

/**
 * 表单输入框基础样式
 */
export const formInputBaseStyles: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  fontSize: 14,
  border: '1px solid #d9d9d9',
  borderRadius: 4,
  backgroundColor: '#fff',
  transition: 'all 0.2s ease',
};

/**
 * 表单输入框交互状态
 */
export const formInputInteractionStyles = {
  hover: {
    borderColor: '#40a9ff',
  },
  focus: {
    borderColor: '#40a9ff',
    boxShadow: '0 0 0 2px rgba(24, 144, 255, 0.2)',
    outline: 'none',
  },
  disabled: {
    backgroundColor: '#f5f5f5',
    color: 'rgba(0, 0, 0, 0.25)',
    cursor: 'not-allowed',
  },
  error: {
    borderColor: '#ff4d4f',
    boxShadow: '0 0 0 2px rgba(255, 77, 79, 0.2)',
  },
};

/**
 * 表单帮助文本样式
 */
export const formHelpStyles: CSSProperties = {
  fontSize: 12,
  color: '#666',
  marginTop: 4,
};

/**
 * 表单错误文本样式
 */
export const formErrorStyles: CSSProperties = {
  fontSize: 12,
  color: '#ff4d4f',
  marginTop: 4,
};

/**
 * 表单验证图标样式
 */
export const formValidationIconStyles: CSSProperties = {
  marginLeft: 8,
  fontSize: 14,
};

/**
 * 表单尺寸变体
 */
export const formSizeStyles = {
  xs: {
    padding: '4px 8px',
    fontSize: 12,
    borderRadius: 2,
  },
  sm: {
    padding: '6px 10px',
    fontSize: 13,
    borderRadius: 3,
  },
  md: {
    padding: '8px 12px',
    fontSize: 14,
    borderRadius: 4,
  },
  lg: {
    padding: '10px 14px',
    fontSize: 15,
    borderRadius: 5,
  },
  xl: {
    padding: '12px 16px',
    fontSize: 16,
    borderRadius: 6,
  },
};

/**
 * 表单布局样式
 */
export const formLayoutStyles = {
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  vertical: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: 8,
  },
  inline: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
  },
};

/**
 * 默认导出
 */
export default {
  formBaseStyles,
  formLabelStyles,
  formInputBaseStyles,
  formInputInteractionStyles,
  formHelpStyles,
  formErrorStyles,
  formValidationIconStyles,
  formSizeStyles,
  formLayoutStyles,
};
