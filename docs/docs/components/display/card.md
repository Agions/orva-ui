# Card 卡片

**Related Components:** [List](./list), [Grid](./grid)


卡片组件用于将相关信息以卡片形式展示。支持标题、封面、操作区、加载状态等。

## 引入

```tsx live-codeblock
import { Card } from 'orva-ui';
// 或按需导入
import { Card } from 'orva-ui/display';
```

## 基本使用

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>卡片标题</Card.Header>
    <Card.Body>
      卡片内容
    </Card.Body>
  </Card>
);
```

## 使用示例

### 基础卡片

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>基础卡片</Card.Header>
    <Card.Body>
      这是一个基础的卡片组件，用于展示相关信息。
    </Card.Body>
  </Card>
);
```

### 带封面图片

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Img 
      src="https://via.placeholder.com/400x200" 
      alt="封面"
    />
    <Card.Header>带封面的卡片</Card.Header>
    <Card.Body>
      卡片下方可以展示封面图片，适合文章或产品展示。
    </Card.Body>
  </Card>
);
```

### 带操作区

```tsx live-codeblock
import React from 'react';
import { Card, Button } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>带操作区的卡片</Card.Header>
    <Card.Body>
      卡片内容区域，可以放置各种内容。
    </Card.Body>
    <Card.Footer>
      <Button size="sm">取消</Button>
      <Button size="sm" type="primary">确认</Button>
    </Card.Footer>
  </Card>
);
```

### 加载状态

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card loading>
    <Card.Header>加载中...</Card.Header>
    <Card.Body>
      内容加载中，请稍候。
    </Card.Body>
  </Card>
);
```

### 阴影效果

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <>
    <Card shadow="none">无阴影</Card>
    <Card shadow="sm">小阴影</Card>
    <Card shadow="md">中阴影</Card>
    <Card shadow="lg">大阴影</Card>
  </>
);
```

### 组合使用

```tsx live-codeblock
import React from 'react';
import { Card, Button, Icon } from 'orva-ui';

export default () => (
  <Card shadow="md">
    <Card.Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>文章标题</span>
        <Button size="sm" icon={<Icon name="more" />}></Button>
      </div>
    </Card.Header>
    <Card.Img src="https://via.placeholder.com/400x200" alt="封面" />
    <Card.Body>
      <p>这是文章的摘要内容，可以放置多段文字。</p>
    </Card.Body>
    <Card.Footer>
      <Button size="sm">阅读全文</Button>
    </Card.Footer>
  </Card>
);
```

## Props

### Card

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| shadow | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | 阴影等级 |
| loading | boolean | `false` | 是否显示加载状态 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

### Card.Header

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 标题内容 |
| className | string | - | 自定义类名 |

### Card.Body

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 内容区域 |
| className | string | - | 自定义类名 |

### Card.Footer

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 底部内容 |
| className | string | - | 自定义类名 |

### Card.Img

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| src | string | - | 图片地址 |
| alt | string | - | 图片描述 |
| className | string | - | 自定义类名 |

## 主题定制

通过 `createTheme` 或 `ThemeProvider` 自定义主题变量，可以调整组件的颜色、字体、间距等样式。

```tsx live-codeblock
import { createTheme, ThemeProvider } from 'orva-ui';

const theme = createTheme({
  card: {
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
});
```

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- Card 子组件（Header、Body、Footer、Img、Img）需要配合使用
- 支持嵌套使用
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [List](list) | 列表展示 |
| [Grid](grid) | 栅格系统 |
