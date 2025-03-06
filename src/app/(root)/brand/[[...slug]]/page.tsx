import React from 'react';
import { fetchData } from '@/utils/api-sercice';
import EmptyMessage from '@/components/EmptyMessage';
import { webUrl } from '@/utils/constant';
import Loader from '@/components/Loader';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import ThrottelData from '@/components/ThrottelData';

interface BrandPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: BrandPageProps) {
  const { slug } = await params;
  if (slug === undefined) return {};
  return {
    title: {
      default: 'Brand - ' + decodeURIComponent(slug[0]),
      template: '%s | Recondition Hub',
    },
    description:
      'Explore the best selection of vehicles from ' +
      decodeURIComponent(slug[0]) +
      ' at Recondition Hub. Find high-quality, certified pre-owned options with unbeatable prices!',
    openGraph: {
      title: 'Brand - ' + decodeURIComponent(slug[0]),
      description: 'Explore the best selection of vehicles from ' + slug[0],
      url: webUrl + '/brand/' + slug[0],
    },
  };
}

const BrandPage = async ({ params }: BrandPageProps) => {
  const { slug } = await params;
  if (slug === undefined) return <EmptyMessage message="No Category Found" />;
  const {
    data,
    error,
    loading: productLoading,
  } = await fetchData(`/vehicles/?brand=${slug}`, {});

  const {
    data: brand,
    error: brandError,
    loading,
  } = await fetchData(`/brands/${slug}`, {});

  if (loading || productLoading) return <Loader />;

  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <SectionHeading
            type="vehicles"
            title={`Brand - ${brand?.name}`}
            length={data?.count === 0 ? 0 : data?.count}
          />
          <div>
            <FilterForm />
          </div>
        </div>

        <ThrottelData url={`/vehicles/?brand=${slug}`} />
      </div>
    </div>
  );
};

export default BrandPage;
