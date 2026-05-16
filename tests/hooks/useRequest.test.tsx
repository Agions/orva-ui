import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useRequest } from '../../src/hooks/async/useRequest';

// Mock http client
vi.mock('../../src/services/http-client', () => ({
  http: {
    request: vi.fn(),
  },
}));

import { http } from '../../src/services/http-client';

const mockedHttp = vi.mocked(http);

describe('useRequest', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with initial state', () => {
    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true }),
    );

    expect(result.current.data).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });

  it('should fetch data automatically when manual is false', async () => {
    mockedHttp.request.mockResolvedValueOnce({ data: { id: 1, name: 'Test' } });

    const { result } = renderHook(() =>
      useRequest('/api/test'),
    );

    expect(result.current.loading).toBe(true);

    await vi.waitFor(() => {
      expect(result.current.loading).toBe(false);
    }, { timeout: 3000 });

    expect(result.current.data).toEqual({ id: 1, name: 'Test' });
    expect(result.current.error).toBeUndefined();
  });

  it('should not fetch automatically when manual is true', () => {
    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true }),
    );

    expect(result.current.loading).toBe(false);
    expect(mockedHttp.request).not.toHaveBeenCalled();
  });

  it('should fetch data when run is called', async () => {
    mockedHttp.request.mockResolvedValueOnce({ data: { id: 2 } });

    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true }),
    );

    let response: unknown;
    await act(async () => {
      response = await result.current.run();
    });

    expect(response).toEqual({ id: 2 });
    expect(result.current.data).toEqual({ id: 2 });
    expect(result.current.loading).toBe(false);
  });

  it('should handle errors', async () => {
    const testError = new Error('Network error');
    mockedHttp.request.mockRejectedValueOnce(testError);

    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true }),
    );

    await act(async () => {
      try {
        await result.current.run();
      } catch {
        // expected
      }
    });

    expect(result.current.error).toBe(testError);
    expect(result.current.loading).toBe(false);
  });

  it('should use initialData', () => {
    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true, initialData: { cached: true } }),
    );

    expect(result.current.data).toEqual({ cached: true });
  });

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn();
    mockedHttp.request.mockResolvedValueOnce({ data: { ok: true } });

    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true, onSuccess }),
    );

    await act(async () => {
      await result.current.run();
    });

    expect(onSuccess).toHaveBeenCalledWith({ ok: true }, []);
  });

  it('should call onError callback', async () => {
    const onError = vi.fn();
    const testError = new Error('fail');
    mockedHttp.request.mockRejectedValueOnce(testError);

    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true, onError }),
    );

    await act(async () => {
      try {
        await result.current.run();
      } catch {
        // expected
      }
    });

    expect(onError).toHaveBeenCalledWith(testError, []);
  });

  it('should support function service', async () => {
    mockedHttp.request.mockResolvedValueOnce({ data: { user: 'Alice' } });

    const { result } = renderHook(() =>
      useRequest((id: number) => `/api/users/${id}`, { manual: true }),
    );

    await act(async () => {
      await result.current.run(42);
    });

    expect(mockedHttp.request).toHaveBeenCalledWith(
      expect.objectContaining({ url: '/api/users/42' }),
    );
    expect(result.current.data).toEqual({ user: 'Alice' });
  });

  it('should support refresh', async () => {
    mockedHttp.request
      .mockResolvedValueOnce({ data: { v: 1 } })
      .mockResolvedValueOnce({ data: { v: 2 } });

    const onSuccess = vi.fn();
    const { result } = renderHook(() =>
      useRequest('/api/test', { onSuccess }),
    );

    await vi.waitFor(() => expect(result.current.loading).toBe(false), { timeout: 3000 });

    expect(result.current.data).toEqual({ v: 1 });

    mockedHttp.request.mockResolvedValueOnce({ data: { v: 2 } });

    await act(async () => {
      await result.current.refresh();
    });

    await vi.waitFor(() => expect(result.current.loading).toBe(false), { timeout: 3000 });

    expect(result.current.data).toEqual({ v: 2 });
  });

  it('should support mutate', async () => {
    const { result } = renderHook(() =>
      useRequest('/api/test', { manual: true }),
    );

    act(() => {
      result.current.mutate({ mutated: true });
    });

    expect(result.current.data).toEqual({ mutated: true });
  });

  it('should support mutate with function updater', async () => {
    const { result } = renderHook(() =>
      useRequest<number | undefined>('/api/test', { manual: true, initialData: 1 }),
    );

    act(() => {
      result.current.mutate((prev) => (prev ?? 0) + 1);
    });

    expect(result.current.data).toBe(2);
  });
});
