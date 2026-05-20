/**
 * Badge 徽章组件单元测试
 * @module components/display/Badge/Badge.test
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge 组件', () => {
  describe('基础渲染', () => {
    it('应该渲染带有子元素的徽章', () => {
      render(
        <Badge count={5}>
          <span data-testid="content">📧</span>
        </Badge>,
      );
      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
    });

    it('应该渲染圆点徽章', () => {
      render(
        <Badge dot>
          <span data-testid="content">🔔</span>
        </Badge>,
      );
      expect(screen.getByTestId('content')).toBeInTheDocument();
    });
  });

  describe('计数逻辑', () => {
    it('应该正确显示计数', () => {
      render(<Badge count={10}><span>X</span></Badge>);
      expect(screen.getByText('10')).toBeInTheDocument();
    });

    it('应该处理溢出计数', () => {
      render(<Badge count={150} overflowCount={99}><span>X</span></Badge>);
      expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('默认不应该显示零', () => {
      render(<Badge count={0}><span>X</span></Badge>);
      expect(screen.queryByText('0')).not.toBeInTheDocument();
    });

    it('showZero 为 true 时应该显示零', () => {
      render(<Badge count={0} showZero><span>X</span></Badge>);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
  });

  describe('边界情况', () => {
    it('应该处理未定义的 count', () => {
      render(<Badge><span>X</span></Badge>);
      expect(screen.getByText('X')).toBeInTheDocument();
    });
  });
});
