'use client';

import SectionHeading from '@/components/SectionHeading';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     router.push("/");
  //   }
  // }, [isAuthenticated, router]);

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
                Sign Up
              </Link>
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
