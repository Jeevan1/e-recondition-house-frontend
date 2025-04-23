'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from 'notistack';
import { DataProvider } from '@/context/DataContext';
import { Suspense } from 'react';
import Loader from './Loader';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Suspense fallback={<Loader />}>
          <DataProvider>{children}</DataProvider>
        </Suspense>
      </AuthProvider>
    </SnackbarProvider>
  );
}
