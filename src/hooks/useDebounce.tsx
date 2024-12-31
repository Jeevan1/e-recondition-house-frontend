import { useState, useRef, useEffect } from "react";

const useDebounce = (
  fn: (...args: any[]) => void,
  delay: number,
): [(...args: any[]) => void, boolean] => {
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFn = (...args: any[]) => {
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
