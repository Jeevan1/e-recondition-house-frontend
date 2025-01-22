export const fetchData = async (
  endpoint: string,
  options: RequestInit = {},
) => {
  let loading = true;
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  try {
    // Merge default options with user-provided options
    const mergedOptions: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers, // Merge custom headers if provided
      },
      ...options,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, mergedOptions);

    // Handle non-2xx status codes
    if (!response.ok) {
      console.log(response.status);
    }

    const result = await response.json();
    loading = false;

    // Optionally process the response using the provided handler
    return {
      data: result,
      error: null,
      loading,
    };
  } catch (error: any) {
    console.log("Fetch error:", error.message);

    return {
      data: null,
      error: error.message || "An unknown error occurred.",
      loading: false,
    };
  }
};
