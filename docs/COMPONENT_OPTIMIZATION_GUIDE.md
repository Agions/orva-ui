# Component Optimization Documentation

## 组件优化设计模式

本文档描述 orva-ui 组件库的优化设计模式，旨在提高组件的可维护性、可扩展性和性能。

---

## 1. 组件工厂模式 (createComponent)

### 设计理念

使用工厂函数创建标准化组件，统一注入主题、平台上下文和性能优化。

### 核心特性

- **自动 forwardRef**: 所有组件原生支持 ref 转发
- **React.memo 优化**: 默认启用浅比较，避免不必要的重渲染
- **默认 Props 合并**: 支持 defaultProps 配置
- **BEM 命名规范**: 自动生成符合 BEM 规范的类名

### 使用示例

```typescript
import { createComponent } from '@orva-ui/utils';

interface ButtonProps extends BaseProps {
  type?: 'primary' | 'default' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
}

const Button = createComponent<ButtonProps, HTMLButtonElement>({
  name: 'Button',
  defaultProps: {
    type: 'default',
    size: 'md',
  },
  render: (props, ref) => {
    const { type, size, loading, children, className, ...rest } = props;
    
    return (
      <button
        ref={ref}
        className={createBEM('button', '', {
          [type]: true,
          [size]: true,
          loading,
        })}
        disabled={loading}
        {...rest}
      >
        {loading && <LoadingIcon />}
        {children}
      </button>
    );
  },
});
```

---

## 2. 复合组件模式 (Compound Components)

### 设计理念

将复杂组件拆分为多个协作的子组件，提供灵活的组合方式。

### 使用示例

```typescript
import { createCompoundComponent } from '@orva-ui/utils';

// 子组件
const SelectOption = createComponent<SelectOptionProps>({
  name: 'Select.Option',
  render: (props) => <option value={props.value}>{props.label}</option>,
});

// 主组件
const Select = createCompoundComponent({
  main: {
    name: 'Select',
    render: (props, ref) => (
      <select ref={ref} className="orva-ui-select" {...props}>
        {props.children}
      </select>
    ),
  },
  subComponents: {
    Option: SelectOption,
  },
});

// 使用
<Select value={value} onChange={onChange}>
  <Select.Option value="1">选项 1</Select.Option>
  <Select.Option value="2">选项 2</Select.Option>
</Select>
```

---

## 3. Hook 组合模式

### 三大核心 Hook

每个交互组件都集成三大核心 Hook，提供一致的用户体验：

#### useTheme - 主题系统

```typescript
const { theme, isDark, toggleMode } = useTheme();

// 使用 CSS 变量
const styles = {
  backgroundColor: isDark ? theme.colors.primary : '#fff',
  color: isDark ? '#fff' : theme.colors.primary,
};
```

#### useMicroAnimation - 微动画

```typescript
const { 
  animate, 
  isAnimating, 
  triggerAnimation 
} = useMicroAnimation({
  type: 'fade',
  duration: 200,
  easing: 'ease-out',
});
```

#### useAccessibility - 可访问性

```typescript
const a11y = useAccessibility({
  ariaLabel: '关闭按钮',
  role: 'button',
  onKeyDown: (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClose();
    }
  },
});

// 在组件中使用
<div {...a11y.getAriaAttributes()} onKeyDown={a11y.handleKeyDown}>
  {children}
</div>
```

---

## 4. 性能优化模式

### 4.1 虚拟滚动 (useVirtualList)

适用于超长列表的性能优化：

```typescript
const {
  visibleItems,
  totalHeight,
  containerRef,
  onScroll,
} = useVirtualList(items, {
  itemHeight: 60,
  viewportHeight: 500,
  bufferCount: 5,
});

return (
  <div ref={containerRef} onScroll={onScroll} style={{ height: 500, overflow: 'auto' }}>
    <div style={{ height: totalHeight, position: 'relative' }}>
      {visibleItems.map(({ index, item, top, height }) => (
        <div
          key={item.id}
          style={{
            position: 'absolute',
            top,
            height,
            width: '100%',
          }}
        >
          <ListItem data={item} />
        </div>
      ))}
    </div>
  </div>
);
```

### 4.2 懒加载 (useLazyLoad)

```typescript
const { ref, status, content } = useLazyLoad(
  () => <img src={imageUrl} alt="lazy" />,
  {
    placeholderContent: <Skeleton />,
    errorContent: <ErrorMessage onRetry={retry} />,
  }
);

return <div ref={ref}>{status === 'loaded' && content}</div>;
```

### 4.3 React.memo 优化

所有通过 `createComponent` 创建的组件默认启用 React.memo：

```typescript
// 自定义比较函数
const MemoizedComponent = memo(ForwardedComponent, (prevProps, nextProps) => {
  return prevProps.className === nextProps.className &&
         prevProps.disabled === nextProps.disabled;
});
```

---

## 5. 主题定制模式

### 5.1 CSS 变量主题

