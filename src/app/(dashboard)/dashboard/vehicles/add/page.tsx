'use client';

import VehicleForm from '@/components/Form/VehicleForm';
import SectionHeading from '@/components/SectionHeading';
import { useEffect, useMemo, useState } from 'react';
import { fetchData } from '@/utils/api-sercice';
import Loader from '@/components/Loader';
import { useSubscriptionData } from '@/context/SubscriptionContext';
import Link from 'next/link';
import { PrimaryButton } from '@/components/Button';

const AddProductPage = () => {
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const { data: subscriptionData } = useSubscriptionData();

  // Calculate remaining subscription days
  const remainingDays = useMemo(() => {
    if (subscriptionData?.end_date) {
      const today = new Date();
      const endDate = new Date(subscriptionData.end_date);
      return Math.ceil(
        (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
      );
    }
    return null;
  }, [subscriptionData]);

  useEffect(() => {
    async function fetchDataAsync() {
      try {
        const [categoryRes, brandsRes] = await Promise.all([
          fetchData(`/vehilecategories/`, {}),
          fetchData(`/brands/`, {}),
        ]);
        setCategory(categoryRes.data || []);
        setBrands(brandsRes.data || []);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchDataAsync();
  }, []);

  if (error) {
    return (
      <div className="h-full rounded-md bg-white p-4">
        <SectionHeading
          title="Add Vehicle Form"
          type="add"
          className="text-lg"
        />
        <p className="text-red-500">Something went wrong. Please try again.</p>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  if (remainingDays === null) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">No Subscription Found</h1>
          <p className="text-md mb-4 font-semibold text-gray-600 md:text-lg">
            Oops! You need a subscription to access this feature. Please contact
            the administrator.
          </p>
          <Link href="tel:123456789">
            <PrimaryButton>Contact</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  if (remainingDays <= 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-3xl font-bold">Subscription Expired</h1>
          <p className="mb-4 text-lg">
            Please renew your subscription to add more vehicles.
          </p>
          <Link href="tel:123456789">
            <PrimaryButton>Contact</PrimaryButton>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full rounded-md bg-white p-4">
      <SectionHeading title="Add Vehicle Form" type="add" className="text-lg" />
      {category && brands && <VehicleForm category={category} brand={brands} />}
    </div>
  );
};

export default AddProductPage;
