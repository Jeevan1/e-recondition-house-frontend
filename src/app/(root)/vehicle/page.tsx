import React from 'react';
import { fetchData } from '@/utils/api-sercice';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import { webUrl } from '@/utils/constant';
import ThrottelData from '@/components/ThrottelData';

export const metadata = {
  title: 'Vehicles | Recondition Hub',
  description:
    'Explore a wide range of high-quality, certified pre-owned vehicles at Recondition Hub. Browse cars, bikes, and trucks with warranties at unbeatable prices!',
  openGraph: {
    title: 'Vehicles | Recondition Hub',
    description:
      'Discover a variety of certified pre-owned vehicles, including cars, bikes, and trucks at Recondition Hub. All vehicles come with a warranty and are available at affordable prices.',
    url: webUrl + '/vehicles',
    siteName: 'Recondition Hub',
    locale: 'en_US',
    type: 'website',
  },
};

const ProductsPage = async () => {
  const { data, error, loading } = await fetchData(`/vehicles/`, {
    method: 'GET',
  });

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
            <p className="mt-6 px-3 font-semibold text-gray-500">
              No Vehicles Found.
            </p>
          )}
        </div>
      </div>
    );
};

export default ProductsPage;
