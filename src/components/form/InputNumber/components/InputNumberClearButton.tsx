import { View, Text } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';

import { createComponent } from '../../../../utils/createComponent';
import { useTheme } from '../../../../hooks/ui/useTheme';
import { useInteractionState } from '../../../../hooks/ui/useInteractionState';
import type { InputNumberSize } from '../InputNumber.types';
import type { BaseProps } from '@/types/component';
import { inputNumberStyles } from '../InputNumber.styles';

interface InputNumberClearButtonProps extends BaseProps {
  size: InputNumberSize;
  disabled: boolean;
  readonly: boolean;
  onClear: (event: ITouchEvent) => void;
}

export const InputNumberClearButton = createComponent<InputNumberClearButtonProps>({
  name: 'InputNumberClearButton',

  defaultProps: {
    size: 'md',
    disabled: false,
    readonly: false,
    onClear: () => {},
  },

  render: (props, ref) => {
    const { size, disabled, readonly, onClear } = props;

    const { theme } = useTheme();

    const { handlers } = useInteractionState({
      disabledPress: disabled || readonly,
      disabledHover: disabled,
    });

    const handleClear = (event: ITouchEvent) => {
      if (disabled || readonly) return;
      onClear(event);
    };

    return (
      <View style={inputNumberStyles['getClearButtonStyle']({ size })} onClick={handleClear} {...handlers}>
        <Text>×</Text>
      </View>
    );
  },
});

InputNumberClearButton.displayName = 'InputNumberClearButton';