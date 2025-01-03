export function useMinimumLoadingTime(minimumTime = 500) {
  const startLoadingWithMinTime = async (loadingFn: () => Promise<void>) => {
    const startTime = Date.now();

    await loadingFn();

    const elapsedTime = Date.now() - startTime;
    const remainingDelay = Math.max(0, minimumTime - elapsedTime);
    await new Promise((resolve) => setTimeout(resolve, remainingDelay));
  };

  return { startLoadingWithMinTime };
}
