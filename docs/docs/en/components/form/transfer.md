# Transfer

**Related Components:** [Select](./select), [Cascader](./cascader)


Transfer Transfer component enables data transfer between two lists. Supports search、sorting、custom rendering, etc.. 

## Introduction

```tsx live-codeblock
import { Transfer } from 'orva-ui';
// 或按需导入
import { Transfer } from 'orva-ui/form';
```

## Basic Usage

```tsx live-codeblock
import React, { useState } from 'react';
import { Transfer } from 'orva-ui';

export default () => {
  const [targetKeys, setTargetKeys] = useState([]);
  
  const dataSource = [
    { key: '1', title: '选项一' },
    { key: '2', title: '选项二' },
    { key: '3', title: '选项三' },
    { key: '4', title: '选项四' },
  ];
  
  return <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={setTargetKeys} />;
};
```

## Examples

### Basic Transfer

```tsx live-codeblock
import React, { useState } from 'react';
import { Transfer } from 'orva-ui';

export default () => {
  const [targetKeys, setTargetKeys] = useState(['1', '3']);
  
  const dataSource = [
    { key: '1', title: '选项一' },
    { key: '2', title: '选项二' },
    { key: '3', title: '选项三' },
    { key: '4', title: '选项四' },
    { key: '5', title: '选项五' },
  ];
  
  return <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={setTargetKeys} />;
};
```

### With Search

```tsx live-codeblock
import React, { useState } from 'react';
import { Transfer } from 'orva-ui';

export default () => {
  const [targetKeys, setTargetKeys] = useState([]);
  
  const dataSource = [
    { key: '1', title: '北京' },
    { key: '2', title: '上海' },
    { key: '3', title: '广州' },
    { key: '4', title: '深圳' },
    { key: '5', title: '杭州' },
  ];
  
  return <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={setTargetKeys} showSearch />;
};
```

### custom rendering

```tsx live-codeblock
import React, { useState } from 'react';
import { Transfer, Icon } from 'orva-ui';

export default () => {
  const [targetKeys, setTargetKeys] = useState([]);
  
  const dataSource = [
    { key: '1', title: 'GitHub', description: '代码托管平台' },
    { key: '2', title: 'GitLab', description: '自托管代码平台' },
    { key: '3', title: 'Bitbucket', description: 'Atlassian 代码托管' },
    { key: '4', title: 'Gitee', description: '国内代码托管' },
  ];
  
  return (
    <Transfer 
      dataSource={dataSource} 
      targetKeys={targetKeys} 
      onChange={setTargetKeys}
      render={(item) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Icon name="mdi:github" style={{ marginRight: 8 }} />
          <div>
            <div>{item.title}</div>
            <div style={{ fontSize: 12, color: '#999' }}>{item.description}</div>
          </div>
        </div>
      )}
    />
  );
};
```

### With Action Text

```tsx live-codeblock
import React, { useState } from 'react';
import { Transfer } from 'orva-ui';

export default () => {
  const [targetKeys, setTargetKeys] = useState([]);
  
  const dataSource = [
    { key: '1', title: '选项一' },
    { key: '2', title: '选项二' },
    { key: '3', title: '选项三' },
  ];
  
  return (
    <Transfer 
      dataSource={dataSource} 
      targetKeys={targetKeys} 
      onChange={setTargetKeys}
      titles={['待选', '已选']}
      operations={['>>', '<<']}
    />
  );
};
```

### disabledOption

```tsx live-codeblock
import React, { useState } from 'react';
import { Transfer } from 'orva-ui';

export default () => {
  const [targetKeys, setTargetKeys] = useState([]);
  
  const dataSource = [
    { key: '1', title: '选项一' },
    { key: '2', title: '选项二', disabled: true },
    { key: '3', title: '选项三' },
    { key: '4', title: '选项四', disabled: true },
  ];
  
  return <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={setTargetKeys} />;
};
```

### With stats

```tsx live-codeblock
import React, { useState } from 'react';
import { Transfer } from 'orva-ui';

export default () => {
  const [targetKeys, setTargetKeys] = useState([]);
  
  const dataSource = [
    { key: '1', title: '选项一' },
    { key: '2', title: '选项二' },
    { key: '3', title: '选项三' },
    { key: '4', title: '选项四' },
    { key: '5', title: '选项五' },
  ];
  
  return <Transfer dataSource={dataSource} targetKeys={targetKeys} onChange={setTargetKeys} showSearch showCount />;
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| dataSource | TransferItem[] | - | Data source |
| targetKeys | string[] | - | Target keys（Controlled） |
| onChange | `(targetKeys: string[]) => void` | - | Change callback |
| titles | [string, string] | - | Left/RightTitle |
| operations | [string, string] | - | ActionButton text |
| render | `(item: TransferItem) => ReactNode` | - | RenderFunction |
| showSearch | boolean | `false` | Show or hideSearch |
| showCount | boolean | `false` | Show or hideStats |
| filterOption | `(inputValue: string, option: TransferItem) => boolean` | - | Search FilterFunction |
| disabled | boolean | `false` | Whetherdisabled |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom Style |

## TransferItem

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| key | string | Unique identifier |
| title | ReactNode | DisplayContent |
| disabled | boolean | Whetherdisabled |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- `targetKeys` controlled value, Manage selected items
- `render` Function forCustomList itemShow
## Related Components

The following components are related and may be used together:

| Component | Description |
|-----------|-------------|
| [Select](select) | Dropdown select |
| [Cascader](cascader) | Cascader Selection |
