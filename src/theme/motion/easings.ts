/**
 * Nano-UI 专业缓动曲线库
 * 整合 Apple HIG、Material Design 3、Fluent Design 最佳实践
 * @module theme/motion/easings
 */

import type { EasingCurve, EasingType } from './types';

/**
 * Apple Human Interface Guidelines 缓动曲线
 * 特点：自然、流畅、有物理感
 */
export const appleEasings: Record<string, EasingCurve> = {
  appleDefault: {
    name: 'Apple Default',
    css: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
    description: 'Apple 标准缓动，适用于大多数过渡',
    usage: ['页面过渡', '元素移动', '默认动画'],
  },
  appleEaseIn: {
    name: 'Apple Ease In',
    css: 'cubic-bezier(0.42, 0, 1, 1)',
    description: '元素离开屏幕时',
    usage: ['元素退出', '关闭动画', '收起'],
  },
  appleEaseOut: {
    name: 'Apple Ease Out',
    css: 'cubic-bezier(0, 0, 0.58, 1)',
    description: '元素进入屏幕时',
    usage: ['元素入场', '展开动画', '弹出'],
  },
  appleEaseInOut: {
    name: 'Apple Ease In-Out',
    css: 'cubic-bezier(0.42, 0, 0.58, 1)',
    description: '对称缓动，元素在同一屏幕内移动',
    usage: ['位置变化', '尺寸调整', '状态切换'],
  },
  appleSpring: {
    name: 'Apple Spring',
    css: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    description: '弹性效果，按钮点击、页面切换',
    usage: ['按钮反馈', '重要元素强调', '页面切换'],
  },
};

/**
 * Material Design 3 缓动曲线
 * 特点：强调速度、层次、空间关系
 */
export const materialEasings: Record<string, EasingCurve> = {
  materialStandard: {
    name: 'Material Standard',
    css: 'cubic-bezier(0.2, 0, 0, 1)',
    description: 'Material 标准缓动，元素在屏幕内移动',
    usage: ['列表项移动', '卡片展开', 'FAB 变形'],
  },
  materialDecelerate: {
    name: 'Material Decelerate',
    css: 'cubic-bezier(0, 0, 0.2, 1)',
    description: '减速曲线，元素进入屏幕',
    usage: ['入场动画', '模态框出现', 'Snackbar'],
  },
  materialAccelerate: {
    name: 'Material Accelerate',
    css: 'cubic-bezier(0.4, 0, 1, 1)',
    description: '加速曲线，元素离开屏幕',
    usage: ['退出动画', '关闭抽屉', '删除项目'],
  },
  materialEmphasized: {
    name: 'Material Emphasized',
    css: 'cubic-bezier(0.2, 0, 0, 1)',
    description: '强调动画，用于重要的状态变化',
    usage: ['选中状态', '开关切换', '重要提示'],
  },
};

/**
 * Fluent Design 缓动曲线
 * 特点：迅速、干脆、有反馈感
 */
export const fluentEasings: Record<string, EasingCurve> = {
  fluentStandard: {
    name: 'Fluent Standard',
    css: 'cubic-bezier(0.8, 0, 0.2, 1)',
    description: 'Fluent 标准，快速响应',
    usage: ['按钮点击', '菜单展开', '快速反馈'],
  },
  fluentEntrance: {
    name: 'Fluent Entrance',
    css: 'cubic-bezier(0.1, 0.9, 0.2, 1)',
    description: '优雅入场',
    usage: ['页面进入', '面板展开', '元素出现'],
  },
  fluentExit: {
    name: 'Fluent Exit',
    css: 'cubic-bezier(0.7, 0, 1, 0.5)',
    description: '快速退出',
    usage: ['关闭面板', '元素消失', '收起内容'],
  },
  fluentFast: {
    name: 'Fluent Fast',
    css: 'cubic-bezier(0.4, 0, 0.6, 1)',
    description: '极快反馈',
    usage: ['悬停效果', '微交互', '快速切换'],
  },
};

/**
 * CSS 标准缓动曲线
 */
export const cssEasings: Record<string, EasingCurve> = {
  linear: {
    name: 'Linear',
    css: 'linear',
    description: '匀速，机械感',
    usage: ['颜色渐变', '透明度变化', '旋转动画'],
  },
  ease: {
    name: 'Ease',
    css: 'ease',
    description: 'CSS 默认缓动',
    usage: ['简单过渡', '默认行为'],
  },
  easeIn: {
    name: 'Ease In',
    css: 'ease-in',
    description: '慢速开始',
    usage: ['元素离开'],
  },
  easeOut: {
    name: 'Ease Out',
    css: 'ease-out',
    description: '慢速结束',
    usage: ['元素进入'],
  },
  easeInOut: {
    name: 'Ease In-Out',
    css: 'ease-in-out',
    description: '慢速开始和结束',
    usage: ['对称动画'],
  },
};

/**
 * 所有缓动曲线集合
 */
export const allEasings: Partial<Record<EasingType, EasingCurve>> = {
  ...cssEasings,
  ...appleEasings,
  ...materialEasings,
  ...fluentEasings,
  spring: {
    name: 'Spring',
    css: 'linear', // 弹簧使用 JavaScript 动画
    description: '物理弹簧效果，使用 spring 配置',
    usage: ['弹性交互', '拖拽释放', '重要反馈'],
  },
  custom: {
    name: 'Custom',
    css: 'linear',
    description: '自定义缓动',
    usage: ['特殊效果'],
  },
};

/**
 * 获取缓动曲线的 CSS 值
 */
export function getEasingCss(easing: EasingType): string {
  return allEasings[easing]?.css ?? cssEasings['ease']?.css ?? 'ease';
}

/**
 * 获取适合场景的推荐缓动
 */
export function getRecommendedEasing(
  action: 'enter' | 'exit' | 'move' | 'emphasis' | 'micro',
  designSystem?: 'apple' | 'material' | 'fluent',
): EasingType {
  const recommendations: Record<string, Record<string, EasingType>> = {
    apple: {
      enter: 'appleEaseOut',
      exit: 'appleEaseIn',
      move: 'appleEaseInOut',
      emphasis: 'appleSpring',
      micro: 'appleDefault',
    },
    material: {
      enter: 'materialDecelerate',
      exit: 'materialAccelerate',
      move: 'materialStandard',
      emphasis: 'materialEmphasized',
      micro: 'materialStandard',
    },
    fluent: {
      enter: 'fluentEntrance',
      exit: 'fluentExit',
      move: 'fluentStandard',
      emphasis: 'fluentEntrance',
      micro: 'fluentFast',
    },
  };

  const system = designSystem ?? 'apple';
  return recommendations[system]?.[action] ?? 'easeOut';
}

export default allEasings;
