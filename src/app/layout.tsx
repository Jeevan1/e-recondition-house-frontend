'use client';
import { Nunito } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AuthProvider } from '@/context/AuthContext';
import { SnackbarProvider } from 'notistack';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`body { font-family: ${nunito.className}, sans-serif; font-display: swap; }`}</style>
      </head>
      <body className={`${nunito.className} bg-gray-100 antialiased`}>
        <SnackbarProvider>
          <AuthProvider>
            <main>{children}</main>
          </AuthProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
