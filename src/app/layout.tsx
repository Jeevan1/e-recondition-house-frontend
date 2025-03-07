import { Nunito } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClientProviders from '@/components/ClientProvider';
import ApiChecker from '@/components/ApiChecker';
import GoTop from '@/components/GoTop';
import NextTopLoader from 'nextjs-toploader';
const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata = {
  title: 'Recondition Hub',
  description:
    'Find top-quality reconditioned vehicles at Recondition Hub with great prices. Drive smarter and save more!',
  icons: {
    icon: '/favicon.png',
  },

  openGraph: {
    title: 'Recondition Hub',
    description:
      'Find top-quality reconditioned vehicles at Recondition Hub with great prices. Drive smarter and save more!',
    url: 'https://reconditionhub.com',
    siteName: 'Recondition Hub',
    images: [
      {
        url: '/assets/logo/logo.png',
        width: 800,
        height: 600,
        alt: 'Recondition Hub Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
          <NextTopLoader color="#5c4706" showSpinner={false} />
          <ApiChecker>{children}</ApiChecker>
        </ClientProviders>
        <GoTop />
      </body>
    </html>
  );
}
