# TimePicker

**Related Components:** [DatePicker](./datepicker), [Calendar](./calendar)


TimePicker TimePicker component for time selection. Supports hour/minute/second、time range、disabledTime, etc.. 

## Introduction

```tsx live-codeblock
import { TimePicker } from 'orva-ui';
// 或按需导入
import { TimePicker } from 'orva-ui/data-entry';
```

## Basic Usage

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

## Examples

### Basic Time picker

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

### Hour/Minute/Second

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

### Timerange selection

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

### disabledTime

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

### CustomFormat

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

### 12 Hour制

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

### Timestep size

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

### QuickTime

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | Date / [Date, Date] | - | SelectedValue (controlled) |
| defaultValue | Date / [Date, Date] | - | DefaultSelectedValue |
| range | boolean | `false` | Whetherrange selection |
| showSeconds | boolean | `false` | Show or hide秒 |
| use12Hours | boolean | `false` | Whether 12 Hour制 |
| format | string | `'HH:mm'` | TimeFormat |
| placeholder | string / [string, string] | - | Placeholder text |
| disabledHours | `() =\> number[]` | - | disabledHourFunction |
| disabledMinutes | `(hour: number) =\> number[]` | - | disabledMinuteFunction |
| disabledSeconds | `(hour: number, minute: number) =\> number[]` | - | disabled秒Function |
| hourStep | number | `1` | Hourstep size |
| minuteStep | number | `1` | Minutestep size |
| secondStep | number | `1` | 秒step size |
| shortcuts | Array\<\{label, value\}\> | - | QuickOption |
| clearable | boolean | `true` | WhetherClearable |
| disabled | boolean | `false` | Whetherdisabled |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | sizes |
| onChange | `(value: any) =\> void` | - | Change handler callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- range selection时 `value` 为 `[startTime, endTime]`
- `disabledHours` Back需要disabled的Hour数组
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [DatePicker](datepicker) | Component |
| [Calendar](calendar) | Calendar view |
