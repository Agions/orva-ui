import type { DesignTokens } from './types';
import { defaultDesignTokens } from './defaults';

// 设计令牌生成器
export class DesignTokenGenerator {
  private tokens: DesignTokens;

  constructor(tokens: DesignTokens = defaultDesignTokens) {
    this.tokens = tokens;
  }

  // 生成CSS变量
  public generateCSSVariables(): string {
    let css = ':root {\n';

    // 递归生成变量
    const generateSection = (obj: Record<string, unknown>, prefix: string = ''): void => {
      Object.entries(obj).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          generateSection(value as Record<string, unknown>, `${prefix}${key}-`);
        } else {
          const variableName = `--${prefix}${key}`;
          css += `  ${variableName}: ${String(value)};\n`;
        }
      });
    };

    generateSection(this.tokens as unknown as Record<string, unknown>);
    css += '}\n';

    return css;
  }

  // 生成暗色主题CSS变量
  public generateDarkThemeCSSVariables(): string {
    const darkColors = this.generateDarkColors();

    let css = '[data-theme="dark"] {\n';
    Object.entries(darkColors).forEach(([key, value]) => {
      css += `  --${key}: ${value};\n`;
    });
    css += '}\n';

    return css;
  }

  // 生成暗色主题颜色
  private generateDarkColors(): Record<string, string> {
    return {
      // 文本颜色
      'colors-text-primary': '#f9fafb',
      'colors-text-secondary': '#d1d5db',
      'colors-text-disabled': '#6b7280',
      'colors-text-inverse': '#111827',
      'colors-text-placeholder': '#6b7280',

      // 背景颜色
      'colors-background-primary': '#111827',
      'colors-background-secondary': '#1f2937',
      'colors-background-tertiary': '#374151',
      'colors-background-card': '#1f2937',
      'colors-background-input': '#374151',
      'colors-background-mask': 'rgba(0, 0, 0, 0.8)',
      'colors-background-hover': '#374151',
      'colors-background-active': '#4b5563',

      // 边框颜色
      'colors-border-default': '#374151',
      'colors-border-light': '#4b5563',

      // 阴影颜色
      'colors-shadow-default': 'rgba(0, 0, 0, 0.3)',
      'colors-shadow-light': 'rgba(0, 0, 0, 0.1)',
      'colors-shadow-medium': 'rgba(0, 0, 0, 0.4)',
      'colors-shadow-dark': 'rgba(0, 0, 0, 0.5)',
    };
  }

  // 获取令牌值
  public getToken<T = unknown>(path: string): T | undefined {
    const keys = path.split('.');
    let value: unknown = this.tokens;

    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = (value as Record<string, unknown>)[key];
      } else {
        return undefined;
      }
    }

    return value as T;
  }

  // 更新令牌
  public updateToken<T>(path: string, value: T): void {
    const keys = path.split('.');
    let current: Record<string, unknown> = this.tokens as unknown as Record<string, unknown>;

    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (key && !(key in current)) {
        current[key] = {};
      }
      if (key) {
        current = current[key] as Record<string, unknown>;
      }
    }

    if (current && keys[keys.length - 1]) {
      const lastKey = keys[keys.length - 1];
      if (lastKey) {
        current[lastKey] = value;
      }
    }
  }

  // 转换为CSS自定义属性
  public toCSSCustomProperty(path: string): string {
    return `--${path.replace(/\./g, '-')}`;
  }

  // 从CSS自定义属性获取令牌
  public fromCSSCustomProperty(property: string): string {
    return property.replace(/^--/, '').replace(/-/g, '.');
  }
}

// 导出工具函数
export const createDesignTokens = (tokens?: Partial<DesignTokens>): DesignTokens => {
  return {
    ...defaultDesignTokens,
    ...tokens,
  };
};

export const generateDesignTokenCSS = (tokens?: Partial<DesignTokens>): string => {
  const generator = new DesignTokenGenerator(createDesignTokens(tokens));
  return generator.generateCSSVariables();
};

export const generateDarkThemeCSS = (tokens?: Partial<DesignTokens>): string => {
  const generator = new DesignTokenGenerator(createDesignTokens(tokens));
  return generator.generateDarkThemeCSSVariables();
};

export default DesignTokenGenerator;
