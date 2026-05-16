/* 全局动画类名映射 */
export const animationKeyframes = {
  spin: 'spin',
  rippleSpread: 'ripple-spread',
  rippleCenter: 'ripple-center',
  shake: 'shake',
  fadeIn: 'fadeIn',
  fadeOut: 'fadeOut',
  fadeInUp: 'fadeInUp',
  fadeInDown: 'fadeInDown',
  scaleIn: 'scaleIn',
  scaleOut: 'scaleOut',
  slideInRight: 'slideInRight',
  slideInLeft: 'slideInLeft',
  slideInUp: 'slideInUp',
  pulse: 'pulse'
};

/* 全局动画样式定义 */
export const globalAnimations = {
  fadeIn: 'fade-in 0.3s ease-in-out',
  fadeOut: 'fade-out 0.3s ease-in-out',
  slideUp: 'slide-up 0.3s ease-out',
  slideDown: 'slide-down 0.3s ease-in',
  bounce: 'bounce 0.6s ease-in-out',
  pulse: 'pulse 1s infinite'
};

/**
 * 获取动画样式
 * @param keyframe 动画关键帧
 * @param duration 持续时间 (毫秒)
 * @param easing 缓动函数
 * @param iteration 重复次数
 */
export function getAnimation(
  keyframe: keyof typeof animationKeyframes,
  duration: number = 300,
  easing: string = 'ease',
  iteration: number | 'infinite' = 1,
): string {
  const name = animationKeyframes[keyframe];
  return `${name} ${duration}ms ${easing} ${iteration}`;
}

export default animationKeyframes;