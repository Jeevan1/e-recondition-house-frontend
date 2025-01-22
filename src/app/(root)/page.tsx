import Categories from "@/components/Categories";
import ProductSection from "@/components/ProductSection";
import data from "@/data.json";
import BrandSection from "@/components/BrandSection";
import { fetchData } from "@/utils/api-sercice";
import Banner from "@/components/Banner";

export default async function Home() {
  const {
    data: category,
    error: categoryError,
    loading: categoryLoading,
  } = await fetchData(`/vehilecategories/`, {});

  const {
    data: vehicles,
    error: vehiclesError,
    loading: vehiclesLoading,
  } = await fetchData(`/vehicles/`, {});

  if (categoryLoading || vehiclesLoading) return <div>Loading...</div>;

  return (
    <div className="">
      <Banner />
      <Categories data={vehicles} category={category} />
      <BrandSection data={data.brands} title="Popular Brands" />
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
