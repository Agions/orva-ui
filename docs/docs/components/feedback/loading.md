# Loading 加载

**Related Components:** [Spin](./spin), [Skeleton](./skeleton)


加载组件用于显示加载中状态。支持全局加载、局部加载、自定义文案等。

## 引入

```tsx live-codeblock
import { Loading } from 'orva-ui';
// 或按需导入
import { Loading } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => <Loading />;
```

## 使用示例

### 基础加载

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => <Loading />;
```

### 带文案

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => <Loading tip="加载中...">内容</Loading>;
```

### 全屏加载

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => (
  <Loading fullscreen tip="正在加载数据...">
    <div>页面内容</div>
  </Loading>
);
```

### 尺寸

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => (
  <>
    <Loading size="sm" />
    <Loading size="md" />
    <Loading size="lg" />
  </>
);
```

### 自定义颜色

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading } from 'orva-ui';

export default () => (
  <>
    <Loading color="#3b82f6" />
    <Loading color="#10b981" />
    <Loading color="#f59e0b" />
  </>
);
```

### 包裹内容

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading, Card } from 'orva-ui';

export default () => (
  <Loading loading>
    <Card>
      <Card.Body>卡片内容</Card.Body>
    </Card>
  </Loading>
);
```

### 条件加载

```tsx live-codeblock
import React, { useState } from 'react';
import { Loading, Button } from 'orva-ui';

export default () => {
  const [loading, setLoading] = useState(false);
  
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  
  return (
    <>
      <Button onClick={handleClick}>触发加载</Button>
      <Loading loading={loading} tip="加载中...">
        <div>内容区域</div>
      </Loading>
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| loading | boolean | `true` | 是否显示加载 |
| fullscreen | boolean | `false` | 是否全屏显示 |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | 加载图标尺寸 |
| color | string | - | 加载图标颜色 |
| tip | string | - | 加载提示文案 |
| children | ReactNode | - | 包裹的内容 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  loading: {
    size: '40px',
    color: '#3b82f6',
  },
});
```

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `loading` 为 `false` 时不显示加载状态
- `fullscreen` 模式会覆盖整个视口
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Spin](spin) | 组件 |
| [Skeleton](skeleton) | 组件 |
