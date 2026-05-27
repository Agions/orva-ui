# Modal

Modal component is used to display content in a layer above the current page. Supports various sizes, footer buttons, and custom content.

## Introduction

```tsx
import { Modal } from 'orva-ui';
// Or import on-demand
import { Modal } from 'orva-ui/feedback';
```

## Basic Usage

```tsx live-codeblock
import React from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal 
        visible={visible}
        onClose={() => setVisible(false)}
        title="Basic Modal"
      >
        <p>This is the modal content.</p>
      </Modal>
    </>
  );
};
```

### With Footer Buttons

```tsx live-codeblock
import React from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal 
        visible={visible}
        onClose={() => setVisible(false)}
        title="Modal with Footer"
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>Cancel</Button>,
          <Button key="confirm" type="primary" onClick={() => setVisible(false)}>Confirm</Button>
        ]}
      >
        <p>Modal content with custom footer buttons.</p>
      </Modal>
    </>
  );
};
```

### Different Sizes

```tsx live-codeblock
import React from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button onClick={() => setVisible(true)}>Open Modal</Button>
      <Modal 
        visible={visible}
        onClose={() => setVisible(false)}
        title="Large Modal"
        size="lg"
      >
        <p>This is a larger modal for more content.</p>
      </Modal>
    </>
  );
};
```

### Confirmation Modal

```tsx live-codeblock
import React from 'react';
import { Modal, Button } from 'orva-ui';

export default () => {
  const [visible, setVisible] = React.useState(false);

  return (
    <>
      <Button type="danger" onClick={() => setVisible(true)}>Delete</Button>
      <Modal 
        visible={visible}
        onClose={() => setVisible(false)}
        title="Confirm Delete"
        footer={[
          <Button key="cancel" onClick={() => setVisible(false)}>Cancel</Button>,
          <Button key="confirm" type="danger" onClick={() => setVisible(false)}>Delete</Button>
        ]}
      >
        <p>Are you sure you want to delete this item? This action cannot be undone.</p>
      </Modal>
    </>
  );
};
```

## Props

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| visible | boolean | `false` | Modal visibility |
| title | ReactNode | - | Modal title |
| children | ReactNode | - | Modal content |
| footer | ReactNode[] | - | Footer buttons |
| size | `'sm' \| 'md' \| 'lg'` | `'md'` | Modal size |
| closable | boolean | `true` | Show close button |
| maskClosable | boolean | `true` | Close on mask click |
| onClose | `() => void` | - | Close handler |
| className | string | - | Custom class name |
| style | CSSProperties | - | Custom styles |

## Related Components

The following components are related to the current component and may be used together:

| Component | Description |
|-----------|-------------|
| [Drawer](../feedback/drawer) | Side drawer panel |
| [Dialog](../feedback/modal) | Dialog component |
| [Button](../basic/button) | Button component |

## Notes

- Ensure the component is wrapped in `ThemeProvider` for full theme support
- Use `visible` + `onClose` for controlled modal
- Modal content can be any ReactNode
