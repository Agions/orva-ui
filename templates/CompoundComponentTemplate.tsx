/**
 * [ComponentName] 复合组件
 * 
 * @description [Description] 复合组件
 * @author orva-ui team
 * @version 1.0.0
 */

import { createCompoundComponent } from '../../utils/createComponent';
import type { BaseProps } from '../../types/component';

// === 主组件 Props ===
export interface [ComponentName]Props extends BaseProps {
  children?: React.ReactNode;
  style?: any;
}

// === 子组件 Props 示例 ===
export interface [SubComponentName]Props extends BaseProps {
  children?: React.ReactNode;
  style?: any;
}

// === 主组件实现 ===
function [ComponentName]Main(props: [ComponentName]Props) {
  const { children, style, ...rest } = props;
  
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
}

// === 子组件实现 ===
function [SubComponentName](props: [SubComponentName]Props) {
  const { children, style, ...rest } = props;
  
  return (
    <View style={style} {...rest}>
      {children}
    </View>
  );
}

// === 创建复合组件 ===
export const [ComponentName] = createCompoundComponent({
  main: {
    name: '[ComponentName]',
    render: [ComponentName]Main,
  },
  subComponents: {
    [SubComponentName]: [SubComponentName],
    // 添加更多子组件...
  },
});

// === 便捷导出 ===
export const [SubComponentName] = [ComponentName].[SubComponentName];

export default [ComponentName];
