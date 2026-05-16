/**
 * ARIA 助手工具
 */

import { AriaAttributes } from './types';

export class AriaAssistant {
  /**
   * 生成按钮的 ARIA 属性
   */
  static generateButtonAria(
    isDisabled: boolean = false,
    isExpanded: boolean = false,
    label?: string,
    description?: string
  ): AriaAttributes {
    return {
      'aria-disabled': isDisabled,
      'aria-expanded': isExpanded,
      'aria-label': label,
      'aria-describedby': description ? 'description-id' : undefined,
    };
  }

  /**
   * 生成输入框的 ARIA 属性
   */
  static generateInputAria(
    hasError: boolean = false,
    isRequired: boolean = false,
    label?: string,
    errorId?: string
  ): AriaAttributes & { 'aria-invalid'?: boolean; 'aria-required'?: boolean } {
    return {
      'aria-invalid': hasError,
      'aria-required': isRequired,
      'aria-label': label,
      'aria-describedby': hasError && errorId ? errorId : undefined,
    };
  }

  /**
   * 生成模态框的 ARIA 属性
   */
  static generateModalAria(
    modalId: string,
    titleId: string,
    isOpen: boolean = false
  ): AriaAttributes & { role: string; 'aria-modal': boolean; 'aria-hidden': boolean } {
    return {
      role: 'dialog',
      'aria-modal': true,
      'aria-hidden': !isOpen,
      'aria-labelledby': titleId,
      'aria-describedby': `${modalId}-description`,
    };
  }

  /**
   * 生成标签的 ARIA 属性
   */
  static generateLabelAria(
    forId: string,
    isRequired: boolean = false
  ): AriaAttributes & { htmlFor: string } {
    return {
      htmlFor: forId,
      'aria-required': isRequired,
    };
  }

  /**
   * 生成加载状态的 ARIA 属性
   */
  static generateLoadingAria(message: string): AriaAttributes & { 'aria-live': string } {
    return {
      'aria-live': 'polite',
      'aria-label': message,
    };
  }

  /**
   * 生成错误消息的 ARIA 属性
   */
  static generateErrorMessageAria(_errorMessage: string, id: string): AriaAttributes & { role: string } {
    return {
      role: 'alert',
      'aria-live': 'assertive',
      id: id,
    };
  }
}

export default AriaAssistant;