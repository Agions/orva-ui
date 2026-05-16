# orva-ui 组件开发模板使用指南

## 🎯 概述

orva-ui 提供了一套完整的组件开发模板，确保所有组件遵循统一的设计规范和最佳实践。这些模板集成了我们优化的核心系统：动画、可访问性、主题和类型安全。

## 📁 模板文件

### 1. BasicComponentTemplate.tsx
**适用场景**: 基础UI组件（按钮、图标、卡片等）

#### 快速开始：
```bash
cp templates/BasicComponentTemplate.tsx components/basic/MyButton.tsx
```

#### 替换步骤：
1. 将 `[ComponentName]` 替换为 `MyButton`
2. 调整 Props 接口
3. 修改样式和交互逻辑
4. 更新注释和文档

#### 示例实现：
```typescript
// 替换后
export interface MyButtonProps {
  title?: string;
  onPress?: () => void;
}

export const MyButton = createComponent<MyButtonProps>({
  // ... 实现
});
```

---

### 2. FormComponentTemplate.tsx
**适用场景**: 表单输入组件（输入框、选择器、滑块等）

#### 快速开始：
```bash
cp templates/FormComponentTemplate.tsx components/form/MyInput.tsx
```

#### 特性：
- ✅ 内置错误状态处理
- ✅ 帮助文本支持  
- ✅ 禁用状态管理
- ✅ 主题集成
- ✅ 动画效果

#### 扩展建议：
- 添加验证逻辑
- 支持多种输入类型
- 增加自定义样式选项

---

### 3. CompoundComponentTemplate.tsx
**适用场景**: 需要多个子组件协作的复杂组件

#### 典型用例：
- FormItem + Label + Error + Help
- Tabs + TabPanel
- Accordion + AccordionItem

#### 实现步骤：
1. 定义主组件和子组件接口
2. 实现每个组件的功能
3. 使用 createCompoundComponent 组装
4. 导出便捷别名

#### 示例：
```typescript
const MyForm = createCompoundComponent({
  main: { name: 'MyForm', render: MyFormMain },
  subComponents: {
    Item: MyFormItem,
    Label: MyFormLabel,
    Error: MyFormError,
  },
});
```

---

### 4. HookTemplate.ts
**适用场景**: 通用逻辑复用（状态管理、数据获取、工具函数等）

#### 模板结构：
```
use[HookName](options)
├── 配置选项 (Use[HookName]Options)
├── 返回值 (Use[HookName]Return) 
└── 内部状态和工具函数
```

#### 使用示例：
```bash
cp templates/HookTemplate.ts hooks/ui/useMyFeature.ts
```

#### 常见 Hook 类型：
- **状态管理**: useToggle, useCounter
- **数据获取**: useFetch, useLocalStorage
- **UI交互**: useHover, useFocus
- **业务逻辑**: useFormValidation

---

## 🚀 最佳实践

### 1. Props 设计原则

#### ✅ 推荐的做法：
```typescript
interface GoodProps {
  // 明确的功能性 Props
  disabled?: boolean;
  loading?: boolean;
  value?: string;
  
  // 样式 Props（可选）
  style?: ViewStyle;
  className?: string;
  
  // 事件 Props
  onChange?: (value: string) => void;
  onClick?: () => void;
}
```

#### ❌ 避免的做法：
```typescript
// 过于宽泛的 Props
interface BadProps {
  data: any;           // 应该具体化
  callback: Function;  // 应该命名明确
  options: object;     // 应该拆分为具体 Props
}
```

---

### 2. 样式系统设计

#### 使用主题变量：
```typescript
const style = useMemo(() => ({
  backgroundColor: theme.colors.primary,      // ✅ 推荐
  padding: theme.spacing.md,                   // ✅ 推荐
  borderRadius: theme.borderRadius.md,        // ✅ 推荐
  
  // ❌ 避免硬编码
  // backgroundColor: '#a855f7',
  // padding: 16,
}));
```

#### 动画集成：
```typescript
const animation = useMicroAnimation({ type: 'button' });
return (
  <View style={animation.getMergedStyle(baseStyle)}>
    {/* 内容 */}
  </View>
);
```

---

### 3. 可访问性实现

#### ARIA属性设置：
```typescript
const { getAriaAttributes } = useAccessibility({
  ariaLabel: "提交表单",
  role: ARIA_ROLES.button,
});

return <View {...getAriaAttributes()} />;
```

