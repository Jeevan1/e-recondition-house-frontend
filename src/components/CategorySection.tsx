import React from 'react';
import SectionHeading from './SectionHeading';
import Image from 'next/image';
import Link from 'next/link';
import Loader from './Loader';
import { Category } from '@/model/type';

const CategorySection = ({
  data,
  title,
  loading,
}: {
  data: Category[];
  title: string;
  loading: boolean;
}) => {
  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading title={title} type="" />
        {loading && <Loader />}
        {data?.length > 0 ? (
          <div className="mt-6 grid grid-cols-3 gap-5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7">
            {data?.map((category, index) => (
              <div
                key={index}
                className="group rounded-md bg-white p-3 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md"
              >
                <Link href={`/category/${category.idx}`}>
                  <Image
                    src={category.image || '/assets/fallback/image.png'}
                    alt={category.name}
                    width={180}
                    height={120}
                    className="h-[80px] w-full rounded-md bg-gray-200 object-cover transition-all duration-200 ease-in-out group-hover:scale-[1.05] sm:h-[100px] md:h-[120px]"
                  />
                  <p className="mt-2 text-center text-sm font-bold group-hover:text-secondary">
                    {category.name}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 px-3 font-semibold text-gray-500">
            No Category Found
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
