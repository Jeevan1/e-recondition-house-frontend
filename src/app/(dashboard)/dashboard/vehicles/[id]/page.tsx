'use client';
import SectionHeading from '@/components/SectionHeading';
import { Product } from '@/model/type';
import React, { useEffect } from 'react';
import { fetchData } from '@/utils/api-sercice';
import Loader from '@/components/Loader';
import ProductDetails from '@/components/ProductDetails';

const EditProductPage = ({ params }: { params: { id: string } }) => {
  const [vehicle, setVehicle] = React.useState<Product>();
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState([]);

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      const { id } = await params;
      const { data, loading, error } = await fetchData(`/vehicles/${id}`, {});
      if (error) return;
      setVehicle(data);
      setLoading(loading);
    };

    const fetchCategory = async () => {
      const { data } = await fetchData('/vehilecategories/', {});
      setCategory(data);
    };

    fetchCategory();

    fetchVehicle();
  }, [params]);

  return (
    <div className="space-y-6 rounded-md bg-white p-4 py-10">
      <SectionHeading
        title={vehicle?.name || 'Details'}
        type="add"
        className="text-lg"
      />
      {!loading && vehicle ? (
        <ProductDetails product={vehicle} isDashboard />
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default EditProductPage;
