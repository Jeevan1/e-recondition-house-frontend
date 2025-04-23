'use client';
import React from 'react';
import useLazyLoadOnScroll from '@/hooks/useLazyLoadOnScroll';
import ProductCard from './ProductCard';
import Loader from './Loader';
import { Product, ReconditionHouse } from '@/model/type';
import ReconditionCard from './ReconditionCard';
import { useInView } from 'react-intersection-observer';

interface SellerSectionProps {
  url: string;
}

const SellerSection: React.FC<SellerSectionProps> = ({ url }) => {
  if (!url) return null;
  const { ref, inView } = useInView();
  const { displayedData, isLoading } = useLazyLoadOnScroll({
    url,
    throttleTime: 500,
    inView,
  });

  return (
    <div>
      {isLoading && <Loader />}
      {!isLoading && displayedData?.length === 0 ? (
        <p className="mt-6 px-3 font-semibold text-gray-500">
          No Sellers Found.
        </p>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {displayedData?.map((data: ReconditionHouse) => (
            <ReconditionCard key={data.idx} seller={data} />
          ))}
        </div>
      )}
      <div ref={ref}></div>
      {isLoading && displayedData?.length > 0 && <Loader />}
    </div>
  );
};

export default SellerSection;
