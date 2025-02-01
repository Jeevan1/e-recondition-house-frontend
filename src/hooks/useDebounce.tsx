import { useState, useRef, useEffect, useCallback } from 'react';

const useDebounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay: number,
): [(...args: Parameters<T>) => void, boolean] => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    return () => {
      isMounted.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setLoading(true);

      timeoutRef.current = setTimeout(() => {
        if (isMounted.current) {
          fn(...args);
          setLoading(false);
        }
      }, delay);
    },
    [fn, delay],
  );

  return [debouncedFn, loading];
};

export default useDebounce;
