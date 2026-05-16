# 组件迁移指南 - 使用共享样式

## 📋 目录

- [迁移概述](#迁移概述)
- [Button 组件迁移示例](#button-组件迁移示例)
- [表单组件迁移示例](#表单组件迁移示例)
- [迁移检查清单](#迁移检查清单)

---

## 迁移概述

### 为什么要迁移？

| 指标 | 迁移前 | 迁移后 | 改进 |
|------|--------|--------|------|
| 样式代码重复 | ~35% | ~15% | ↓ 20% |
| 样式维护成本 | 高 | 低 | ✅ |
| 主题一致性 | 不一致 | 一致 | ✅ |
| 代码可读性 | 分散 | 集中 | ✅ |

### 迁移步骤

1. **分析现有样式** - 识别重复的样式模式
2. **选择共享样式** - 从共享样式文件中选择
3. **重构组件** - 替换内联样式为共享样式函数
4. **验证功能** - 确保视觉和功能不变
5. **更新文档** - 记录迁移后的使用方式

---

## Button 组件迁移示例

### 迁移前（内联样式）

```typescript
// ❌ 迁移前：样式分散在组件中
const buttonStyles = {
  display: 'inline-flex',
  alignItems: 'center',
  padding: '8px 16px',
  fontSize: 14,
  fontWeight: 500,
  border: '1px solid transparent',
  borderRadius: 4,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  backgroundColor: type === 'primary' ? '#1890ff' : '#fff',
  // ... 更多样式
};
```

### 迁移后（使用共享样式）

```typescript
// ✅ 迁移后：使用共享样式
import buttonStyles from '@/theme/buttonStyles';

function computeButtonStyles(props: ButtonProps) {
  const { type, size, disabled, loading } = props;
  
  return {
    ...buttonStyles.buttonBaseStyles,
    ...buttonStyles.buttonSizeStyles[size ?? 'md'],
    ...buttonStyles.buttonTypeStyles[type ?? 'default'],
    ...(disabled ? buttonStyles.buttonInteractionStyles.disabled : {}),
  };
}
```

---

## 迁移检查清单

### ✅ 迁移前检查

- [ ] 分析组件中的样式代码
- [ ] 识别重复的样式模式
- [ ] 确认共享样式是否覆盖需求

### ✅ 迁移后检查

- [ ] 视觉样式保持一致
- [ ] 交互状态正常工作
- [ ] 单元测试通过

---

*文档版本: 1.0 | 更新时间: 2026-05-15*
