import { Product, Vehicle } from '@/model/type';
import React from 'react';
import ProductCard from './ProductCard';
import { PrimaryButton } from './Button';
import SectionHeading from './SectionHeading';
import Loader from './Loader';
import Link from 'next/link';

const ProductSection = ({
  title,
  data = {
    results: [],
    count: 0,
    next: null,
    previous: null,
  },
  type,
  isFeatured = false,
  loading = false,
}: {
  title: string;
  data: Vehicle;
  type: string;
  isFeatured?: boolean;
  loading?: boolean;
  totalProducts?: number;
}) => {
  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading
          title={title}
          type={type}
          length={data?.count === 0 ? 0 : data?.count}
        />
        {loading && <Loader />}
        {data?.results?.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
            {data?.results?.map((product) => (
              <ProductCard key={product.idx} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-6 px-3 font-semibold text-gray-500">
            No Vehicles Found
          </p>
        )}
        {data?.next && isFeatured && (
          <Link href="/vehicle/" className="mt-6 block text-center">
            <PrimaryButton className="w-[100px]">View All</PrimaryButton>
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
