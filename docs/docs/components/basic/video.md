# Video 视频

**Related Components:** [Carousel](./carousel), [Image](./image)


Video 组件用于视频播放。支持多种格式、控制栏、全屏等。

## 引入

```tsx live-codeblock
import { Video } from 'orva-ui';
// 或按需导入
import { Video } from 'orva-ui/basic';
```

## 基本使用

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video src="https://www.w3schools.com/html/mov_bbb.mp4" />
  );
};
```

## 使用示例

### 基础视频

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video src="https://www.w3schools.com/html/mov_bbb.mp4" />
  );
};
```

### 设置尺寸

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      width={640}
      height={360}
    />
  );
};
```

### 自动播放

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      autoPlay
      muted
    />
  );
};
```

### 循环播放

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      loop
    />
  );
};
```

### 显示控制栏

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      controls
    />
  );
};
```

### 自定义控制栏

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video, Button, Icon } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      controls
      customControls={(props) => (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: 8,
          background: 'rgba(0,0,0,0.5)',
          color: '#fff'
        }}>
          <Button 
            shape="circle" 
            icon={<Icon name={props.playing ? 'mdi:pause' : 'mdi:play'} />}
            onClick={props.onTogglePlay}
          />
          <span style={{ marginLeft: 8 }}>{props.currentTime} / {props.duration}</span>
        </div>
      )}
    />
  );
};
```

### 海报图片

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      poster="https://via.placeholder.com/640x360?text=Video+Poster"
      controls
    />
  );
};
```

### 多来源

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video controls>
      <source src="video.mp4" type="video/mp4" />
      <source src="video.webm" type="video/webm" />
      <source src="video.ogg" type="video/ogg" />
      您的浏览器不支持视频播放。
    </Video>
  );
};
```

### 静音播放

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      muted
      controls
    />
  );
};
```

### 预加载

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      preload="auto"
      controls
    />
  );
};
```

### 响应式视频

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video, ResponsiveContainer } from 'orva-ui';

export default () => {
  return (
    <ResponsiveContainer>
      <Video 
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        style={{ width: '100%' }}
      />
    </ResponsiveContainer>
  );
};
```

### 视频事件

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video, Message } from 'orva-ui';

export default () => {
  const handlePlay = () => {
    Message.success('视频开始播放');
  };
  
  const handlePause = () => {
    Message.info('视频已暂停');
  };
  
  const handleEnded = () => {
    Message.success('视频播放完毕');
  };
  
  const handleError = (error: any) => {
    Message.error('视频加载失败');
    console.error('Video error:', error);
  };
  
  return (
    <Video 
      src="https://www.w3schools.com/html/mov_bbb.mp4"
      controls
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
      onError={handleError}
    />
  );
};
```

### 全屏视频

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video, Button, Icon } from 'orva-ui';

export default () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.parentElement?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  return (
    <div>
      <Button onClick={toggleFullscreen} icon={<Icon name="mdi:fullscreen" />}>
        全屏
      </Button>
      <Video 
        ref={videoRef}
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        controls
        style={{ marginTop: 16, width: '100%' }}
      />
    </div>
  );
};
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| src | string | - | 视频源地址 |
| width | number | - | 宽度 |
| height | number | - | 高度 |
| poster | string | - | 海报图片 |
| controls | boolean | `true` | 显示控制栏 |
| autoPlay | boolean | `false` | 自动播放 |
| loop | boolean | `false` | 循环播放 |
| muted | boolean | `false` | 静音 |
| preload | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | 预加载 |
| customControls | `(props: VideoControlsProps) => ReactNode` | - | 自定义控制栏 |
| onPlay | `() => void` | - | 播放回调 |
| onPause | `() => void` | - | 暂停回调 |
| onEnded | `() => void` | - | 结束回调 |
| onError | `(error: any) => void` | - | 错误回调 |
| onTimeUpdate | `(currentTime: number, duration: number) => void` | - | 时间更新回调 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## VideoControlsProps

```tsx live-codeblock
type VideoControlsProps = {
  playing: boolean;
  currentTime: number;
  duration: number;
  onTogglePlay: () => void;
  onSeek: (time: number) => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
};
```

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `autoPlay` 通常需要 `muted` 才能生效（浏览器策略）
- `poster` 在视频加载前显示
- 支持 HTML5 `<video>` 的所有原生属性
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Carousel](carousel) | 轮播展示 |
| [Image](image) | 组件 |
