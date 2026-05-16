# orva-ui A+B 优化执行计划
## Architecture Unification (createComponent) + Animation System (useMicroAnimation)

---

## 一、现状诊断

| 指标 | 数值 | 目标 |
|------|------|------|
| createComponent 覆盖率 | 14/61 (23%) | 61/61 (100%) |
| useTheme 覆盖率 | 28/61 (46%) | 61/61 (100%) |
| useMicroAnimation 覆盖率 | 1/61 (1.6%) | ~25/61 (交互组件) |
| 测试覆盖率 | 0/61 (0%) | Phase 3 补齐 |

---

## 二、分批执行策略

### Phase 1: 简单展示组件（6个）
**目标组件**: Avatar, Badge, List, ResponsiveContainer, ResponsiveGrid, Card
**特点**: 无复杂状态、无 useImperativeHandle 或极少
**动作**: 纯迁移 createComponent + 接入 useTheme
**预估耗时**: 1 批次

### Phase 2: 基础交互组件（7个）
**目标组件**: Divider, Text, Typography, Icon, Tag, Ripple(已完成), Button(已完成)
**特点**: 有 onClick 或状态，需要 useMicroAnimation
**动作**: createComponent + useTheme + useMicroAnimation + useAccessibility
**预估耗时**: 1-2 批次

### Phase 3: 反馈组件（10个）
**目标组件**: Drawer, Loading, Message, Modal(已完成), Notification, Popconfirm, Progress, Result, Toast, Tooltip
**特点**: 有显隐状态、动画要求高
**动作**: createComponent + useTheme + useMicroAnimation + useAccessibility
**预估耗时**: 2-3 批次

### Phase 4: 布局组件（9个）
**目标组件**: Affix, Col, Container, Grid, Layout, ResponsiveContainer, ResponsiveGrid, Row, Space
**特点**: 结构性组件，部分有响应式状态
**动作**: createComponent + useTheme
**预估耗时**: 1-2 批次

### Phase 5: 导航组件（6个）
**目标组件**: Menu, NavBar, PageHeader, Pagination, Steps, Tabs, Timeline
**特点**: 有激活状态、交互频繁
**动作**: createComponent + useTheme + useMicroAnimation + useAccessibility
**预估耗时**: 2 批次

### Phase 6: 表单补齐（3个）
**目标组件**: InputNumber, Textarea, TimePicker
**特点**: 表单输入，需要 input 类型动画
**动作**: createComponent + useTheme + useMicroAnimation(input类型)
**预估耗时**: 1 批次

### Phase 7: 大型复杂组件（11个）
**目标组件**: Calendar, Carousel, Cascader(已完成), Form, RichText, Table, Transfer, VirtualList, Video, AutoComplete(已完成), DatePicker(已完成), Select(已完成), Upload(已完成)
**特点**: 代码量大、状态复杂、需要谨慎重构
**动作**: 逐个 review 后迁移
**预估耗时**: 3-4 批次

---

## 三、单组件迁移标准 SOP

### Step 1: 修改 Imports
```tsx
// 前
import { forwardRef, useState } from 'react';

// 后
import { useState } from 'react';
import { createComponent } from '../../utils/createComponent';
import { useTheme } from '../../hooks/ui/useTheme';
import { useMicroAnimation } from '../../hooks/ui/useMicroAnimation'; // 仅交互组件
import { useAccessibility, ARIA_ROLES } from '../../hooks/ui/useAccessibility'; // 仅交互组件
```

### Step 2: 替换组件定义
```tsx
// 前
export const Avatar = forwardRef<AvatarRef, AvatarProps>((props, ref) => {
  const { src, size = 'medium', ...rest } = props;
  // ...
});
Avatar.displayName = 'Avatar';

// 后
export const Avatar = createComponent<AvatarProps, AvatarRef>({
  name: 'Avatar',
  render: (props, ref) => {
    const { src, size = 'medium', ...rest } = props;
    const { theme } = useTheme(); // 如需要
    // ...
  }
});
```

### Step 3: 接入动画（交互组件）
```tsx
const animation = useMicroAnimation({ 
  type: 'button', // 根据组件类型选择 button | input | micro
  enabled: !disabled 
});

// 并将 style 通过 getMergedStyle 处理
const mergedStyle = animation.getMergedStyle(baseStyle, { isHovered, isPressed });
```

### Step 4: 接入可访问性（交互组件）
```tsx
const a11y = useAccessibility({
  role: ARIA_ROLES.button,
  ariaLabel: props.ariaLabel || props.children?.toString(),
  focusable: !disabled,
});

// 绑定到根元素
<View {...a11y.getAriaAttributes()} />
```

### Step 5: 验证
- [ ] TypeScript 编译通过
- [ ] props 解构无遗漏
- [ ] ref 转发正常
- [ ] displayName 正确
- [ ] 默认 props 行为一致

---

## 四、进度追踪

| Phase | 组件数 | 状态 | 完成时间 |
|-------|--------|------|----------|
| Phase 1 | 6 | 🔄 进行中 | - |
| Phase 2 | 7 | ⏳ 待开始 | - |
| Phase 3 | 10 | ⏳ 待开始 | - |
| Phase 4 | 9 | ⏳ 待开始 | - |
| Phase 5 | 6 | ⏳ 待开始 | - |
| Phase 6 | 3 | ⏳ 待开始 | - |
| Phase 7 | 11 | ⏳ 待开始 | - |

---

## 五、风险与注意事项

1. **useImperativeHandle**: createComponent 的 render 接收 ref，内部可正常使用 useImperativeHandle
2. **ErrorBoundary**: Class Component，不适用 createComponent，保留原始实现
3. **Compound Components**: FormItem 等复合组件使用 createCompoundComponent
4. **Performance**: 所有 createComponent 默认启用 memo，确保 props 稳定
5. **Breaking Changes**: 迁移过程中保持 props API 完全兼容
