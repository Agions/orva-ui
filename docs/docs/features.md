---
sidebar_position: 3
---

# 核心功能

orva-ui 提供了一系列强大的核心功能，旨在提高开发效率、优化性能并提供良好的用户体验。

## 🌐 跨平台兼容

### 多端支持

orva-ui 支持以下平台：

- **微信小程序**：完全兼容微信小程序生态
- **H5**：支持各种现代浏览器
- **React Native**：跨平台移动应用开发
- **其他小程序平台**：支付宝、百度、字节跳动等

### 统一 API 设计

所有组件和工具函数都采用统一的 API 设计，确保在不同平台上的使用体验一致。

```tsx
// 在所有平台上使用相同的 API
import { Button } from 'orva-ui';

<Button type="primary" onClick={() => console.log('点击了按钮')}>
  按钮
</Button>;
```

## 🎣 强大的 React Hooks

orva-ui 提供了丰富的 React Hooks，帮助开发者处理各种常见场景：

### 状态管理

```tsx
import { useToggle, useCounter, useBoolean } from 'orva-ui/hooks';

// 使用 useToggle 管理开关状态
const [isOpen, toggle] = useToggle(false);

// 使用 useCounter 管理计数
const { count, increment, decrement, reset } = useCounter(0, {
  min: 0,
  max: 10,
});

// 使用 useBoolean 管理布尔状态
const { value, setTrue, setFalse, toggle } = useBoolean(false);
```

### 副作用处理

```tsx
import { useDebounce, useThrottle } from 'orva-ui/hooks';

// 防抖处理
const debouncedValue = useDebounce(value, 300);

// 节流处理
const throttledValue = useThrottle(value, 1000);
```

### 性能优化 Hooks

```tsx
import { useVirtualList, useLazyLoad } from 'orva-ui/hooks';

// 虚拟列表 - 优化长列表渲染
const { visibleItems, totalHeight, containerRef } = useVirtualList(items, {
  itemHeight: 60,
  viewportHeight: 500,
});

// 懒加载 - 延迟加载内容
const { ref, status, content } = useLazyLoad(
  () => <img src={imageUrl} alt="lazy" />,
  {
    placeholderContent: <Skeleton />,
  }
);
```

### 主题系统

```tsx
import { useTheme, ThemeProvider } from 'orva-ui/hooks';

function App() {
  const { isDark, toggleMode, theme } = useTheme();
  
  return (
    <div className={isDark ? 'dark' : ''}>
      <button onClick={toggleMode}>
        {isDark ? '☀️ 亮色模式' : '🌙 暗色模式'}
      </button>
    </div>
  );
}

// 使用 ThemeProvider
function Root() {
  return (
    <ThemeProvider defaultMode="system">
      <App />
    </ThemeProvider>
  );
}
```

### 可访问性

```tsx
import { useAccessibility, ARIA_ROLES } from 'orva-ui/hooks';

function AccessibleButton({ onClick, children }) {
  const a11y = useAccessibility({
    ariaLabel: '关闭按钮',
    role: ARIA_ROLES.button,
    onKeyDown: (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
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

### 存储管理

```tsx
import { useLocalStorage, useSessionStorage } from 'orva-ui/hooks';

// 本地存储
const [userInfo, setUserInfo] = useLocalStorage('userInfo', {});

// 会话存储
const [token, setToken] = useSessionStorage('token', '');
```

## 🎨 主题定制

### 设计系统

orva-ui 基于设计系统构建，包含：

- **颜色系统**：主色、辅助色、语义色
- **排版系统**：字体大小、字重、行高
- **间距系统**：统一间距 scale
- **阴影系统**：多层级阴影
- **动画系统**：微动画、过渡效果
- **圆角系统**：统一圆角规范

### 主题变量

支持通过 CSS 变量自定义主题：

```css
/* 自定义主题 */
:root {
  --color-primary: #6366f1;
  --color-secondary: #8b5cf6;
  --spacing-md: 1rem;
  --radius-md: 0.375rem;
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
}

