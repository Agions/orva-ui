import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMutation, usePost } from '../../src/hooks/async/useMutation';

// Mock http client
vi.mock('../../src/services/http-client', () => ({
  http: {
    request: vi.fn(),
  },
}));

import { http } from '../../src/services/http-client';

const mockedHttp = vi.mocked(http);

describe('useMutation', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should start with initial state', () => {
    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST' }),
    );

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.variables).toBeNull();
  });

  it('should mutate data successfully', async () => {
    mockedHttp.request.mockResolvedValueOnce({ data: { id: 1, name: 'Created' } });

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST' }),
    );

    let response: unknown;
    await act(async () => {
      response = await result.current.mutate({ name: 'New' });
    });

    expect(response).toEqual({ id: 1, name: 'Created' });
    expect(result.current.data).toEqual({ id: 1, name: 'Created' });
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.variables).toEqual({ name: 'New' });
  });

  it('should handle mutation errors', async () => {
    const testError = new Error('Server error');
    mockedHttp.request.mockRejectedValueOnce(testError);

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST' }),
    );

    await act(async () => {
      try {
        await result.current.mutateAsync({ name: 'Fail' });
      } catch {
        // expected
      }
    });

    expect(result.current.error).toBe(testError);
    expect(result.current.loading).toBe(false);
  });

  it('should not throw on mutate (non-async)', async () => {
    mockedHttp.request.mockRejectedValueOnce(new Error('fail'));

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST' }),
    );

    let response: unknown;
    await act(async () => {
      response = await result.current.mutate({ name: 'Fail' });
    });

    // mutate catches errors and returns undefined
    expect(response).toBeUndefined();
    expect(result.current.error).toBeTruthy();
  });

  it('should call onSuccess callback', async () => {
    const onSuccess = vi.fn();
    mockedHttp.request.mockResolvedValueOnce({ data: { ok: true } });

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST', onSuccess }),
    );

    await act(async () => {
      await result.current.mutate({ key: 'value' });
    });

    expect(onSuccess).toHaveBeenCalledWith({ ok: true }, { key: 'value' });
  });

  it('should call onError callback', async () => {
    const onError = vi.fn();
    const testError = new Error('fail');
    mockedHttp.request.mockRejectedValueOnce(testError);

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST', onError }),
    );

    await act(async () => {
      try {
        await result.current.mutateAsync({});
      } catch {
        // expected
      }
    });

    expect(onError).toHaveBeenCalledWith(testError, {});
  });

  it('should call onMutate callback', async () => {
    const onMutate = vi.fn();
    mockedHttp.request.mockResolvedValueOnce({ data: {} });

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST', onMutate }),
    );

    await act(async () => {
      await result.current.mutate({ test: true });
    });

    expect(onMutate).toHaveBeenCalledWith({ test: true });
  });

  it('should call onCompleted callback on success', async () => {
    const onCompleted = vi.fn();
    mockedHttp.request.mockResolvedValueOnce({ data: { done: true } });

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST', onCompleted }),
    );

    await act(async () => {
      await result.current.mutate({});
    });

    expect(onCompleted).toHaveBeenCalledWith({ done: true }, null, {});
  });

  it('should support optimistic updates', async () => {
    mockedHttp.request.mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: { id: 1 } }), 50)),
    );

    const { result } = renderHook(() =>
      useMutation({
        url: '/api/test',
        method: 'POST',
        optimisticData: (vars) => ({ ...vars, optimistic: true }),
      }),
    );

    act(() => {
      result.current.mutate({ name: 'Optimistic' });
    });

    // Optimistic data should be set immediately
    expect(result.current.data).toEqual({ name: 'Optimistic', optimistic: true });
    expect(result.current.loading).toBe(true);
  });

  it('should support reset', async () => {
    mockedHttp.request.mockResolvedValueOnce({ data: { id: 1 } });

    const { result } = renderHook(() =>
      useMutation({ url: '/api/test', method: 'POST' }),
    );

    await act(async () => {
      await result.current.mutate({});
    });

    expect(result.current.data).toEqual({ id: 1 });

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
    expect(result.current.variables).toBeNull();
  });
});

describe('usePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should use POST method', async () => {
    mockedHttp.request.mockResolvedValueOnce({ data: { ok: true } });

    const { result } = renderHook(() =>
      usePost('/api/users'),
    );

    await act(async () => {
      await result.current.mutate({ name: 'Alice' });
    });

    expect(mockedHttp.request).toHaveBeenCalledWith(
      expect.objectContaining({ method: 'POST', url: '/api/users' }),
    );
  });
});
