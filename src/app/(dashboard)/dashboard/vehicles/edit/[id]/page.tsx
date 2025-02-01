'use client';
import VehicleForm from '@/components/Form/VehicleForm';
import SectionHeading from '@/components/SectionHeading';
import { Product } from '@/model/type';
import React, { useEffect } from 'react';
import { fetchData } from '@/utils/api-sercice';
import Loader from '@/components/Loader';

const EditProductPage = ({ params }: { params: { id: string } }) => {
  const [vehicle, setVehicle] = React.useState<Product>();
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState([]);
  const [brand, setBrand] = React.useState([]);

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
      const { data, error, loading } = await fetchData(
        '/vehilecategories/',
        {},
      );
      if (error) return;
      setCategory(data);
      setLoading(loading);
    };

    const fetchBrand = async () => {
      const { data, error, loading } = await fetchData('/brands/', {});
      if (error) return;
      setBrand(data);
      setLoading(loading);
    };

    fetchCategory();
    fetchBrand();

    fetchVehicle();
  }, [params]);

  return (
    <div className="h-full rounded-md bg-white p-4">
      <SectionHeading
        title="Edit Vehicle Form"
        type="add"
        className="text-lg"
      />
      {!loading || !category || !brand ? (
        <VehicleForm
          data={vehicle}
          editVehicle={true}
          category={category}
          brand={brand}
        />
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default EditProductPage;
