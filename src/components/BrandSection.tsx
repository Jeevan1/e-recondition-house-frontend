'use client';
import { Brand } from '@/model/type';
import React from 'react';
import SectionHeading from './SectionHeading';
import Image from 'next/image';
import Link from 'next/link';
import Loader from './Loader';
import Slider from 'react-slick';

const BrandSection = ({
  data,
  title,
  loading,
}: {
  data: Brand[];
  title: string;
  loading: boolean;
}) => {
  const settings = {
    dots: false,
    infinite: data?.length > 5,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: data?.length > 5,
    speed: 1500,
    autoplaySpeed: 3000,
    cssEase: 'ease-in-out',
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading title={title} type="" />
        {loading && <Loader />}
        {data?.length > 0 ? (
          <>
            <div className="mt-6">
              <div className="slider-container">
                <Slider {...settings}>
                  {data?.map((brand, index) => (
                    <div className="-mx-2 px-2" key={index}>
                      <div className="group rounded-md bg-white p-5 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md">
                        <Link href={`/brand/${brand.idx}`}>
                          <Image
                            src={brand.image}
                            alt={brand.name}
                            width={100}
                            height={120}
                            className="h-[120px] w-full object-contain transition-all duration-200 ease-in-out group-hover:scale-[1.02]"
                          />
                          <p className="text-md mt-2 text-center font-semibold">
                            {brand.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
            {/* <div className="mt-6 text-center">
              <PrimaryButton className="w-[100px]">View All</PrimaryButton>
            </div> */}
          </>
        ) : (
          <p className="mt-6 px-3 font-semibold text-gray-500">
            No Vehicles Found
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandSection;
