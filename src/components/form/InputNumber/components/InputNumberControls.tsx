/**
 * InputNumber 步进控制组件 (InputNumberControls)
 * @module components/form/InputNumber/components/InputNumberControls
 * @description InputNumber 组件的步进按钮子组件，支持上下/双侧位置
 * @example
 * ```tsx
 * <InputNumberControls size="md" controlsPosition="both" onStep={(dir) => console.log(dir)} />
 * ```
 */

import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '@/utils/createComponent';
import { useTheme } from '@/hooks/ui/useTheme';
import { useInteractionState } from '@/hooks/ui/useInteractionState';
import type { InputNumberSize, InputNumberControlsPosition } from '../InputNumber.types';
import type { BaseProps } from '@/types/component';
import { inputNumberStyles } from '../InputNumber.styles';

interface InputNumberControlsProps extends BaseProps {
  size: InputNumberSize;
  controlsPosition: InputNumberControlsPosition;
  disabled: boolean;
  readonly: boolean;
  onStep: (direction: 'up' | 'down', event: ITouchEvent) => void;
}

export const InputNumberControls = createComponent<InputNumberControlsProps>({
  name: 'InputNumberControls',

  defaultProps: {
    size: 'md',
    controlsPosition: 'both',
    disabled: false,
    readonly: false,
    onStep: () => {},
  },

  render: (props, ref) => {
    const { size, controlsPosition, disabled, readonly, onStep } = props;

    const { theme } = useTheme();

    const { handlers } = useInteractionState({
      disabledPress: disabled || readonly,
      disabledHover: disabled,
    });

    const handleStep = (direction: 'up' | 'down') => (event: ITouchEvent) => {
      if (disabled || readonly) return;
      onStep(direction, event);
    };

    return (
      <View style={inputNumberStyles['getControlsStyle']({ size, controlsPosition })} {...handlers}>
        <View style={inputNumberStyles['getControlButtonStyle']({ size, direction: 'up' })} onClick={handleStep('up')}>
          <Text>+</Text>
        </View>
        <View
          style={inputNumberStyles['getControlButtonStyle']({ size, direction: 'down' })}
          onClick={handleStep('down')}
        >
          <Text>-</Text>
        </View>
      </View>
    );
  },
});

InputNumberControls.displayName = 'InputNumberControls';