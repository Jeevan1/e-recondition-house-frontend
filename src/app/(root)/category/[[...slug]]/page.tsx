import React from 'react';
import ProductSection from '@/components/ProductSection';
import { fetchData } from '@/utils/api-sercice';
import EmptyMessage from '@/components/EmptyMessage';
import { baseUrl } from '@/utils/constant';
import Loader from '@/components/Loader';
import SectionHeading from '@/components/SectionHeading';
import FilterForm from '@/components/Form/FilterForm';
import ThrottelData from '@/components/ThrottelData';
import ErrorMessage from '@/components/ErrorMessage';

interface CategoryPageProps {
  params: {
    slug: string[];
  };
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params;
  if (slug === undefined) return {};
  return {
    title: 'Category - ' + decodeURIComponent(slug[0]),
    description: 'Generated by create next app',
    openGraph: {
      title: 'Category - ' + decodeURIComponent(slug[0]),
      description: 'Generated by create next app',
      url: baseUrl + '/category/' + slug[0],
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

  if (loading) return <Loader />;

  if (!data || !category)
    return (
      <ErrorMessage error="Something went wrong. Please try again later." />
    );
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

        <ThrottelData url={`/vehicles/?category=${slug[0]}`} />
      </div>
    </div>
  );
};

export default CategoryPage;
