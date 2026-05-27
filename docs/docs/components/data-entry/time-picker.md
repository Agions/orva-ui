# TimePicker 时间选择器

**Related Components:** [DatePicker](./datepicker), [Calendar](./calendar)


TimePicker 组件用于选择时间。支持时分秒、时间范围、禁用时间等。

## 引入

```tsx live-codeblock
import { TimePicker } from 'orva-ui';
// 或按需导入
import { TimePicker } from 'orva-ui/data-entry';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择时间"
    />
  );
};
```

## 使用示例

### 基础时间选择

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择时间"
      style={{ width: 200 }}
    />
  );
};
```

### 时分秒选择

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择时间"
      showSeconds
      format="HH:mm:ss"
      style={{ width: 220 }}
    />
  );
};
```

### 时间范围选择

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([null, null]);
  
  return (
    <TimePicker 
      range
      value={value} 
      onChange={setValue} 
      placeholder={['开始时间', '结束时间']}
      style={{ width: 350 }}
    />
  );
};
```

### 禁用时间

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  const disabledHours = () => Array.from({ length: 24 }, (_, i) => i < 9 || i > 18);
  const disabledMinutes = (hour: number) => hour === 9 ? [0, 1, 2, 3, 4, 5] : [];
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择工作时间"
      disabledHours={disabledHours}
      disabledMinutes={disabledMinutes}
      style={{ width: 200 }}
    />
  );
};
```

### 自定义格式

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择时间"
      format="HH:mm"
      style={{ width: 180 }}
    />
  );
};
```

### 12 小时制

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择时间"
      format="hh:mm A"
      use12Hours
      style={{ width: 200 }}
    />
  );
};
```

### 时间步长

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择时间"
      hourStep={2}
      minuteStep={15}
      secondStep={30}
      style={{ width: 220 }}
    />
  );
};
```

### 快捷时间

```tsx live-codeblock
import React, { useState } from 'react';
import { TimePicker } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(null);
  
  const shortcuts = [
    { label: '现在', value: new Date() },
    { label: '上午 9 点', value: new Date(new Date().setHours(9, 0, 0)) },
    { label: '中午 12 点', value: new Date(new Date().setHours(12, 0, 0)) },
    { label: '下午 6 点', value: new Date(new Date().setHours(18, 0, 0)) },
  ];
  
  return (
    <TimePicker 
      value={value} 
      onChange={setValue} 
      placeholder="请选择时间"
      shortcuts={shortcuts}
      style={{ width: 200 }}
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | Date / [Date, Date] | - | 选中值（受控） |
| defaultValue | Date / [Date, Date] | - | 默认选中值 |
| range | boolean | `false` | 是否范围选择 |
| showSeconds | boolean | `false` | 是否显示秒 |
| use12Hours | boolean | `false` | 是否 12 小时制 |
| format | string | `'HH:mm'` | 时间格式 |
| placeholder | string / [string, string] | - | 占位符 |
| disabledHours | `() =\> number[]` | - | 禁用小时函数 |
| disabledMinutes | `(hour: number) =\> number[]` | - | 禁用分钟函数 |
| disabledSeconds | `(hour: number, minute: number) =\> number[]` | - | 禁用秒函数 |
| hourStep | number | `1` | 小时步长 |
| minuteStep | number | `1` | 分钟步长 |
| secondStep | number | `1` | 秒步长 |
| shortcuts | Array\<\{label, value\}\> | - | 快捷选项 |
| clearable | boolean | `true` | 是否可清除 |
| disabled | boolean | `false` | 是否禁用 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 尺寸 |
| onChange | `(value: any) =\> void` | - | 值变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 范围选择时 `value` 为 `[startTime, endTime]`
- `disabledHours` 返回需要禁用的小时数组
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [DatePicker](datepicker) | 组件 |
| [Calendar](calendar) | 日历视图 |