/* 暗色主题 */
.dark {
  --color-primary: #818cf8;
  --color-secondary: #a78bfa;
}
```

### 暗色主题

内置支持暗色主题切换：

```tsx
import { useTheme } from 'orva-ui/hooks';

const { theme, isDark, toggleMode, systemPreference } = useTheme();

// 三种模式：'light' | 'dark' | 'system'
setMode('dark');  // 强制暗色
setMode('light'); // 强制亮色
setMode('system'); // 跟随系统
```

## 📱 组件库架构

### 组件分类

orva-ui 将组件分为以下几大类：

| 分类 | 组件数量 | 说明 |
|------|----------|------|
| **基础组件** | 6+ | Button、Icon、Typography 等 |
| **表单组件** | 15+ | Input、Select、Checkbox 等 |
| **布局组件** | 9+ | Grid、Space、Layout 等 |
| **展示组件** | 11+ | Card、List、Table 等 |
| **反馈组件** | 10+ | Modal、Message、Toast 等 |
| **导航组件** | 6+ | Tabs、Pagination、Steps 等 |
| **通用组件** | 3+ | VirtualList、LazyComponent 等 |

### 组件设计原则

- **单一职责**：每个组件只负责一个功能
- **可组合性**：组件之间可以灵活组合
- **可扩展性**：支持通过属性和插槽扩展功能
- **无障碍支持**：符合 WCAG 标准
- **性能优化**：减少不必要的渲染和计算

## ⚡ 性能优化

### 虚拟列表

对于长列表数据，提供虚拟列表组件，优化渲染性能：

```tsx
import { useVirtualList } from 'orva-ui/hooks';

function VirtualListExample() {
  const { visibleItems, totalHeight, containerRef, onScroll } = useVirtualList(items, {
    itemHeight: 60,
    viewportHeight: 500,
    bufferCount: 5,
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

### 懒加载

支持图片和组件的延迟加载：

```tsx
import { useLazyLoad } from 'orva-ui/hooks';

function LazyImage({ src }: { src: string }) {
  const { ref, status, content } = useLazyLoad(
    () => <img src={src} alt="lazy" />,
    {
      placeholderContent: <Skeleton />,
      errorContent: <ErrorMessage />,
      retryCount: 3,
    }
  );

  return <div ref={ref}>{status === 'loaded' && content}</div>;
}
```

### React.memo 优化

所有通过 `createComponent` 创建的组件默认启用 React.memo：

```tsx
// 组件工厂自动启用 memo
const Button = createComponent({
  name: 'Button',
  render: (props, ref) => <button ref={ref}>{props.children}</button>,
});
```

## ♿ 无障碍支持

### ARIA 属性

所有交互组件都添加了适当的 ARIA 属性：

```tsx
const a11y = useAccessibility({
  ariaLabel: '关闭按钮',
  ariaDescribedBy: 'close-description',
  role: 'button',
});
```

### 键盘导航

支持键盘导航，确保所有功能都可以通过键盘访问：

```tsx
const a11y = useAccessibility({
  onKeyDown: (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  },
});
```

### 屏幕阅读器支持

优化了屏幕阅读器的使用体验，确保内容可以被正确朗读。

## 🔒 安全特性

### XSS 防护

内置 XSS 防护机制，防止跨站脚本攻击。

### 安全的 API 调用

提供安全的 API 调用工具，防止常见的安全漏洞。

### 数据验证

提供客户端数据验证工具，确保数据安全。

## 📊 性能监控

### 内置监控

组件库内置了性能监控功能，可以跟踪组件渲染和交互性能。

## 🎯 最佳实践

1. **按需引入组件**，减小应用体积
2. **合理使用 Hooks**，提高代码复用性
3. **遵循组件设计原则**，保持代码清晰
4. **关注性能优化**，提高应用响应速度
5. **考虑无障碍支持**，确保良好的用户体验
6. **使用 TypeScript**，获得更好的类型安全

## 📚 下一步

- [查看组件文档](./components/basic/button) 了解所有可用组件
- [阅读开发指南](./guides/installation) 深入学习使用技巧
- [探索 Hooks 文档](./hooks/) 了解自定义 Hooks
- [查看 API 参考](./api) 了解详细的 API 文档
