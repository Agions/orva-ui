# Progress 进度条

**Related Components:** [Spin](./spin), [Loading](./loading)


Progress 组件用于显示操作进度。支持线性进度、环形进度、带文案等。

## 引入

```tsx live-codeblock
import { Progress } from 'orva-ui';
// 或按需导入
import { Progress } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Progress } from 'orva-ui';

export default () => <Progress percent={50} />;
```

## 使用示例

### 基础进度条

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

### 带文案

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

### 自定义文案

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

### 颜色

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

### 尺寸

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

### 环形进度

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

### 环形进度带文案

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

### 渐变进度

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

### 模拟上传

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| percent | number | `0` | 进度百分比 (0-100) |
| type | `'line' \| 'circle'` | `'line'` | 进度条类型 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 进度条尺寸 |
| color | string / string[] | - | 进度颜色（支持渐变） |
| showText | boolean | `false` | 是否显示文案 |
| textRender | `(percent: number) => ReactNode` | - | 自定义文案渲染 |
| stroke | number | - | 环形进度条线宽 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

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

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `percent` 值范围为 0-100
- 环形进度条支持 `stroke` 属性调整线宽
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Spin](spin) | 组件 |
| [Loading](loading) | 加载状态 |
