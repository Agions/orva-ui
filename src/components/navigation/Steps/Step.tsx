/**
 * 步骤条项组件 (Step)
 * @module components/navigation/Steps/Step
 * @description Steps 组件的子组件，用于展示单个步骤的标题、描述和状态
 * @example
 * ```tsx
 * <Step title="步骤一" description="基本信息" status="finish" />
 * ```
 */

import React, { forwardRef, useImperativeHandle, memo } from 'react';
import { View, Text } from '@tarojs/components';
import { StepProps, StepRef } from './Steps.types';
import {
  getStepItemStyle,
  getStepIconStyle,
  getStepContentStyle,
  getStepTitleStyle,
  getStepDescriptionStyle,
} from './Steps.styles';

export const Step = forwardRef<StepRef, StepProps>(
  ({ className, style, title, description, status = 'wait', icon, disabled: _disabled, stepNumber, ...props }, ref) => {
    const stepRef = React.useRef<any>(null);

    useImperativeHandle(ref, () => ({
      getStep: () => stepRef.current,
    }));

    return (
      <View className={className} style={style} {...props}>
        <View style={getStepItemStyle()}>
          <View style={getStepIconStyle(status)}>{icon || stepNumber}</View>
          <View style={getStepContentStyle()}>
            <Text style={getStepTitleStyle(status)}>{title}</Text>
            {description && <Text style={getStepDescriptionStyle()}>{description}</Text>}
          </View>
        </View>
      </View>
    );
  },
);

Step.displayName = 'Step';

export default memo(Step);
