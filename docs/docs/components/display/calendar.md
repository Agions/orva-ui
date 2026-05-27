# Calendar 日历

**Related Components:** [DatePicker](./datepicker), [RangePicker](./rangepicker)


Calendar 组件用于日期选择或日期展示。支持月视图、年视图、自定义单元格等。

## 引入

```tsx live-codeblock
import { Calendar } from 'orva-ui';
// 或按需导入
import { Calendar } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  return <Calendar value={value} onChange={setValue} />;
};
```

## 使用示例

### 基础日历

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  return <Calendar value={value} onChange={setValue} />;
};
```

### 禁用日期

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  const disabledDate = (date: Date) => {
    // 禁用过去的所有日期
    return date < new Date(new Date().setHours(0, 0, 0, 0));
  };
  
  return <Calendar value={value} onChange={setValue} disabledDate={disabledDate} />;
};
```

### 自定义单元格

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar, Badge } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  const cellRender = (current: Date) => {
    const day = current.getDate();
    const isToday = isSameDay(current, new Date());
    const hasEvent = day % 3 === 0; // 模拟有事件的日期
    
    return (
      <div style={{ position: 'relative' }}>
        {hasEvent && <Badge size="sm" color="#ef4444" style={{ position: 'absolute', top: 2, right: 2 }} />}
        {isToday && <strong>{day}</strong>}
        {!isToday && day}
      </div>
    );
  };
  
  return <Calendar value={value} onChange={setValue} cellRender={cellRender} />;
};

function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
         d1.getMonth() === d2.getMonth() &&
         d1.getDate() === d2.getDate();
}
```

### 显示事件

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar, Badge } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  const events = {
    1: [{ title: '会议', color: '#3b82f6' }],
    5: [{ title: '生日', color: '#10b981' }],
    10: [{ title: '截止', color: '#f59e0b' }],
    15: [{ title: '发布', color: '#ef4444' }],
  };
  
  const cellRender = (current: Date) => {
    const day = current.getDate();
    const dayEvents = events[day];
    
    return (
      <div style={{ height: '100%', padding: 4 }}>
        {dayEvents?.map((event, i) => (
          <div key={i} style={{ fontSize: 10, color: event.color }}>
            {event.title}
          </div>
        ))}
      </div>
    );
  };
  
  return <Calendar value={value} onChange={setValue} cellRender={cellRender} />;
};
```

### 范围选择

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState([null, null]);
  
  return <Calendar range value={value} onChange={setValue} />;
};
```

### 年视图

```tsx live-codeblock
import React, { useState } from 'react';
import { Calendar } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(new Date());
  
  return <Calendar value={value} onChange={setValue} mode="year" />;
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| value | Date / [Date, Date] | `new Date()` | 选中日期 |
| defaultValue | Date / [Date, Date] | - | 默认日期 |
| range | boolean | `false` | 是否范围选择 |
| mode | `'month' \| 'year'` | `'month'` | 视图模式 |
| disabledDate | `(date: Date) => boolean` | - | 禁用日期函数 |
| cellRender | `(current: Date) => ReactNode` | - | 单元格渲染 |
| headerRender | `(props: HeaderProps) => ReactNode` | - | 头部渲染 |
| onChange | `(value: Date | [Date, Date]) => void` | - | 日期变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `cellRender` 可用于自定义日期单元格内容
- 范围选择时 `value` 为 `[startDate, endDate]`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [DatePicker](datepicker) | 组件 |
| [RangePicker](rangepicker) | 组件 |
