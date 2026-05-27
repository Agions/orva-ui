/**
 * 设计令牌系统
 * 提供统一的设计变量和CSS自定义属性管理
 * @module theme/design-tokens
 */

// 类型定义
export type { DesignTokens } from './types';

// 默认值
export { defaultDesignTokens } from './defaults';

// 生成器
export {
  DesignTokenGenerator,
  createDesignTokens,
  generateDesignTokenCSS,
  generateDarkThemeCSS,
} from './generator';