# Carousel 轮播

**Related Components:** [Image](./image), [Video](./video)


Carousel 组件用于图片轮播展示。支持自动播放、指示器、箭头导航、动画效果等。

## 引入

```tsx live-codeblock
import { Carousel } from 'orva-ui';
// 或按需导入
import { Carousel } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: '幻灯片 1' },
    { content: '幻灯片 2' },
    { content: '幻灯片 3' },
  ];
  
  return <Carousel items={items} />;
};
```

## 使用示例

### 基础轮播

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 300, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 300, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 300, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} />;
};
```

### 自动播放

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 300, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 300, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 300, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} autoplay />;
};
```

### 自定义自动播放速度

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 300, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 300, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 300, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} autoplay autoplaySpeed={5000} />;
};
```

### 无箭头导航

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 300, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 300, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 300, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} showArrows={false} />;
};
```

### 无指示器

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 300, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 300, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 300, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} showIndicators={false} />;
};
```

### 卡片式轮播

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 200, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 200, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 200, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} cardMode />;
};
```

### 垂直轮播

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 150, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 150, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 150, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} vertical />;
};
```

### 自定义动画

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel } from 'orva-ui';

export default () => {
  const items = [
    { content: <div style={{ height: 300, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 300, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 300, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return <Carousel items={items} effect="fade" />;
};
```

### 受控轮播

```tsx live-codeblock
import React, { useState } from 'react';
import { Carousel, Button } from 'orva-ui';

export default () => {
  const [current, setCurrent] = useState(0);
  
  const items = [
    { content: <div style={{ height: 300, background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 1</div> },
    { content: <div style={{ height: 300, background: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 2</div> },
    { content: <div style={{ height: 300, background: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>幻灯片 3</div> },
  ];
  
  return (
    <>
      <Carousel items={items} current={current} onChange={setCurrent} />
      <div style={{ marginTop: 16 }}>
        <Button onClick={() => setCurrent(0)}>第 1 张</Button>
        <Button onClick={() => setCurrent(1)} style={{ margin: '0 8px' }}>第 2 张</Button>
        <Button onClick={() => setCurrent(2)}>第 3 张</Button>
      </div>
    </>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| items | CarouselItem[] | - | 幻灯片列表 |
| current | number | `0` | 当前索引（受控） |
| autoplay | boolean | `false` | 是否自动播放 |
| autoplaySpeed | number | `3000` | 自动播放间隔 |
| showArrows | boolean | `true` | 是否显示箭头 |
| showIndicators | boolean | `true` | 是否显示指示器 |
| cardMode | boolean | `false` | 是否卡片模式 |
| vertical | boolean | `false` | 是否垂直 |
| effect | `'slide' \| 'fade'` | `'slide'` | 动画效果 |
| onChange | `(index: number) => void` | - | 索引变化回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `items` 中的 `content` 可以是任意 ReactNode
- 受控组件请使用 `current` + `onChange`
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Image](image) | 组件 |
| [Video](video) | 媒体展示 |
