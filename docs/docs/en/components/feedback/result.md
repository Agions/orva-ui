# Result

**Related Components:** [Empty](./empty), [ErrorBoundary](./errorboundary)


Result Result component for displaying operation results. Supports success、error、warning、Info, etc.Multiplestatus. 

## Introduction

```tsx live-codeblock
import { Result } from 'orva-ui';
// 或按需导入
import { Result } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="success" title="操作成功" description="您的操作已成功完成" extra={<Button type="primary">Back</Button>} />;
};
```

## Examples

### SuccessResult

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="success" title="提交成功" description="您的信息已成功提交, 我们将在 24 Hour内审核" extra={<Button type="primary">查看结果</Button>} />;
};
```

### errorResult

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="error" title="操作失败" description="抱歉, 操作过程中出现error, 请稍后重试" extra={<Button type="primary">重试</Button>} />;
};
```

### warningResult

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="warning" title="需要注意" description="您的账户存在安全风险, 请确认身份" extra={<Button type="primary">去认证</Button>} />;
};
```

### InfoResult

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="info" title="提示信息" description="这是一个普通的信息提示" extra={<Button>知道了</Button>} />;
};
```

### 404 Page

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="404" title="页面不存在" description="抱歉, 您访问的页面不存在" extra={<Button type="primary">Back首页</Button>} />;
};
```

### 403 Page

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="403" title="无权访问" description="抱歉, 您没有权限访问此页面" extra={<Button type="primary">联系管理员</Button>} />;
};
```

### 500 Page

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="500" title="服务器error" description="服务器开小差了, 请稍后重试" extra={<Button type="primary">刷新页面</Button>} />;
};
```

### Customicon

```tsx live-codeblock
import React from 'react';
import { Result, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Result 
      status="success" 
      title="Customicon" 
      description="您可以Custom结果页面的icon"
      icon={<Icon name="mdi:star" size={64} color="#10b981" />}
      extra={<Button type="primary">继续</Button>}
    />
  );
};
```

### CustomContent

```tsx live-codeblock
import React from 'react';
import { Result, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Result 
      status="success" 
      title="操作成功" 
      description={
        <div>
          <p>您的操作已成功完成</p>
          <p style={{ color: '#666', marginTop: 8 }}>订单号：202401010001</p>
        </div>
      }
      extra={
        <>
          <Button>查看订单</Button>
          <Button type="primary" style={{ marginLeft: 8 }}>Back首页</Button>
        </>
      }
    />
  );
};
```

### 带BackLink

```tsx live-codeblock
import React from 'react';
import { Result, Button, Link } from 'orva-ui';

export default () => {
  return (
    <Result 
      status="404" 
      title="页面不存在" 
      description="抱歉, 您访问的页面不存在"
      extra={
        <>
          <Link href="/">Back首页</Link>
          <Button type="primary" style={{ marginLeft: 16 }}>重新搜索</Button>
        </>
      }
    />
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| status | `'success' \| 'error' \| 'warning' \| 'info' \| '404' \| '403' \| '500'` | `'success'` | status |
| title | ReactNode | - | Title |
| description | ReactNode | - | description |
| icon | ReactNode | - | Customicon |
| extra | ReactNode | - | ExtraAction区 |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `status` Supports预定义的status值
- `extra` Area可放置多个ActionButton
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Empty](empty) | Component |
| [ErrorBoundary](errorboundary) | Component |
