import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],

  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: [path.resolve(__dirname, 'vitest.setup.ts')],
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}', 'tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      '.git',
      '.cache',
      '**/*.d.ts',
      '**/node_modules/**',
      'tests/**/e2e/**',
    ],
    testTimeout: 10000,
    hookTimeout: 10000,
    mockReset: true,
    restoreMocks: true,
    clearMocks: true,
    // Performance optimizations - fewer threads to reduce memory usage
    pool: 'threads',
    poolOptions: {
      threads: {
        singleThread: false,
        minThreads: 1,
        maxThreads: 2,
      },
    },
    // Reduce environment setup overhead
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    // Coverage configuration (disabled by default for speed)
    coverage: {
      enabled: false,
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@types': path.resolve(__dirname, './src/types'),
      '@theme': path.resolve(__dirname, './src/theme'),
      '@hooks': path.resolve(__dirname, './src/hooks'),
      '@tarojs/runtime': path.resolve(__dirname, './tests/stubs/taro-runtime.ts'),
      '@tarojs/taro': path.resolve(__dirname, './tests/stubs/taro.ts'),
    },
  },

  css: {
    preprocessorOptions: {
      scss: {
        charset: false,
      },
    },
  },

  define: {
    'process.env.NODE_ENV': '"test"',
    'process.env.VITE_APP_ENV': '"test"',
    ENABLE_INNER_HTML: true,
    ENABLE_ADJACENT_HTML: true,
    SUPPORT_TYPED_ARRAY: true,
    ENABLE_CLONE_NODE: true,
    ENABLE_CONTAINS: true,
    ENABLE_SIZE_APIS: true,
    ENABLE_TEMPLATE_CONTENT: true,
    ENABLE_CALLAPP_API: true,
    ENABLE_REAL_DOM: true,
    ENABLE_VIRTUAL_HOST: true,
    ENABLE_VDOM: true,
    ENABLE_XMLHttpRequest: true,
    ENABLE_INCLUDE: true,
    ENABLE_SCRIPT: true,
    ENABLE_NVUE_PLUGIN: false,
    ENABLE_WXS_SCRIPT: false,
    ENABLE_WXS_MODULE: false,
  },
});
