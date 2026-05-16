#!/usr/bin/env tsx

/**
 * Orva UI 组件文档生成器
 * 自动生成所有组件的 Markdown 文档
 */

import fs from 'fs';
import path from 'path';

// 项目根目录（脚本在 scripts/ 目录下）
const PROJECT_ROOT = path.resolve(__dirname, '..');

interface ComponentInfo {
  name: string;
  category: string;
  description: string;
  props: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
  examples: string[];
}

const COMPONENT_CATEGORIES = [
  'basic',
  'form',
  'display',
  'feedback',
  'layout',
  'navigation',
  'common'
];

function generateComponentTemplate(componentInfo: ComponentInfo): string {
  return `# ${componentInfo.name} ${componentInfo.name === 'Button' ? '按钮' : ''}

## 介绍

${componentInfo.description}

## 引入

在 Taro 项目中引入 ${componentInfo.name} 组件：

\`\`\`tsx
import { ${componentInfo.name} } from 'orva-ui';
\`\`\`

## 基本用法

### 代码演示

<ComponentPreview>
\`\`\`tsx
import React from 'react';
import { View, Text } from '@tarojs/components';
import { ${componentInfo.name} } from 'orva-ui';

export default function BasicExample() {
  return (
    <View style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      {/* 基础示例 */}
      <Text style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
        基本用法
      </Text>
    </View>
  );
}
\`\`\`
</ComponentPreview>

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
${componentInfo.props.map(prop => `| ${prop.name} | ${prop.type} | ${prop.default || '-'} | ${prop.description} |`).join('\n')}

## 主题定制

你可以通过自定义主题来调整 ${componentInfo.name} 组件的外观：

\`\`\`tsx
import { createDesignTokens } from 'orva-ui/theme';

const customTokens = createDesignTokens({
  colors: {
    primary: '#ff6b6b', // 自定义主色
    secondary: '#4ecdc4', // 自定义辅色
  },
});
\`\`\`

## 无障碍支持

${componentInfo.name} 组件内置了完整的有无障碍支持：

- 支持键盘导航（Tab、Enter、Space）
- 提供适当的 ARIA 标签
- 响应式设计适配不同屏幕尺寸
- 高对比度模式支持`;
}

function analyzeComponentFiles(): ComponentInfo[] {
  const components: ComponentInfo[] = [];
  
  for (const category of COMPONENT_CATEGORIES) {
    const categoryPath = path.join(PROJECT_ROOT, 'src', 'components', category);
    
    if (!fs.existsSync(categoryPath)) continue;
    
    const files = fs.readdirSync(categoryPath);
    
    for (const file of files) {
      if (file.endsWith('.tsx') && file !== 'index.tsx') {
        const componentName = file.replace('.tsx', '');
        const componentPath = path.join(categoryPath, file);
        
        try {
          const content = fs.readFileSync(componentPath, 'utf-8');
          
          // 提取组件描述
          const descriptionMatch = content.match(/\/\*\*[\s\S]*?description:\s*['"](.*?)['"]/i);
          const description = descriptionMatch ? descriptionMatch[1] : `${componentName} 组件`;
          
          // 分析 props
          const props: ComponentInfo['props'] = [];
          
          // 简单的 props 分析（可以根据需要扩展）
          if (content.includes('interface') || content.includes('type')) {
            // 这里可以添加更复杂的 props 解析逻辑
            props.push({
              name: 'children',
              type: 'ReactNode',
              description: '子元素'
            });
          }
          
          components.push({
            name: componentName,
            category,
            description,
            props,
            examples: []
          });
        } catch (error) {
          console.warn(`无法读取组件文件: ${componentPath}`, error);
        }
      }
    }
  }
  
  return components;
}

function generateAllComponentsDocs() {
  console.log('🔍 正在分析组件文件...');
  
  const components = analyzeComponentFiles();
  console.log(`✅ 发现 ${components.length} 个组件`);
  
  const docsDir = path.join(PROJECT_ROOT, 'docs', 'docs', 'components');
  
  for (const component of components) {
    console.log(`📝 生成 ${component.name} 组件文档...`);
    
    const template = generateComponentTemplate(component);
    const filePath = path.join(docsDir, component.category, `${component.name.toLowerCase()}.md`);
    
    // 确保目录存在
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    
    // 写入文件
    fs.writeFileSync(filePath, template, 'utf-8');
    
    console.log(`   ✅ ${component.name}.md 已生成`);
  }
  
  console.log(`🎉 所有组件文档生成完成！`);
  console.log(`📁 文档保存在: ${docsDir}`);
}

// 执行生成
generateAllComponentsDocs();