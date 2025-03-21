import React from 'react';
import { fetchData } from '@/utils/api-sercice';
import ErrorMessage from '@/components/ErrorMessage';
import SectionHeading from '@/components/SectionHeading';

import { webUrl } from '@/utils/constant';
import ThrottelData from '@/components/ThrottelData';
import Loader from '@/components/Loader';
type Props = {
  params: { slug: string[] };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  return {
    title: {
      default: 'Vehicles of ' + decodeURIComponent(slug[0]),
      template: '%s | Recondition Hub',
    },
    description: `Explore the best selection of vehicles from '${decodeURIComponent(slug[0])}' at Recondition Hub. Find high-quality, certified pre-owned options with unbeatable prices!`,
    openGraph: {
      title: 'Vehicles of ' + decodeURIComponent(slug[0]),
      description: '',
      url: webUrl + '/sellers/' + slug[1],
    },
  };
}

const SellerVehiclesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const { data, error, loading } = await fetchData(
    `/vehicles/?recondition_house=${slug[1]}`,
    {},
  );

  return (
    <>
      <div className="min-h-[300px] py-10">
        <div className="container">
          <div className="flex items-center justify-between">
            <SectionHeading
              type="vehicles"
              title={'Vehicles of ' + decodeURIComponent(slug[0])}
              length={data?.count === 0 ? 0 : data?.count}
            />
          </div>
          {loading ? (
            <Loader />
          ) : data?.results && data.results.length > 0 ? (
            <ThrottelData url={`/vehicles/?recondition_house=${slug[1]}`} />
          ) : (
            <ErrorMessage error="No vehicles found" />
          )}
        </div>
      </div>
    </>
  );
};

export default SellerVehiclesPage;
