'use client';

import React, { JSX, useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  MdCarCrash,
  MdLocalShipping,
  MdDirectionsBus,
  MdPedalBike,
  MdElectricCar,
  MdSportsSoccer,
  MdAirportShuttle,
} from 'react-icons/md';
import { FaMotorcycle } from 'react-icons/fa6';
import { PiTruckTrailer } from 'react-icons/pi';
import { RiMenuUnfold2Line, RiMenuFoldLine } from 'react-icons/ri';
import { LuLayoutGrid } from 'react-icons/lu';
import { IoMenuOutline } from 'react-icons/io5';
import ProductCard from './ProductCard';
import { PrimaryButton, SecondaryButton } from './Button';
import { Category, Product } from '@/model/type';
import { fetchData } from '@/utils/api-sercice';
import Loader from './Loader';
import SectionHeading from './SectionHeading';
import FilterForm from './Form/FilterForm';

const renderCategoryIcons = (category: string) => {
  const icons: { [key: string]: JSX.Element } = {
    car: <MdCarCrash size={20} />,
    truck: <MdLocalShipping size={20} />,
    suv: <MdAirportShuttle size={20} />,
    bike: <FaMotorcycle size={20} />,
    bicycle: <MdPedalBike size={20} />,
    electric: <MdElectricCar size={20} />,
    'sports-car': <MdSportsSoccer size={20} />,
    van: <MdDirectionsBus size={20} />,
    trailer: <PiTruckTrailer size={20} />,
    bus: <MdDirectionsBus size={20} />,
  };

  return icons[category.toLowerCase()] || <IoMenuOutline size={20} />;
};

const Categories = ({
  data,
  category,
  loading,
}: {
  data: Product[];
  category: Category[];
  loading: boolean;
}) => {
  const [open, setOpen] = useState(true);
  const [products, setProducts] = useState<Product[]>(data);
  const [categoryName, setCategoryName] = useState<string | null>('all');

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [vehicleLoading, setVehicleLoading] = useState(false);

  const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    setCategoryLoading(true);
    if (categoryName === 'all') {
      setProducts(data);
      setCategoryLoading(false);
      return;
    }

    const fetchFilteredProducts = async () => {
      setVehicleLoading(true);
      try {
        const { data: filteredData, loading } = await fetchData(
          `/vehicles/${categoryName && categoryName !== 'all' ? `?category=${categoryName}` : ''}`,
          {},
        );
        setProducts(filteredData.results);
        setCategoryLoading(false);
        setVehicleLoading(loading);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
        setCategoryLoading(false);
        setVehicleLoading(false);
      }
    };

    fetchFilteredProducts();
  }, [categoryName, data]);

  const categoryList = useMemo(
    () =>
      category?.map((cat) => (
        <li
          key={cat.idx}
          className={`ms-1 flex cursor-pointer items-center rounded-md ${categoryName === cat.idx ? 'bg-secondary text-white' : ''} border-b-2 px-3 py-2 font-semibold last:border-b-0 hover:bg-secondary hover:text-white`}
          onClick={() => setCategoryName(cat.idx)}
        >
          <span className="text-xl">{renderCategoryIcons(cat.name)}</span>
          <p
            className={`text-md ml-4 inline-block opacity-0 transition-transform duration-500 ease-in-out ${
              open
                ? 'translate-x-0 opacity-100'
                : 'translate-x-[-20%] opacity-0'
            }`}
          >
            <span className="line-clamp-1">{cat.name}</span>
          </p>
        </li>
      )),
    [category, open, categoryName],
  );

  return (
    <div className="pb-10 sm:py-10">
      <div className="container">
        <div className="flex items-center space-x-2 py-6 sm:hidden">
          <span className="flex items-center gap-2">
            <LuLayoutGrid size={20} className="inline" />
            <span className="font-semibold text-primary">Categories:</span>
          </span>
          <ul className="scrollbar-vertical inline-flex w-full gap-3 overflow-y-hidden overflow-x-scroll">
            <li>
              <SecondaryButton onClick={() => setCategoryName('all')}>
                All
              </SecondaryButton>
            </li>
            {category?.map((cat) => (
              <li key={cat.idx}>
                <SecondaryButton onClick={() => setCategoryName(cat.idx)}>
                  {cat.name}
                </SecondaryButton>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-5">
          <div
            className={`hidden transition-[width] duration-300 ease-in-out sm:block ${
              open ? 'w-[250px]' : 'w-16'
            }`}
          >
            <h1 className="flex h-12 items-center justify-between rounded-t-lg bg-primary font-bold text-white">
              {open && <span className="ps-4 text-xl">Categories</span>}
              <span
                onClick={toggleOpen}
                className={`cursor-pointer ${!open ? 'flex w-full justify-center' : 'pe-4'}`}
              >
                {open ? (
                  <RiMenuFoldLine size={20} />
                ) : (
                  <RiMenuUnfold2Line size={20} />
                )}
              </span>
            </h1>
            <ul className="scrollbar max-h-[339px] min-h-[339px] overflow-y-scroll rounded-b-lg border-2 bg-white">
              <li
                className={`ms-1 rounded-md border-b-2 px-3 font-semibold last:border-b-0 ${categoryName === 'all' ? 'bg-secondary text-white' : ''} hover:bg-secondary hover:text-white`}
                onClick={() => setCategoryName('all')}
              >
                <span className="flex items-center py-2">
                  {renderCategoryIcons('all')}
                  {open && <span className="ml-4">All</span>}
                </span>
              </li>
              {categoryList}
            </ul>
          </div>

          <div className="flex-1">
            {categoryLoading || (loading && <Loader />)}
            <div className="mb-5 flex items-center justify-between">
              <SectionHeading
                type={'category'}
                title={
                  categoryName !== 'all'
                    ? `Category: ${category?.filter((cat) => cat.idx === categoryName)[0]?.name}`
                    : 'All Vehicles'
                }
              />
              <FilterForm />
            </div>
            {categoryLoading || (vehicleLoading && <Loader />)}
            {products && products.length > 0 ? (
              <>
                <div className={`grid gap-5 sm:grid-cols-2 md:grid-cols-4`}>
                  {products?.map((vehicle) => (
                    <ProductCard key={vehicle.idx} product={vehicle} />
                  ))}
                </div>
                <Link
                  href={`${categoryName && categoryName !== 'all' ? `/category/${categoryName}` : '/vehicle/'}`}
                  className="mt-5 block text-center"
                >
                  <PrimaryButton className="h-[40px] w-[130px]">
                    View All
                  </PrimaryButton>
                </Link>
              </>
            ) : (
              <p className="flex flex-1 items-center justify-center py-10 font-bold">
                No Vehicles Found
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
