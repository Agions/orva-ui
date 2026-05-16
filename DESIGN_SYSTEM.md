# Orva UI Design System

## 🎨 设计理念

Orva UI 是一个轻量级、现代化的跨平台 UI 组件库，专为 Taro 生态系统打造。我们的设计哲学是：

- **简约而不简单**: 简洁的接口，强大的功能
- **一致性**: 统一的设计语言和交互模式
- **可访问性**: 遵循无障碍设计标准
- **性能优先**: 优化的渲染和内存使用

## 🌈 色彩系统

### 主色调 (Primary)
**紫罗兰 (#a855f7)** - 品牌主色，用于主要操作和强调元素

```css
.orva-ui-primary { color: #a855f7; }
.bg-orva-ui-primary { background-color: #a855f7; }
```

### 辅色调 (Secondary)
**珊瑚橙 (#f97316)** - 辅助色彩，用于次要操作和信息提示

```css
.orva-ui-secondary { color: #f97316; }
.bg-orva-ui-secondary { background-color: #f97316; }
```

### 语义化颜色
- **成功**: #22c55e (绿色系)
- **警告**: #f59e0b (黄色系)  
- **错误**: #ef4444 (红色系)
- **信息**: #3b82f6 (蓝色系)

## 📏 间距系统

基于 4px 网格的精确间距系统：

| Token | Value | Usage |
|-------|--------|-------|
| `xs` | 4px | 紧密的元素间距 |
| `sm` | 8px | 标准内边距 |
| `md` | 16px | 主要组件间距 |
| `lg` | 24px | 较大的间距 |
| `xl` | 32px | 节间距 |
| `xxl` | 48px | 页面级间距 |

### 响应式断点
```css
breakpoints: {
  xs: '0',
  sm: '640px',   // 平板竖屏
  md: '768px',   // 平板横屏
  lg: '1024px',  // 笔记本
  xl: '1280px',  // 桌面
  '2xl': '1536px' // 大桌面
}
```

## 🖋️ 排版系统

### 字体族
```typescript
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
  serif: ['Georgia', 'serif'],
  mono: ['Fira Code', 'Monaco', 'monospace'],
  display: ['Inter', 'system-ui', 'sans-serif']
}
```

### 字号阶梯
| Token | Size | Usage |
|-------|------|-------|
| `3xs` | 10px | 极小标签文本 |
| `2xs` | 12px | 小标签、注释 |
| `xs` | 14px | 辅助文本 |
| `sm` | 16px | 正文文本 |
| `base` | 18px | 默认正文 |
| `lg` | 20px | 强调文本 |
| `xl` | 24px | 标题文本 |
| `2xl` | 30px | 大标题 |
| `3xl` | 36px | 主标题 |

## ✨ 组件规范

### Button 组件

#### 基础用法
```tsx
import { createComponent } from '@orva-ui/utils';
import { useTheme, useInteractionState } from '@orva-ui/hooks';

const Button = createComponent({
  name: 'Button',
  props: {
    variant: 'primary' | 'secondary' | 'outline' | 'text',
    size: 'sm' | 'md' | 'lg',
    disabled: boolean,
    loading: boolean
  },
  render(props) {
    const theme = useTheme();
    const { isPressed } = useInteractionState();

    return (
      <button
        className={`btn-${props.variant} btn-${props.size}`}
        style={{
          backgroundColor: theme.colors.primary,
          padding: theme.spacing.md,
          borderRadius: theme.borderRadius.md
        }}
      >
        {props.children}
      </button>
    );
  }
});
```

#### 主题变体
- **primary**: 紫罗兰背景，白色文字
- **secondary**: 珊瑚橙背景，白色文字  
- **outline**: 透明背景，边框为主色
- **text**: 无背景，仅文字颜色

### Input 组件

#### 尺寸规格
| Size | Height | Padding | Font Size |
|------|--------|---------|-----------|
| `sm` | 32px | 8px | 14px |
| `md` | 40px | 12px | 16px |
| `lg` | 48px | 16px | 18px |

#### 状态管理
```tsx
const [value, setValue] = useState('');
const [isFocused, setIsFocused] = useState(false);
const { getColor, getBorderRadius } = useTheme();

return (
  <input
    value={value}
    onChange={(e) => setValue(e.target.value)}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    className={`input-base ${isFocused ? 'input-focused' : ''}`}
    style={{
      borderColor: isFocused ? getColor('border-focus') : getColor('border-default'),
      borderRadius: getBorderRadius('md')
    }}
  />
);
```

## 🌙 主题切换

### 使用 ThemeProvider
```tsx
import { ThemeProvider } from '@orva-ui/providers';

function App() {
  return (
    <ThemeProvider defaultMode="light" followSystem>
      <YourApp />
    </ThemeProvider>
  );
}
```

### 主题模式
- **light**: 亮色主题
- **dark**: 暗色主题  
- **auto**: 跟随系统设置

### 自定义主题
```tsx
const { setCustomTokens } = useThemeContext();

setCustomTokens({
  colors: {
    primary: '#ff6b6b', // 自定义主色
    secondary: '#4ecdc4' // 自定义辅色
  }
});
```

## 🎭 动画系统

### 预设动画
```css
.fade-in { animation: fadeIn 0.3s ease-in-out; }
.slide-up { animation: slideUp 0.3s ease-out; }
.scale-in { animation: scaleIn 0.2s ease-out; }
```

### 动画时长
| Duration | Time | Usage |
|----------|------|-------|
| `fast` | 150ms | 快速反馈 |
| `normal` | 300ms | 标准过渡 |
| `slow` | 500ms | 复杂交互 |

### 缓动函数
- `linear`: 线性动画
- `ease`: 标准缓动
- `easeIn`: 慢入快出
- `easeOut`: 快入慢出
- `easeInOut`: 慢入慢出

## 📱 响应式设计

### 栅格系统
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {/* 响应式网格内容 */}
</div>
```

### 移动端优先
所有组件都采用移动端优先的响应式设计：
- 在小屏幕上显示简化版本
- 在大屏幕上显示完整功能
- 平滑的断点过渡

## 🧪 测试策略

### 单元测试
```typescript
describe('Button Component', () => {
  test('renders with primary variant', () => {
    render(<Button variant="primary">Test</Button>);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  test('applies correct theme colors', () => {
    const { getByRole } = renderWithTheme(<Button variant="primary" />);
    const button = getByRole('button');
    
    expect(button).toHaveStyle({ 
      backgroundColor: 'rgb(168, 85, 247)' 
    });
  });
});
```

### 主题测试
```typescript
test('switches between light and dark themes', () => {
  const { rerender } = render(
    <ThemeProvider defaultMode="light">
      <TestComponent />
    </ThemeProvider>
  );

  // 切换为暗色主题
  rerender(
    <ThemeProvider defaultMode="dark">
      <TestComponent />
    </ThemeProvider>
  );

  // 验证主题变化
  expect(getComputedStyle(document.documentElement))
    .toHaveProperty('backgroundColor', '#111827');
});
```

## 🔧 开发工具

### 设计令牌生成
```bash
npm run tokens:generate
```

### Storybook 开发
```bash
npm run storybook
```

### 类型检查
```bash
npm run type-check
```

## 📚 API 参考

### Hook 集合
- `useTheme()` - 获取主题上下文
- `useDesignTokens()` - 获取设计令牌
- `useThemeMode()` - 获取主题模式状态
- `useInteractionState()` - 交互状态管理

### 工具函数
- `createComponent()` - 组件工厂函数
- `deepMerge()` - 深度合并对象
- `getValueByPath()` - 路径取值工具

## 🤝 贡献指南

### 添加新组件
1. 在 `src/components/` 下创建组件目录
2. 实现 `createComponent` 模式
3. 集成 `useTheme` 和 `useInteractionState`
4. 编写单元测试
5. 添加 Storybook 故事

### 修改现有组件
1. 确保保持向后兼容性
2. 更新相关的测试用例
3. 更新 Storybook 示例
4. 运行完整的测试套件

## 📄 许可证

MIT License - 详见 LICENSE 文件