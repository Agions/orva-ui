# Affix 固钉

**Related Components:** [BackTop](./backtop), [Anchor](./anchor)


Affix 组件用于将元素固定在视口特定位置。支持顶部、底部固定，滚动触发等。

## 引入

```tsx live-codeblock
import { Affix } from 'orva-ui';
// 或按需导入
import { Affix } from 'orva-ui/layout';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 1000 }}>
      <Affix offsetTop={0}>
        <Button type="primary">固定在顶部</Button>
      </Affix>
      <div style={{ padding: 100 }}>
        <p>向下滚动查看效果</p>
      </div>
    </div>
  );
};
```

## 使用示例

### 固定在顶部

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 1000 }}>
      <Affix offsetTop={0}>
        <Button type="primary">固定在顶部</Button>
      </Affix>
      <div style={{ padding: 100 }}>
        <p>向下滚动查看效果</p>
      </div>
    </div>
  );
};
```

### 固定偏移

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 1000 }}>
      <Affix offsetTop={64}>
        <Button type="primary">距离顶部 64px</Button>
      </Affix>
      <div style={{ padding: 100 }}>
        <p>向下滚动查看效果</p>
      </div>
    </div>
  );
};
```

### 固定在底部

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 1000 }}>
      <div style={{ padding: 100 }}>
        <p>向下滚动查看效果</p>
      </div>
      <Affix offsetBottom={0}>
        <Button type="primary">固定在底部</Button>
      </Affix>
    </div>
  );
};
```

### 容器内固定

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 500, overflow: 'auto', border: '1px solid #eee' }}>
      <Affix target={() => document.querySelector('.affix-container')} offsetTop={0}>
        <Button type="primary">容器内固定</Button>
      </Affix>
      <div className="affix-container" style={{ padding: 100 }}>
        <p>在容器内滚动查看效果</p>
      </div>
    </div>
  );
};
```

### 固定状态变化

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button, Message } from 'orva-ui';

export default () => {
  const [fixed, setFixed] = useState(false);
  
  return (
    <div style={{ height: 1000 }}>
      <Affix 
        offsetTop={0}
        onChange={(fixed) => {
          setFixed(fixed);
          if (fixed) {
            Message.success('已固定');
          }
        }}
      >
        <Button type={fixed ? 'primary' : 'default'}>
          {fixed ? '已固定' : '向下滚动固定'}
        </Button>
      </Affix>
      <div style={{ padding: 100 }}>
        <p>向下滚动查看效果</p>
      </div>
    </div>
  );
};
```

### 固定导航栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Menu, Icon } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  return (
    <div style={{ height: 1000 }}>
      <Affix offsetTop={0} style={{ background: '#fff', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Menu 
          mode="horizontal" 
          items={[
            { key: '1', label: '首页', icon: 'mdi:home' },
            { key: '2', label: '产品', icon: 'mdi:cube' },
            { key: '3', label: '服务', icon: 'mdi:server' },
            { key: '4', label: '关于', icon: 'mdi:information' },
          ]}
          selectedKeys={selectedKeys}
          onSelect={setSelectedKeys}
          style={{ border: 'none' }}
        />
      </Affix>
      <div style={{ padding: 100 }}>
        <h2>页面内容</h2>
        <p>导航栏固定在顶部</p>
      </div>
    </div>
  );
};
```

### 固定侧边栏

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Menu } from 'orva-ui';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState(['1']);
  
  return (
    <div style={{ display: 'flex', height: 1000 }}>
      <div style={{ width: 200, borderRight: '1px solid #eee' }}>
        <Affix offsetTop={0} style={{ width: 200 }}>
          <Menu 
            mode="vertical" 
            items={[
              { key: '1', label: '菜单 1' },
              { key: '2', label: '菜单 2' },
              { key: '3', label: '菜单 3' },
              { key: '4', label: '菜单 4' },
            ]}
            selectedKeys={selectedKeys}
            onSelect={setSelectedKeys}
          />
        </Affix>
      </div>
      <div style={{ flex: 1, padding: 24 }}>
        <h2>页面内容</h2>
        <p>侧边栏固定在左侧</p>
      </div>
    </div>
  );
};
```

### 固定回到顶部按钮

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button, Icon } from 'orva-ui';

export default () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div style={{ height: 1000 }}>
      <Affix offsetBottom={100}>
        <Button 
          shape="circle" 
          icon={<Icon name="mdi:arrow-up" />}
          onClick={scrollToTop}
          style={{ position: 'fixed', right: 24 }}
        />
      </Affix>
      <div style={{ padding: 100 }}>
        <h2>页面内容</h2>
        <p>向下滚动查看效果</p>
      </div>
    </div>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| offsetTop | number | - | 距离顶部偏移 |
| offsetBottom | number | - | 距离底部偏移 |
| target | `() => HTMLElement` | `() => window` | 滚动容器 |
| onChange | `(fixed: boolean) => void` | - | 状态变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `target` 默认为 `window`，可指定为其他滚动容器
- `offsetTop` 和 `offsetBottom` 互斥，同时设置时 `offsetTop` 优先
- `onChange` 回调可用于监听固定状态变化
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [BackTop](backtop) | 组件 |
| [Anchor](anchor) | 组件 |
