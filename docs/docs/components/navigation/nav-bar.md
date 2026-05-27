# NavBar 导航栏

**Related Components:** [Menu](./menu), [Tabs](./tabs)


NavBar 组件用于页面顶部导航。支持标题、返回按钮、固定定位等。

## 引入

```tsx live-codeblock
import { NavBar } from 'orva-ui';
// 或按需导入
import { NavBar } from 'orva-ui/navigation';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return <NavBar title="页面标题" />;
};
```

## 使用示例

### 基础导航栏

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return <NavBar title="页面标题" />;
};
```

### 带返回按钮

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  const handleBack = () => {
    console.log('返回');
    // history.back();
  };
  
  return <NavBar title="页面标题" onBack={handleBack} />;
};
```

### 自定义左侧内容

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar, Icon } from 'orva-ui';

export default () => {
  return (
    <NavBar
      title="页面标题"
      leftContent={
        <Icon name="mdi:menu" style={{ cursor: 'pointer' }} />
      }
    />
  );
};
```

### 自定义右侧内容

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar, Icon, Badge } from 'orva-ui';

export default () => {
  return (
    <NavBar
      title="页面标题"
      rightContent={
        <>
          <Badge count={3}>
            <Icon name="mdi:bell" style={{ cursor: 'pointer', marginRight: 16 }} />
          </Badge>
          <Icon name="mdi:account" style={{ cursor: 'pointer' }} />
        </>
      }
    />
  );
};
```

### 固定顶部

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return (
    <>
      <NavBar title="页面标题" fixed />
      <div style={{ paddingTop: 56 }}>
        {/* 页面内容 */}
      </div>
    </>
  );
};
```

### 自定义颜色

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar } from 'orva-ui';

export default () => {
  return (
    <NavBar 
      title="页面标题" 
      style={{ background: '#3b82f6', color: '#fff' }}
    />
  );
};
```

### 带搜索框

```tsx live-codeblock
import React, { useState } from 'react';
import { NavBar, Input, Icon } from 'orva-ui';

export default () => {
  const [searchValue, setSearchValue] = useState('');
  
  return (
    <NavBar
      title="页面标题"
      rightContent={
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="搜索..."
          prefix={<Icon name="mdi:magnify" />}
          style={{ width: 200 }}
        />
      }
    />
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| title | ReactNode | - | 标题 |
| leftContent | ReactNode | - | 左侧内容 |
| rightContent | ReactNode | - | 右侧内容 |
| onBack | `() => void` | - | 返回回调 |
| fixed | boolean | `false` | 是否固定 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `fixed` 为 `true` 时需要为内容添加 `paddingTop`
- `leftContent` 和 `rightContent` 可以是任意 ReactNode
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Menu](menu) | 导航菜单 |
| [Tabs](tabs) | 标签导航 |
