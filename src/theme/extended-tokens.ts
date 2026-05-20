/**
 * 扩展的设计令牌系统
 * 包含颜色、间距、排版和动画的完整配置
 */

export const EXTENDED_DESIGN_TOKENS = {
  'colors': {
    'semantic_colors': {
      'brand': {
        'primary': '#a855f7',
        'primary-light': '#c084fc',
        'primary-dark': '#9333ea',
        'secondary': '#f97316',
        'accent': '#ec4899',
      },
      'status': {
        'success': '#22c55e',
        'success-light': '#86efac',
        'success-dark': '#16a34a',
        'warning': '#f59e0b',
        'warning-light': '#fcd34d',
        'warning-dark': '#d97706',
        'error': '#ef4444',
        'error-light': '#fca5a5',
        'error-dark': '#dc2626',
        'info': '#3b82f6',
        'info-light': '#93c5fd',
        'info-dark': '#2563eb',
      },
      'neutral': {
        'grays': {
          '50': '#fafafa',
          '100': '#f4f4f5',
          '200': '#e4e4e7',
          '300': '#d4d4d8',
          '400': '#a1a1aa',
          '500': '#71717a',
          '600': '#52525b',
          '700': '#3f3f46',
          '800': '#27272a',
          '900': '#18181b',
          '950': '#09090b',
        },
        'slate': {
          '50': '#f8fafc',
          '100': '#f1f5f9',
          '200': '#e2e8f0',
          '300': '#cbd5e1',
          '400': '#94a3b8',
          '500': '#64748b',
          '600': '#475569',
          '700': '#334155',
          '800': '#1e293b',
          '900': '#0f172a',
          '950': '#020617',
        },
      },
    },
    'gradients': {
      'primary': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
      'secondary': 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
      'warm': 'linear-gradient(135deg, #fbbf24 0%, #f97316 100%)',
      'cool': 'linear-gradient(135deg, #3b82f6 0%, #a855f7 100%)',
      'success': 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
      'error': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    },
    'shadows': {
      'xs': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      'sm': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
      'xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      'inner': 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
      'ring': '0 0 0 3px rgb(168 85 247 / 0.4)',
    },
    'borders': {
      'widths': {
        'hairline': '1px',
        'thin': '2px',
        'medium': '3px',
        'thick': '4px',
      },
      'radius': {
        'none': '0px',
        'sm': '0.125rem',
        'base': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full': '9999px',
      },
    },
    'transitions': {
      'duration': {
        'fastest': '100ms',
        'faster': '150ms',
        'fast': '200ms',
        'normal': '300ms',
        'slow': '500ms',
        'slowest': '700ms',
      },
      'timing': {
        'linear': 'linear',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  'spacing': {
    'spacing': {
      '0': '0px',
      'px': '1px',
      '0.5': '0.125rem',
      '1': '0.25rem',
      '1.5': '0.375rem',
      '2': '0.5rem',
      '2.5': '0.625rem',
      '3': '0.75rem',
      '3.5': '0.875rem',
      '4': '1rem',
      '5': '1.25rem',
      '6': '1.5rem',
      '7': '1.75rem',
      '8': '2rem',
      '9': '2.25rem',
      '10': '2.5rem',
      '11': '2.75rem',
      '12': '3rem',
      '14': '3.5rem',
      '16': '4rem',
      '20': '5rem',
      '24': '6rem',
      '28': '7rem',
      '32': '8rem',
      '36': '9rem',
      '40': '10rem',
      '44': '11rem',
      '48': '12rem',
      '52': '13rem',
      '56': '14rem',
      '60': '15rem',
      '64': '16rem',
      '72': '18rem',
      '80': '20rem',
      '96': '24rem',
    },
    'container': {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
  },
  'typography': {
    'font-family': {
      'sans': [
        'Inter',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
      ],
      'serif': [
        'Georgia',
        'Cambria',
        '"Times New Roman"',
        'Times',
        'serif',
      ],
      'mono': [
        'ui-monospace',
        'SFMono-Regular',
        'Menlo',
        'Monaco',
        'Consolas',
        '"Liberation Mono"',
        '"Courier New"',
        'monospace',
      ],
    },
    'font-size': {
      'xs': [
        '0.75rem',
        '1rem',
      ],
      'sm': [
        '0.875rem',
        '1.25rem',
      ],
      'base': [
        '1rem',
        '1.5rem',
      ],
      'lg': [
        '1.125rem',
        '1.75rem',
      ],
      'xl': [
        '1.25rem',
        '1.75rem',
      ],
      '2xl': [
        '1.5rem',
        '2rem',
      ],
      '3xl': [
        '1.875rem',
        '2.25rem',
      ],
      '4xl': [
        '2.25rem',
        '2.5rem',
      ],
      '5xl': [
        '3rem',
        '1',
      ],
      '6xl': [
        '3.75rem',
        '1',
      ],
    },
    'font-weight': {
      'thin': '100',
      'extralight': '200',
      'light': '300',
      'normal': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700',
      'extrabold': '800',
      'black': '900',
    },
    'line-height': {
      'none': '1',
      'tight': '1.25',
      'snug': '1.375',
      'normal': '1.5',
      'relaxed': '1.625',
      'loose': '2',
    },
  },
  'animations': {
    'keyframes': {
      'fade-in': {
        'from': {
          'opacity': '0',
        },
        'to': {
          'opacity': '1',
        },
      },
      'slide-up': {
        'from': {
          'transform': 'translateY(100%)',
          'opacity': '0',
        },
        'to': {
          'transform': 'translateY(0)',
          'opacity': '1',
        },
      },
      'slide-down': {
        'from': {
          'transform': 'translateY(-100%)',
          'opacity': '0',
        },
        'to': {
          'transform': 'translateY(0)',
          'opacity': '1',
        },
      },
      'scale-in': {
        'from': {
          'transform': 'scale(0.95)',
          'opacity': '0',
        },
        'to': {
          'transform': 'scale(1)',
          'opacity': '1',
        },
      },
      'rotate': {
        'from': {
          'transform': 'rotate(0deg)',
        },
        'to': {
          'transform': 'rotate(360deg)',
        },
      },
    },
    'animations': {
      'fade-in': {
        'animation': 'fade-in 200ms ease-out forwards',
      },
      'slide-up': {
        'animation': 'slide-up 300ms cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      'pulse': {
        'animation': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      'spin': {
        'animation': 'spin 1s linear infinite',
      },
    },
  },
};

// 导出各个子系统
export const EXTENDED_COLORS = EXTENDED_DESIGN_TOKENS.colors;
export const EXTENDED_SPACING = EXTENDED_DESIGN_TOKENS.spacing;
export const EXTENDED_TYPOGRAPHY = EXTENDED_DESIGN_TOKENS.typography;
export const EXTENDED_ANIMATIONS = EXTENDED_DESIGN_TOKENS.animations;
