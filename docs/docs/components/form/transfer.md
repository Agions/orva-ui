# Transfer 穿梭框

**Related Components:** [Select](./select), [Cascader](./cascader)


Transfer 组件用于在两个列表之间传输数据。支持搜索、排序、自定义渲染等。

## 引入

```tsx live-codeblock
import { Transfer } from 'orva-ui';
// 或按需导入
import { Transfer } from 'orva-ui/form';
```

## 基本使用

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

## 使用示例

### 基础穿梭框

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

### 带搜索

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

### 自定义渲染

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

### 带操作文案

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

### 禁用选项

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

### 带统计

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

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| dataSource | TransferItem[] | - | 数据源 |
| targetKeys | string[] | - | 目标键（受控） |
| onChange | `(targetKeys: string[]) => void` | - | 变化回调 |
| titles | [string, string] | - | 左右标题 |
| operations | [string, string] | - | 操作按钮文案 |
| render | `(item: TransferItem) => ReactNode` | - | 渲染函数 |
| showSearch | boolean | `false` | 是否显示搜索 |
| showCount | boolean | `false` | 是否显示统计 |
| filterOption | `(inputValue: string, option: TransferItem) => boolean` | - | 搜索过滤函数 |
| disabled | boolean | `false` | 是否禁用 |
| className | string | - | 自定义类名 |
| style | CSSProperties | - | 自定义样式 |

## TransferItem

| 属性名 | 类型 | 说明 |
|--------|------|------|
| key | string | 唯一标识 |
| title | ReactNode | 显示内容 |
| disabled | boolean | 是否禁用 |

## 注意事项

- 请确保在 `ThemeProvider` 包裹下使用组件以获得完整的主题支持
- `targetKeys` 为受控值，管理已选中的项
- `render` 函数用于自定义列表项的显示
## 相关组件

以下是与当前组件相关的其他组件，可能在使用时搭配使用：

| 组件 | 说明 |
|------|------|
| [Select](select) | 下拉选择 |
| [Cascader](cascader) | 级联选择 |
