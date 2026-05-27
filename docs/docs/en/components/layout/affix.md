# Affix

**Related Components:** [BackTop](./backtop), [Anchor](./anchor)


Affix Affix component for fixing elements to viewport position. Supports top、bottom fixed, Scroll trigger, etc.. 

## Introduction

```tsx live-codeblock
import { Affix } from 'orva-ui';
// 或按需导入
import { Affix } from 'orva-ui/layout';
```

## Basic Usage

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

## Examples

### Sticky/FixedAt top

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

### Sticky/FixedOffset

```tsx live-codeblock
import React, { useState } from 'react';
import { Affix, Button } from 'orva-ui';

export default () => {
  return (
    <div style={{ height: 1000 }}>
      <Affix offsetTop={64}>
        <Button type="primary">Distance顶部 64px</Button>
      </Affix>
      <div style={{ padding: 100 }}>
        <p>向下滚动查看效果</p>
      </div>
    </div>
  );
};
```

### Sticky/FixedAt bottom

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

### Container内Sticky/Fixed

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

### Sticky/FixedstatusChange

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

### Sticky/FixedNavigation栏

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
        <h2>页面Content</h2>
        <p>Navigation栏固定在顶部</p>
      </div>
    </div>
  );
};
```

### Sticky/FixedSidebar

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
        <h2>页面Content</h2>
        <p>侧边栏固定在左侧</p>
      </div>
    </div>
  );
};
```

### Sticky/Fixed回到TopButton

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
        <h2>页面Content</h2>
        <p>向下滚动查看效果</p>
      </div>
    </div>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| offsetTop | number | - | DistanceTopOffset |
| offsetBottom | number | - | DistanceBottomOffset |
| target | `() => HTMLElement` | `() => window` | 滚动Container |
| onChange | `(fixed: boolean) => void` | - | statusChange callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `target` 默认为 `window`, 可指定为其他滚动Container
- `offsetTop` 和 `offsetBottom` 互斥, 同时Setting时 `offsetTop` 优先
- `onChange` 回调可用于监听Sticky/FixedstatusChange
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [BackTop](backtop) | Component |
| [Anchor](anchor) | Component |
