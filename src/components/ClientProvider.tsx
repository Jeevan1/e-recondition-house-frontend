'use client';

import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from 'notistack';
import { DataProvider } from '@/context/DataContext';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SnackbarProvider>
      <AuthProvider>
        <DataProvider>{children}</DataProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
}
