/**
 * 焦点管理器
 */

export class FocusManager {
  private static instance: FocusManager;
  private focusHistory: HTMLElement[] = [];

  public static getInstance(): FocusManager {
    if (!FocusManager.instance) {
      FocusManager.instance = new FocusManager();
    }
    return FocusManager.instance;
  }

  /**
   * 保存当前焦点元素到历史记录
   */
  saveCurrentFocus() {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement && activeElement !== document.body) {
      this.focusHistory.push(activeElement);
    }
  }

  /**
   * 恢复上一个焦点元素
   */
  restorePreviousFocus() {
    const previousElement = this.focusHistory.pop();
    if (previousElement && document.body.contains(previousElement)) {
      setTimeout(() => previousElement.focus(), 0);
    }
  }

  /**
   * 跳转到第一个可聚焦元素
   */
  focusFirstInContainer(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const focusableElements = this.getFocusableElements(container);
    if (focusableElements.length > 0) {
      focusableElements[0]?.focus();
    }
  }

  /**
   * 跳转到最后一个可聚焦元素
   */
  focusLastInContainer(containerId: string) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const focusableElements = this.getFocusableElements(container);
    const lastElement = focusableElements[focusableElements.length - 1];
    if (lastElement) {
      lastElement.focus();
    }
  }

  /**
   * 获取容器内的所有可聚焦元素
   */
  private getFocusableElements(container: Element): HTMLElement[] {
    const selectors = [
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]:not([contenteditable="false"])'
    ].join(', ');

    return Array.from(container.querySelectorAll(selectors))
      .filter(element => {
        const rect = (element as HTMLElement).getBoundingClientRect();
        return rect.width > 0 || rect.height > 0; // 确保元素在视口内
      }) as HTMLElement[];
  }

  /**
   * 创建高对比度样式
   */
  createHighContrastStyles(): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = `
      .orva-ui-high-contrast {
        filter: contrast(1.5) brightness(1.2);
      }
      .orva-ui-high-contrast button,
      .orva-ui-high-contrast [role="button"] {
        border: 2px solid !important;
        outline: 3px solid !important;
      }
      .orva-ui-high-contrast:focus {
        outline: 3px solid #000 !important;
        outline-offset: 2px !important;
      }
    `;
    return style;
  }
}

export const focusManager = FocusManager.getInstance();