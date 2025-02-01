'use client';
import React, { useEffect, useRef, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../Button';
import { TbFilterEdit } from 'react-icons/tb';
import FormInput from '../InputField/FormInput';
import { useRouter } from 'next/navigation';
import SectionHeading from '../SectionHeading';
import { MdOutlineCancel } from 'react-icons/md';
import OptionInput from '../InputField/OptionInput';
import { Category } from '@/model/type';
import PriceSlider from '../PriceSlider';
import { fetchData } from '@/utils/api-sercice';

const FilterForm = ({ reconIdx }: { reconIdx?: string | null }) => {
  const router = useRouter();
  const [openFilter, setOpenFilter] = React.useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const [filterFields, setFilterFields] = React.useState({
    category: 'All',
    brand: 'All',
    name: '',
    discoonted_price_start: 0,
    discoonted_price_end: 0,
    actual_price_start: 0,
    actual_price_end: 0,
  });

  // Update filterFields with dynamic keys
  const updateFilterFields = <T extends keyof typeof filterFields>(
    value: string | number,
    name: T,
  ) => {
    setFilterFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const updatedOptions = (options: Category[]) => [
    'All',
    ...options?.map((option) => option.name),
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [options, setOptions] = useState({});
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

    setOpenFilter(false);

    router.push(
      `/vehicle/filter/?${queryParams}${
        reconIdx ? `&recondition_house=${reconIdx}` : ''
      }`,
    );
  };

  const getOptions = async () => {
    const { data: category, error } = await fetchData('/vehilecategories/', {});

    const { data: brands } = await fetchData('/brands/', {});

    if (category && brands) {
      setOptions({
        category: category,
        brands: brands,
      });
    }
  };

  React.useEffect(() => {
    getOptions();
  }, []);

  return (
    <div className="relative">
      <PrimaryButton
        className="flex items-center px-3 sm:px-4"
        onClick={() => setOpenFilter(true)}
      >
        Filter
        <TbFilterEdit className="ml-1" />
      </PrimaryButton>
      {openFilter && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-70 shadow-md">
          <div
            className="relative w-full max-w-md rounded-md bg-white p-4"
            ref={modalRef}
          >
            <form
              method="post"
              onSubmit={handleSearch}
              className="flex flex-col gap-4"
            >
              <SectionHeading
                title="Filter Form"
                type="add"
                className="text-lg"
              />
              <MdOutlineCancel
                onClick={() => setOpenFilter(false)}
                size={25}
                className="absolute right-2 top-4 cursor-pointer"
              />
              <div className="mt-3 flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-left text-sm font-semibold text-gray-700 drop-shadow-sm"
                >
                  Vehicle Name
                </label>
                <FormInput
                  type="text"
                  name="name"
                  value={filterFields.name}
                  placeholder="Enter vehicle name"
                  onChange={(e) => updateFilterFields(e as string, 'name')}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Object.keys(options).map((key) => (
                  <div key={key} className="fmt-3 flex flex-col gap-2">
                    <label
                      htmlFor={key}
                      className="text-left text-sm font-semibold capitalize text-gray-700 drop-shadow-sm"
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
              </div>
              <div className="space-y-2 rounded-md border-2 border-gray-200 p-3">
                <label
                  htmlFor="category"
                  className="text-left text-sm font-semibold text-gray-700 drop-shadow-sm"
                >
                  Actual Price:
                </label>
                <PriceSlider
                  minName="actual_price_start"
                  maxName="actual_price_end"
                  minRange={0}
                  maxRange={100000}
                  initialMin={filterFields.actual_price_start || 0}
                  initialMax={filterFields.actual_price_end || 90050}
                  priceGap={500}
                  minChange={(value) =>
                    updateFilterFields(value, 'actual_price_start')
                  }
                  maxChange={(value) =>
                    updateFilterFields(value, 'actual_price_end')
                  }
                />
              </div>
              <div className="space-y-2 rounded-md border-2 border-gray-200 p-3">
                <label
                  htmlFor="category"
                  className="text-left text-sm font-semibold text-gray-700 drop-shadow-sm"
                >
                  Discoounted Price:
                </label>
                <PriceSlider
                  minName="discoonted_price_start"
                  maxName="discoonted_price_end"
                  minRange={0}
                  maxRange={100000}
                  initialMin={filterFields.discoonted_price_start || 0}
                  initialMax={filterFields.discoonted_price_end || 10050}
                  priceGap={500}
                  minChange={(value) =>
                    updateFilterFields(value, 'discoonted_price_start')
                  }
                  maxChange={(value) =>
                    updateFilterFields(value, 'discoonted_price_end')
                  }
                />
              </div>

              <SecondaryButton className="h-[39px] w-[100px] bg-white text-gray-700">
                Filter
              </SecondaryButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterForm;
