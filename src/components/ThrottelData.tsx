'use client';
import React from 'react';
import useLazyLoadOnScroll from '@/hooks/useLazyLoadOnScroll';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { Product } from '@/model/type';
import { useInView } from 'react-intersection-observer';

interface ThrottelDataProps {
  url: string;
}

const ThrottelData: React.FC<ThrottelDataProps> = ({ url }) => {
  if (!url) return null;

  const { ref, inView } = useInView();
  const { displayedData, isLoading } = useLazyLoadOnScroll({
    url,
    throttleTime: 1000,
    inView,
  });

  const noData = !isLoading && displayedData?.length === 0;

  return (
    <div>
      {isLoading && displayedData.length === 0 && <Loader />}

      {noData ? (
        <p className="mt-6 px-3 font-semibold text-gray-500">
          No Vehicles Found
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {displayedData?.map((data: Product) => (
            <ProductCard key={data.idx} product={data} />
          ))}
        </div>
      )}

      <div ref={ref} />

      {isLoading && displayedData.length > 0 && <Loader />}
    </div>
  );
};

export default ThrottelData;
