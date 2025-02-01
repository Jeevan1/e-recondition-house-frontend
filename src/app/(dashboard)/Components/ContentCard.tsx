'use client';
import { useData } from '@/context/DataContext';
import { useSubscriptionData } from '@/context/SubscriptionContext';
import { Product, Vehicle } from '@/model/type';
import { fetchData } from '@/utils/api-sercice';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ContentCard = () => {
  const { data: reconData, loading } = useData();
  const { tier, loading: subscriptionLoading } = useSubscriptionData();
  const [vehicles, setVehicles] = useState<Vehicle>();

  useEffect(() => {
    const fetchVehicles = async () => {
      const { data, error, loading } = await fetchData(
        `/vehicles/?recondition_house=${reconData?.idx}`,
        {},
      );
      if (error) return;
      setVehicles(data);
    };
    fetchVehicles();
  }, [reconData]);
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <div className="rounded-md bg-white hover:shadow-md">
        <Link href="/dashboard/vehicles" className="p-4 text-center">
          <p className="text-xl font-bold text-primary lg:text-2xl">
            {vehicles?.count}
          </p>
          <h1 className="mt-2 font-bold">Vehicles</h1>
        </Link>
      </div>
      <div className="rounded-md bg-white hover:shadow-md">
        <Link href="/dashboard/vehicles/add" className="p-4 text-center">
          <p className="text-xl font-bold capitalize text-primary lg:text-2xl">
            {tier?.name || 'free'}
          </p>
          <h1 className="mt-2 font-bold">Tier</h1>
        </Link>
      </div>
    </div>
  );
};

export default ContentCard;
