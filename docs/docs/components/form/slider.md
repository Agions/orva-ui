# Slider 滑块

**Related Components:** [Rate](./rate), [InputNumber](./inputnumber)


Slider 组件用于选择数值。支持单选、范围选择、带输入框、垂直等。

## 引入

```tsx live-codeblock
import { Slider } from 'orva-ui';
// 或按需导入
import { Slider } from 'orva-ui/form';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} />;
};
```

## 使用示例

### 基础滑块

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} min={0} max={100} />;
};
```

### 范围选择

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([20, 80]);
  
  return <Slider range value={value} onChange={setValue} min={0} max={100} />;
};
```

### 带输入框

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider, InputNumber } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <Slider value={value} onChange={setValue} min={0} max={100} style={{ flex: 1 }} />
      <InputNumber value={value} onChange={setValue} min={0} max={100} style={{ width: 80 }} />
    </div>
  );
};
```

### 步长设置

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(0);
  
  return <Slider value={value} onChange={setValue} min={0} max={100} step={10} />;
};
```

### 带标记

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  const marks = {
    0: '0',
    25: '25',
    50: '50',
    75: '75',
    100: '100',
  };
  
  return <Slider value={value} onChange={setValue} min={0} max={100} marks={marks} />;
};
```

### 垂直滑块

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return (
    <div style={{ height: 200, display: 'flex', alignItems: 'center' }}>
      <Slider value={value} onChange={setValue} vertical min={0} max={100} />
    </div>
  );
};
```

### 禁用状态

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} disabled min={0} max={100} />;
};
```

### 反色滑块

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} reverse min={0} max={100} />;
};
```

### 自定义颜色

```tsx live-codeblock
import React, { useState } from 'react';
import { Slider } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(50);
  
  return <Slider value={value} onChange={setValue} color="#3b82f6" min={0} max={100} />;
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | number / number[] | - | 值（受控） |
| defaultValue | number / number[] | - | 默认值 |
| range | boolean | `false` | 是否范围选择 |
| min | number | `0` | 最小值 |
| max | number | `100` | 最大值 |
| step | number | `1` | 步长 |
| marks | Record<number, string> | - | 标记 |
| vertical | boolean | `false` | 是否垂直 |
| reverse | boolean | `false` | 是否反向 |
| disabled | boolean | `false` | 是否禁用 |
| color | string | - | 颜色 |
| onChange | `(value: number | number[]) => void` | - | 值变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 范围选择时 `value` 为 `[min, max]`
- `marks` 对象键值需与 `min`/`max` 范围匹配
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Rate](rate) | 评分输入 |
| [InputNumber](inputnumber) | 组件 |
