import { defineConfig, presetUno, presetAttributify, presetIcons, presetTypography, presetWebFonts } from 'unocss';

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Monaco', 'Consolas', 'monospace'],
      },
    }),
  ],
  rules: [
    [/^border-theme-(.+)$/, ([, color]) => {
      return `--border-color: var(--orva-ui-${color}); border-color: var(--border-color);`;
    }],
    [/^bg-theme-(.+)$/, ([, color]) => {
      return `--bg-color: var(--orva-ui-${color}); background-color: var(--bg-color);`;
    }],
    [/^text-theme-(.+)$/, ([, color]) => {
      return `--text-color: var(--orva-ui-${color}); color: var(--text-color);`;
    }],
  ],
  shortcuts: {
    'btn-primary': 'px-4 py-2 rounded-md bg-theme-primary text-white hover:bg-theme-primary-600 transition-colors',
    'btn-secondary': 'px-4 py-2 rounded-md bg-theme-secondary text-white hover:bg-theme-secondary-600 transition-colors',
    'card-base': 'p-4 rounded-lg bg-card border border-border shadow-sm',
    'input-base': 'px-3 py-2 rounded-md border border-border focus:border-focus outline-none transition-colors',
  },
  theme: {
    colors: {
      'orva-ui': {
        primary: '#a855f7',
        'primary-50': '#faf5ff',
        'primary-100': '#f3e8ff',
        'primary-200': '#e9d5ff',
        'primary-300': '#d8b4fe',
        'primary-400': '#c084fc',
        'primary-500': '#a855f7',
        'primary-600': '#9333ea',
        'primary-700': '#7c3aed',
        'primary-800': '#6b21a8',
        'primary-900': '#581c87',

        secondary: '#f97316',
        'secondary-50': '#fff7ed',
        'secondary-100': '#ffedd5',
        'secondary-200': '#fed7aa',
        'secondary-300': '#fdba74',
        'secondary-400': '#fb923c',
        'secondary-500': '#f97316',
        'secondary-600': '#ea580c',
        'secondary-700': '#c2410c',
        'secondary-800': '#9a3412',
        'secondary-900': '#7c2d12',
      },
      card: '#ffffff',
      border: '#e5e7eb',
      focus: '#a855f7',
      text: '#111827',
      'text-secondary': '#6b7280',
    },
  },
  variants: [
    (matcher) => {
      if (!matcher.startsWith('[data-theme=dark]')) return matcher;
      return {
        matcher: matcher.slice('[data-theme=dark]'.length),
        selector: () => `[data-theme="dark"] ${matcher}`,
      };
    },
  ],
  safelist: [
    'grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    'flex-row', 'flex-col', 'items-center', 'justify-center',
    'text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl',
    'font-light', 'font-normal', 'font-medium', 'font-semibold', 'font-bold',
  ],
});