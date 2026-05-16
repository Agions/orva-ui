const fs = require('fs');
const path = require('path');

function generateDocs() {
    console.log('🔍 正在分析组件文件...');

    const COMPONENT_CATEGORIES = [
        'basic',
        'form',
        'display',
        'feedback',
        'layout',
        'navigation',
        'common'
    ];

    const components = [];

    for (const category of COMPONENT_CATEGORIES) {
        const categoryPath = path.join('/root/workspace/nano/src/components', category);

        if (!fs.existsSync(categoryPath)) continue;

        const files = fs.readdirSync(categoryPath);

        for (const file of files) {
            if (file.endsWith('.tsx') && file !== 'index.tsx') {
                const componentName = file.replace('.tsx', '');
                const componentPath = path.join(categoryPath, file);

                try {
                    const content = fs.readFileSync(componentPath, 'utf-8');

                    // 简单的组件描述提取
                    const descriptionMatch = content.match(/\/\*\*[\s\S]*?description:\s*['"](.*?)['"]/i);
                    const description = descriptionMatch ? descriptionMatch[1] : `${componentName} 组件`;

                    components.push({
                        name: componentName,
                        category,
                        description,
                        props: [{
                            name: 'children',
                            type: 'ReactNode',
                            description: '子元素'
                        }]
                    });
                } catch (error) {
                    console.warn(`无法读取组件文件: ${componentPath}`, error);
                }
            }
        }
    }

    console.log(`✅ 发现 ${components.length} 个组件`);

    const docsDir = '/root/workspace/nano/docs/docs/components';

    components.forEach(component => {
        console.log(`📝 生成 ${component.name} 组件文档...`);

        const template = `# ${component.name}

## 介绍

${component.description}

## 引入

在 Taro 项目中引入 ${component.name} 组件：

\`\`\`tsx
import { ${component.name} } from 'nano';
\`\`\`

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| children | ReactNode | - | 子元素 |

## 主题定制

你可以通过自定义主题来调整 ${component.name} 组件的外观。

## 无障碍支持

${component.name} 组件内置了完整的有无障碍支持。`;

        const filePath = path.join(docsDir, component.category, `${component.name.toLowerCase()}.md`);

        // 确保目录存在
        fs.mkdirSync(path.dirname(filePath), { recursive: true });

        // 写入文件
        fs.writeFileSync(filePath, template, 'utf-8');

        console.log(`   ✅ ${component.name}.md 已生成`);
    });

    console.log(`🎉 所有组件文档生成完成！`);
    console.log(`📁 文档保存在: ${docsDir}`);
}

// 执行生成
generateDocs();