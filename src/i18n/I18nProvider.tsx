
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { type Locale } from './types';
import { getNestedValue, formatMessage } from './utils';
import zhCNTranslations from './locales/zh-CN.json';
import enUSTranslations from './locales/en-US.json';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, any>) => string;
  formatMessage: (message: string, params?: Record<string, any>) => string;
}

interface I18nProviderProps {
  children?: React.ReactNode;
  initialLocale?: Locale;
}

// 翻译映射
const translationsMap = {
  'zh-CN': zhCNTranslations,
  'en-US': enUSTranslations,
};

const defaultTranslations = zhCNTranslations;

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export const I18nProvider: React.FC<I18nProviderProps> = ({ 
  children, 
  initialLocale = 'zh-CN' 
}) => {
  const [locale, setLocaleState] = useState<Locale>(initialLocale as Locale);

  useEffect(() => {
    // 从 localStorage 恢复语言设置
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem('orva-ui-locale');
      if (savedLocale && Object.keys(translationsMap).includes(savedLocale)) {
        setLocaleState(savedLocale as Locale);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('orva-ui-locale', newLocale);
    }
  };

  const t = (key: string, params?: Record<string, any>): string => {
    const translations = translationsMap[locale] || defaultTranslations;
    const translation = getNestedValue(translations, key);
    return formatMessage(translation, params);
  };

  const formatMessageFn = (message: string, params?: Record<string, any>): string => {
    return formatMessage(message, params);
  };

  const contextValue: I18nContextValue = {
    locale,
    setLocale,
    t,
    formatMessage: formatMessageFn,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = (): I18nContextValue => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
};
