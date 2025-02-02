import Categories from '@/components/Categories';
import ProductSection from '@/components/ProductSection';
import BrandSection from '@/components/BrandSection';
import { fetchData } from '@/utils/api-sercice';
import Banner from '@/components/Banner';
import { baseUrl } from '@/utils/constant';
import CategorySection from '@/components/CategorySection';
import Loader from '@/components/Loader';

export const metadata = {
  title: 'Recondition House',
  description: 'Generated by create next app',
  openGraph: {
    title: 'Recondition House',
    description: 'Generated by create next app',
    url: baseUrl + '/',
  },
};

export default async function Home() {
  const [categoryRes, vehiclesRes, brandsRes] = await Promise.all([
    fetchData(`/vehilecategories/`, {}),
    fetchData(`/vehicles/`, {}),
    fetchData(`/brands/`, {}),
  ]);

  const category = categoryRes.data;
  const vehicles = vehiclesRes.data;
  const brands = brandsRes.data;

  const categoryLoading = categoryRes.loading;
  const vehiclesLoading = vehiclesRes.loading;
  const brandLoading = brandsRes.loading;
  if (categoryLoading || vehiclesLoading || brandLoading) return <Loader />;
  return (
    <div className="">
      <Banner />
      <Categories
        data={vehicles.results}
        category={category}
        loading={categoryLoading || vehiclesLoading}
      />
      <BrandSection data={brands} title="Brands" loading={brandLoading} />
      <CategorySection
        data={category}
        loading={categoryLoading}
        title="Vehicle Categories"
      />
      <ProductSection
        data={vehicles}
        type="diesel"
        title="Diesel Vehicles"
        isFeatured
      />
      <ProductSection
        data={vehicles}
        type="petrol"
        title="Petrol Vehicles"
        isFeatured
      />
      <ProductSection
        data={vehicles}
        type="electric"
        title="Electric Vehicles"
        isFeatured
      />
      <ProductSection
        data={vehicles}
        type="cycke"
        title="Cycke Vehicles"
        isFeatured
      />
    </div>
  );
}
