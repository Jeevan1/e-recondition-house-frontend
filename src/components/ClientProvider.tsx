'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from 'notistack';
import { Suspense } from 'react';
import Loader from '@/components/Loader';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <Suspense fallback={<Loader />}>{children}</Suspense>
      </AuthProvider>
    </SnackbarProvider>
  );
}
