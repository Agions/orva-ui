# Carousel

**Related Components:** [Image](./image), [Video](./video)


Carousel Carousel component for image carousel display. Supports auto-play、indicators、ArrowNavigation、AnimationEffect, etc.. 

## Introduction

```tsx live-codeblock
import { Carousel } from 'orva-ui';
// 或按需导入
import { Carousel } from 'orva-ui/display';
```

## Basic Usage

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

## Examples

### Basic Carousel

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

### Auto播放

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

### CustomAuto播放速度

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

### 无ArrowNavigation

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

### 无indicators

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

### Card式Carousel

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

### verticalCarousel

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

### CustomAnimation

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

### ControlledCarousel

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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| items | CarouselItem[] | - | SlideList |
| current | number | `0` | Current索引（Controlled） |
| autoplay | boolean | `false` | WhetherAuto播放 |
| autoplaySpeed | number | `3000` | Auto播放间隔 |
| showArrows | boolean | `true` | Show or hideArrow |
| showIndicators | boolean | `true` | Show or hideindicators |
| cardMode | boolean | `false` | WhetherCardMode |
| vertical | boolean | `false` | Whethervertical |
| effect | `'slide' \| 'fade'` | `'slide'` | AnimationEffect |
| onChange | `(index: number) => void` | - | 索引Change callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `items` In `content` Can be any ReactNode
- For controlled components, use `current` + `onChange`
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Image](image) | Component |
| [Video](video) | 媒体Display |
