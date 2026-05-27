# Progress

**Related Components:** [Spin](./spin), [Loading](./loading)


Progress Progress component for displaying operation progress. Supports linear progress、circular progress、With text, etc.. 

## Introduction

```tsx live-codeblock
import { Progress } from 'orva-ui';
// 或按需导入
import { Progress } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => <Progress percent={50} />;
```

## Examples

### Basic Progress bar

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <>
    <Progress percent={25} />
    <Progress percent={50} />
    <Progress percent={75} />
    <Progress percent={100} />
  </>
);
```

### With text

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <>
    <Progress percent={30} showText />
    <Progress percent={60} showText />
    <Progress percent={90} showText />
  </>
);
```

### CustomText

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <Progress 
    percent={75} 
    showText
    textRender={(percent) => '' + percent + '% 完成'}
  />
);
```

### colors

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <>
    <Progress percent={30} color="#3b82f6" />
    <Progress percent={60} color="#10b981" />
    <Progress percent={90} color="#f59e0b" />
  </>
);
```

### sizes

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <>
    <Progress percent={50} size="sm" />
    <Progress percent={50} size="md" />
    <Progress percent={50} size="lg" />
  </>
);
```

### circular progress

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <>
    <Progress percent={25} type="circle" />
    <Progress percent={50} type="circle" />
    <Progress percent={75} type="circle" />
    <Progress percent={100} type="circle" />
  </>
);
```

### circular progressWith text

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <Progress 
    percent={60} 
    type="circle"
    showText
    textRender={(percent) => '' + percent + '%'}
  />
);
```

### 渐变Progress

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => (
  <Progress 
    percent={70} 
    gradient={['#3b82f6', '#8b5cf6']}
  />
);
```

### 模拟Upload

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress, Button } from 'orva-ui';

export default () => {
  const [percent, setPercent] = useState(0);
  
  const startUpload = () => {
    setPercent(0);
    const timer = setInterval(() => {
      setPercent((p) => {
        if (p >= 100) {
          clearInterval(timer);
          return 100;
        }
        return p + 10;
      });
    }, 200);
  };
  
  return (
    <>
      <Button onClick={startUpload}>开始上传</Button>
      <Progress 
        percent={percent} 
        showText 
        style={{ marginTop: 16 }}
      />
    </>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| percent | number | `0` | ProgressPercentage (0-100) |
| type | `'line' \| 'circle'` | `'line'` | Progress barType |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Progress barsizes |
| color | string / string[] | - | Progresscolors（Supports渐变） |
| showText | boolean | `false` | Show or hideText |
| textRender | `(percent: number) => ReactNode` | - | CustomTextRender |
| stroke | number | - | circular progress条线宽 |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Theme customization

Via `createTheme` 或 `ThemeProvider` Custom主题变量, Can adjust componentcolors、Font、spacing, etc.Style. 

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  progress: {
    height: '8px',
    borderRadius: '4px',
    backgroundColor: '#e5e7eb',
  },
});
```

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `percent` 值Range为 0-100
- circular progress条Supports `stroke` 属性调整线宽
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Spin](spin) | Component |
| [Loading](loading) | Loadingstatus |
