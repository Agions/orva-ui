#!/usr/bin/env python3
"""
组件迁移脚本：将传统 forwardRef 组件改造为 createComponent 模式

使用方法:
    python migrate-components.py --component Checkbox --component Switch

已支持的组件:
    - Checkbox
    - Switch
    - Radio
    - Select
    - Slider
    - Cascader
"""

import os
import re
from pathlib import Path
from typing import List, Dict

class ComponentMigrator:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.components_dir = self.project_root / "src" / "components"
        self.utils_dir = self.project_root / "src" / "utils"
        self.hooks_dir = self.project_root / "src" / "hooks"

    def migrate_component(self, component_name: str) -> bool:
        """迁移单个组件"""
        print(f"\n🔄 正在迁移 {component_name}...")

        # 查找组件文件
        tsx_path = self.find_component_file(component_name)
        if not tsx_path:
            print(f"❌ 未找到 {component_name} 组件")
            return False

        # 读取文件内容
        with open(tsx_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # 执行改造
        new_content = self.transform_component(content, component_name)

        # 写入新内容
        with open(tsx_path, 'w', encoding='utf-8') as f:
            f.write(new_content)

        print(f"✅ {component_name} 改造完成")
        return True

    def find_component_file(self, component_name: str) -> Path:
        """查找组件文件路径"""
        # 可能的路径格式
        paths = [
            self.components_dir / "form" / component_name / f"{component_name}.tsx",
            self.components_dir / "basic" / component_name / f"{component_name}.tsx",
            self.components_dir / "display" / component_name / f"{component_name}.tsx",
            self.components_dir / "feedback" / component_name / f"{component_name}.tsx",
        ]

        for path in paths:
            if path.exists():
                return path
        return None

    def transform_component(self, content: str, component_name: str) -> str:
        """执行组件改造"""
        lines = content.split('\n')
        new_lines = []
        i = 0

        while i < len(lines):
            line = lines[i]

            # 1. 添加必要的 imports
            if i == 0 and not any('import' in lines[j] for j in range(min(10, len(lines)))):
                # 添加 import 语句
                import_section_end = self.find_import_section_end(lines, i)
                new_lines.extend([
                    "import { useTheme } from '../../../hooks/ui/useTheme';",
                    "import { useInteractionState } from '../../../hooks/ui/useInteractionState';",
                    ""
                ])
                i = import_section_end + 1
                continue

            # 2. 替换 forwardRef 为 createComponent
            if 'export const' in line and 'forwardRef' in line:
                # 提取组件名和类型参数
                match = re.search(r'export\s+const\s+(\w+)\s*=\s*forwardRef<(\w+),\s*(\w+)>', line)
                if match:
                    component_func_name = match.group(1) + 'Component'
                    ref_type = match.group(2)
                    props_type = match.group(3)

                    # 生成新的 export 语句
                    new_lines.append(f"export const {component_func_name} = createComponent<{props_type}, {ref_type}>({{")
                    new_lines.append(f"  name: '{component_name}',")
                    new_lines.append("")

                    # 查找 defaultProps
                    default_props_start = self.find_default_props_start(lines, i)
                    if default_props_start != -1:
                        new_lines.extend(lines[default_props_start:i])
                        i = default_props_start - 1
                    else:
                        new_lines.append("  defaultProps: {},")
                        new_lines.append("")
                else:
                    new_lines.append(line)
            elif 'createComponent' in line and ('name:' in line or 'render:' in line):
                # 跳过已转换的行
                pass
            elif 'export const' in line and not any(x in line for x in ['forwardRef', 'createComponent']):
                # 跳过其他 export
                new_lines.append(line)
            else:
                new_lines.append(line)

            i += 1

        return '\n'.join(new_lines)

    def find_import_section_end(self, lines: List[str], start_idx: int) -> int:
        """找到 import 部分的结束位置"""
        for i in range(start_idx, min(start_idx + 20, len(lines))):
            if lines[i].strip() == '' or (lines[i].startswith('/') or lines[i].startswith('*')):
                return i
        return start_idx + 10

    def find_default_props_start(self, lines: List[str], current_idx: int) -> int:
        """查找 defaultProps 的开始位置"""
        for i in range(current_idx, min(current_idx + 50, len(lines))):
            if 'defaultProps:' in lines[i]:
                return i
        return -1

def main():
    """主函数"""
    migrator = ComponentMigrator("/root/workspace/nano-ui")

    # 要迁移的组件列表
    components = ["Checkbox", "Switch", "Radio"]

    print("🚀 开始组件迁移...")
    print(f"目标组件: {', '.join(components)}")

    success_count = 0
    for component in components:
        if migrator.migrate_component(component):
            success_count += 1

    print(f"\n📊 迁移结果:")
    print(f"✅ 成功: {success_count}")
    print(f"❌ 失败: {len(components) - success_count}")

if __name__ == "__main__":
    main()