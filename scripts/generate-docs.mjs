#!/usr/bin/env node

/**
 * Nano-UI 组件文档生成器 - 增强版
 */

import fs from 'fs';
import path from 'path';

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

function generateComponentDoc(component: ComponentInfo): string {
    return `# ${component.name}

## 介绍

${component.description}

## 引入

\`\`\`tsx
import { ${component.name} } from 'nano';
\`\`\`

## Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
${component.props.map(prop => `| ${prop.name} | ${prop.type} | ${prop.default || '-'} | ${prop.description} |`).join('\n')}

## 主题定制

你可以通过自定义主题来调整 ${component.name} 组件的外观。

## 无障碍支持

${component.name} 组件内置了完整的有无障碍支持。`;
}

function analyzeComponentFile(filePath: string): ComponentInfo | null {
    try {
        const content = fs.readFileSync(filePath, 'utf-8');

        // 提取组件名
        const fileName = path.basename(filePath, '.tsx');
        const componentName = fileName.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();

        // 尝试从 JSDoc 或注释中提取描述
        let description = `${componentName} 组件`;

        // 查找描述
        const descMatch = content.match(/\/\*\*[\s\S]*?description:\s*['"](.*?)['"]/i) ||
                         content.match(/\/\*\*[\s\S]*?@description\s+['"](.*?)['"]/i) ||
                         content.match(/\*\s*([^@][^*]{0,100})\s*\n/i);

        if (descMatch && descMatch[1]) {
            description = descMatch[1].replace(/\*/g, '');
        }

        // 分析 props 接口
        const props: ComponentInfo['props'] = [];

        // 查找 interface Props 或 Props 类型
        const interfaceMatch = content.match(/interface\s+(\w+)\s*{([\s\S]*?)}/);
        if (interfaceMatch) {
            const interfaceName = interfaceMatch[1];
            const interfaceContent = interfaceMatch[2];

            // 匹配属性定义
            const propMatches = interfaceContent.matchAll(/(\w+)\s*(?::\s*([^;]+))?\s*(?:=\s*([^;]+))?;/g);

            for (const match of propMatches) {
                const propName = match[1];
                const propType = match[2]?.trim() || 'any';
                const defaultValue = match[3]?.trim();
                const propDescription = `${propName} 属性`;

                props.push({
                    name: propName,
                    type: propType,
                    default: defaultValue,
                    description: propDescription
                });
            }
        }

        // 如果没有找到 props，添加默认的 children 属性
        if (props.length === 0) {
            props.push({
                name: 'children',
                type: 'ReactNode',
                description: '子元素'
            });
        }

        return {
            name: componentName,
            category: path.basename(path.dirname(path.dirname(filePath))),
            description,
            props
        };
    } catch (error) {
        console.warn(`无法读取组件文件: ${filePath}`, error);
        return null;
    }
}

function generateDocs() {
    console.log('🔍 正在扫描组件文件...');

    const components: ComponentInfo[] = [];
    const docsDir = '/root/workspace/nano/docs/docs/components';

    for (const category of COMPONENT_CATEGORIES) {
        const categoryPath = path.join('/root/workspace/nano/src/components', category);

        if (!fs.existsSync(categoryPath)) continue;

        const files = fs.readdirSync(categoryPath);

        for (const file of files) {
            if (file.endsWith('.tsx')) {
                // 跳过 index.tsx 和 .test.tsx 等文件
                if (file === 'index.tsx' || file.startsWith('.') || file.includes('.test.')) continue;

                const filePath = path.join(categoryPath, file);
                const component = analyzeComponentFile(filePath);

                if (component) {
                    components.push(component);
                }
            }
        }
    }

    console.log(`✅ 发现 ${components.length} 个组件`);

    // 按类别组织组件
    const organizedComponents: Record<string, ComponentInfo[]> = {};
    components.forEach(comp => {
        if (!organizedComponents[comp.category]) {
            organizedComponents[comp.category] = [];
        }
        organizedComponents[comp.category].push(comp);
    });

    // 生成文档
    Object.entries(organizedComponents).forEach(([category, categoryComps]) => {
        console.log(`📁 处理 ${category} 类别 (${categoryComps.length} 个组件)`);

        categoryComps.forEach(component => {
            console.log(`   📝 生成 ${component.name} 文档...`);

            const docContent = generateComponentDoc(component);
            const categoryDir = path.join(docsDir, category);

            // 确保目录存在
            fs.mkdirSync(categoryDir, { recursive: true });

            // 生成文件名（小写）
            const fileName = component.name.toLowerCase().replace(/[^a-z0-9]/g, '') + '.md';
            const filePath = path.join(categoryDir, fileName);

            // 写入文档
            fs.writeFileSync(filePath, docContent, 'utf-8');

            console.log(`      ✅ ${fileName} 已生成`);
        });
    });

    // 生成组件索引
    const indexContent = `# 组件库概览

Nano-UI 是一个现代化的 Taro UI 组件库，提供完整的组件解决方案。

## 分类概览

${Object.entries(organizedComponents).map(([category, comps]) => `- **${category}**: ${comps.length} 个组件`).join('\n')}

## 快速开始

### 安装

\`\`\`bash
npm install nano
\`\`\`

### 引入

\`\`\`tsx
import { Button, Input, Switch } from 'nano';
\`\`\`

## 设计理念

- **一致性**: 统一的视觉语言和交互模式
- **可访问性**: 完整的无障碍支持
- **性能**: 优化的渲染和内存使用
- **主题化**: 灵活的主题定制能力
`;

    fs.writeFileSync(path.join(docsDir, 'index.md'), indexContent, 'utf-8');

    console.log(`🎉 所有组件文档生成完成！`);
    console.log(`📁 文档保存在: ${docsDir}`);
    console.log(`📋 总组件数: ${components.length}`);
}

// 执行生成
generateDocs();