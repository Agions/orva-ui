# Card

**Related Components:** [List](./list), [Grid](./grid)


Card component for grouping related information. Supports headings、cover、Action区、Loadingstatus, etc.. 

## Introduction

```tsx live-codeblock
import { Card } from 'orva-ui';
// 或按需导入
import { Card } from 'orva-ui/display';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>CardTitle</Card.Header>
    <Card.Body>
      CardContent
    </Card.Body>
  </Card>
);
```

## Examples

### Basic Card

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>Basic Card</Card.Header>
    <Card.Body>
      这是一个Basic 的Card组件, 用于Display相关信息. 
    </Card.Body>
  </Card>
);
```

### 带coverImage

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card>
    <Card.Img 
      src="https://via.placeholder.com/400x200" 
      alt="cover"
    />
    <Card.Header>带cover的Card</Card.Header>
    <Card.Body>
      Card下方可以DisplaycoverImage, 适合文章或产品Display. 
    </Card.Body>
  </Card>
);
```

### 带Action区

```tsx live-codeblock
import React from 'react';
import { Card, Button } from 'orva-ui';

export default () => (
  <Card>
    <Card.Header>带操作区的Card</Card.Header>
    <Card.Body>
      CardContent区域, 可以放置各种Content. 
    </Card.Body>
    <Card.Footer>
      <Button size="sm">Cancel</Button>
      <Button size="sm" type="primary">Confirm</Button>
    </Card.Footer>
  </Card>
);
```

### Loadingstatus

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <Card loading>
    <Card.Header>Loading中...</Card.Header>
    <Card.Body>
      ContentLoading中, 请稍候. 
    </Card.Body>
  </Card>
);
```

### ShadowEffect

```tsx live-codeblock
import React from 'react';
import { Card } from 'orva-ui';

export default () => (
  <>
    <Card shadow="none">无Shadow</Card>
    <Card shadow="sm">小Shadow</Card>
    <Card shadow="md">中Shadow</Card>
    <Card shadow="lg">大Shadow</Card>
  </>
);
```

### 组合Use

```tsx live-codeblock
import React from 'react';
import { Card, Button, Icon } from 'orva-ui';

export default () => (
  <Card shadow="md">
    <Card.Header>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>文章Title</span>
        <Button size="sm" icon={<Icon name="more" />}></Button>
      </div>
    </Card.Header>
    <Card.Img src="https://via.placeholder.com/400x200" alt="cover" />
    <Card.Body>
      <p>这是文章的摘要Content, 可以放置多段Text. </p>
    </Card.Body>
    <Card.Footer>
      <Button size="sm">阅读全文</Button>
    </Card.Footer>
  </Card>
);
```

## Props

### Card

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| shadow | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | shadow, etc.级 |
| loading | boolean | `false` | Show or hideLoadingstatus |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

### Card.Header

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| children | ReactNode | - | TitleContent |
| className | string | - | Custom class name |

### Card.Body

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| children | ReactNode | - | ContentArea |
| className | string | - | Custom class name |

### Card.Footer

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| children | ReactNode | - | BottomContent |
| className | string | - | Custom class name |

### Card.Img

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| src | string | - | Image URL |
| alt | string | - | Imagedescription |
| className | string | - | Custom class name |

## Theme customization

Via `createTheme` 或 `ThemeProvider` Custom主题变量, Can adjust componentcolors、Font、spacing, etc.Style. 

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

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- Card Sub component（Header、Body、Footer、Img、Img）需要Used withUse
- SupportsNestedUse
## Related Components

The following components are related and may be used together:

| Component | Description |
|------|------|
| [List](list) | ListDisplay |
| [Grid](grid) | Grid system |
