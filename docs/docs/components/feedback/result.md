# Result 结果页

**Related Components:** [Empty](./empty), [ErrorBoundary](./errorboundary)


Result 组件用于展示操作结果。支持成功、错误、警告、信息等多种状态。

## 引入

```tsx live-codeblock
import { Result } from 'orva-ui';
// 或按需导入
import { Result } from 'orva-ui/feedback';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="success" title="操作成功" description="您的操作已成功完成" extra={<Button type="primary">返回</Button>} />;
};
```

## 使用示例

### 成功结果

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="success" title="提交成功" description="您的信息已成功提交，我们将在 24 小时内审核" extra={<Button type="primary">查看结果</Button>} />;
};
```

### 错误结果

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="error" title="操作失败" description="抱歉，操作过程中出现错误，请稍后重试" extra={<Button type="primary">重试</Button>} />;
};
```

### 警告结果

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="warning" title="需要注意" description="您的账户存在安全风险，请确认身份" extra={<Button type="primary">去认证</Button>} />;
};
```

### 信息结果

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="info" title="提示信息" description="这是一个普通的信息提示" extra={<Button>知道了</Button>} />;
};
```

### 404 页面

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="404" title="页面不存在" description="抱歉，您访问的页面不存在" extra={<Button type="primary">返回首页</Button>} />;
};
```

### 403 页面

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="403" title="无权访问" description="抱歉，您没有权限访问此页面" extra={<Button type="primary">联系管理员</Button>} />;
};
```

### 500 页面

```tsx live-codeblock
import React from 'react';
import { Result, Button } from 'orva-ui';

export default () => {
  return <Result status="500" title="服务器错误" description="服务器开小差了，请稍后重试" extra={<Button type="primary">刷新页面</Button>} />;
};
```

### 自定义图标

```tsx live-codeblock
import React from 'react';
import { Result, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Result 
      status="success" 
      title="自定义图标" 
      description="您可以自定义结果页面的图标"
      icon={<Icon name="mdi:star" size={64} color="#10b981" />}
      extra={<Button type="primary">继续</Button>}
    />
  );
};
```

### 自定义内容

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
          <Button type="primary" style={{ marginLeft: 8 }}>返回首页</Button>
        </>
      }
    />
  );
};
```

### 带返回链接

```tsx live-codeblock
import React from 'react';
import { Result, Button, Link } from 'orva-ui';

export default () => {
  return (
    <Result 
      status="404" 
      title="页面不存在" 
      description="抱歉，您访问的页面不存在"
      extra={
        <>
          <Link href="/">返回首页</Link>
          <Button type="primary" style={{ marginLeft: 16 }}>重新搜索</Button>
        </>
      }
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| status | `'success' \| 'error' \| 'warning' \| 'info' \| '404' \| '403' \| '500'` | `'success'` | 状态 |
| title | ReactNode | - | 标题 |
| description | ReactNode | - | 描述 |
| icon | ReactNode | - | 自定义图标 |
| extra | ReactNode | - | 额外操作区 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `status` 支持预定义的状态值
- `extra` 区域可放置多个操作按钮
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Empty](empty) | 组件 |
| [ErrorBoundary](errorboundary) | 组件 |