#### 键盘导航：
```typescript
const { handleKeyDown } = useAccessibility({
  onKeyDown: (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  },
});

return <View onKeyDown={handleKeyDown} />;
```

---

### 4. 性能优化

#### 使用 useMemo：
```typescript
const computedStyle = useMemo(() => {
  return {
    color: isActive ? theme.colors.primary : theme.colors.text,
    fontWeight: isBold ? 'bold' : 'normal',
  };
}, [isActive, isBold, theme]);
```

#### 避免不必要的重渲染：
```typescript
// ✅ 正确：稳定的依赖数组
const handler = useCallback(() => {
  console.log('处理点击');
}, []); // 空数组，只在初始化时创建

// ❌ 错误：包含对象/数组会导致每次都重新创建
const badHandler = useCallback(() => {
  console.log('处理点击');
}, [someObject]); // 每次 someObject 变化都会重新创建
```

---

## 🔧 开发流程

### 1. 创建新组件
```bash
# 1. 选择合适的模板
cp templates/BasicComponentTemplate.tsx components/basic/NewButton.tsx

# 2. 修改文件名和路径
mv components/basic/NewButton.tsx components/basic/CustomButton.tsx

# 3. 更新导入路径
# 在 index.tsx 中添加导出
```

### 2. 实现功能
```typescript
// 步骤 1: 定义 Props
interface CustomButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
}

// 步骤 2: 实现渲染逻辑
render: (props) => {
  const { variant = 'primary', size = 'medium', children } = props;
  
  // 步骤 3: 计算变体样式
  const variantStyle = getVariantStyle(variant);
  const sizeStyle = getSizeStyle(size);
  
  return (
    <Button style={[variantStyle, sizeStyle]}>
      {children}
    </Button>
  );
}
```

### 3. 测试组件
```bash
# 编译检查
npm run type-check

# 运行测试
npm test -- --testPathPattern="CustomButton"

# 手动测试
npm run storybook
```

---

## 📋 检查清单

### 组件开发 Checklist
- [ ] 使用正确的模板
- [ ] Props 接口定义完整
- [ ] 默认 Props 合理
- [ ] 集成了动画系统
- [ ] 实现了可访问性
- [ ] 使用了主题变量
- [ ] 包含适当的类型定义
- [ ] 添加了单元测试
- [ ] 更新了文档

### 代码质量 Checklist
- [ ] 遵循 TypeScript 最佳实践
- [ ] 没有任何编译警告
- [ ] 代码覆盖率 > 90%
- [ ] ESLint 检查通过
- [ ] Prettier 格式化正确

---

## 🛠️ 调试技巧

### 1. 组件调试
```typescript
// 启用调试模式
const ComponentName = createComponent({
  name: 'DebugComponentName',
  debug: true, // 启用调试信息
  // ...
});
```

### 2. 样式调试
```typescript
// 临时显示边框便于调试布局
const debugStyle = __DEV__ ? { borderWidth: 1, borderColor: 'red' } : {};
return <View style={[baseStyle, debugStyle]} />;
```

### 3. 性能分析
```typescript
// 使用 React DevTools 检查组件性能
// 查看组件重渲染原因
console.log('Component re-rendered at:', Date.now());
```

---

## 📚 参考资源

### 现有组件参考
- Button 组件: `/src/components/basic/Button/`
- FormItem 组件: `/src/components/form/FormItem.tsx`
- 主题系统: `/src/hooks/ui/useTheme.ts`

### 设计规范
- 设计系统: `/docs/design-system.md`
- 组件规范: `/docs/component-specs.md`
- 主题指南: `/docs/theme-guide.md`

---

## ❓ 常见问题

### Q: 如何处理复杂的组件状态？
A: 使用自定义 Hook 分离状态逻辑，保持组件简洁。

### Q: 如何添加新的主题变量？
A: 修改 `src/theme/types.ts` 中的 ThemeConfig 接口，然后在 `defaults.ts` 中提供默认值。

### Q: 组件不支持某个平台怎么办？
A: 在组件中使用平台检测，或者创建特定平台的适配组件。

### Q: 如何优化组件性能？
A: 使用 React.memo、useMemo、useCallback，避免不必要的重渲染。

---

**最后更新**: 2026年5月14日
**版本**: orva-ui v1.0.0
