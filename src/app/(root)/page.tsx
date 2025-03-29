import Categories from '@/components/Categories';
import BrandSection from '@/components/BrandSection';
import { fetchData } from '@/utils/api-sercice';
import Banner from '@/components/Banner';
import { baseUrl } from '@/utils/constant';
import CategorySection from '@/components/CategorySection';
import Faqs from '@/components/Faqs';
import { Suspense } from 'react';

export default async function Home() {
  const categoryRes = await fetchData(`/vehilecategories/`, {});
  const vehiclesRes = await fetchData(`/vehicles/`, {});
  const brandsRes = await fetchData(`/brands/`, {});

  const category = categoryRes.data;
  const vehicles = vehiclesRes.data;
  const brands = brandsRes.data;

  const categoryLoading = categoryRes.loading;
  const vehiclesLoading = vehiclesRes.loading;
  const brandLoading = brandsRes.loading;
  return (
    <div className="">
      <Banner />
      <Categories
        data={vehicles?.results}
        category={category}
        loading={categoryLoading || vehiclesLoading}
      />
      <BrandSection data={brands} title="Brands" loading={brandLoading} />
      <CategorySection
        data={category}
        loading={categoryLoading}
        title="Vehicle Categories"
      />
      <Faqs />
    </div>
  );
}
