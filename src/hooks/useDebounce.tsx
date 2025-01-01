import { useState, useRef, useEffect } from "react";

const useDebounce = <T extends (...args: string[]) => void>(
  fn: T,
  delay: number,
): [(...args: Parameters<T>) => void, boolean] => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = (...args: Parameters<T>) => {
    setLoading(true);

    // Clear any previous timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      fn(...args);
      setLoading(false);
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return [debouncedFn, loading];
};

export default useDebounce;
