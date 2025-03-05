'use client';

import { PrimaryButton } from '@/components/Button';
import Loader from '@/components/Loader';
import SectionHeading from '@/components/SectionHeading';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const checkLocalUser = localStorage.getItem('activeReconUser');

  useEffect(() => {
    if (pathname === '/login' && checkLocalUser) {
      router.push('/register');
      return;
    }
  }, [pathname, router]);

  if (loading) {
    return <Loader />;
  }

  if (
    (pathname === '/login' && isAuthenticated) ||
    (pathname === '/register' && isAuthenticated && !checkLocalUser)
  ) {
    return (
      <div className="flex min-h-screen min-w-full flex-col items-center justify-center">
        <div className="min-w-[300px] space-y-3 rounded-md bg-gray-200 p-4 text-center shadow-md">
          <div className="flex justify-center">
            <Image
              height={150}
              width={200}
              src={'/assets/logo/logo.png'}
              alt="logo"
              className="w-full rounded-md border-2 border-primary p-1"
            />
          </div>
          <h1 className="text-lg font-bold md:text-xl lg:text-2xl">Welcome!</h1>
          <p className="pb-3 font-semibold">You are already logged in.</p>
          <Link href={'/dashboard'}>
            <PrimaryButton>Go to Dashboard</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex h-full min-h-screen items-center justify-center bg-gray-100 py-10">
        <div className="container w-fit">
          <div className="mx-auto max-w-3xl rounded-md bg-white p-4 shadow-md md:p-6">
            {pathname === '/login' ? (
              <>
                <SectionHeading
                  title="Log In Form"
                  className="justify-center text-center text-2xl font-extrabold text-gray-700"
                  type=""
                />
                <p className="pt-4 text-center text-sm font-semibold text-gray-600">
                  Welcome back! Please log in to access your account.
                </p>
              </>
            ) : pathname === '/register' ? (
              <>
                <SectionHeading
                  title="Sign Up Form"
                  className="justify-center text-center text-2xl font-extrabold text-gray-700"
                  type=""
                />
                <p className="pt-4 text-center text-sm font-semibold text-gray-600">
                  Create an account to get started.
                </p>
              </>
            ) : null}
            <div className="mt-6 flex justify-center gap-4">
              <Link
                href="/login"
                className={`h-[40px] w-[150px] rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-bold duration-200 ease-in-out hover:bg-primary hover:text-white ${pathname === '/login' ? 'border-primary bg-primary text-white' : ''}`}
              >
                Log In
              </Link>
              <Link
                href={'/register'}
                type="button"
                className={`h-[40px] w-[150px] rounded-md border border-gray-300 px-4 py-2 text-center text-sm font-bold duration-200 ease-in-out hover:bg-primary hover:text-white ${pathname === '/register' ? 'border-primary bg-primary text-white' : ''}`}
              >
                Register
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
