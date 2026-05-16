# Nano-UI 组件专业化改造规范

> 本文档定义了 Nano-UI 组件库的专业化设计标准，确保跨组件一致的用户体验、动效质量和可维护性。

---

## 一、基础架构

### 1.1 组件创建模式

所有组件必须使用 `createComponent` 工厂函数创建：

```typescript
export const ComponentName = createComponent<ComponentProps, ComponentRef>({
  name: 'ComponentName',
  defaultProps: {
    // 明确的默认值
  },
  render: (props, ref) => {
    // 组件实现
  },
});
```

### 1.2 文件结构

```
ComponentName/
├── ComponentName.tsx      # 主组件
├── ComponentName.types.ts  # 类型定义
├── ComponentName.styles.ts # 样式计算
├── index.ts              # barrel export
└── __tests__/              # 测试
```

### 1.3 命名规范

- **Props 接口：** `ComponentNameProps extends BaseProps`
- **Ref 接口：** `ComponentNameRef`
- **类型别名：** `ComponentNameType`（如 `ButtonType`）
- **尺寸别名：** `ComponentNameSize`（如 `ButtonSize`）

---

## 二、交互状态系统

### 2.1 必备交互状态

所有可交互组件必须支持以下状态：

| 状态 | 说明 | 视觉反馈 |
|------|------|-----------|
| `idle` | 默认状态 | 基础样式 |
| `hover` | 悬停 | `brightness(1.05)` 或 `translateY(-2px)` |
| `focus` | 焦点 | `box-shadow: 0 0 0 3px {primary}33` |
| `active` | 激活/按下 | `scale(0.98)` + `brightness(0.92)` |
| `pressed` | 深度按下 | `scale(0.96)` + `brightness(0.95)` |
| `disabled` | 禁用 | `opacity: 0.5` + `pointer-events: none` |
| `loading` | 加载 | `opacity: 0.7` + spinner |

### 2.2 使用 `useInteractionState` Hook

```typescript
const { state, handlers, getInteractionStyle } = useInteractionState({
  disabledHover: false,
  disabledFocus: false,
  disabledActive: false,
  disabledPress: props.disabled || props.loading,
  onPress: () => onClick?.(),
  onLongPress: () => onLongPress?.(),
  longPressDelay: 500,
});
```

### 2.3 状态样式优先级

```
disabled/loading > pressed > active > focus > hover > idle
```

---

## 三、动效系统

### 3.1 动效令牌

使用专业缓动曲线和时长规范：

```typescript
import { getRecommendedEasing, getRecommendedDuration } from '../../../theme/motion';

const transition = `all ${getRecommendedDuration('button', 'state')}ms ${getEasingCss(getRecommendedEasing('micro', 'apple'))}`;
```

### 3.2 组件动效配置

| 组件 | 入场 | 出场 | Hover | Press | Focus |
|------|------|------|-------|-------|-------|
| Button | - | - | brightness + shadow | scale(0.96) | ring |
| Card | fadeInUp | fadeOut | translateY(-4px) + shadow | scale(0.995) | ring |
| Modal | scaleIn + fadeIn | scaleOut + fadeOut | - | - | - |
| Input | - | - | border color | - | ring + shadow |
| Drawer | slideInRight | slideOutRight | - | - | - |
| List | fadeInUp stagger | fadeOut | background | - | - |

### 3.3 时长规范

```typescript
const durationScale = {
  micro:   '50-100ms',   // 按钮按下、开关切换
  fast:    '150-200ms',  // hover、focus 边框
  normal:  '250-300ms',  // 标准状态切换
  slow:    '400-500ms',  // 模态框、抽屉
  dramatic:'600-1000ms', // 页面转场
};
```

### 3.4 缓动曲线选择

| 场景 | 推荐 | CSS 值 |
|------|------|---------|
| 微交互反馈 | Apple Spring | `cubic-bezier(0.34, 1.56, 0.64, 1)` |
| 元素入场 | Material Decelerate | `cubic-bezier(0, 0, 0.2, 1)` |
| 元素退出 | Material Accelerate | `cubic-bezier(0.4, 0, 1, 1)` |
| 状态切换 | Apple Default | `cubic-bezier(0.25, 0.1, 0.25, 1)` |
| 快速反馈 | Fluent Fast | `cubic-bezier(0.4, 0, 0.6, 1)` |

---

## 四、Ripple 水波纹效果

### 4.1 使用场景

以下组件默认开启 Ripple 效果：

- `Button` (默认开启)
- `Card` (clickable 时)
- `ListItem`
- `MenuItem`
- `Chip`

