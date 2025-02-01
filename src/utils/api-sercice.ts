export const fetchData = async (
  endpoint: string,
  options: RequestInit = {},
  isMainUrl: boolean = false,
  isUrl: boolean = false,
) => {
  let data = null;
  let error = null;
  let loading = true; // Set loading to true initially

  const BASE_URL = isUrl
    ? endpoint
    : isMainUrl
      ? process.env.NEXT_PUBLIC_MAIN_URL
      : process.env.NEXT_PUBLIC_BASE_URL;

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data.');
    }

    data = await response.json();
  } catch (err: any) {
    error = err.message || 'An unknown error occurred.';
  } finally {
    loading = false;
  }

  return { data, error, loading };
};
