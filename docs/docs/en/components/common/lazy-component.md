# LazyComponent

**Related Components:** [ErrorBoundary](./errorboundary), [VirtualList](./virtuallist)


LazyComponent LazyComponent component for on-demand component loading. Supports loading state、errorHandle、预Loading, etc.. 

## Introduction

```tsx live-codeblock
import { LazyComponent } from 'orva-ui';
// 或按需导入
import { LazyComponent } from 'orva-ui/common';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  return (
    <LazyComponent
      loader={<div>Loading中...</div>}
    >
      <HeavyComponent />
    </LazyComponent>
  );
};
```

## Examples

### Basic 懒Loading

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent } from 'orva-ui';

// 动态导入组件
const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  return (
    <LazyComponent
      loader={<div style={{ padding: 20, textAlign: 'center' }}>Loading中...</div>}
    >
      <HeavyComponent />
    </LazyComponent>
  );
};
```

### 带errorHandle

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Button, Icon } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  const [error, setError] = useState(null);
  
  return (
    <LazyComponent
      loader={<div style={{ padding: 20, textAlign: 'center' }}>Loading中...</div>}
      error={<div style={{ padding: 20, textAlign: 'center' }}>
        <Icon name="mdi:alert-circle" color="#ef4444" />
        <p>Loading失败</p>
        <Button onClick={() => window.location.reload()}>重试</Button>
      </div>}
      onError={(err) => {
        console.error('组件Loading失败:', err);
        setError(err);
      }}
    >
      <HeavyComponent />
    </LazyComponent>
  );
};
```

### Route lazyLoading

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
      <div className="spinner">Loading中...</div>
    </div>
  );
}
```

### Condition懒Loading

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Button } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  const [show, setShow] = useState(false);
  
  return (
    <>
      <Button onClick={() => setShow(true)}>Loading组件</Button>
      {show && (
        <LazyComponent
          loader={<div style={{ padding: 20, textAlign: 'center' }}>Loading中...</div>}
        >
          <HeavyComponent />
        </LazyComponent>
      )}
    </>
  );
};
```

### 预Loading

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Button } from 'orva-ui';

const HeavyComponent = LazyComponent(() => import('./HeavyComponent'));

export default () => {
  const [show, setShow] = useState(false);
  
  // 鼠标悬停时预Loading
  const handleMouseEnter = () => {
    HeavyComponent.preload();
  };
  
  return (
    <>
      <Button 
        onClick={() => setShow(true)}
        onMouseEnter={handleMouseEnter}
      >
        Loading组件
      </Button>
      {show && (
        <LazyComponent
          loader={<div style={{ padding: 20, textAlign: 'center' }}>Loading中...</div>}
        >
          <HeavyComponent />
        </LazyComponent>
      )}
    </>
  );
};
```

### Multiple lazyLoadingComponent

```tsx live-codeblock
import React, { useState } from 'react';
import { LazyComponent, Tabs, Tab } from 'orva-ui';

const Tab1 = LazyComponent(() => import('./tabs/Tab1'));
const Tab2 = LazyComponent(() => import('./tabs/Tab2'));
const Tab3 = LazyComponent(() => import('./tabs/Tab3'));

export default () => {
  return (
    <Tabs>
      <Tab label="Tab/Label 1">
        <LazyComponent loader={<TabLoader />}>
          <Tab1 />
        </LazyComponent>
      </Tab>
      <Tab label="Tab/Label 2">
        <LazyComponent loader={<TabLoader />}>
          <Tab2 />
        </LazyComponent>
      </Tab>
      <Tab label="Tab/Label 3">
        <LazyComponent loader={<TabLoader />}>
          <Tab3 />
        </LazyComponent>
      </Tab>
    </Tabs>
  );
};

function TabLoader() {
  return <div style={{ padding: 20, textAlign: 'center' }}>Loading中...</div>;
}
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| loader | ReactNode | - | Loadingstatus |
| error | ReactNode | - | errorstatus |
| onError | `(error: Error) => void` | - | errorCallback |
| delay | number | `0` | DelayLoading（ms） |
| timeout | number | `30000` | 超时Time（ms） |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- Use `LazyComponent(() => import('./Component'))` 动态导入
- `preload()` 方法可预LoadingComponent
- `loader` 和 `error` SupportsCustom UI
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [ErrorBoundary](errorboundary) | Component |
| [VirtualList](virtuallist) | Component |
