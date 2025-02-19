import { Nunito } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClientProviders from '@/components/ClientProvider';
import ApiChecker from '@/components/ApiChecker';
import GoTop from '@/components/GoTop';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Recondition Hub',
  description: 'Generated by Next.js',
  icons: {
    icon: '/favicon.png',
  },
};

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
        <ClientProviders>
          <ApiChecker>{children}</ApiChecker>
        </ClientProviders>
        <GoTop />
      </body>
    </html>
  );
}
