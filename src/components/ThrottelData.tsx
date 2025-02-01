'use client';
import React from 'react';
import useLazyLoadOnScroll from '@/hooks/useLazyLoadOnScroll';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { Product } from '@/model/type';

interface ThrottelDataProps {
  url: string;
}

const ThrottelData: React.FC<ThrottelDataProps> = ({ url }) => {
  if (!url) return null;
  const { displayedData, isLoading } = useLazyLoadOnScroll({
    url: url && url,
    throttleTime: 1000,
  });

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : displayedData?.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {displayedData.map((data: Product) => (
            <ProductCard key={data.idx} product={data} />
          ))}
        </div>
      ) : (
        <p className="mt-6 px-3 font-semibold text-gray-500">
          No Vehicles Found
        </p>
      )}
      {isLoading && <Loader />}
    </div>
  );
};

export default ThrottelData;
