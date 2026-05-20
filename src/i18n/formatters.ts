
/**
 * 国际化格式化器
 */

export class DateFormatter {
  private locale: string;
  private date: Date;

  constructor(locale: string, date: Date = new Date()) {
    this.locale = locale;
    this.date = date;
  }

  format(pattern: string = 'yyyy-MM-dd'): string {
    // 简化的日期格式化
    const year = this.date.getFullYear();
    const month = String(this.date.getMonth() + 1).padStart(2, '0');
    const day = String(this.date.getDate()).padStart(2, '0');

    return pattern
      .replace('yyyy', String(year))
      .replace('MM', month)
      .replace('dd', day);
  }
}

export class NumberFormatter {
  private locale: string;
  private number: number;

  constructor(locale: string, number: number) {
    this.locale = locale;
    this.number = number;
  }

  format(options?: Intl.NumberFormatOptions): string {
    return this.number.toLocaleString(this.locale, options);
  }

  currency(currency: string = 'USD'): string {
    return this.format({
      style: 'currency',
      currency: currency,
    });
  }
}
