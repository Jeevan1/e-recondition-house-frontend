import React from 'react';
import ProductSection from '@/components/ProductSection';
import { fetchData } from '@/utils/api-sercice';
import EmptyMessage from '@/components/EmptyMessage';
import Loader from '@/components/Loader';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import ThrottelData from '@/components/ThrottelData';
import ErrorMessage from '@/components/ErrorMessage';
import { webUrl } from '@/utils/constant';

interface CategoryPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;

  if (!slug || slug.length === 0) {
    return {
      title: 'Category | Recondition Hub',
      description:
        'Explore our diverse range of reconditioned vehicles by category at Recondition Hub.',
      openGraph: {
        title: 'Category | Recondition Hub',
        description:
          'Explore our diverse range of reconditioned vehicles by category at Recondition Hub.',
        url: webUrl + '/category',

        locale: 'en_US',
        type: 'website',
      },
    };
  }

  const categoryTitle = decodeURIComponent(slug[0]);

  return {
    title: {
      default: `Category - ${categoryTitle} | Recondition Hub`,
      template: '%s | Recondition Hub',
    },
    description: `Browse our collection of reconditioned ${categoryTitle} vehicles, including cars, bikes, and trucks. Find the best deals at Recondition Hub.`,
    openGraph: {
      title: `Category - ${categoryTitle} | Recondition Hub`,
      description: `Explore a variety of reconditioned ${categoryTitle} vehicles at Recondition Hub. All vehicles come with a warranty and are available at unbeatable prices.`,
      url: webUrl + '/category/' + slug[0],

      locale: 'en_US',
      type: 'website',
    },
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  if (slug === undefined) return <EmptyMessage message="No Category Found" />;
  const { data, error } = await fetchData(`/vehicles/?category=${slug}`, {});

  const {
    data: category,
    error: categoryError,
    loading,
  } = await fetchData(`/vehilecategories/${slug[0]}`, {});

  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <SectionHeading
            type="vehicles"
            title={`Brand - ${category?.name}`}
            length={data?.count === 0 ? 0 : data?.count}
          />
          <div>
            <FilterForm />
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : data?.results && data.results.length > 0 ? (
          <ThrottelData url={`/vehicles/?category=${slug}`} />
        ) : (
          <EmptyMessage message="No Vehicles Found" />
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
