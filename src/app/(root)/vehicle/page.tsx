import React from 'react';
import { fetchData } from '@/utils/api-sercice';
import Loader from '@/components/Loader';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import { baseUrl } from '@/utils/constant';
import ThrottelData from '@/components/ThrottelData';
import ErrorMessage from '@/components/ErrorMessage';

export const metadata = {
  title: 'Vehicles | Recondition Hub',
  description: 'Generated by create next app',
  openGraph: {
    title: 'Vehicles | Recondition Hub',
    description: 'Generated by create next app',
    url: baseUrl + '/vehicles',
  },
};

const ProductsPage = async () => {
  const vehicleRes = await fetchData(`/vehicles/`, {
    method: 'GET',
  });

  const { data, error, loading } = vehicleRes;

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

          {!loading && data?.results && data.results.length > 0 ? (
            <ThrottelData url="/vehicles/" />
          ) : (
            <ErrorMessage error="No vehicles found" />
          )}
        </div>
      </div>
    );
};

export default ProductsPage;
