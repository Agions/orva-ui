# orva-ui 组件设计模式规范

> **版本**: 2.0.0  
> **目标**: 构建专业级、可维护、可扩展的 React/Taro 组件库

---

## 📋 目录

1. [核心设计原则](#核心设计原则)
2. [组件架构模式](#组件架构模式)
3. [状态管理策略](#状态管理策略)
4. [组合模式](#组合模式)
5. [性能优化策略](#性能优化策略)
6. [扩展性模式](#扩展性模式)
7. [类型系统规范](#类型系统规范)
8. [测试策略](#测试策略)

---

## 核心设计原则

### 1. 单一职责原则 (SRP)

每个组件只负责一个明确的功能。

```typescript
// ❌ 错误：Button 同时处理点击、表单提交、模态框打开
<Button onClick={handleSubmit} type="submit" onClickModal={openModal} />

// ✅ 正确：职责分离
<Button onClick={handleSubmit} type="submit" />
<ModalTrigger target={openModal}>
  <Button>打开</Button>
</ModalTrigger>
```

### 2. 开闭原则 (OCP)

组件对扩展开放，对修改关闭。

```typescript
// ✅ 使用策略模式扩展行为
interface ButtonStrategy {
  handleAction: (event: Event) => void;
}

class PrimaryButtonStrategy implements ButtonStrategy {
  handleAction = (event: Event) => { /* primary action */ };
}

class SubmitButtonStrategy implements ButtonStrategy {
  handleAction = (event: Event) => { /* submit action */ };
}
```

### 3. 依赖倒置原则 (DIP)

依赖抽象而非具体实现。

```typescript
// ✅ 注入抽象服务
interface ThemeService {
  getTheme(): Theme;
}

class Button {
  constructor(private themeService: ThemeService) {}
}
```

---

## 组件架构模式

### 1. 工厂函数模式 (createComponent)

**适用场景**: 所有基础组件

```typescript
// src/utils/createComponent.ts
export function createComponent<Props, Ref = any, State = any>({
  name,
  displayName,
  defaultProps = {},
  render,
  useCustomState,
  useCustomEffects,
  propTypes,
}: CreateComponentOptions<Props, Ref, State>) {
  
  return React.forwardRef<Ref, Props>((props, ref) => {
    // 1. Props 合并与验证
    const mergedProps = { ...defaultProps, ...props };
    
    // 2. 状态初始化
    const [state, setState] = useState<State>({} as State);
    
    // 3. 自定义 Hook 注入
    const customState = useCustomState?.(mergedProps, state, setState);
    
    // 4. 生命周期效果
    useCustomEffects?.(mergedProps, state, setState);
    
    // 5. 渲染
    return render(mergedProps, ref, state, customState);
  });
}
```

**使用示例**:

```typescript
export const Button = createComponent<ButtonProps, ButtonRef>({
  name: 'Button',
  defaultProps: { type: 'default', size: 'md' },
  render: (props, ref, state, customState) => {
    return <button ref={ref} className={...}>{props.children}</button>;
  },
});
```

### 2. 复合组件模式 (Compound Components)

**适用场景**: 复杂 UI 结构（Menu、Tabs、Steps 等）

```typescript
// Menu 组件
<Menu>
  <Menu.Item key="home">首页</Menu.Item>
  <Menu.SubMenu key="products" title="产品">
    <Menu.Item key="product-1">产品 1</Menu.Item>
  </Menu.SubMenu>
  <Menu.Divider />
  <Menu.Item key="settings">设置</Menu.Item>
</Menu>

// 实现
const Menu = createComponent<MenuProps, MenuRef>({
  name: 'Menu',
  render: (props, ref) => {
    const [selectedKeys, setSelectedKeys] = useState<string[]>([]);
    const [openKeys, setOpenKeys] = useState<string[]>([]);
    
    const contextValue = useMemo(() => ({
      selectedKeys,
      setSelectedKeys,
      openKeys,
      setOpenKeys,
      mode: props.mode,
      theme: props.theme,
    }), [selectedKeys, openKeys, props.mode, props.theme]);
    
    return (
      <MenuContext.Provider value={contextValue}>
        <View ref={ref} className={...}>{props.children}</View>
      </MenuContext.Provider>
    );
  },
});

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Divider = MenuDivider;
```

### 3. 容器-展示组件模式 (Container-Presenter)

**适用场景**: 需要复杂业务逻辑的组件

```typescript
// 展示组件（纯 UI）
const ButtonView = forwardRef<ButtonViewProps, ButtonViewRef>((props, ref) => {
  const { variant, size, loading, children, style } = props;
  return (
    <button
      ref={ref}
      className={cn('btn', `btn--${variant}`, `btn--${size}`, { 'btn--loading': loading })}
      style={style}
      disabled={loading}
    >
      {loading ? <Spinner size={size} /> : children}
    </button>
  );
});

// 容器组件（业务逻辑）
export const Button = createComponent<ButtonProps, ButtonRef>({
  name: 'Button',
  render: (props, ref) => {
    const [loading, setLoading] = useState(false);
    
    const handleClick = async (e: React.MouseEvent) => {
      if (loading || props.disabled) return;
      setLoading(true);
      try {
        await props.onClick?.(e);
      } finally {
        setLoading(false);
      }
    };
    
    return (
      <ButtonView
        ref={ref}
        {...props}
        loading={loading}
        onClick={handleClick}
      />
    );
  },
});
```

### 4. 渲染道具模式 (Render Props)

**适用场景**: 高度自定义的组件行为

```typescript
interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderEmpty?: () => React.ReactNode;
  renderLoading?: () => React.ReactNode;
  keyExtractor?: (item: T, index: number) => string;
}

export const List = <T,>({ data, renderItem, renderEmpty, renderLoading }: ListProps<T>) => {
  if (data.length === 0) return renderEmpty?.() ?? null;
  return (
    <View>
      {data.map((item, index) => renderItem(item, index))}
    </View>
  );
};

// 使用
<List 
  data={users} 
  renderItem={(user) => <UserCard user={user} />}
  renderEmpty={() => <EmptyState />}
/>
```

### 5. 受控/非受控模式 (Controlled/Uncontrolled)

**适用场景**: 表单组件

```typescript
interface InputProps {
  value?: string;           // 受控值
  defaultValue?: string;    // 初始值
  onChange?: (value: string) => void;
}

export const Input = createComponent<InputProps, InputRef>({
  name: 'Input',
  render: (props, ref) => {
    const isControlled = props.value !== undefined;
    const [internalValue, setInternalValue] = useState(props.defaultValue ?? '');
    const value = isControlled ? props.value : internalValue;
    
    const handleChange = (e: any) => {
      const newValue = e.detail.value;
      if (!isControlled) setInternalValue(newValue);
      props.onChange?.(newValue);
    };
    
    return <input ref={ref} value={value} onChange={handleChange} />;
  },
});
```

---

## 状态管理策略

### 1. 状态提升模式

```typescript
// 将状态提升到父组件
const Form = () => {
  const [formData, setFormData] = useState<FormValues>({ name: '', email: '' });
  
  return (
    <>
      <Input 
        name="name" 
        value={formData.name} 
        onChange={(v) => setFormData(f => ({ ...f, name: v }))} 
      />
      <Input 
        name="email" 
        value={formData.email} 
        onChange={(v) => setFormData(f => ({ ...f, email: v }))} 
      />
    </>
  );
};
```

### 2. 状态压缩模式 (useReducer)

**适用场景**: 复杂状态逻辑

```typescript
type FormState = {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
};

type FormAction =
  | { type: 'SET_VALUE'; field: string; value: any }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'SET_TOUCHED'; field: string }
  | { type: 'SET_SUBMITTING'; isSubmitting: boolean }
  | { type: 'RESET' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, values: { ...state.values, [action.field]: action.value } };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } };
    case 'SET_TOUCHED':
      return { ...state, touched: { ...state.touched, [action.field]: true } };
    case 'SET_SUBMITTING':
      return { ...state, isSubmitting: action.isSubmitting };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export const useForm = <T extends Record<string, any>>(initialValues: T) => {
  const [state, dispatch] = useReducer(formReducer, {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });
  
  return { state, dispatch };
};
```

### 3. 状态选择器模式

```typescript
// 避免不必要的重渲染
const selectedValue = useSelector((state) => state.form.values.name);
const errors = useSelector((state) => state.form.errors);
```

---

## 组合模式

### 1. Slot 模式

```typescript
interface CardProps {
  header?: React.ReactNode;
  body: React.ReactNode;
  footer?: React.ReactNode;
}

export const Card = ({ header, body, footer }: CardProps) => {
  return (
    <View className="card">
      {header && <View className="card__header">{header}</View>}
      <View className="card__body">{body}</View>
      {footer && <View className="card__footer">{footer}</View>}
    </View>
  );
};

// 使用
<Card
  header={<Title>标题</Title>}
  body={<Content />}
  footer={<Actions />}
/>
```

### 2. 插槽模式 (Children 作为函数)

```typescript
interface VirtualListProps<T> {
  data: T[];
  itemHeight: number;
  renderItem: (item: T, index: number) => React.ReactNode;
}

export const VirtualList = <T,>({ data, itemHeight, renderItem }: VirtualListProps<T>) => {
  // 虚拟滚动实现
  return <View>{/* 只渲染可见区域 */}</View>;
};
```

---

## 性能优化策略

### 1. React.memo + 深度比较

```typescript
const MemoizedItem = React.memo(Item, (prev, next) => {
  return prev.item.id === next.item.id && prev.isSelected === next.isSelected;
});
```

### 2. useCallback/useMemo 缓存

```typescript
const handleClick = useCallback((id: string) => {
  onSelect(id);
}, [onSelect]);

const sortedData = useMemo(() => {
  return data.sort((a, b) => a.name.localeCompare(b.name));
}, [data]);
```

### 3. 懒加载

```typescript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 使用 Suspense
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

### 4. 虚拟滚动

```typescript
<VirtualList
  data={largeData}
  itemHeight={50}
  renderItem={(item) => <ListItem item={item} />}
/>
```

---

## 扩展性模式

### 1. 插件系统

```typescript
interface Plugin {
  name: string;
  install(component: ComponentAPI): void;
}

class AnimationPlugin implements Plugin {
  name = 'animation';
  install(api: ComponentAPI) {
    api.addHook('beforeRender', () => { /* animation logic */ });
  }
}

// 使用
const Button = createComponent({ ... }).usePlugin(AnimationPlugin);
```

### 2. 主题系统

```typescript
interface Theme {
  colors: ColorPalette;
  spacing: SpacingScale;
  typography: TypographyScale;
  breakpoints: Breakpoints;
}

const ThemeContext = createContext<Theme>(defaultTheme);

export const useTheme = () => useContext(ThemeContext);

// 组件中使用
const Button = () => {
  const theme = useTheme();
  return <button style={{ background: theme.colors.primary }} />;
};
```

### 3. 自定义渲染

```typescript
interface DatePickerProps {
  renderDay?: (date: Date) => React.ReactNode;
  renderHeader?: () => React.ReactNode;
}

export const DatePicker = ({ renderDay, renderHeader }: DatePickerProps) => {
  return (
    <View>
      {renderHeader?.() ?? <DefaultHeader />}
      {dates.map(date => (
        <Day 
          key={date.toString()} 
          content={renderDay?.(date) ?? <DefaultDay date={date} />}
        />
      ))}
    </View>
  );
};
```

---

## 类型系统规范

### 1. Props 接口规范

```typescript
// 基础类型
type ButtonType = 'default' | 'primary' | 'secondary' | 'danger' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonShape = 'round' | 'circle' | 'default';

// Props 接口
interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size' | 'type'> {
  type?: ButtonType;
  size?: ButtonSize;
  shape?: ButtonShape;
  loading?: boolean;
  disabled?: boolean;
  block?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  href?: string;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

// Ref 接口
interface ButtonRef {
  element: HTMLButtonElement | null;
  focus: () => void;
  blur: () => void;
  click: () => void;
}
```

### 2. 泛型约束

```typescript
interface SelectProps<T = any> {
  options: Array<{ label: string; value: T }>;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  getOptionLabel?: (option: { label: string; value: T }) => React.ReactNode;
  getOptionValue?: (option: { label: string; value: T }) => string;
}
```

### 3. 条件类型

```typescript
type ExtractValueType<T> = T extends SelectProps<infer V> ? V : never;

type ButtonPropsWithHref = ButtonProps & { href: string; target?: string };
type ButtonPropsWithoutHref = ButtonProps & { href?: never };

function Button(props: ButtonPropsWithHref): JSX.Element;
function Button(props: ButtonPropsWithoutHref): JSX.Element;
```

---

## 测试策略

### 1. 单元测试

```typescript
// Button.test.tsx
describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click</Button>);
    expect(screen.getByRole('button')).toHaveTextContent('Click');
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when loading', () => {
    render(<Button loading>Click</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### 2. 集成测试

```typescript
// Form.test.tsx
describe('Form', () => {
  it('submits form data correctly', async () => {
    const handleSubmit = jest.fn();
    render(
      <Form onSubmit={handleSubmit}>
        <Input name="username" />
        <Button type="submit">Submit</Button>
      </Form>
    );
    
    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'test' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalledWith({ username: 'test' });
    });
  });
});
```

### 3. E2E 测试

```typescript
// e2e/button.cy.ts
describe('Button E2E', () => {
  it('should navigate to href on click', () => {
    cy.visit('/');
    cy.get('button[href="/about"]').click();
    cy.url().should('include', '/about');
  });
});
```

---

## 最佳实践清单

### ✅ 必须遵守

- [ ] 使用 `createComponent` 工厂函数创建所有组件
- [ ] 遵循受控/非受控模式规范
- [ ] 实现 `useImperativeHandle` 暴露必要方法
- [ ] 使用 `React.forwardRef` 支持 ref 转发
- [ ] 实现 `displayName` 便于调试
- [ ] 提供完整的 TypeScript 类型定义
- [ ] 支持 `className` 和 `style` 属性透传
- [ ] 实现无障碍支持 (`aria-*` 属性)

### ✅ 推荐遵守

- [ ] 使用 `React.memo` 优化纯展示组件
- [ ] 使用 `useCallback`/`useMemo` 缓存函数和值
- [ ] 使用复合组件模式处理复杂结构
- [ ] 使用渲染道具模式提供扩展点
- [ ] 实现懒加载优化首屏性能
- [ ] 提供完整的单元测试覆盖
- [ ] 编写组件使用文档

### ❌ 避免使用

- [ ] 避免在 render 中创建新对象/函数
- [ ] 避免直接修改 props
- [ ] 避免使用 `any` 类型
- [ ] 避免过深的组件嵌套
- [ ] 避免在组件中执行复杂计算
- [ ] 避免使用 `dangerouslySetInnerHTML`

---

## 组件开发模板

### 基础组件模板

```typescript
import React, { useRef, useImperativeHandle } from 'react';
import { View } from '@tarojs/components';
import { createComponent } from '../../utils/createComponent';
import { useMicroAnimation } from '../../hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '../../hooks/ui/useAccessibility';
import type { XProps, XRef } from './X.types';
import { xStyles } from './X.styles';

export const X = createComponent<XProps, XRef>({
  name: 'X',
  render: (props, ref) => {
    const {
      className,
      style,
      disabled = false,
      // ... 其他 props
      ...restProps
    } = props;

    const xRef = useRef<any>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: !disabled });
    const a11y = useAccessibility({
      role: ARIA_ROLES.button,
      label: undefined,
      attributes: {
        'aria-disabled': disabled,
      },
    });

    // 暴露给外部的引用方法
    useImperativeHandle(ref, () => ({
      element: xRef.current,
      // ... 其他方法
    }), []);

    const mergedStyle = animation.getMergedStyle(xStyles['getBaseStyle']({ style: style || {} } as any));
    const xClassName = xStyles['getClassName']({ className: className || '', disabled } as any);

    return (
      <View
        ref={xRef}
        className={xClassName}
        style={mergedStyle}
        {...a11y.getAriaAttributes()}
        {...restProps}
      >
        {props.children}
      </View>
    );
  },
});

export default X;
```

---

## 总结

本设计模式规范旨在为 orva-ui 提供一套**专业、可维护、可扩展**的组件开发标准。核心要点：

1. **工厂函数模式** - 统一组件创建方式
2. **复合组件模式** - 处理复杂 UI 结构
3. **受控/非受控模式** - 表单组件标准
4. **状态管理策略** - 合理组织组件状态
5. **性能优化** - 避免不必要的重渲染
6. **类型安全** - 完整的 TypeScript 支持
7. **无障碍支持** - 遵循 WCAG 标准

遵循这些模式将确保组件库的长期可维护性和扩展性。
