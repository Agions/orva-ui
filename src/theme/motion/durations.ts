/**
 * Nano-UI 时长规范系统
 * 基于 Material Design 时长标准和 Apple HIG 时间感
 * @module theme/motion/durations
 */

import type { DurationScale, DurationToken } from './types';

/**
 * 时长令牌定义
 * 科学分层，每个时长有明确的使用场景
 */
export const durationTokens: Record<DurationScale, DurationToken> = {
  instant: {
    value: 0,
    unit: 'ms',
    description: '无动画，立即响应',
    useCases: ['颜色变化', '背景色切换', 'border-color 变化', '即时反馈'],
  },
  micro: {
    value: 75,
    unit: 'ms',
    description: '几乎瞬间的微交互',
    useCases: ['按钮按下', '开关切换', 'checkbox 勾选', 'radio 选中'],
  },
  fast: {
    value: 150,
    unit: 'ms',
    description: '快速的微交互',
    useCases: ['hover 效果', 'focus 边框', '图标变化', '小型元素状态切换'],
  },
  normal: {
    value: 250,
    unit: 'ms',
    description: '标准过渡时长',
    useCases: ['按钮过渡', '输入框 focus', '卡片 hover', '标准元素动画'],
  },
  slow: {
    value: 400,
    unit: 'ms',
    description: '较慢的过渡，吸引注意',
    useCases: ['模态框出现', '抽屉展开', '页面切换', '列表项添加/删除'],
  },
  dramatic: {
    value: 700,
    unit: 'ms',
    description: '戏剧性动画，强调重要变化',
    useCases: ['页面转场', 'hero 动画', '重要状态变化', '引导流程'],
  },
  ambient: {
    value: 1200,
    unit: 'ms',
    description: '环境动画，营造氛围',
    useCases: ['骨架屏 shimmer', '加载动画', '背景渐变', '呼吸效果'],
  },
};

/**
 * 获取时长值（毫秒）
 */
export function getDuration(scale: DurationScale): number {
  return durationTokens[scale]?.value ?? 250;
}

/**
 * 获取 CSS transition duration 字符串
 */
export function getDurationCss(scale: DurationScale): string {
  return `${getDuration(scale)}ms`;
}

/**
 * 获取适合组件的推荐时长
 */
export function getRecommendedDuration(
  component: 'button' | 'input' | 'card' | 'modal' | 'drawer' | 'list' | 'page' | 'tooltip' | 'snackbar',
  action: 'enter' | 'exit' | 'hover' | 'focus' | 'press' | 'state',
): DurationScale {
  const recommendations: Record<string, Record<string, DurationScale>> = {
    button: {
      hover: 'fast',
      focus: 'fast',
      press: 'micro',
      state: 'fast',
    },
    input: {
      focus: 'normal',
      state: 'fast',
    },
    card: {
      hover: 'normal',
      enter: 'slow',
      exit: 'fast',
    },
    modal: {
      enter: 'slow',
      exit: 'fast',
    },
    drawer: {
      enter: 'slow',
      exit: 'normal',
    },
    list: {
      enter: 'normal',
      exit: 'fast',
      hover: 'fast',
    },
    page: {
      enter: 'dramatic',
      exit: 'slow',
    },
    tooltip: {
      enter: 'fast',
      exit: 'micro',
    },
    snackbar: {
      enter: 'normal',
      exit: 'fast',
    },
  };

  return recommendations[component]?.[action] ?? 'normal';
}

/**
 * 组合多个属性的过渡时长
 * 确保 stagger 效果有合理的延迟
 */
export function getStaggerDelays(
  count: number,
  baseDelay: number = 30,
  maxDelay?: number,
): number[] {
  const delays: number[] = [];
  for (let i = 0; i < count; i++) {
    let delay = i * baseDelay;
    if (maxDelay !== undefined && delay > maxDelay) {
      delay = maxDelay;
    }
    delays.push(delay);
  }
  return delays;
}

export default durationTokens;
