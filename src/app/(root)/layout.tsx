import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Recondition Hub',
    template: '%s | Recondition Hub',
  },
  description:
    'Find top-quality reconditioned vehicles at Recondition Hub with great prices. Drive smarter and save more!',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: {
      default: 'Recondition Hub',
      template: '%s | Recondition Hub',
    },
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

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
