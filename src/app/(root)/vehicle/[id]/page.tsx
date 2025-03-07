import React from 'react';

import ProductSection from '@/components/ProductSection';
import { fetchData } from '@/utils/api-sercice';
import { Product } from '@/model/type';
import { webUrl } from '@/utils/constant';
import ProductDetails from '@/components/ProductDetails';
import Loader from '@/components/Loader';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props) {
  const { id } = await params;

  const { data: product } = await fetchData(`/vehicles/${id}/`, {});

  const title = {
    default: product?.name,
    template: '%s | Recondition Hub',
  };
  const description =
    product?.description ||
    'Explore a wide selection of certified pre-owned vehicles at Recondition Hub.';
  const images = product?.featured_image
    ? product.featured_image
    : '/assets/fallback/image.png';

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: images,
      url: webUrl + `/vehicle/${id}`,
    },
  };
}

const DetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const {
    data: product,
    loading: productLoading,
    error,
  }: {
    data: Product | null;
    error: string | null;
    loading: boolean;
  } = await fetchData(`/vehicles/${id}/`, {});

  const {
    data: similarProducts,
    error: similarProductsError,
    loading: similarProductsLoading,
  } = await fetchData(
    `/vehicles/?category=${product?.category.idx}&actual_price_start=${product?.actual_price}&discounted_price_start=${product?.discounted_price}`,
    {},
  );

  if (!product) {
    return (
      <div className="container py-10">
        <p>No Information Found</p>
      </div>
    );
  }
  return (
    <div className="py-10">
      <div className="container">
        {productLoading && <Loader />}
        <ProductDetails product={product} isDashboard={false} />
      </div>
      {similarProductsLoading && <Loader />}
      {/* <RatingSection seller={product.recondition_house} /> */}
      <ProductSection
        title="Similar Vehicles"
        data={similarProducts}
        type="petrol"
        isFeatured
      />
    </div>
  );
};

export default DetailsPage;
