# ErrorBoundary

**Related Components:** [LazyComponent](./lazycomponent)


ErrorBoundary Component for catching child componentRendererror. SupportsCustomerror UI、errorLog, etc.. 

## Introduction

```tsx live-codeblock
import { ErrorBoundary } from 'orva-ui';
// 或按需导入
import { ErrorBoundary } from 'orva-ui/common';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  return (
    <ErrorBoundary fallback={<div>出错了</div>}>
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

## Examples

### Basic errorBoundary

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  return (
    <ErrorBoundary fallback={<div>组件Render失败, 请刷新页面</div>}>
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

### Customerror UI

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary, Button, Icon } from 'orva-ui';

export default () => {
  const [error, setError] = useState(null);
  
  const FallbackComponent = ({ error, resetErrorBoundary }) => (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <Icon name="mdi:alert-circle" size={48} color="#ef4444" />
      <h3>出错了</h3>
      <p style={{ color: '#666', marginBottom: 16 }}>{error?.message}</p>
      <Button onClick={resetErrorBoundary}>重试</Button>
    </div>
  );
  
  return (
    <ErrorBoundary fallback={<FallbackComponent />} onError={(error) => console.error(error)}>
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

### RecorderrorLog

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  const handleError = async (error: Error, errorInfo: React.ErrorInfo) => {
    // 上报error到日志服务
    await fetch('/api/error-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      }),
    });
    
    console.error('error已记录:', error);
  };
  
  return (
    <ErrorBoundary fallback={<div>出错了</div>} onError={handleError}>
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

### 多层级errorBoundary

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  return (
    <div>
      <ErrorBoundary fallback={<div>头部组件出错</div>}>
        <Header />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<div>Content组件出错</div>}>
        <MainContent />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<div>底部组件出错</div>}>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};
```

### ConditionRendererrorBoundary

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  const [showComponent, setShowComponent] = useState(true);
  
  if (!showComponent) {
    return <div>组件已Hide</div>;
  }
  
  return (
    <ErrorBoundary 
      fallback={
        <div>
          <p>组件出错</p>
          <button onClick={() => setShowComponent(false)}>Hide组件</button>
        </div>
      }
    >
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

### 带重试机制

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary, Button } from 'orva-ui';

export default () => {
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  
  const FallbackComponent = ({ resetErrorBoundary }) => (
    <div style={{ padding: 24, textAlign: 'center' }}>
      <h3>Loading失败</h3>
      <p>已重试 {retryCount} 次</p>
      {retryCount < maxRetries ? (
        <Button onClick={() => {
          setRetryCount(retryCount + 1);
          resetErrorBoundary();
        }}>
          重试
        </Button>
      ) : (
        <Button onClick={() => window.location.reload()}>
          刷新页面
        </Button>
      )}
    </div>
  );
  
  return (
    <ErrorBoundary fallback={<FallbackComponent />}>
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| fallback | ReactNode / `(props: FallbackProps) => ReactNode` | - | error UI |
| onError | `(error: Error, errorInfo: React.ErrorInfo) => void` | - | errorCallback |
| onReset | `() => void` | - | Reset handler |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## FallbackProps

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| error | Error | errorObject |
| errorInfo | React.ErrorInfo | errorInfo |
| resetErrorBoundary | `() => void` | ResetBoundary |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `fallback` 可以是 ReactNode 或函数
- `onError` 可用于error上报
- errorBoundary只能捕获Sub componenterror, 不能捕获自身error
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [LazyComponent](lazycomponent) | Component |
