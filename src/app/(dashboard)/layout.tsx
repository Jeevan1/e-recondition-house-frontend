"use client";
import Link from "next/link";
import { ReactNode, useEffect } from "react";

import DashboardMenu from "./Components/DashboardMenu";
import { DataProvider } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { redirect, useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && !loading) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) return null;
  return (
    <DataProvider>
      <div className="bg-gray-100">
        <div className="container border-b-2 border-dashed border-primary bg-white">
          <nav className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-bold text-gray-700">Dashboard</h1>
            <Link href={"/"}>Home</Link>
            <p className="text-sm font-semibold text-gray-500">
              Welcome to your dashboard.
            </p>
          </nav>
        </div>
        <div className="container">
          <div className="relative grid grid-cols-1 gap-4 py-10 sm:grid-cols-5">
            <div className="col-span-1 h-max rounded-md bg-secondary">
              <DashboardMenu />
            </div>
            <div className="col-span-4">{children}</div>
          </div>
        </div>
      </div>
    </DataProvider>
  );
};

export default DashboardLayout;
