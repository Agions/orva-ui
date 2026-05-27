# Video

**Related Components:** [Carousel](./carousel), [Image](./image)


Video Video component for video playback. Supports multiple formats、controls bar、Fullscreen, etc.. 

## Introduction

```tsx live-codeblock
import { Video } from 'orva-ui';
// 或按需导入
import { Video } from 'orva-ui/basic';
```

## Basic Usage

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video src="https://www.w3schools.com/html/mov_bbb.mp4" />
  );
};
```

## Examples

### Basic Video

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video src="https://www.w3schools.com/html/mov_bbb.mp4" />
  );
};
```

### Settingsizes

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

### Auto播放

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

### Loop

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

### Showcontrols bar

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

### Customcontrols bar

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

### PosterImage

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

### Multiple sources

```tsx live-codeblock
import React, { useRef } from 'react';
import { Video } from 'orva-ui';

export default () => {
  return (
    <Video controls>
      <source src="video.mp4" type="video/mp4" />
      <source src="video.webm" type="video/webm" />
      <source src="video.ogg" type="video/ogg" />
      您的浏览器不Supports视频播放. 
    </Video>
  );
};
```

### Muted

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

### 预Loading

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

### responsive widthVideo

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

### VideoEvent

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
    Message.error('视频Loading失败');
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

### Full screenVideo

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
        Fullscreen
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

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| src | string | - | Video源地址 |
| width | number | - | Width |
| height | number | - | height |
| poster | string | - | PosterImage |
| controls | boolean | `true` | Displaycontrols bar |
| autoPlay | boolean | `false` | Auto播放 |
| loop | boolean | `false` | Loop |
| muted | boolean | `false` | 静音 |
| preload | `'auto' \| 'metadata' \| 'none'` | `'metadata'` | 预Loading |
| customControls | `(props: VideoControlsProps) => ReactNode` | - | Customcontrols bar |
| onPlay | `() => void` | - | 播放Callback |
| onPause | `() => void` | - | 暂停Callback |
| onEnded | `() => void` | - | 结束Callback |
| onError | `(error: any) => void` | - | errorCallback |
| onTimeUpdate | `(currentTime: number, duration: number) => void` | - | Time更新Callback |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

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

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `autoPlay` 通常需要 `muted` 才能生效（浏览器策略）
- `poster` 在VideoLoading前Show
- Supports HTML5 `<video>` 的所有原生属性
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Carousel](carousel) | CarouselDisplay |
| [Image](image) | Component |
