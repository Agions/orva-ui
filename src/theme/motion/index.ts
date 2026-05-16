/**
 * Nano-UI Motion System
 * 专业级动效系统，整合 Apple HIG、Material Design、Fluent Design 最佳实践
 * @module theme/motion
 */

export * from './types';
export * from './easings';
export * from './durations';
export * from './springs';
export * from './animations';

// 重新导出默认对象
export { default as motionEasings } from './easings';
export { default as motionDurations } from './durations';
export { default as motionSprings } from './springs';
export { default as motionAnimations } from './animations';
