/**
 * Nano-UI 动画预设系统
 * 提供即用的专业动画组合
 * @module theme/motion/animations
 */

import type { AnimationPreset, StaggerConfig } from './types';
import { getEasingCss } from './easings';
import { getDurationCss } from './durations';

/** 入场动画 */
export const enterAnimations: Record<string, AnimationPreset> = {
  fadeIn: {
    name: 'Fade In',
    duration: 'normal',
    easing: 'easeOut',
    properties: {
      from: { opacity: 0 },
      to: { opacity: 1 },
    },
    willChange: ['opacity'],
  },
  fadeInUp: {
    name: 'Fade In Up',
    duration: 'normal',
    easing: 'appleEaseOut',
    properties: {
      from: { opacity: 0, transform: 'translateY(16px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    willChange: ['opacity', 'transform'],
  },
  fadeInDown: {
    name: 'Fade In Down',
    duration: 'normal',
    easing: 'appleEaseOut',
    properties: {
      from: { opacity: 0, transform: 'translateY(-16px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
    willChange: ['opacity', 'transform'],
  },
  fadeInScale: {
    name: 'Fade In Scale',
    duration: 'slow',
    easing: 'appleSpring',
    properties: {
      from: { opacity: 0, transform: 'scale(0.92)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    willChange: ['opacity', 'transform'],
  },
  slideInRight: {
    name: 'Slide In Right',
    duration: 'slow',
    easing: 'materialDecelerate',
    properties: {
      from: { transform: 'translateX(100%)' },
      to: { transform: 'translateX(0)' },
    },
    willChange: ['transform'],
  },
  slideInLeft: {
    name: 'Slide In Left',
    duration: 'slow',
    easing: 'materialDecelerate',
    properties: {
      from: { transform: 'translateX(-100%)' },
      to: { transform: 'translateX(0)' },
    },
    willChange: ['transform'],
  },
  slideInUp: {
    name: 'Slide In Up',
    duration: 'slow',
    easing: 'materialDecelerate',
    properties: {
      from: { transform: 'translateY(100%)' },
      to: { transform: 'translateY(0)' },
    },
    willChange: ['transform'],
  },
  scaleIn: {
    name: 'Scale In',
    duration: 'normal',
    easing: 'appleSpring',
    properties: {
      from: { opacity: 0, transform: 'scale(0.8)' },
      to: { opacity: 1, transform: 'scale(1)' },
    },
    willChange: ['opacity', 'transform'],
  },
  blurIn: {
    name: 'Blur In',
    duration: 'slow',
    easing: 'easeOut',
    properties: {
      from: { opacity: 0, filter: 'blur(8px)' },
      to: { opacity: 1, filter: 'blur(0px)' },
    },
    willChange: ['opacity', 'filter'],
  },
};

/** 出场动画 */
export const exitAnimations: Record<string, AnimationPreset> = {
  fadeOut: {
    name: 'Fade Out',
    duration: 'fast',
    easing: 'easeIn',
    properties: {
      from: { opacity: 1 },
      to: { opacity: 0 },
    },
    willChange: ['opacity'],
  },
  fadeOutDown: {
    name: 'Fade Out Down',
    duration: 'fast',
    easing: 'appleEaseIn',
    properties: {
      from: { opacity: 1, transform: 'translateY(0)' },
      to: { opacity: 0, transform: 'translateY(12px)' },
    },
    willChange: ['opacity', 'transform'],
  },
  fadeOutScale: {
    name: 'Fade Out Scale',
    duration: 'fast',
    easing: 'appleEaseIn',
    properties: {
      from: { opacity: 1, transform: 'scale(1)' },
      to: { opacity: 0, transform: 'scale(0.95)' },
    },
    willChange: ['opacity', 'transform'],
  },
  slideOutRight: {
    name: 'Slide Out Right',
    duration: 'normal',
    easing: 'materialAccelerate',
    properties: {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(100%)' },
    },
    willChange: ['transform'],
  },
  slideOutDown: {
    name: 'Slide Out Down',
    duration: 'normal',
    easing: 'materialAccelerate',
    properties: {
      from: { transform: 'translateY(0)' },
      to: { transform: 'translateY(100%)' },
    },
    willChange: ['transform'],
  },
};

/** 微交互动画 */
export const microAnimations: Record<string, AnimationPreset> = {
  buttonPress: {
    name: 'Button Press',
    duration: 'micro',
    easing: 'appleSpring',
    properties: {
      from: { transform: 'scale(1)' },
      to: { transform: 'scale(0.96)' },
    },
    willChange: ['transform'],
  },
  buttonRelease: {
    name: 'Button Release',
    duration: 'normal',
    easing: 'appleSpring',
    properties: {
      from: { transform: 'scale(0.96)' },
      to: { transform: 'scale(1)' },
    },
    willChange: ['transform'],
  },
  cardHover: {
    name: 'Card Hover',
    duration: 'normal',
    easing: 'appleEaseOut',
    properties: {
      from: { transform: 'translateY(0)', boxShadow: 'var(--shadow-sm)' },
      to: { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-lg)' },
    },
    willChange: ['transform', 'box-shadow'],
  },
  cardHoverOut: {
    name: 'Card Hover Out',
    duration: 'fast',
    easing: 'appleEaseIn',
    properties: {
      from: { transform: 'translateY(-4px)', boxShadow: 'var(--shadow-lg)' },
      to: { transform: 'translateY(0)', boxShadow: 'var(--shadow-sm)' },
    },
    willChange: ['transform', 'box-shadow'],
  },
  inputFocus: {
    name: 'Input Focus',
    duration: 'normal',
    easing: 'easeOut',
    properties: {
      from: { borderColor: 'var(--border-color)', boxShadow: '0 0 0 0 transparent' },
      to: { borderColor: 'var(--primary)', boxShadow: '0 0 0 3px var(--primary-12)' },
    },
    willChange: ['border-color', 'box-shadow'],
  },
  inputBlur: {
    name: 'Input Blur',
    duration: 'fast',
    easing: 'easeIn',
    properties: {
      from: { borderColor: 'var(--primary)', boxShadow: '0 0 0 3px var(--primary-12)' },
      to: { borderColor: 'var(--border-color)', boxShadow: '0 0 0 0 transparent' },
    },
    willChange: ['border-color', 'box-shadow'],
  },
  checkboxCheck: {
    name: 'Checkbox Check',
    duration: 'micro',
    easing: 'appleSpring',
    properties: {
      from: { transform: 'scale(0.8)', opacity: 0 },
      to: { transform: 'scale(1)', opacity: 1 },
    },
    willChange: ['transform', 'opacity'],
  },
  switchToggle: {
    name: 'Switch Toggle',
    duration: 'normal',
    easing: 'appleEaseInOut',
    properties: {
      from: { transform: 'translateX(0)' },
      to: { transform: 'translateX(20px)' },
    },
    willChange: ['transform'],
  },
  ripple: {
    name: 'Ripple',
    duration: 'slow',
    easing: 'easeOut',
    properties: {
      from: { transform: 'scale(0)', opacity: 0.4 },
      to: { transform: 'scale(2.5)', opacity: 0 },
    },
    willChange: ['transform', 'opacity'],
  },
};

/** 编排配置 */
export const staggerConfigs: Record<string, StaggerConfig> = {
  list: {
    delayIncrement: 40,
    maxDelay: 600,
    pattern: 'sequential',
    easing: 'appleEaseOut',
  },
  grid: {
    delayIncrement: 50,
    maxDelay: 800,
    pattern: 'centerOut',
    easing: 'appleEaseOut',
  },
  cards: {
    delayIncrement: 60,
    maxDelay: 500,
    pattern: 'sequential',
    easing: 'materialDecelerate',
  },
  toast: {
    delayIncrement: 100,
    maxDelay: 400,
    pattern: 'reverse',
    easing: 'fluentFast',
  },
};

/**
 * 获取动画的 CSS transition 字符串
 */
export function getTransitionString(
  preset: AnimationPreset,
  properties?: string[],
): string {
  const props = properties ?? Object.keys(preset.properties.to);
  const duration = getDurationCss(preset.duration);
  const easing = getEasingCss(preset.easing);
  return props.map((prop) => `${prop} ${duration} ${easing}`).join(', ');
}

/**
 * 生成 CSS keyframes
 */
export function generateKeyframes(name: string, preset: AnimationPreset): string {
  void preset.duration;
  void preset.easing;
  return `@keyframes ${name} {
    from { ${Object.entries(preset.properties.from).map(([k, v]) => `${k}: ${v}`).join('; ')}; }
    to { ${Object.entries(preset.properties.to).map(([k, v]) => `${k}: ${v}`).join('; ')}; }
  }`;
}

export default {
  enter: enterAnimations,
  exit: exitAnimations,
  micro: microAnimations,
  stagger: staggerConfigs,
};
