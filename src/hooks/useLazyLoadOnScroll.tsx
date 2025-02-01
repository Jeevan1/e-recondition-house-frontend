import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLazyLoadOptions {
  url: string;
  throttleTime?: number;
}

const useLazyLoadOnScroll = ({
  url,
  throttleTime = 500,
}: UseLazyLoadOptions) => {
  const [displayedData, setDisplayedData] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(url);
  const [isLoading, setIsLoading] = useState(false);

  const throttleTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchData = useCallback(async () => {
    if (!nextUrl || isLoading) return; // Prevent duplicate fetch calls

    setIsLoading(true); // Show loading before fetching

    try {
      const completeUrl = nextUrl.startsWith('http')
        ? nextUrl
        : `${process.env.NEXT_PUBLIC_BASE_URL}${nextUrl}`;

      const response = await fetch(completeUrl);
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setNextUrl(null); // Stop fetching if no data is available
        return;
      }

      setDisplayedData((prevData) => {
        const uniqueData = data.results.filter(
          (newItem: any) =>
            !prevData.some((prevItem) => prevItem.idx === newItem.idx),
        );
        return [...prevData, ...uniqueData];
      });

      // Set the next page URL or null if there's no more data
      setNextUrl(data.next || null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false); // Hide loading after fetching
    }
  }, [nextUrl, isLoading]);

  const handleScroll = useCallback(() => {
    if (throttleTimeout.current || isLoading) return;

    throttleTimeout.current = setTimeout(() => {
      throttleTimeout.current = null;

      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollHeight - scrollTop - clientHeight < 300) {
        fetchData();
      }
    }, throttleTime);
  }, [fetchData, throttleTime, isLoading]);

  useEffect(() => {
    setDisplayedData([]);
    setNextUrl(url);
    fetchData(); // Fetch initial data when URL changes
  }, [url]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (throttleTimeout.current) clearTimeout(throttleTimeout.current);
    };
  }, [handleScroll]);

  return { displayedData, isLoading };
};

export default useLazyLoadOnScroll;
