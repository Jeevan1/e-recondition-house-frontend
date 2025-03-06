import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: {
    default: 'Recondition Hub',
    template: '%s | Recondition Hub',
  },
  description:
    'Find high-quality reconditioned vehicles at Recondition Hub. Browse certified pre-owned cars, bikes, and trucks with warranty and unbeatable prices. Drive smarter with sustainable and affordable options!',
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: {
      default: 'Recondition Hub',
      template: '%s | Recondition Hub',
    },
    description:
      'Buy top-quality reconditioned vehicles, including cars, bikes, and trucks, at unbeatable prices. Certified pre-owned options with warranty available!',
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
