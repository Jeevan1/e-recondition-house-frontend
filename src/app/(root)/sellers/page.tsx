import SectionHeading from '@/components/SectionHeading';
import React from 'react';
import { ReconditionHouse } from '@/model/type';
import ReconditionCard from '@/components/ReconditionCard';
import { baseUrl } from '@/utils/constant';
import Loader from '@/components/Loader';
import { fetchData } from '@/utils/api-sercice';
import ErrorMessage from '@/components/ErrorMessage';

export const metadata = {
  title: 'Sellers',
  description: 'Explore our trusted sellers',
  openGraph: {
    title: 'Sellers',
    description: 'Explore our trusted sellers',
    url: `${baseUrl}/sellers`,
  },
};

const SellersPage = async () => {
  const { data, error, loading } = await fetchData(`/reconditionhouses/`, {});

  if (error) {
    return <ErrorMessage error={error} />;
  }

  if (!data && !loading) {
    return (
      <ErrorMessage error={'Something went wrong. Please try again later'} />
    );
  }

  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <SectionHeading title="Sellers" type="companies" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {loading && <Loader />}
          {data?.results && data.results.length > 0 ? (
            data.results?.map((seller: ReconditionHouse) => (
              <ReconditionCard key={seller.idx} seller={seller} />
            ))
          ) : (
            <p className="text-md font-semibold text-gray-500">
              No sellers found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellersPage;
