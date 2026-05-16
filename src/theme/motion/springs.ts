/**
 * Nano-UI 弹簧物理系统
 * 提供精心调校的弹簧配置，模拟真实物理感受
 * @module theme/motion/springs
 */

import type { SpringConfig } from './types';

/**
 * 预设弹簧配置
 * 基于 react-spring 和 Framer Motion 的最佳实践
 */
export const springPresets: Record<string, SpringConfig> = {
  /** 默认弹簧 - 平衡响应与平滑 */
  default: {
    stiffness: 170,
    damping: 26,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  /** 柔和弹簧 - 缓慢、优雅 */
  gentle: {
    stiffness: 120,
    damping: 14,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  /** 活泼弹簧 - 弹性十足 */
  wobbly: {
    stiffness: 180,
    damping: 12,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  /** 生硬弹簧 - 快速到位，无过冲 */
  stiff: {
    stiffness: 210,
    damping: 20,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  /** 缓慢弹簧 - 沉稳、庄重 */
  slow: {
    stiffness: 80,
    damping: 20,
    mass: 1.5,
    velocity: 0,
    precision: 0.01,
  },
  /** 弹性弹簧 - 明显的弹跳效果 */
  bouncy: {
    stiffness: 300,
    damping: 10,
    mass: 0.8,
    velocity: 0,
    precision: 0.01,
  },
  /** 快速弹簧 - 极快响应 */
  quick: {
    stiffness: 400,
    damping: 30,
    mass: 0.5,
    velocity: 0,
    precision: 0.01,
  },
  /** 页面转场弹簧 */
  pageTransition: {
    stiffness: 150,
    damping: 22,
    mass: 1.2,
    velocity: 5,
    precision: 0.01,
  },
  /** 按钮反馈弹簧 */
  buttonPress: {
    stiffness: 500,
    damping: 28,
    mass: 0.6,
    velocity: 0,
    precision: 0.01,
  },
  /** 抽屉展开弹簧 */
  drawer: {
    stiffness: 200,
    damping: 25,
    mass: 1,
    velocity: 5,
    precision: 0.01,
  },
  /** 模态框弹簧 */
  modal: {
    stiffness: 250,
    damping: 24,
    mass: 1,
    velocity: 0,
    precision: 0.01,
  },
  /** 列表项弹簧 */
  listItem: {
    stiffness: 180,
    damping: 20,
    mass: 0.8,
    velocity: 2,
    precision: 0.01,
  },
};

/**
 * 获取弹簧配置
 */
export function getSpring(name: keyof typeof springPresets): SpringConfig {
  return springPresets[name] ?? springPresets['default']!;
}

/**
 * 创建自定义弹簧
 */
export function createSpring(
  stiffness: number,
  damping: number,
  mass?: number,
  velocity?: number,
): SpringConfig {
  return {
    stiffness,
    damping,
    mass: mass ?? 1,
    velocity: velocity ?? 0,
    precision: 0.01,
  };
}

/**
 * 计算弹簧的 CSS transition 近似值
 * 将弹簧参数转换为近似 cubic-bezier
 */
export function springToCss(spring: SpringConfig): string {
  const { stiffness, damping } = spring;
  // 简化的近似转换
  const ratio = damping / (2 * Math.sqrt(stiffness));
  if (ratio >= 1) {
    // 过阻尼
    return 'cubic-bezier(0.4, 0, 0.2, 1)';
  }
  // 欠阻尼，有弹跳
  const bounce = 1 - ratio;
  const p1x = 0.34;
  const p1y = 1 + bounce * 0.8;
  const p2x = 0.64;
  const p2y = 1 - bounce * 0.3;
  return `cubic-bezier(${p1x.toFixed(2)}, ${p1y.toFixed(2)}, ${p2x.toFixed(2)}, ${p2y.toFixed(2)})`;
}

export default springPresets;
