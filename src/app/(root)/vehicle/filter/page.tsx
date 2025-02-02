'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/utils/api-sercice';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import ThrottelData from '@/components/ThrottelData';
import Loader from '@/components/Loader';
import ErrorMessage from '@/components/ErrorMessage';

const FilteredVehiclesPage = () => {
  const searchParams = useSearchParams();
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [pageTitle, setPageTitle] = useState('');

  const [url, setUrl] = useState('');

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    setPageTitle(newSearchParams.get('for') || '');

    newSearchParams.delete('for');
    const fullUrl = `/vehicles/?${newSearchParams.toString()}`;
    setUrl(fullUrl);
  }, [searchParams]);

  useEffect(() => {
    const getVehicles = async () => {
      if (!url) return;
      const { data, error, loading } = await fetchData(url, {});
      setFilteredVehicles(data);
      setData(data);
      setLoading(loading);
    };
    const getCategory = async () => {
      const { data, error, loading } = await fetchData(
        '/vehilecategories/',
        {},
      );
      setCategory(data);
    };

    if (url) {
      getVehicles();
    }
    getCategory();
  }, [url]);

  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <div className="flex items-center justify-between gap-5">
          <SectionHeading
            type="vehicles"
            title={`${pageTitle} Vehicles`}
            length={data?.count === 0 ? 0 : data?.count}
          />
          <div>
            <FilterForm
              reconIdx={
                searchParams.get('recondition_house')
                  ? pageTitle !== 'Filtered'
                    ? searchParams.get('recondition_house')
                    : null
                  : null
              }
            />
          </div>
        </div>
        <ThrottelData url={url} />
      </div>
    </div>
  );
};

export default FilteredVehiclesPage;
