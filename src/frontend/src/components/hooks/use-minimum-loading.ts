import { useState, useCallback } from 'react';

interface UseMinimumLoadingReturn {
  loading: boolean;
  startLoading: () => Promise<void>;
  stopLoading: () => void;
  withMinimumLoading: <T>(promise: Promise<T>) => Promise<T>;
}

export function useMinimumLoading(minimumTime = 500): UseMinimumLoadingReturn {
  const [loading, setLoading] = useState(false);

  const startLoading = useCallback(async () => {
    setLoading(true);
  }, []);

  const stopLoading = useCallback(() => {
    setLoading(false);
  }, []);

  const withMinimumLoading = useCallback(
    async <T>(promise: Promise<T>): Promise<T> => {
      const startTime = Date.now();
      setLoading(true);

      try {
        const result = await promise;
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumTime - elapsedTime);

        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }

        return result;
      } finally {
        setLoading(false);
      }
    },
    [minimumTime],
  );

  return {
    loading,
    startLoading,
    stopLoading,
    withMinimumLoading,
  };
}
