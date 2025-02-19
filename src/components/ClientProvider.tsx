'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import Loader from '@/components/Loader';
import { DataProvider } from '@/context/DataContext';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <DataProvider>
          <Suspense fallback={<Loader />}>{children}</Suspense>
        </DataProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}
