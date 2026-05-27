/**
 * 表单组件 (Form)
 * @module components/form/Form
 * @description 提供完整的表单验证和状态管理功能，支持布局、标签、错误提示等
 * @example
 * ```tsx
 * import { Form } from 'orva-ui';
 *
 * <Form onSubmit={handleSubmit}>
 *   <Form.Item name="username" label="用户名">
 *     <Input />
 *   </Form.Item>
 *   <Form.Item name="password" label="密码">
 *     <Input type="password" />
 *   </Form.Item>
 *   <Form.Submit>提交</Form.Submit>
 * </Form>
 * ```
 */

import React, { useRef, useMemo } from 'react';
import { Form as TaroForm } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { formStyles } from './Form.styles';
import type { FormProps, FormRef, FormErrors, FormContext, FormStatus, FormFieldInfo, FormRule } from './Form.types';
import { useFormLogic } from './useFormLogic';
import { FormContextProvider } from './FormContext';
import { FormItem } from './FormItem';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/**
 * 表单组件 (Form)
 * @module components/form/Form
 * @description 用于收集和验证用户输入的表单容器组件，支持布局、尺寸和验证规则
 * @example
 * ```tsx
 * import { Form, Input, Button } from 'orva-ui';
 *
 * <Form layout="vertical" onFinish={(values) => console.log(values)}>
 *   <Form.Item name="username" label="用户名" rules={[{ required: true }]}>
 *     <Input placeholder="请输入用户名" />
 *   </Form.Item>
 *   <Form.Item>
 *     <Button htmlType="submit">提交</Button>
 *   </Form.Item>
 * </Form>
 * ```
 */
