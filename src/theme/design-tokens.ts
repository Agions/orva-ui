/**
 * 设计令牌系统（兼容导出入口）
 * 已拆分为 design-tokens/ 子目录
 * @deprecated 请直接从 ./design-tokens 导入
 */

export type { DesignTokens } from './design-tokens/types';
export { defaultDesignTokens } from './design-tokens/defaults';
export {
  DesignTokenGenerator,
  createDesignTokens,
  generateDesignTokenCSS,
  generateDarkThemeCSS,
} from './design-tokens/generator';