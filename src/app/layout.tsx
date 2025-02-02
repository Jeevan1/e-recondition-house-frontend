import { Nunito } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import ClientProviders from '@/components/ClientProvider';

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

async function checkAPI() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_MAIN_URL}`, {
      cache: 'no-store', // Ensures fresh data
    });

    if (res.status === 503 || res.status === 500) {
      throw new Error('API is unavailable');
    }

    return true;
  } catch (error) {
    return false;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiAvailable = await checkAPI();

  if (!apiAvailable) {
    return (
      <html lang="en">
        <head>
          <title>Service Unavailable</title>
        </head>
        <body
          className={`${nunito.className} flex h-screen items-center justify-center bg-gray-100 antialiased`}
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold text-red-500">
              Service Unavailable
            </h1>
            <p className="mt-2 font-semibold text-gray-600">
              Our servers are currently down. Please try again later.
            </p>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`body { font-family: ${nunito.className}, sans-serif; font-display: swap; }`}</style>
      </head>
      <body className={`${nunito.className} bg-gray-100 antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
