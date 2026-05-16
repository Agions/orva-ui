import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from '@tarojs/components';
import { MessageProps, MessageRef } from './Message.types';
import { cn } from '../../../utils';
import { messageStyles } from './Message.styles';
import { createComponent } from '@/utils/createComponent';
import { useMicroAnimation } from '@/hooks/ui/useMicroAnimation';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

export const Message = createComponent<MessageProps, MessageRef>({
  name: 'Message',
  render: (props, ref) => {
    const {
      type = 'info',
      title,
      content,
      icon,
      closable = false,
      duration = 3000,
      className,
      style,
      onClose,
      ...rest
    } = props;

    const [visible, setVisible] = useState(true);
    const messageRef = useRef<any>(null);
    const animation = useMicroAnimation({ type: 'micro', enabled: closable });
    const a11y = useAccessibility({
      role: (ARIA_ROLES as any).alert || 'alert',
      label: title || content || 'Message',
    });

    useEffect(() => {
      if (duration > 0) {
        const timer = setTimeout(() => {
          setVisible(false);
          onClose?.();
        }, duration);
        return () => clearTimeout(timer);
      }
    }, [duration, onClose]);

    const handleClose = () => {
      setVisible(false);
      onClose?.();
    };

    const renderIcon = () => {
      if (icon) return <View className={messageStyles['icon']}>{icon}</View>;
      const defaultIcons = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
      return (
        <View className={cn(messageStyles['icon'], messageStyles['iconType'][type])}>
          <Text className={messageStyles['iconText']}>{defaultIcons[type]}</Text>
        </View>
      );
    };

    const messageClasses = cn(messageStyles['base'], messageStyles['type'][type], className);

    if (!visible) return null;

    const mergedStyle = animation.getMergedStyle(style || {});

    return (
      <View ref={messageRef} className={messageClasses} style={mergedStyle} {...a11y.getAriaAttributes()} {...rest}>
        {renderIcon()}
        <View className={messageStyles['content']}>
          {title && <Text className={messageStyles['title']}>{title}</Text>}
          {content && <Text className={messageStyles['text']}>{content}</Text>}
        </View>
        {closable && (
          <View className={messageStyles['close']} onClick={handleClose}>
            <Text className={messageStyles['closeText']}>✕</Text>
          </View>
        )}
      </View>
    );
  },
});

export default Message;