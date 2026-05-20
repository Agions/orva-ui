---
sidebar_position: 5
---

# Hooks 参考

本模块系统梳理了 orva-ui 中所有自定义 Hooks 的功能描述、参数说明、返回值类型、使用示例及适用场景。

## 📋 目录

- [Hooks 简介](#hooks-简介)
- [状态管理 Hooks](#状态管理-hooks)
- [副作用 Hooks](#副作用-hooks)
- [UI 交互 Hooks](#ui-交互-hooks)
- [生命周期 Hooks](#生命周期-hooks)
- [异步处理 Hooks](#异步处理-hooks)
- [DOM 操作 Hooks](#dom-操作-hooks)

## Hooks 简介

Hooks 是 React 16.8 引入的新特性，允许在函数组件中使用状态和其他 React 特性。

### Hooks 的优势

- **函数组件优先**：使用函数组件编写更简洁、更易维护的代码
- **复用逻辑**：将组件间共享的逻辑提取到自定义 Hooks 中
- **副作用管理**：统一管理组件的副作用
- **类型安全**：在 TypeScript 中提供更好的类型推断

### 自定义 Hooks 规则

1. **命名规范**：必须以 `use` 开头
2. **调用位置**：只能在函数组件或其他自定义 Hooks 中调用
3. **顶层调用**：不能在循环、条件或嵌套函数中调用
4. **类型定义**：为自定义 Hooks 添加类型定义

---

## 状态管理 Hooks

### useBoolean

**功能**：管理布尔值状态，提供切换、设置 true/false 的方法。

```tsx
import { useBoolean } from 'orva-ui/hooks';

function ToggleExample() {
  const { value, setTrue, setFalse, toggle } = useBoolean(false);

  return (
    <View>
      <Text>{value ? 'True' : 'False'}</Text>
      <Button onClick={toggle}>Toggle</Button>
      <Button onClick={setTrue}>Set True</Button>
      <Button onClick={setFalse}>Set False</Button>
    </View>
  );
}
```

**返回值**：
```typescript
interface UseBooleanReturn {
  value: boolean;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
}
```

---

### useToggle

**功能**：管理布尔值状态，提供切换方法。

```tsx
import { useToggle } from 'orva-ui/hooks';

function ToggleExample() {
  const [value, toggle] = useToggle(false);

  return (
    <View>
      <Text>{value ? 'True' : 'False'}</Text>
      <Button onClick={toggle}>Toggle</Button>
    </View>
  );
}
```

**返回值**：`[boolean, () => void]`

---

### useCounter

**功能**：管理数字计数状态。

```tsx
import { useCounter } from 'orva-ui/hooks';

function CounterExample() {
  const { count, increment, decrement, reset } = useCounter(0, {
    min: 0,
    max: 100,
  });

  return (
    <View>
      <Text>Count: {count}</Text>
      <Button onClick={increment}>+</Button>
      <Button onClick={decrement}>-</Button>
      <Button onClick={reset}>Reset</Button>
    </View>
  );
}
```

**返回值**：
```typescript
interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}
```

---

### useLocalStorage

**功能**：操作 localStorage，自动序列化/反序列化。

```tsx
import { useLocalStorage } from 'orva-ui/hooks';

function StorageExample() {
  const [value, setValue, removeValue] = useLocalStorage('username', 'Guest');

  return (
    <View>
      <Text>Username: {value}</Text>
      <Button onClick={() => setValue('New User')}>Set</Button>
      <Button onClick={removeValue}>Remove</Button>
    </View>
  );
}
```

---

### useSessionStorage

**功能**：操作 sessionStorage。

```tsx
import { useSessionStorage } from 'orva-ui/hooks';

const [token, setToken, removeToken] = useSessionStorage('token', '');
```

---

## 副作用 Hooks

### useDebounce

**功能**：防抖处理。

```tsx
import { useDebounce } from 'orva-ui/hooks';

function DebounceExample() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  return <Input value={inputValue} onChange={setInputValue} />;
}
```

---

### useThrottle

**功能**：节流处理。

```tsx
import { useThrottle } from 'orva-ui/hooks';

const throttledValue = useThrottle(value, 1000);
```

---

### usePrevious

**功能**：获取上一个渲染周期的值。

```tsx
import { usePrevious } from 'orva-ui/hooks';

function PreviousExample({ value }) {
  const prevValue = usePrevious(value);

  return (
    <View>
      <Text>Current: {value}</Text>
      <Text>Previous: {prevValue}</Text>
    </View>
  );
}
```

---

## UI 交互 Hooks

### useTheme

**功能**：主题管理，支持亮色/暗色/跟随系统。

```tsx
import { useTheme } from 'orva-ui/hooks';

function ThemeExample() {
  const { 
    mode,           // 'light' | 'dark' | 'system'
    resolvedMode,   // 实际模式 'light' | 'dark'
    theme,          // 主题配置对象
    isDark,         // 是否为暗色
    isLight,        // 是否为亮色
    setMode,        // 设置模式
    toggleMode,     // 切换模式
    systemPreference // 系统偏好
  } = useTheme('system');

  return (
    <View>
      <Text>当前主题：{isDark ? '暗色' : '亮色'}</Text>
      <Button onClick={toggleMode}>切换主题</Button>
    </View>
  );
}

// 使用 ThemeProvider
function App() {
  return (
    <ThemeProvider defaultMode="system">
      <Content />
    </ThemeProvider>
  );
}
```

**返回值**：
```typescript
interface UseThemeReturn {
  mode: ThemeMode;
  resolvedMode: 'light' | 'dark';
  theme: ThemeConfig;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
  isDark: boolean;
  isLight: boolean;
  systemPreference: 'light' | 'dark';
}
```

---

### useAccessibility

**功能**：可访问性支持，提供 ARIA 属性和键盘导航。

```tsx
import { useAccessibility, ARIA_ROLES } from 'orva-ui/hooks';

function AccessibleButton({ onClick, children }) {
  const a11y = useAccessibility({
    ariaLabel: '关闭按钮',
    role: ARIA_ROLES.button,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        onClick();
      }
    },
  });

  return (
    <button {...a11y.getAriaAttributes()} onKeyDown={a11y.handleKeyDown}>
      {children}
    </button>
  );
}
```

**返回值**：
```typescript
interface UseAccessibilityReturn {
  handleKeyDown: (event: KeyboardEvent) => void;
  getAriaAttributes: () => Record<string, string | undefined>;
  isKeyboardAccessible: boolean;
}
```

---

### useVirtualList

**功能**：虚拟列表，优化长列表渲染性能。

```tsx
import { useVirtualList } from 'orva-ui/hooks';

function VirtualListExample() {
  const { 
    visibleItems,    // 可视区域的列表项
    totalHeight,     // 列表总高度
    containerRef,    // 滚动容器 ref
    onScroll,        // 滚动事件处理
    scrollToIndex,   // 滚动到指定索引
    scrollTop        // 当前滚动位置
  } = useVirtualList(items, {
    itemHeight: 60,
    viewportHeight: 500,
    bufferCount: 5,
    dynamicHeight: false,
  });

  return (
    <div ref={containerRef} onScroll={onScroll} style={{ height: 500, overflow: 'auto' }}>
      <div style={{ height: totalHeight, position: 'relative' }}>
        {visibleItems.map(({ index, item, top, height }) => (
          <div key={item.id} style={{ position: 'absolute', top, height }}>
            <ListItem data={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
```

**选项**：
```typescript
interface UseVirtualListOptions {
  itemHeight?: number | ((index: number) => number);
  viewportHeight?: number;
  bufferCount?: number;
  minItemHeight?: number;
  dynamicHeight?: boolean;
}
```

---

### useLazyLoad

**功能**：内容懒加载，支持 Intersection Observer。

```tsx
import { useLazyLoad, useLazyImage } from 'orva-ui/hooks';

function LazyImage({ src }: { src: string }) {
  const { ref, status, content, retry } = useLazyLoad(
    () => <img src={src} alt="lazy" />,
    {
      placeholderContent: <Skeleton />,
      errorContent: <ErrorMessage onRetry={retry} />,
      loadingContent: <LoadingSpinner />,
      retryCount: 3,
      retryDelay: 1000,
    }
  );

  return <div ref={ref}>{content}</div>;
}

// 图片懒加载
function LazyImageSimple({ src }: { src: string }) {
  const { imageSrc, status, retry } = useLazyImage(src);

  return <img src={imageSrc} alt="lazy" />;
}
```

**返回值**：
```typescript
interface UseLazyLoadReturn {
  ref: React.RefObject<HTMLDivElement | null>;
  status: 'idle' | 'loading' | 'loaded' | 'error';
  isVisible: boolean;
  error: Error | null;
  retry: () => void;
  load: () => void;
}
```

---

### useMicroAnimation

**功能**：微动画控制。

```tsx
import { useMicroAnimation } from 'orva-ui/hooks';

function AnimatedButton({ children }) {
  const { animate, isAnimating, triggerAnimation } = useMicroAnimation({
    type: 'fade',
    duration: 200,
    easing: 'ease-out',
  });

  return (
    <button onClick={() => triggerAnimation('click')}>
      {children}
    </button>
  );
}
```

---

## 生命周期 Hooks

### useMount

**功能**：组件挂载时执行回调。

```tsx
import { useMount } from 'orva-ui/hooks';

function MyComponent() {
  useMount(() => {
    console.log('Component mounted');
  });

  return <div>My Component</div>;
}
```

---

### useUnmount

**功能**：组件卸载时执行回调。

```tsx
import { useUnmount } from 'orva-ui/hooks';

function MyComponent() {
  useUnmount(() => {
    console.log('Component unmounted');
  });

  return <div>My Component</div>;
}
```

---

### useMounted

**功能**：检查组件是否已挂载。

```tsx
import { useMounted } from 'orva-ui/hooks';

function MyComponent() {
  const isMounted = useMounted();

  return <div>{isMounted ? 'Mounted' : 'Unmounted'}</div>;
}
```

---

## 异步处理 Hooks

### useRequest

**功能**：处理网络请求。

```tsx
import { useRequest } from 'orva-ui/hooks';

function DataExample() {
  const { data, error, loading, run, refetch } = useRequest(
    async (id: number) => {
      const response = await fetch(`/api/data/${id}`);
      return response.json();
    },
    {
      manual: true,
      onSuccess: (data) => console.log(data),
      onError: (error) => console.error(error),
    }
  );

  return (
    <View>
      <Button onClick={() => run(1)} disabled={loading}>
        Fetch Data
      </Button>
      {data && <Text>{JSON.stringify(data)}</Text>}
    </View>
  );
}
```

---

### useMutation

**功能**：处理变更请求（POST/PUT/DELETE）。

```tsx
import { useMutation } from 'orva-ui/hooks';

function SubmitExample() {
  const { mutate, loading } = useMutation('/api/submit', {
    onSuccess: () => {
      console.log('提交成功');
    },
    onError: (error) => {
      console.error('提交失败', error);
    },
  });

  return (
    <Button onClick={() => mutate({ name: 'test' })} disabled={loading}>
      提交
    </Button>
  );
}
```

---

## DOM 操作 Hooks

### useClickOutside

**功能**：检测点击外部区域。

```tsx
import { useClickOutside } from 'orva-ui/hooks';

function Dropdown() {
  const ref = useRef(null);

  useClickOutside(ref, () => {
    console.log('点击了外部区域');
  });

  return <div ref={ref}>Dropdown</div>;
}
```

---

### useEventListener

**功能**：添加事件监听器。

```tsx
import { useEventListener } from 'orva-ui/hooks';

function WindowResize() {
  useEventListener('resize', (event) => {
    console.log('窗口大小变化', event);
  });

  return <div>Resize Me</div>;
}
```

---

### useLongPress

**功能**：长按检测。

```tsx
import { useLongPress } from 'orva-ui/hooks';

function LongPressExample() {
  const longPressProps = useLongPress(() => {
    console.log('长按触发');
  }, {
    threshold: 500,
  });

  return <button {...longPressProps}>长按我</button>;
}
```

---

## 工具类 Hooks

### useResponsive

**功能**：响应式布局检测。

```tsx
import { useResponsive } from 'orva-ui/hooks';

function ResponsiveExample() {
  const { breakpoint, isMobile, isTablet, isDesktop } = useResponsive();

  return (
    <View>
      <Text>当前断点：{breakpoint}</Text>
      <Text>{isMobile ? '移动端' : isDesktop ? '桌面端' : '平板'}</Text>
    </View>
  );
}
```

---

### useMediaQuery

**功能**：CSS 媒体查询。

```tsx
import { useMediaQuery } from 'orva-ui/hooks';

function DarkModeDetector() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)');

  return <div>{prefersDark ? '暗色模式' : '亮色模式'}</div>;
}
```

---

### usePlatform

**功能**：检测当前运行平台。

```tsx
import { usePlatform, useIsH5, useIsMiniProgram } from 'orva-ui/hooks';

function PlatformExample() {
  const platform = usePlatform();
  const isH5 = useIsH5();
  const isMiniProgram = useIsMiniProgram();

  return (
    <View>
      <Text>平台：{platform}</Text>
      <Text>{isH5 ? 'H5' : isMiniProgram ? '小程序' : '其他'}</Text>
    </View>
  );
}
```

---

## 最佳实践

1. **按需引入**：只引入需要的 Hooks
2. **组合使用**：多个 Hooks 可以组合使用
3. **清理副作用**：注意 Hooks 的清理函数
4. **类型安全**：为 Hooks 添加完整的类型定义
5. **性能优化**：使用 useCallback/useMemo 缓存返回值

## 下一步

- [查看组件文档](../components/basic/button)
- [阅读开发指南](../guides/installation)
- [探索 API 参考](../api)
