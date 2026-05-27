# Rate

**Related Components:** [Slider](./slider), [InputNumber](./inputnumber)


Rate Rate component for rating display. Supports half-star、disabled、Customicon, etc.. 

## Introduction

```tsx live-codeblock
import { Rate } from 'orva-ui';
// 或按需导入
import { Rate } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} />;
};
```

## Examples

### Basic Rating

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} />;
};
```

### Half starRating

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3.5);
  
  return <Rate value={value} onChange={setValue} allowHalf />;
};
```

### disabledstatus

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(4);
  
  return <Rate value={value} onChange={setValue} disabled />;
};
```

### MaxScore

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} count={10} />;
};
```

### Customicon

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate, Icon } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return (
    <Rate 
      value={value} 
      onChange={setValue} 
      emptyIcon={<Icon name="mdi:star-outline" />}
      filledIcon={<Icon name="mdi:star" />}
    />
  );
};
```

### 带TextTooltip

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  const labels = ['非常差', '差', '一般', '好', '非常好'];
  
  return (
    <div>
      <Rate value={value} onChange={setValue} tooltips={labels} />
      <span style={{ marginLeft: 8 }}>{labels[value - 1]}</span>
    </div>
  );
};
```

### ReadonlyDisplay

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  return <Rate value={4.5} disabled allowHalf />;
};
```

### 带colors

```tsx live-codeblock
import React, { useState } from 'react';
import { Rate } from 'orva-ui';

export default () => {
  const [value, setValue] = useState(3);
  
  return <Rate value={value} onChange={setValue} color="#f59e0b" />;
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| value | number | - | RatingValue (controlled) |
| defaultValue | number | - | DefaultRatingValue |
| count | number | `5` | MaxScore |
| allowHalf | boolean | `false` | Whether允许Half star |
| disabled | boolean | `false` | Whetherdisabled |
| readOnly | boolean | `false` | Read-only state |
| color | string | - | Selectedcolors |
| emptyIcon | ReactNode | - | 未Selectedicon |
| filledIcon | ReactNode | - | Selectedicon |
| tooltips | string[] | - | HintTextArray |
| onChange | `(value: number) => void` | - | Change handler callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `allowHalf` 为 `true` 时Supports half-starRating
- For controlled components, use `value` + `onChange`
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Slider](slider) | Slider selection |
| [InputNumber](inputnumber) | Component |
