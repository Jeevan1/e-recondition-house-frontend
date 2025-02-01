'use client';
import React, { useState } from 'react';
import FormInput from './InputField/FormInput';
import { SecondaryButton } from './Button';
import { fetchData } from '@/utils/api-sercice';
import { useRouter } from 'next/navigation';
import OptionInput from './InputField/OptionInput';

const Banner = ({
  backgroundImage = '/assets/banner.png',
}: {
  backgroundImage?: string;
}) => {
  const [options, setOptions] = useState({});
  const router = useRouter();
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Filter out empty values
    const queryParams = Object.entries(data)
      .filter(([_, value]) => value !== '')
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`,
      )
      .join('&');

    router.push(`/vehicle/filter/?${queryParams}`);
  };

  const getOptions = async () => {
    const { data: res, error } = await fetchData('/vehilecategories/', {});

    const { data: brands } = await fetchData('/brands/', {});

    if (res && brands) {
      setOptions({
        category: res,
        brands: brands,
      });
    }
  };

  React.useEffect(() => {
    getOptions();
  }, []);

  return (
    <div
      role="banner"
      aria-label="Welcome to Car Shop"
      className="relative min-h-[400px] bg-cover bg-center py-10"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="container py-10">
        <h1 className="text-center text-3xl font-bold text-white drop-shadow-md sm:text-4xl lg:text-5xl">
          Welcome to Vehicle Shop
        </h1>
        <p className="sm:text-md mx-auto mt-4 max-w-[700px] text-center text-sm font-semibold text-white drop-shadow-md lg:text-lg">
          Find your dream vehicle here and get it delivered to your doorstep at
          a cheap price at your convenience and in a hassle free way with Car
          Shop.
        </p>
        <form
          method="post"
          onSubmit={handleSearch}
          className="mt-10 grid grid-cols-2 place-items-end justify-items-start gap-4 sm:grid-cols-3 md:grid-cols-4"
        >
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="name"
              className="text-left text-sm font-semibold text-white drop-shadow-sm"
            >
              Vehicle Name
            </label>
            <FormInput
              type="text"
              name="name"
              placeholder="Enter vahicle name"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="minPrice"
              className="text-left text-sm font-semibold text-white drop-shadow-sm"
            >
              Min Price
            </label>
            <FormInput
              type="text"
              name="discounted_price_start"
              placeholder="Enter min price"
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <label
              htmlFor="maxPrice"
              className="text-left text-sm font-semibold text-white drop-shadow-sm"
            >
              Max Price
            </label>
            <FormInput
              type="text"
              name="discounted_price_end"
              placeholder="Enter max price"
            />
          </div>
          {Object.keys(options).map((key) => (
            <div key={key} className="flex w-full flex-col gap-2">
              <label
                htmlFor={key}
                className="text-left text-sm font-semibold text-white drop-shadow-sm"
              >
                {key}
              </label>
              <OptionInput
                name={key}
                data={options[key as keyof typeof options]}
                placeholder="Select"
              />
            </div>
          ))}
          <SecondaryButton className="h-[39px] w-[100px] bg-white text-white">
            Search
          </SecondaryButton>
        </form>
      </div>
    </div>
  );
};

export default Banner;
