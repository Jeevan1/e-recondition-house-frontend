'use client';
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
        {data.length > 0 ? (
          <div className="mt-6 flex flex-wrap gap-4">
            {data?.map((category, index) => (
              <div className="-mx-2 px-2" key={index}>
                <div className="group rounded-md bg-white p-3 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
                  <Link href={`/category/${category.idx}`}>
                    <Image
                      src={category.image || '/assets/fallback/image.png'}
                      alt={'fdiuhk'}
                      width={150}
                      height={100}
                      className="h-[100px] w-[150px] rounded-md object-cover transition-all duration-200 ease-in-out group-hover:scale-[1.02]"
                    />
                    <p className="text-md mt-2 text-center font-semibold">
                      {category.name}
                    </p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 px-3 font-semibold text-gray-500">
            No Vehicles Found
          </p>
        )}
      </div>
    </div>
  );
};

export default CategorySection;
