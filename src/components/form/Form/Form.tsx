/**
 * Form Component
 * 表单组件，提供完整的表单验证和状态管理功能
 */

import React, { useRef } from 'react';
import { Form as TaroForm } from '@tarojs/components';
import type { ITouchEvent } from '@tarojs/components';
import { formStyles } from './Form.styles';
import type { FormProps, FormRef, FormErrors, FormContext } from './Form.types';
import { useFormLogic } from './useFormLogic';
import { FormContextProvider } from './FormContext';
import { FormItem } from './FormItem';
import { createComponent } from '@/utils/createComponent';
import { useAccessibility, ARIA_ROLES } from '@/hooks/ui/useAccessibility';

/** 表单组件 */
export const Form = createComponent<FormProps, FormRef & { Item: typeof FormItem }>({
  name: 'Form',
  render: (props, ref) => {
    const { layout = 'horizontal', size = 'md', className, style, children, onFinish, onFinishFailed, onSubmit, ...restProps } = props;

    const formRef = useRef<any>(null);

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
          await onSubmit?.(formInstance.values, {} as ITouchEvent);
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
        setFields: (fields: any[]) => {
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
        addFieldRules: (name: string, newRules: any[]) => {
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
        setStatus: (status: string) => updateFormInstance({ status }),
        getStatus: () => formInstance.status as any,
        setDisabled: (disabled: boolean) => updateFormInstance({ disabled }),
        setReadonly: (readonly: boolean) => updateFormInstance({ readonly }),
        scrollToField: (_name: string) => { /* scroll logic */ },
        getFormInstance: () => formInstance,
      } as any),
      [formInstance, validateField, setFieldValue, updateField, updateFormInstance, onSubmit, onFinishFailed, setFieldError, getFieldError, setFieldTouched, setFieldValidating, resetField],
    );

    const formStyle = formStyles['getStyle']({ layout, size, style });
    const formClassName = formStyles['getClassName']({ layout, size, className });

    // Filter out incompatible event handlers
    const filteredProps = Object.fromEntries(
      Object.entries(restProps).filter(([key]) => !key.startsWith('on') || key.includes('Click') || key.includes('Touch')),
    );

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

(Form as any).Item = FormItem;

export default Form;