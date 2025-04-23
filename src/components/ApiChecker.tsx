'use client';

import { useEffect, useState } from 'react';
import Loader from './Loader';

export default function ApiChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const [apiAvailable, setApiAvailable] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAPI() {
      setLoading(true);
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}`, {});

        if (res.status === 500 || res.status === 503) {
          throw new Error(`API error: ${res.status}`);
        }

        setApiAvailable(true);
      } catch (error) {
        console.error('API Check Failed:', error);
        setApiAvailable(false);
      } finally {
        setLoading(false);
      }
    }

    checkAPI();
  }, []);

  if (loading)
    return (
      <div className="h-screen w-screen">
        <Loader />
      </div>
    );
  if (!loading && !apiAvailable) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100 antialiased">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-500">
            Unable to Process Request
          </h1>
          <p className="mt-2 font-semibold text-gray-600">
            We're facing some issues. Please try again or check back later.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