```css
/* 亮色主题 */
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --spacing-md: 1rem;
  --radius-md: 0.375rem;
}

/* 暗色主题 */
.dark {
  --color-primary: #818cf8;
  --color-secondary: #a78bfa;
}
```

### 5.2 主题 Provider

```typescript
import { ThemeProvider } from '@orva-ui/hooks';

function App() {
  return (
    <ThemeProvider defaultMode="system">
      <Content />
    </ThemeProvider>
  );
}
```

### 5.3 自定义主题

```typescript
const { theme, setMode } = useTheme('light');

// 动态修改主题颜色
useEffect(() => {
  document.documentElement.style.setProperty('--color-primary', customPrimary);
}, [customPrimary]);
```

---

## 6. 组件拆分模式

### 大型组件拆分原则

当组件超过 500 行时，考虑按功能域拆分：

```typescript
// Video 组件拆分示例
// Video.tsx (主组合器)
// ├── VideoPlayer.tsx (视频元素渲染)
// ├── VideoControls.tsx (控制栏)
// ├── VideoOverlay.tsx (覆盖层)
// ├── VideoAd.tsx (广告)
// ├── VideoChapterMarkers.tsx (章节标记)
// ├── useVideoPlayer.ts (核心逻辑 Hook)
// ├── Video.styles.ts (样式)
// └── utils.ts (工具函数)
```

### 拆分标准

| 指标 | 阈值 | 行动 |
|------|------|------|
| 代码行数 | > 500 | 考虑拆分 |
| 状态变量 | > 10 | 提取到 Hook |
| 事件处理函数 | > 15 | 按功能分组 |
| 子组件数量 | > 5 | 考虑复合组件模式 |

---

## 7. 最佳实践

### 7.1 Props 设计

```typescript
// ✅ 好的设计：明确的类型定义
interface ButtonProps extends BaseProps {
  type?: 'primary' | 'default';
  size?: 'sm' | 'md' | 'lg';
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

// ❌ 避免：过度使用 any
interface BadButtonProps {
  onClick?: any;
  props?: any;
}
```

### 7.2 事件处理

```typescript
// ✅ 使用 useCallback 缓存事件处理函数
const handleClick = useCallback((event: MouseEvent) => {
  if (disabled) return;
  onClick?.(event);
}, [disabled, onClick]);

// ❌ 避免：内联匿名函数
<button onClick={() => handleClick()} />
```

### 7.3 条件渲染

```typescript
// ✅ 使用短路求值
{isLoading && <LoadingSpinner />}

// ✅ 使用三元运算符
{hasError ? <ErrorMessage /> : <Content />}

// ❌ 避免：if 语句直接渲染
{if (isLoading) return <LoadingSpinner />}
```

---

## 8. 测试策略

### 8.1 单元测试

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@orva-ui/components';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click me');
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### 8.2 Hook 测试

```typescript
import { renderHook } from '@testing-library/react';
import { useTheme } from '@orva-ui/hooks';

describe('useTheme', () => {
  it('defaults to system mode', () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.mode).toBe('system');
  });

  it('toggles between light and dark', () => {
    const { result } = renderHook(() => useTheme('light'));
    result.current.toggleMode();
    expect(result.current.resolvedMode).toBe('dark');
  });
});
```

---

## 9. 性能监控

### 9.1 使用 Performance Monitor

```typescript
import { usePerformanceMonitor } from '@orva-ui/hooks';

function HeavyComponent() {
  const metrics = usePerformanceMonitor({
    trackRenderTime: true,
    trackMemoryUsage: true,
  });

  useEffect(() => {
    if (metrics.renderTime > 16) {
      console.warn('Component taking too long to render');
    }
  }, [metrics.renderTime]);

  return <div>{children}</div>;
}
```

### 9.2 React DevTools Profiler

使用 React Profiler 识别性能瓶颈：

1. 打开 React DevTools
2. 切换到 Profiler 标签
3. 点击录制按钮
4. 执行交互操作
5. 停止录制并分析

---

## 10. 迁移指南

### 从旧版本迁移

1. **更新依赖**
   ```bash
   npm install @orva-ui/components@latest @orva-ui/hooks@latest
   ```

2. **更新导入路径**
   ```typescript
   // 旧
   import { Button } from 'orva-ui';
   
   // 新
   import { Button } from '@orva-ui/components';
   import { useTheme } from '@orva-ui/hooks';
   ```

3. **检查 Props 变化**
   - 所有组件现在支持 `aria-*` 属性
   - 新增 `size` 和 `variant` 标准 Props

4. **测试**
   ```bash
   npm run type-check
   npm run test:run
   ```

---

## 总结

orva-ui 组件库的优化设计模式旨在：

1. **可维护性**: 清晰的组件结构、统一的编码规范
2. **可扩展性**: 工厂模式、复合组件、Hook 组合
3. **性能**: React.memo、虚拟滚动、懒加载
4. **可访问性**: ARIA 支持、键盘导航、屏幕阅读器
5. **主题化**: CSS 变量、暗色模式、自定义主题

遵循这些模式可以构建高质量、可维护的 React/Taro 应用。
