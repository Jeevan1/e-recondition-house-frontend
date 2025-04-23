import { useState, useEffect, useCallback, useRef } from 'react';

interface UseLazyLoadOptions {
  url: string;
  inView?: boolean;
  throttleTime?: number;
}

const useLazyLoadOnScroll = ({
  url,
  inView = false,
  throttleTime,
}: UseLazyLoadOptions) => {
  const [displayedData, setDisplayedData] = useState<any[]>([]);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    if (!nextUrl || isLoading) return;

    setIsLoading(true);

    try {
      const completeUrl =
        nextUrl.startsWith('http') || nextUrl.startsWith('https')
          ? nextUrl.replace(/^http:/, 'http:')
          : `${process.env.NEXT_PUBLIC_BASE_URL}${nextUrl}`;

      const response = await fetch(completeUrl);
      if (!response.ok)
        throw new Error(`Failed to fetch: ${response.statusText}`);

      const data = await response.json();

      if (!data.results || data.results.length === 0) {
        setNextUrl(null);
        return;
      }

      setDisplayedData((prevData) => {
        const uniqueData = data.results.filter(
          (newItem: any) =>
            !prevData.some((prevItem) => prevItem.idx === newItem.idx),
        );
        return [...prevData, ...uniqueData];
      });

      setNextUrl(data.next || null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, [nextUrl, isLoading]);

  useEffect(() => {
    setDisplayedData([]);
    setNextUrl(url);
    setIsLoading(false);
  }, [url]);

  useEffect(() => {
    if (inView) {
      if (throttleTime) {
        const timeout = setTimeout(fetchData, throttleTime);
        return () => clearTimeout(timeout);
      } else {
        fetchData();
      }
    }
  }, [inView, throttleTime, fetchData]);

  return { displayedData, isLoading };
};

export default useLazyLoadOnScroll;
