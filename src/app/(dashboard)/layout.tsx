'use client';
import { ReactNode, useEffect } from 'react';

import DashboardMenu from './Components/DashboardMenu';
import { useAuth } from '@/context/AuthContext';
import { redirect, useRouter } from 'next/navigation';
import { SubscriptionProvider } from '@/context/SubscriptionContext';
import { VehicleDeleteProvider } from '@/context/VehicleDeleteContext';
import SubscriptionRemainingCard from './Components/SubscriptionRemainingCard';

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return (
    <SubscriptionProvider>
      <VehicleDeleteProvider>
        <div className="bg-gray-100">
          <div className="border-b-2 border-dashed border-primary bg-white">
            <div className="container">
              <nav className="flex items-center justify-between py-4">
                <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
                <p className="text-sm font-semibold text-gray-500">
                  Welcome to your dashboard.
                </p>
              </nav>
            </div>
          </div>
          <div className="container">
            <div className="relative grid grid-cols-1 grid-rows-[auto,1fr,auto] gap-4 py-10 sm:grid-cols-5">
              <div className="col-span-1 h-max rounded-md bg-secondary sm:col-span-2 lg:col-span-1">
                <DashboardMenu />
              </div>
              <div className="col-span-1 h-full sm:col-span-3 lg:col-span-4">
                {children}
              </div>
              <SubscriptionRemainingCard />
            </div>
          </div>
        </div>
      </VehicleDeleteProvider>
    </SubscriptionProvider>
  );
};

export default DashboardLayout;
