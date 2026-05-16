#!/usr/bin/env python3
"""
批量修复组件导入路径
将相对路径导入转换为基于 @/ 的绝对路径导入
"""

import os
import re
from pathlib import Path

def fix_imports_in_file(file_path: str) -> int:
    """修复单个文件中的导入路径"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original_content = content
    changes = 0
    
    # 定义路径映射规则
    # 从组件目录 (src/components/...) 到 utils/hooks/theme 的路径
    # 通常是 ../../utils/... 或 ../../hooks/...
    
    # 修复 createComponent 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}utils/createComponent['\"]",
        r"from '@/utils/createComponent'",
        content
    )
    changes += n
    
    # 修复 useTheme 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}hooks/ui/useTheme['\"]",
        r"from '@/hooks/ui/useTheme'",
        content
    )
    changes += n
    
    # 修复 useAccessibility 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}hooks/ui/useAccessibility['\"]",
        r"from '@/hooks/ui/useAccessibility'",
        content
    )
    changes += n
    
    # 修复 useMicroAnimation 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}hooks/ui/useMicroAnimation['\"]",
        r"from '@/hooks/ui/useMicroAnimation'",
        content
    )
    changes += n
    
    # 修复 useInteractionState 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}hooks/ui/useInteractionState['\"]",
        r"from '@/hooks/ui/useInteractionState'",
        content
    )
    changes += n
    
    # 修复 theme/motion/easings 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}theme/motion/easings['\"]",
        r"from '@/theme/motion/easings'",
        content
    )
    changes += n
    
    # 修复 theme/motion/durations 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}theme/motion/durations['\"]",
        r"from '@/theme/motion/durations'",
        content
    )
    changes += n
    
    # 修复 theme/styles 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}theme/styles['\"]",
        r"from '@/theme/styles'",
        content
    )
    changes += n
    
    # 修复 types 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}types/component['\"]",
        r"from '@/types/component'",
        content
    )
    changes += n
    
    # 修复 platform 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}platform/index['\"]",
        r"from '@/platform'",
        content
    )
    changes += n
    
    # 修复 constants 导入
    content, n = re.subn(
        r"from\s+['\"](\.\./){2,3}constants/index['\"]",
        r"from '@/constants'",
        content
    )
    changes += n
    
    if content != original_content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
    
    return changes

def main():
    src_dir = Path(__file__).parent.parent / 'src'
    total_changes = 0
    
    # 遍历所有 .ts 和 .tsx 文件
    for file_path in src_dir.rglob('*.ts'):
        if file_path.suffix == '.ts' and not file_path.name.startswith('_'):
            changes = fix_imports_in_file(str(file_path))
            if changes > 0:
                print(f"Fixed {changes} imports in {file_path.relative_to(src_dir)}")
                total_changes += changes
    
    for file_path in src_dir.rglob('*.tsx'):
        changes = fix_imports_in_file(str(file_path))
        if changes > 0:
            print(f"Fixed {changes} imports in {file_path.relative_to(src_dir)}")
            total_changes += changes
    
    print(f"\nTotal changes: {total_changes}")

if __name__ == '__main__':
    main()
