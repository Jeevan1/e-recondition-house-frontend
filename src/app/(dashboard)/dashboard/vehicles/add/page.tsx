'use client';

import VehicleForm from '@/components/Form/VehicleForm';
import SectionHeading from '@/components/SectionHeading';
import { useEffect, useState } from 'react';
import { fetchData } from '@/utils/api-sercice';
import Loader from '@/components/Loader';

const AddProductPage = () => {
  const [category, setCategory] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  return (
    <div className="h-full rounded-md bg-white p-4">
      <SectionHeading title="Add Vehicle Form" type="add" className="text-lg" />
      <VehicleForm category={category} brand={brands} />
    </div>
  );
};

export default AddProductPage;
