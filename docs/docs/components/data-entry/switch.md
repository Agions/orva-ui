# Switch 开关

**Related Components:** [Checkbox](./checkbox), [Radio](./radio)


Switch 组件用于在两个状态之间切换。支持文字、图标、加载状态、禁用等。

## 引入

```tsx live-codeblock
import { Switch } from 'orva-ui';
// 或按需导入
import { Switch } from 'orva-ui/data-entry';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} />;
};
```

## 使用示例

### 基础开关

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} />;
};
```

### 带文字

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} checkedChildren="开" unCheckedChildren="关" />;
};
```

### 带图标

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch, Icon } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} checkedIcon={<Icon name="mdi:check" />} unCheckedIcon={<Icon name="mdi:close" />} />;
};
```

### 加载状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleChange = async (newChecked: boolean) => {
    setLoading(true);
    // 模拟异步操作
    await new Promise(resolve => setTimeout(resolve, 1000));
    setChecked(newChecked);
    setLoading(false);
  };
  
  return <Switch checked={checked} onChange={handleChange} loading={loading} />;
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} disabled />;
};
```

### 尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked1, setChecked1] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [checked3, setChecked3] = useState(false);
  
  return (
    <>
      <Switch checked={checked1} onChange={setChecked1} size="sm" style={{ marginRight: 16 }} />
      <Switch checked={checked2} onChange={setChecked2} size="md" style={{ marginRight: 16 }} />
      <Switch checked={checked3} onChange={setChecked3} size="lg" />
    </>
  );
};
```

### 带颜色

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} color="#3b82f6" />;
};
```

### 确认对话框

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch, Modal } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempChecked, setTempChecked] = useState(false);
  
  const handleChange = (newChecked: boolean) => {
    if (newChecked) {
      setTempChecked(newChecked);
      setModalVisible(true);
    } else {
      setChecked(newChecked);
    }
  };
  
  const handleConfirm = () => {
    setChecked(tempChecked);
    setModalVisible(false);
  };
  
  return (
    <>
      <Switch checked={checked} onChange={handleChange} checkedChildren="开" unCheckedChildren="关" />
      <Modal 
        visible={modalVisible} 
        title="确认开启" 
        onConfirm={handleConfirm} 
        onCancel={() => {
          setChecked(false);
          setModalVisible(false);
        }}
      >
        确定要开启此功能吗？
      </Modal>
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| checked | boolean | `false` | 是否选中（受控） |
| defaultValue | boolean | `false` | 默认是否选中 |
| disabled | boolean | `false` | 是否禁用 |
| loading | boolean | `false` | 是否加载 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| color | string | - | 选中颜色 |
| checkedChildren | ReactNode | - | 选中时内容 |
| unCheckedChildren | ReactNode | - | 未选中时内容 |
| checkedIcon | ReactNode | - | 选中图标 |
| unCheckedIcon | ReactNode | - | 未选中图标 |
| onChange | `(checked: boolean) => void` | - | 变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 受控组件请使用 `checked` + `onChange`
- `loading` 为 `true` 时禁止点击
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Checkbox](checkbox) | 多选输入 |
| [Radio](radio) | 单选输入 |
