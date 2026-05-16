/**
 * Nano-UI Motion System - 专业动效类型系统
 * 参考 Apple HIG、Material Design Motion、Fluent Design
 * @module theme/motion/types
 */

/** 缓动曲线类型 */
export type EasingType =
  | 'linear'
  | 'ease'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'spring'
  // Apple HIG
  | 'appleDefault'
  | 'appleEaseIn'
  | 'appleEaseOut'
  | 'appleEaseInOut'
  | 'appleSpring'
  // Material Design
  | 'materialStandard'
  | 'materialDecelerate'
  | 'materialAccelerate'
  | 'materialEmphasized'
  // Fluent Design
  | 'fluentStandard'
  | 'fluentEntrance'
  | 'fluentExit'
  | 'fluentFast'
  // 自定义
  | 'custom';

/** 时长等级 */
export type DurationScale =
  | 'instant'    // 0ms - 状态切换
  | 'micro'      // 50-100ms - 微交互
  | 'fast'       // 150-200ms - 按钮、开关
  | 'normal'     // 250-300ms - 标准过渡
  | 'slow'       // 400-500ms - 页面过渡
  | 'dramatic'   // 600-1000ms - 强调动画
  | 'ambient';   // 1000ms+ - 环境动画

/** 动画方向 */
export type AnimationDirection =
  | 'fade'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'
  | 'scale'
  | 'scaleX'
  | 'scaleY'
  | 'rotate'
  | 'flip'
  | 'blur';

/** 编排模式 */
export type StaggerPattern =
  | 'sequential'   // 顺序
  | 'reverse'      // 反向
  | 'centerOut'    // 从中心向外
  | 'edgesIn'      // 从边缘向中心
  | 'random';      // 随机

/** 弹簧物理参数 */
export interface SpringConfig {
  /** 刚度 (tension) */
  stiffness: number;
  /** 阻尼 (friction) */
  damping: number;
  /** 质量 */
  mass: number;
  /** 初始速度 */
  velocity?: number;
  /** 精度阈值 */
  precision?: number;
}

/** 缓动曲线定义 */
export interface EasingCurve {
  name: string;
  /** CSS cubic-bezier 值 */
  css: string;
  /** 描述 */
  description: string;
  /** 使用场景 */
  usage: string[];
}

/** 时长令牌 */
export interface DurationToken {
  value: number;
  unit: 'ms';
  description: string;
  useCases: string[];
}

/** 动画预设 */
export interface AnimationPreset {
  name: string;
  duration: DurationScale;
  easing: EasingType;
  /** CSS transform / opacity 属性 */
  properties: {
    from: Record<string, string | number>;
    to: Record<string, string | number>;
  };
  /** 是否使用 will-change */
  willChange?: string[];
}

/** 编排配置 */
export interface StaggerConfig {
  /** 延迟增量 (ms) */
  delayIncrement: number;
  /** 最大延迟 (ms) */
  maxDelay?: number;
  /** 模式 */
  pattern: StaggerPattern;
  /** 缓动 */
  easing?: EasingType;
}

/** 微交互配置 */
export interface MicroInteraction {
  /** 触发条件 */
  trigger: 'hover' | 'focus' | 'active' | 'press' | 'release' | 'enter' | 'leave';
  /** 目标属性 */
  properties: Array<{
    property: string;
    from: string | number;
    to: string | number;
    duration: DurationScale;
    easing: EasingType;
  }>;
}

/** 动效令牌集合 */
export interface MotionTokens {
  easings: Record<EasingType, EasingCurve>;
  durations: Record<DurationScale, DurationToken>;
  springs: Record<string, SpringConfig>;
  presets: Record<string, AnimationPreset>;
  stagger: Record<string, StaggerConfig>;
  microInteractions: Record<string, MicroInteraction>;
}

/** 组件动效配置 */
export interface ComponentMotionConfig {
  /** 入场动画 */
  enter?: AnimationPreset;
  /** 出场动画 */
  exit?: AnimationPreset;
  /** 状态变化动画 */
  stateChange?: Record<string, AnimationPreset>;
  /** 微交互 */
  micro?: Record<string, MicroInteraction>;
  /** 布局动画 */
  layout?: AnimationPreset;
}
