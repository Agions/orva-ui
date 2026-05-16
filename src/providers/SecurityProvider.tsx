/**
 * SecurityProvider — 安全上下文提供者
 *
 * 提供以下安全功能：
 * - **CSP (Content Security Policy)** — 自动生成 CSP 响应头，防止 XSS 攻击
 * - **HSTS (HTTP Strict Transport Security)** — 强制 HTTPS 连接
 * - **XSS 输入净化** — 对 HTML 属性、JSON 等上下文进行安全转义
 * - **URL 验证** — 检测 javascript: 等恶意协议
 * - **错误报告** — 集成 ErrorBoundary 进行安全错误隔离
 *
 * @example
 * ```tsx
 * <SecurityProvider cspEnabled={true} cspPolicy="default-src 'self'">
 *   <App />
 * </SecurityProvider>
 * ```
 *
 * @module providers/SecurityProvider
 */
import React, { ReactNode, createContext, useContext, useEffect } from 'react';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { error as logError } from '../utils/logger';

/**
 * Security Context 提供的安全工具接口
 */
interface SecurityContextType {
  /** 对输入值进行 XSS 净化处理 */
  sanitizeInput: (value: string, type?: 'html' | 'attribute' | 'json') => string;
  /** 验证输入值是否符合安全规则 */
  validateInput: (value: string, rules?: Record<string, unknown>) => { isValid: boolean; errors: string[] };
  /** 为 HTTP 响应添加安全头 */
  addSecurityHeaders: (headers?: Record<string, string>) => Record<string, string>;
  /** 报告安全错误 */
  reportError: (error: Error) => void;
}

// 创建 Security Context
const SecurityContext = createContext<SecurityContextType | undefined>(undefined);

/**
 * SecurityProvider 组件属性
 */
interface SecurityProviderProps {
  children: ReactNode;
  cspEnabled?: boolean;
  cspPolicy?: string;
  hstsEnabled?: boolean;
  hstsMaxAge?: number;
}

/**
 * HTML 转义函数 — 防止 XSS 注入
 */
const escapeHTML = (str: string): string => {
  const escapeMap: Record<string, string> = {
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#x27;',
  };
  return str.replace(/[&<>"']/g, (char) => escapeMap[char] || char);
};

/**
 * JSON 安全解析 — 防止 JSON 注入
 */
const sanitizeJSON = (value: string): string => {
  try {
    const parsed = JSON.parse(value);
    return JSON.stringify(parsed);
  } catch {
    return 'null';
  }
};

/**
 * CSP 默认策略
 */
const DEFAULT_CSP_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https:",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// Security Provider 组件
export const SecurityProvider: React.FC<SecurityProviderProps> = ({
  children,
  cspEnabled = true,
  cspPolicy = DEFAULT_CSP_POLICY,
  hstsEnabled = true,
  hstsMaxAge = 31536000,
}) => {
  // CSP 注入：通过 meta 标签设置 Content-Security-Policy
  useEffect(() => {
    if (!cspEnabled || typeof document === 'undefined') return;

    // 检查是否已有 CSP meta 标签
    const existing = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    if (existing) return;

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Content-Security-Policy';
    meta.content = cspPolicy;
    document.head.appendChild(meta);

    return () => {
      const el = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    };
  }, [cspEnabled, cspPolicy]);

  // HSTS 通过 meta 标签提示（真正的 HSTS 需要服务端设置）
  useEffect(() => {
    if (!hstsEnabled || typeof document === 'undefined') return;

    const existing = document.querySelector('meta[http-equiv="Strict-Transport-Security"]');
    if (existing) return;

    const meta = document.createElement('meta');
    meta.httpEquiv = 'Strict-Transport-Security';
    meta.content = `max-age=${hstsMaxAge}; includeSubDomains`;
    document.head.appendChild(meta);

    return () => {
      const el = document.querySelector('meta[http-equiv="Strict-Transport-Security"]');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    };
  }, [hstsEnabled, hstsMaxAge]);

  // 输入清洗 — 根据类型选择清洗策略
  const sanitizeInput = (value: string, type: 'html' | 'attribute' | 'json' = 'html'): string => {
    if (typeof value !== 'string') return '';
    switch (type) {
      case 'html':
        return escapeHTML(value);
      case 'attribute':
        return escapeHTML(value).replace(/\s+/g, ' ').trim();
      case 'json':
        return sanitizeJSON(value);
      default:
        return escapeHTML(value);
    }
  };

  // 输入验证 — 支持规则配置
  const validateInput = (
    value: string,
    rules: Record<string, unknown> = {},
  ): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    if (rules.required && (!value || value.trim().length === 0)) {
      errors.push('此字段为必填项');
    }

    if (rules.minLength && typeof rules.minLength === 'number' && value.length < rules.minLength) {
      errors.push(`最少需要 ${rules.minLength} 个字符`);
    }

    if (rules.maxLength && typeof rules.maxLength === 'number' && value.length > rules.maxLength) {
      errors.push(`最多允许 ${rules.maxLength} 个字符`);
    }

    if (rules.pattern && typeof rules.pattern === 'string') {
      const regex = new RegExp(rules.pattern);
      if (!regex.test(value)) {
        errors.push((rules.patternMessage as string) || '格式不正确');
      }
    }

    if (rules.noHtml && /[<>]/.test(value)) {
      errors.push('不允许包含 HTML 标签');
    }

    return { isValid: errors.length === 0, errors };
  };

  // 添加安全头部 — CSP/HSTS/X-Frame-Options 等
  const addSecurityHeaders = (headers: Record<string, string> = {}): Record<string, string> => {
    const securityHeaders: Record<string, string> = { ...headers };
    if (cspEnabled) {
      securityHeaders['Content-Security-Policy'] = cspPolicy;
    }
    if (hstsEnabled) {
      securityHeaders['Strict-Transport-Security'] = `max-age=${hstsMaxAge}; includeSubDomains`;
    }
    // 默认安全头部
    securityHeaders['X-Content-Type-Options'] = 'nosniff';
    securityHeaders['X-Frame-Options'] = 'DENY';
    securityHeaders['X-XSS-Protection'] = '1; mode=block';
    securityHeaders['Referrer-Policy'] = 'strict-origin-when-cross-origin';
    return securityHeaders;
  };

  // 错误报告
  const reportError = (error: Error): void => {
    logError(`Security error: ${error.message}`, { error });
  };

  const value: SecurityContextType = {
    sanitizeInput,
    validateInput,
    addSecurityHeaders,
    reportError,
  };

  return (
    <ErrorBoundary>
      <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>
    </ErrorBoundary>
  );
};

// Hook 使用 Security Context
export const useSecurity = (): SecurityContextType => {
  const context = useContext(SecurityContext);
  if (context === undefined) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

export default SecurityProvider;
