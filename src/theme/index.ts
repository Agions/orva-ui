/**
 * Theme 模块统一导出
 * @module theme
 */

// 共享样式工具
export {
  createBaseStyles,
  createSpacingStyles,
  createTypographyStyles,
  createLayoutStyles,
  createInteractionStyles,
  createTransitionStyles,
  createResponsiveStyles,
  createEllipsisStyles,
  createScrollbarStyles,
} from './sharedStyles';

// 按钮样式
export {
  buttonBaseStyles,
  buttonSizeStyles,
  buttonShapeStyles,
  buttonTypeStyles,
  buttonInteractionStyles,
  buttonIconStyles,
} from './buttonStyles';

// 表单样式
export {
  formBaseStyles,
  formLabelStyles,
  formInputBaseStyles,
  formInputInteractionStyles,
  formHelpStyles,
  formErrorStyles,
  formValidationIconStyles,
  formSizeStyles,
  formLayoutStyles,
} from './formStyles';

// 主题配置
export { defaultTheme } from './defaults';
export { DARK_THEME, HIGH_CONTRAST_THEME, WARM_THEME, COOL_THEME, NATURE_THEME, OCEAN_THEME, THEMES } from './advanced-themes';
export { darkTheme, darkDesignTokens, darkColorTokens, generateDarkThemeCSSVariables } from './dark';
export { defaultDesignTokens } from './defaults';
export type { ThemeConfig, ThemeMode } from './types';
export type { DesignTokens, ColorTokens } from './tokens';
export { ThemeVariableGenerator } from './ThemeVariableGenerator';
// ThemeSwitcher is .tsx — re-export via export * to avoid TS6142
export * from './ThemeSwitcher';
