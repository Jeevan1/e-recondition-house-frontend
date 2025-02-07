'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/utils/api-sercice';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import ThrottelData from '@/components/ThrottelData';
import Loader from '@/components/Loader';
import EmptyMessage from '@/components/EmptyMessage';

const FilteredVehiclesPage = () => {
  const searchParams = useSearchParams();

  const [data, setData] = useState({
    count: 0,
    next: null,
    previous: null,
    results: [],
  });

  const [pageTitle, setPageTitle] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Generate URL from search params
  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    setPageTitle(newSearchParams.get('for') || '');

    newSearchParams.delete('for');
    const fullUrl = `/vehicles/?${newSearchParams.toString()}`;

    if (fullUrl !== url) {
      setUrl(fullUrl);
    }
  }, [searchParams]);

  // Fetch data when URL updates
  useEffect(() => {
    const getVehicles = async () => {
      if (!url) return;

      setLoading(true);
      setError('');

      try {
        const { data, error } = await fetchData(url, {});

        if (error) throw new Error(error);

        setData(data || { count: 0, next: null, previous: null, results: [] });
      } catch (err) {
        setError('Failed to load vehicles. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    getVehicles();
  }, [url]);

  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <div className="flex items-center justify-between gap-5">
          <SectionHeading
            type="vehicles"
            title={`${pageTitle} Vehicles`}
            length={data?.count ?? 0}
          />
          <div>
            <FilterForm
              reconIdx={
                searchParams.get('recondition_house') &&
                pageTitle !== 'Filtered'
                  ? searchParams.get('recondition_house')
                  : null
              }
            />
          </div>
        </div>
        {loading ? (
          <Loader />
        ) : !loading && data ? (
          <ThrottelData url={url} />
        ) : (
          <EmptyMessage message={'No Vehicles Found'} />
        )}
      </div>
    </div>
  );
};

export default FilteredVehiclesPage;
