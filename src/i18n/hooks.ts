
import { useCallback } from 'react';
import { useI18n } from './I18nProvider';
import { DateFormatter, NumberFormatter } from './formatters';

export const useTranslation = () => {
  const { t } = useI18n();

  return useCallback((key: string, params?: Record<string, any>) => {
    return t(key, params);
  }, [t]);
};

export const useDateFormat = () => {
  const { locale } = useI18n();

  return useCallback((date: Date, pattern?: string) => {
    const formatter = new DateFormatter(locale, date);
    return formatter.format(pattern);
  }, [locale]);
};

export const useNumberFormat = () => {
  const { locale } = useI18n();

  return useCallback((number: number, options?: Intl.NumberFormatOptions) => {
    const formatter = new NumberFormatter(locale, number);
    return formatter.format(options);
  }, [locale]);
};

export const useCurrencyFormat = () => {
  const { locale } = useI18n();

  return useCallback((amount: number, currency: string = 'USD') => {
    const formatter = new NumberFormatter(locale, amount);
    return formatter.currency(currency);
  }, [locale]);
};
