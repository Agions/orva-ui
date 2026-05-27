# ErrorBoundary 错误边界

**Related Components:** [LazyComponent](./lazycomponent)


ErrorBoundary 组件用于捕获子组件渲染错误。支持自定义错误 UI、错误日志等。

## 引入

```tsx live-codeblock
import { ErrorBoundary } from 'orva-ui';
// 或按需导入
import { ErrorBoundary } from 'orva-ui/common';
```

## 基本使用

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

## 使用示例

### 基础错误边界

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  return (
    <ErrorBoundary fallback={<div>组件渲染失败，请刷新页面</div>}>
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

### 自定义错误 UI

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

### 记录错误日志

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  const handleError = async (error: Error, errorInfo: React.ErrorInfo) => {
    // 上报错误到日志服务
    await fetch('/api/error-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      }),
    });
    
    console.error('错误已记录:', error);
  };
  
  return (
    <ErrorBoundary fallback={<div>出错了</div>} onError={handleError}>
      <ChildComponent />
    </ErrorBoundary>
  );
};
```

### 多层级错误边界

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  return (
    <div>
      <ErrorBoundary fallback={<div>头部组件出错</div>}>
        <Header />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<div>内容组件出错</div>}>
        <MainContent />
      </ErrorBoundary>
      
      <ErrorBoundary fallback={<div>底部组件出错</div>}>
        <Footer />
      </ErrorBoundary>
    </div>
  );
};
```

### 条件渲染错误边界

```tsx live-codeblock
import React, { useState } from 'react';
import { ErrorBoundary } from 'orva-ui';

export default () => {
  const [showComponent, setShowComponent] = useState(true);
  
  if (!showComponent) {
    return <div>组件已隐藏</div>;
  }
  
  return (
    <ErrorBoundary 
      fallback={
        <div>
          <p>组件出错</p>
          <button onClick={() => setShowComponent(false)}>隐藏组件</button>
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
      <h3>加载失败</h3>
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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| fallback | ReactNode / `(props: FallbackProps) => ReactNode` | - | 错误 UI |
| onError | `(error: Error, errorInfo: React.ErrorInfo) => void` | - | 错误回调 |
| onReset | `() => void` | - | 重置回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## FallbackProps

| 属性名 | 类型 | 说明 |
|--------|------|------|
| error | Error | 错误对象 |
| errorInfo | React.ErrorInfo | 错误信息 |
| resetErrorBoundary | `() => void` | 重置边界 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `fallback` 可以是 ReactNode 或函数
- `onError` 可用于错误上报
- 错误边界只能捕获子组件错误，不能捕获自身错误
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [LazyComponent](lazycomponent) | 组件 |
