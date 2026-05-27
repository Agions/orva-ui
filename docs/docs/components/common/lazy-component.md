# LazyComponent 懒加载组件

**Related Components:** [ErrorBoundary](./errorboundary), [VirtualList](./virtuallist)


LazyComponent 组件用于按需加载组件。支持加载状态、错误处理、预加载等。

## 引入

```tsx live-codeblock
import { LazyComponent } from 'orva-ui';
// 或按需导入
import { LazyComponent } from 'orva-ui/common';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  return (
    <LazyComponent
      loader={<div>加载中...</div>}
    >
      <HeavyComponent />
    </LazyComponent>
  );
};
```

## 使用示例

### 基础懒加载

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent } from 'orva-ui';

// 动态导入组件
const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  return (
    <LazyComponent
      loader={<div style={{ padding: 20, textAlign: 'center' }}>加载中...</div>}
    >
      <HeavyComponent />
    </LazyComponent>
  );
};
```

### 带错误处理

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Button, Icon } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  const [error, setError] = useState(null);
  
  return (
    <LazyComponent
      loader={<div style={{ padding: 20, textAlign: 'center' }}>加载中...</div>}
      error={<div style={{ padding: 20, textAlign: 'center' }}>
        <Icon name="mdi:alert-circle" color="#ef4444" />
        <p>加载失败</p>
        <Button onClick={() => window.location.reload()}>重试</Button>
      </div>}
      onError={(err) => {
        console.error('组件加载失败:', err);
        setError(err);
      }}
    >
      <HeavyComponent />
    </LazyComponent>
  );
};
```

### 路由懒加载

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent } from 'orva-ui';
import { Routes, Route } from 'react-router-dom';

const Home = LazyComponent(() => import('./pages/Home'));
const About = LazyComponent(() => import('./pages/About'));
const Contact = LazyComponent(() => import('./pages/Contact'));

export default () => {
  return (
    <Routes>
      <Route path="/" element={
        <LazyComponent loader={<PageLoader />}>
          <Home />
        </LazyComponent>
      } />
      <Route path="/about" element={
        <LazyComponent loader={<PageLoader />}>
          <About />
        </LazyComponent>
      } />
      <Route path="/contact" element={
        <LazyComponent loader={<PageLoader />}>
          <Contact />
        </LazyComponent>
      } />
    </Routes>
  );
};

function PageLoader() {
  return (
    <div style={{ padding: 40, textAlign: 'center' }}>
      <div className="spinner">加载中...</div>
    </div>
  );
}
```

### 条件懒加载

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Button } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  const [show, setShow] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShow(true)}>加载组件</Button>
      {show && (
        <LazyComponent
          loader={<div style={{ padding: 20, textAlign: 'center' }}>加载中...</div>}
        >
          <HeavyComponent />
        </LazyComponent>
      )}
    </>
  );
};
```

### 预加载

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Button } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  const [show, setShow] = useState(false);
  
  // 鼠标悬停时预加载
  const handleMouseEnter = () => {
    HeavyComponent.preload();
  };
  
  return (
    <>
      <Button 
        onClick={() => setShow(true)}
        onMouseEnter={handleMouseEnter}
      >
        加载组件
      </Button>
      {show && (
        <LazyComponent
          loader={<div style={{ padding: 20, textAlign: 'center' }}>加载中...</div>}
        >
          <HeavyComponent />
        </LazyComponent>
      )}
    </>
  );
};
```

### 多个懒加载组件

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Tabs, Tab } from 'orva-ui';

const Tab1 = LazyComponent(() => import('./tabs/Tab1'));
const Tab2 = LazyComponent(() => import('./tabs/Tab2'));
const Tab3 = LazyComponent(() => import('./tabs/Tab3'));

export default () => {
  return (
    <Tabs>
      <Tab label="标签 1">
        <LazyComponent loader={<TabLoader />}>
          <Tab1 />
        </LazyComponent>
      </Tab>
      <Tab label="标签 2">
        <LazyComponent loader={<TabLoader />}>
          <Tab2 />
        </LazyComponent>
      </Tab>
      <Tab label="标签 3">
        <LazyComponent loader={<TabLoader />}>
          <Tab3 />
        </LazyComponent>
      </Tab>
    </Tabs>
  );
};

function TabLoader() {
  return <div style={{ padding: 20, textAlign: 'center' }}>加载中...</div>;
}
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| loader | ReactNode | - | 加载状态 |
| error | ReactNode | - | 错误状态 |
| onError | `(error: Error) => void` | - | 错误回调 |
| delay | number | `0` | 延迟加载（ms） |
| timeout | number | `30000` | 超时时间（ms） |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 使用 `LazyComponent(() => import('./Component'))` 动态导入
- `preload()` 方法可预加载组件
- `loader` 和 `error` 支持自定义 UI
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [ErrorBoundary](errorboundary) | 组件 |
| [VirtualList](virtuallist) | 组件 |
