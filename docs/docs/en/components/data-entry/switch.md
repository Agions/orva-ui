# Switch

**Related Components:** [Checkbox](./checkbox), [Radio](./radio)


Switch Switch component for toggling between two states. Supports text、icon、Loadingstatus、disabled, etc.. 

## Introduction

```tsx live-codeblock
import { Switch } from 'orva-ui';
// 或按需导入
import { Switch } from 'orva-ui/data-entry';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} />;
};
```

## Examples

### Basic Switch

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} />;
};
```

### 带Text

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} checkedChildren="开" unCheckedChildren="关" />;
};
```

### 带icon

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch, Icon } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} checkedIcon={<Icon name="mdi:check" />} unCheckedIcon={<Icon name="mdi:close" />} />;
};
```

### Loadingstatus

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

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} disabled />;
};
```

### sizes

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

### 带colors

```tsx live-codeblock
import React, { useState } from 'react';
import { Switch } from 'orva-ui';

export default () => {
  const [checked, setChecked] = useState(false);
  
  return <Switch checked={checked} onChange={setChecked} color="#3b82f6" />;
};
```

### ConfirmDialog/Modal

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| checked | boolean | `false` | WhetherSelected（Controlled） |
| defaultValue | boolean | `false` | DefaultWhetherSelected |
| disabled | boolean | `false` | Whetherdisabled |
| loading | boolean | `false` | Loading state |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| color | string | - | Selectedcolors |
| checkedChildren | ReactNode | - | Selected时Content |
| unCheckedChildren | ReactNode | - | 未Selected时Content |
| checkedIcon | ReactNode | - | Selectedicon |
| unCheckedIcon | ReactNode | - | 未Selectedicon |
| onChange | `(checked: boolean) => void` | - | Change callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- For controlled components, use `checked` + `onChange`
- `loading` 为 `true` Click disabled when
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Checkbox](checkbox) | multiple selectionInput |
| [Radio](radio) | Single selectInput |