### 4.2 配置

```typescript
<Ripple
  color={variant === 'solid' ? '#ffffff' : theme.colors.primary}
  opacity={0.2}
  duration={500}
  center={false}
  disabled={disabled || loading}
>
  {content}
</Ripple>
```

---

## 五、焦点管理

### 5.1 Focus Ring 标准

```typescript
const focusRing = {
  boxShadow: `0 0 0 3px ${theme.colors.primary}33`,
  outline: 'none',
};
```

### 5.2 焦点相关组件

- Button、Input、Card、Select、Checkbox、Radio 必须支持焦点可见
- Modal 打开时自动焦点到第一个可交互元素
- 支持 `Tab` 键导航

---

## 六、验证状态动画

### 6.1 错误状态

```typescript
// 抖动动画
const shakeStyle = status === 'error' ? { animation: 'shake 0.5s ease-in-out' } : {};

// 错误边框 + 焦点
const errorStyle = {
  borderColor: theme.colors.error,
  boxShadow: `0 0 0 3px ${theme.colors.error}20`,
};
```

### 6.2 成功状态

```typescript
const successStyle = {
  borderColor: theme.colors.success,
  boxShadow: `0 0 0 3px ${theme.colors.success}20`,
};
```

---

## 七、Loading 状态

### 7.1 Loading Spinner 标准

```typescript
function LoadingSpinner({ color, size }: { color: string; size: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        border: `2px solid ${color}30`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }}
    />
  );
}
```

### 7.2 Skeleton 加载占位

```typescript
const skeletonStyle = {
  background: `linear-gradient(90deg, ${theme.colors.border} 25%, ${theme.colors.borderLight} 50%, ${theme.colors.border} 75%)`,
  backgroundSize: '200% 100%',
  animation: 'shimmer 1.5s infinite',
};
```

---

## 八、可访问性 (A11y)

### 8.1 ARIA 属性

```typescript
<TaroButton
  role="button"
  aria-label={accessibilityLabel || children}
  aria-disabled={disabled || loading}
  aria-pressed={isPressed}
  aria-busy={loading}
  tabIndex={disabled ? -1 : 0}
/>
```

### 8.2 键盘支持

- `Enter` / `Space` 激活按钮
- `Escape` 关闭模态框/抽屉
- `Tab` 循环焦点
- `↑↓` 导航列表

---

## 九、主题适配

### 9.1 暗色模式

- 所有组件必须支持暗色模式自动切换
- 使用 `theme.colors` 而非硬编码颜色
- 阴影和边框在暗色下应更柔和

### 9.2 响应式

- 所有组件必须支持响应式布局
- 使用 `useResponsive` 适配不同屏幕尺寸
- 触摸目标最小 44px

---

## 十、性能优化

### 10.1 will-change 使用

仅在动画元素上使用 `will-change`：

```typescript
const animatedStyle = {
  willChange: 'transform, opacity',
  transform: 'translateZ(0)', // 开启 GPU 加速
};
```

### 10.2 避免布局抖动

- 使用 `transform` 而非 `top/left` 进行位置变化
- 使用 `opacity` 进行显隐
- 避免在动画中修改 `width/height`

---

## 附录：待改造组件清单

### 已完成 ✅
- [x] Button - Ripple、Press 效果、焦点光晕、加载动画
- [x] Card - 悬浮抬升、入场动画、Hover 光泽
- [x] Input - Focus 光晕、验证抖动、浮动标签
- [x] Modal - 背景模糊、内容缩放、退出动画

### 待改造 📝
- [ ] Drawer - 滑入滑出动画、手势触摸
- [ ] List - 项目编排动画、拖拽排序
- [ ] Select - 下拉展开动画、选项高亮
- [ ] Switch - 开关切换动画、触感反馈
- [ ] Checkbox/Radio - 勾选动画、聚焦效果
- [ ] Tabs - 活动标签滑动、内容切换
- [ ] Menu - 层级展开、选项悬停
- [ ] Tooltip/Popover - 弹出位置智能计算、淡入淡出
- [ ] Toast/Notification - 堆叠动画、进度条
- [ ] Avatar - 图片加载占位、头像组动画
- [ ] Badge - 数字变化动画、脉冲效果
- [ ] Progress/Loading - 进度动画、完成效果
- [ ] DatePicker/TimePicker - 选择动画、滚轮效果
- [ ] Upload - 上传进度、图片预览动画
- [ ] Carousel - 滑动缓动、幻灯片切换
- [ ] Table - 行悬停、排序指示器、加载状态
