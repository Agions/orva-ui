/**
 * 大组件懒加载入口
 * 为体积较大的组件提供 dynamic import 支持，减少初始 bundle 体积
 *
 * @module lazy
 *
 * @example
 * ```tsx
 * // 懒加载 Cascader（659 行）
 * import { LazyCascader } from 'orva-ui/lazy';
 *
 * function App() {
 *   return (
 *     <Suspense fallback={<Loading />}>
 *       <LazyCascader options={options} />
 *     </Suspense>
 *   );
 * }
 * ```
 */

import React, { Suspense, ComponentType, lazy as reactLazy } from 'react';

/**
 * 创建懒加载组件的工厂函数
 */
function createLazy<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
): React.LazyExoticComponent<T> {
  return reactLazy(async () => {
    const mod = await importFn();
    return { default: mod.default as T };
  });
}

// Large component lazy wrappers (>400 lines, loaded on demand)
export const LazyCascader = createLazy(() => import('./components/form/Cascader/Cascader'));
export const LazyUpload = createLazy(() => import('./components/form/Upload/Upload'));
export const LazyVideo = createLazy(() => import('./components/basic/Video/Video'));
export const LazyAutoComplete = createLazy(() => import('./components/form/AutoComplete/AutoComplete'));
export const LazySelect = createLazy(() => import('./components/form/Select/Select'));
export const LazySwitch = createLazy(() => import('./components/form/Switch/Switch'));
export const LazyCheckbox = createLazy(() => import('./components/form/Checkbox/Checkbox'));
export const LazyDatePicker = createLazy(() => import('./components/form/DatePicker/DatePicker'));
export const LazySlider = createLazy(() => import('./components/form/Slider/Slider'));
export const LazyRadio = createLazy(() => import('./components/form/Radio/Radio'));
export const LazyTextarea = createLazy(() => import('./components/form/Textarea/Textarea'));
