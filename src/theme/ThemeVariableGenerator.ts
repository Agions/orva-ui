/**
 * 主题变量生成器
 * 自动生成 CSS 变量和主题配置文件
 */

import { THEMES, ThemeName } from './advanced-themes';

export class ThemeVariableGenerator {
  /**
   * 递归扁平化主题对象为键值对
   * @param obj 要扁平化的对象
   * @param prefix 键名前缀
   * @returns 扁平化的键值对 Record
   */
  private static flattenTheme(obj: Record<string, unknown>, prefix = ''): Record<string, string> {
    const result: Record<string, string> = {};
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = prefix ? `${prefix}-${key}` : key;
      if (value && typeof value === 'object' && !Array.isArray(value)) {
        Object.assign(result, this.flattenTheme(value as Record<string, unknown>, fullKey));
      } else {
        result[fullKey] = String(value);
      }
    }
    return result;
  }

  /**
   * 生成 CSS 变量字符串
   */
  static generateCSSVariables(themeName: ThemeName): string {
    const theme = THEMES[themeName] as any;
    const variables: Record<string, string> = this.flattenTheme(theme.colors as Record<string, unknown>);

    // 添加特殊变量
    variables['--theme-name'] = theme.name;
    variables['--font-family-sans'] = `${theme.fontFamily.sans.join(', ')}`;
    variables['--font-family-serif'] = `${theme.fontFamily.serif.join(', ')}`;
    variables['--font-family-mono'] = `${theme.fontFamily.mono.join(', ')}`;

    return Object.entries(variables)
      .map(([key, value]) => `  --${key}: ${value};`)
      .join('\n');
  }

  /**
   * 生成完整的 CSS 文件内容（包含所有主题变量和主题类选择器）
   * @returns 完整的 CSS 字符串，包含 :root 变量和 .orva-ui-theme-* 类选择器
   */
  static generateCompleteCSS(): string {
    let cssContent = ':root {\n';
    
    // 生成所有主题的变量
    Object.entries(THEMES).forEach(([themeName, _theme]) => {
      cssContent += `  /* Theme: ${themeName} */\n`;

      const variables = this.generateCSSVariables(themeName as ThemeName);
      cssContent += variables + '\n\n\n';
    });

    // 生成主题类选择器
    cssContent += '/* Theme classes */\n';
    Object.entries(THEMES).forEach(([themeName, _theme]) => {
      cssContent += `.orva-ui-theme-${themeName} {\n`;
      const variables = this.generateCSSVariables(themeName as ThemeName);
      cssContent += variables + '\n\n\n';
    });

    return cssContent;
  }

  /**
   * 生成 TypeScript 类型定义（ThemeVariable、ThemeVariables、ThemeName）
   * @returns TypeScript 类型定义的字符串，可直接写入 .d.ts 文件
   */
  static generateTypeDefinitions(): string {
    return `/**
 * 自动生成的主题变量类型定义
 * 基于 THEMES 配置生成
 */

export type ThemeVariable = string | number | boolean;

export interface ThemeVariables {
  // 背景色
  '--background': string;
  '--foreground': string;
  '--card': string;
  '--card-foreground': string;
  '--popover': string;
  '--popover-foreground': string;
  
  // 主要色彩
  '--primary': string;
  '--primary-foreground': string;
  '--primary-light': string;
  '--primary-dark': string;
  
  // 次要色彩
  '--secondary': string;
  '--secondary-foreground': string;
  '--secondary-light': string;
  '--secondary-dark': string;
  
  // 状态色彩
  '--success': string;
  '--warning': string;
  '--error': string;
  '--info': string;
  
  // 中性色彩
  '--muted': string;
  '--muted-foreground': string;
  '--accent': string;
  '--accent-foreground': string;
  
  // 边框和输入
  '--border': string;
  '--input': string;
  '--ring': string;
  
  // 字体
  '--font-family-sans': string;
  '--font-family-serif': string;
  '--font-family-mono': string;
  
  // 其他
  '--theme-name': string;
}

// 主题名称类型
export type ThemeName = 'light' | 'dark' | 'high-contrast' | 'warm' | 'cool';
`;
  }

  /**
   * 生成 SCSS 变量文件（包含 $themes 映射和 apply-theme 混入）
   * @returns SCSS 变量文件的字符串内容
   */
static generateSCSSVariables(): string {
    const DOLLAR = '$';
    let scssContent = `/**
 * 自动生成的 SCSS 变量文件
 * 基于 THEMES 配置生成
 */

// 主题映射
${DOLLAR}themes: (\n`;

    Object.entries(THEMES).forEach(([themeName]) => {
      scssContent += `  '${themeName}': (\n`;

      const flatColors = this.flattenTheme(THEMES[themeName as ThemeName].colors as Record<string, unknown>);
      for (const [key, value] of Object.entries(flatColors)) {
        scssContent += `    '${key}': '${value}',\n`;
      }

      scssContent += ') \n';
    });

    scssContent += ');\n\n';

    // 生成混入宏
    scssContent += `@mixin apply-theme(${DOLLAR}theme-name) {\n` +
      Object.keys(THEMES).map(themeName => `
  @if ${DOLLAR}theme-name == '${themeName}' {
    @each ${DOLLAR}key, ${DOLLAR}value in map-get(${DOLLAR}themes, '${themeName}') {
      --#{str-replace(${DOLLAR}key, '-', '_')}: ${DOLLAR}value;
    }
  }`).join('') +
    '\n}\n';

    return scssContent;
  }

  /**
   * 生成 JSON 格式的主题配置文件
   * @returns JSON 字符串，包含所有主题配置、版本号和生成时间
   */
  static generateJSONConfig(): string {
    return JSON.stringify({
      themes: Object.entries(THEMES).reduce((acc, [name, theme]) => {
        const t = theme as any;
        acc[name] = {
          name: t.name,
          colors: t.colors,
          fontFamily: t.fontFamily,
          fontSize: t.fontSize,
          fontWeight: t.fontWeight,
        };
        return acc;
      }, {} as Record<string, any>),
      version: '1.0.0',
      generatedAt: new Date().toISOString(),
    }, null, 2);
  }
}

// 工具函数（用于 SCSS 生成）
function _strReplace(str: string, search: string, replace: string): string {
  return str.split(search).join(replace);
}
void _strReplace;

export default ThemeVariableGenerator;
