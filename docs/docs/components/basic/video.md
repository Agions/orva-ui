# Video 视频

Video 组件用于播放视频，支持多种格式、自动播放、循环播放、封面图等功能。内置播放控制栏和全屏支持。

## 引入

```tsx
import { Video } from 'orva-ui';
// 或按需导入
import { Video } from 'orva-ui/basic';
```

## 基本使用

```tsx
import React from 'react';
import { Video } from 'orva-ui';

export default () => (
  <Video>
    Content
  </Video>
);
```

## 使用示例

### 基础使用

```tsx
<Video
  src="https://example.com/video.mp4"
  poster="https://example.com/poster.jpg"
  width="600px"
  controls
/>
```

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| src | string | - | 视频地址 |
| poster | string | - | 封面图地址 |
| width | number | string | '100%' | 宽度 |
| height | number | string | auto | 高度 |
| autoPlay | boolean | false | 自动播放 |
| loop | boolean | false | 循环播放 |
| muted | boolean | false | 静音 |
| controls | boolean | true | 显示控制栏 |
| className | string | - | 自定义类名 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  colors: {
    primary: '#a855f7',
  },
});
```

## 无障碍支持

组件遵循 WAI-ARIA 标准，内置键盘导航和屏幕阅读器支持。

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- 组件支持服务器端渲染 (SSR)