export const Form = createComponent<FormProps, FormRef & { Item: typeof FormItem }>({
  name: 'Form',
  render: (props, ref) => {
    const { layout = 'horizontal', size = 'md', className, style, children, onFinish, onFinishFailed, onSubmit, ...restProps } = props;

    const formRef = useRef<HTMLFormElement | null>(null);

    const {
      formInstance,
      formContext,
      handleSubmit,
      handleReset,
      updateFormInstance,
      setFieldValue,
      setFieldError,
      setFieldTouched,
      setFieldValidating,
      validateField,
      resetField,
      updateField,
      getFieldError,
    } = useFormLogic(props);

    const a11y = useAccessibility({
      role: ARIA_ROLES.form,
      label: 'Form',
    });

    React.useImperativeHandle(
      ref,
      () => ({
        element: formRef.current,
        getValues: () => formInstance.values,
        setValues: (values) => {
          updateFormInstance({ values: { ...formInstance.values, ...values } });
        },
        getFieldValue: (name: string) => formInstance.values[name],
        setFieldValue: (name: string, value: any) => setFieldValue(name, value),
        resetFields: (fields?: string[]) => {
          if (fields) {
            fields.forEach((name) => resetField(name));
          } else {
            Object.keys(formInstance.fields).forEach((name) => resetField(name));
          }
        },
        submit: async () => {
          const validationResults = await Promise.all(
            Object.keys(formInstance.fields).map((name) => validateField(name)),
          );
          const hasErrors = validationResults.some((result) => !result.valid);
          if (hasErrors) {
            const errors: FormErrors = {};
            validationResults.forEach((result, index) => {
              const fieldName = Object.keys(formInstance.fields)[index];
              if (fieldName && !result.valid) errors[fieldName] = result.errors;
            });
            onFinishFailed?.(errors, formInstance.values);
            throw errors;
          }
          await onSubmit?.(formInstance.values, {} as unknown as ITouchEvent);
        },
        validate: async (fields?: string[]) => {
          const fieldNames = fields || Object.keys(formInstance.fields);
          const validationResults = await Promise.all(fieldNames.map((name) => validateField(name)));
          const errors: FormErrors = {};
          let hasErrors = false;
          validationResults.forEach((result, index) => {
            const fieldName = fieldNames[index];
            if (fieldName && !result.valid) {
              errors[fieldName] = result.errors;
              hasErrors = true;
            }
          });
          return { valid: !hasErrors, errors, values: formInstance.values };
        },
        validateField: async (name: string) => validateField(name),
        validateFields: async (names: string[]) => {
          const validationResults = await Promise.all(names.map((name) => validateField(name)));
          const errors: FormErrors = {};
          let hasErrors = false;
          validationResults.forEach((result, index) => {
            const fieldName = names[index];
            if (fieldName && !result.valid) {
              errors[fieldName] = result.errors;
              hasErrors = true;
            }
          });
          return { valid: !hasErrors, errors, values: formInstance.values };
        },
        clearErrors: (fields?: string[]) => {
          if (fields) fields.forEach((name) => setFieldError(name, []));
          else updateFormInstance({ errors: {} });
        },
        setErrors: (errors: FormErrors) => updateFormInstance({ errors: { ...formInstance.errors, ...errors } }),
        getFieldError: (name: string) => getFieldError(name),
        getErrors: () => formInstance.errors,
        setFields: (fields: FormFieldInfo[]) => {
          fields.forEach((field) => {
            if (field.name) updateField(field.name, field);
          });
        },
        getFields: () => Object.values(formInstance.fields),
        getFieldInfo: (name: string) => formInstance.fields[name] || null,
        setFieldsTouched: (touched: Record<string, boolean>) => {
          Object.keys(touched).forEach((name) => setFieldTouched(name, touched[name]));
        },
        setFieldsValidating: (validating: Record<string, boolean>) => {
          Object.keys(validating).forEach((name) => setFieldValidating(name, validating[name]));
        },
        addFieldRules: (name: string, newRules: FormRule[]) => {
          updateFormInstance({
            rules: { ...formInstance.rules, [name]: [...(formInstance.rules[name] || []), ...newRules] },
            fields: {
              ...formInstance.fields,
              [name]: {
                ...(formInstance.fields[name] || { name, value: '', errors: [], touched: false, validating: false, rules: [] }),
                rules: [...(formInstance.fields[name]?.rules || []), ...newRules],
              },
            },
          });
        },
        removeFieldRules: (name: string) => {
          updateFormInstance({
            rules: { ...formInstance.rules, [name]: [] },
            fields: {
              ...formInstance.fields,
              [name]: {
                ...(formInstance.fields[name] || { name, value: '', errors: [], touched: false, validating: false, rules: [] }),
                rules: [],
              },
            },
          });
        },
        getFieldRules: (name: string) => formInstance.rules[name] || [],
        setStatus: (status: FormStatus) => updateFormInstance({ status }),
        getStatus: () => formInstance.status as FormStatus,
        setDisabled: (disabled: boolean) => updateFormInstance({ disabled }),
        setReadonly: (readonly: boolean) => updateFormInstance({ readonly }),
        scrollToField: (_name: string) => { /* scroll logic */ },
        getFormInstance: () => formInstance,
      } as unknown as FormRef & { Item: typeof FormItem }),
      [formInstance, validateField, setFieldValue, updateField, updateFormInstance, onSubmit, onFinishFailed, setFieldError, getFieldError, setFieldTouched, setFieldValidating, resetField],
    );

    const formStyle = useMemo(() => formStyles['getStyle']({ layout, size, style }), [layout, size, style]);
    const formClassName = useMemo(() => formStyles['getClassName']({ layout, size, className }), [layout, size, className]);

    const filteredProps = useMemo(() => Object.fromEntries(
      Object.entries(restProps).filter(([key]) => !key.startsWith('on') || key.includes('Click') || key.includes('Touch')),
    ), [restProps]);

    return (
      <FormContextProvider.Provider value={formContext}>
        <TaroForm
          ref={formRef}
          className={formClassName}
          style={formStyle}
          onSubmit={handleSubmit}
          onReset={handleReset}
          {...a11y.getAriaAttributes()}
          {...filteredProps}
        >
          {children}
        </TaroForm>
      </FormContextProvider.Provider>
    );
  },
});

(Form as unknown as { Item: typeof FormItem }).Item = FormItem;

export default Form;