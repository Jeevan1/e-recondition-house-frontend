import React from 'react';
import { fetchData } from '@/utils/api-sercice';
import Loader from '@/components/Loader';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import { baseUrl } from '@/utils/constant';
import ThrottelData from '@/components/ThrottelData';
import ErrorMessage from '@/components/ErrorMessage';

export const metadata = {
  title: 'Vehicles | Recondition House',
  description: 'Generated by create next app',
  openGraph: {
    title: 'Vehicles | Recondition House',
    description: 'Generated by create next app',
    url: baseUrl + '/vehicles',
  },
};

const ProductsPage = async () => {
  const [vehicleRes] = await Promise.all([fetchData(`/vehicles/`, {})]);

  const { data, error, loading } = vehicleRes;

  if (loading) return <Loader />;

  if (!loading)
    return (
      <div className="min-h-[300px] py-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <SectionHeading
              type="vehicles"
              title={'All Vehicles'}
              length={data?.count === 0 ? 0 : data?.count}
            />
            <div>
              <FilterForm />
            </div>
          </div>

          <ThrottelData url="/vehicles/" />
        </div>
      </div>
    );
};

export default ProductsPage;
