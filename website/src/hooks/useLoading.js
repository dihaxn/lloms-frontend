import { useState, useCallback, useEffect } from 'react';

const useLoading = (initialState = false, options = {}) => {
  const {
    minDuration = 500,
    autoReset = false,
    resetDelay = 1000
  } = options;

  const [isLoading, setIsLoading] = useState(initialState);
  const [startTime, setStartTime] = useState(null);

  const startLoading = useCallback(() => {
    setIsLoading(true);
    setStartTime(Date.now());
  }, []);

  const stopLoading = useCallback(() => {
    const elapsed = Date.now() - (startTime || 0);
    const remaining = Math.max(0, minDuration - elapsed);

    if (remaining > 0) {
      setTimeout(() => {
        setIsLoading(false);
        if (autoReset) {
          setTimeout(() => setIsLoading(false), resetDelay);
        }
      }, remaining);
    } else {
      setIsLoading(false);
    }
  }, [startTime, minDuration, autoReset, resetDelay]);

  const setLoading = useCallback((loading) => {
    if (loading) {
      startLoading();
    } else {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  const withLoading = useCallback(async (asyncFunction) => {
    try {
      startLoading();
      const result = await asyncFunction();
      return result;
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  // Auto-reset functionality
  useEffect(() => {
    if (autoReset && !isLoading && startTime) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, resetDelay);
      return () => clearTimeout(timer);
    }
  }, [isLoading, startTime, autoReset, resetDelay]);

  return {
    isLoading,
    startLoading,
    stopLoading,
    setLoading,
    withLoading
  };
};

export default useLoading;
