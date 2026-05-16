// Nano-UI 调试组件生成器
const fs = require('fs');
const path = require('path');

function generateDebugComponent(componentName) {
    const componentDir = `src/components/${componentName}`;
    const debugFile = `${componentDir}/Debug${componentName}.tsx`;

    const content = \`
import React from 'react';
import { View, Text } from '@tarojs/components';
import { ${componentName} } from './index';

export interface DebugProps {
  name: string;
  props?: Record<string, any>;
}

export const Debug${componentName}: React.FC<DebugProps> = ({ name, props = {} }) => {
  const [mountedTime] = React.useState(Date.now());

  React.useEffect(() => {
    console.log(\`[${componentName}] 组件渲染: \${name}\`);
    console.log('[${componentName}] Props:', props);
    
    // 性能监控
    if (window.performance) {
      window.performance.mark(\`${componentName}-\${name}-render-start\`);
    }
  }, []);

  return (
    <View style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
      <Text style={{ color: '#666', fontSize: '12px' }}>
        [${componentName}] {name}
      </Text>
      <${componentName} {...props} />
    </View>
  );
};
\`;

    // 确保目录存在
    if (!fs.existsSync(componentDir)) {
      fs.mkdirSync(componentDir, { recursive: true });
    }

    // 写入调试组件
    fs.writeFileSync(debugFile, content);
    console.log(\`✅ 调试组件已生成: \${debugFile}\`);
}

module.exports = { generateDebugComponent };
