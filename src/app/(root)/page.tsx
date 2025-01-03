import Categories from "@/components/Categories";
import ProductSection from "@/components/ProductSection";
import data from "@/data.json";
import BrandSection from "@/components/BrandSection";

export default function Home() {
  return (
    <div className="">
      <Categories data={data} />
      <BrandSection data={data.brands} title="Popular Brands" />
      <ProductSection
        data={data.vehicles}
        type="diesel"
        title="Diesel Vehicles"
        isFeatured
      />
      <ProductSection
        data={data.vehicles}
        type="petrol"
        title="Petrol Vehicles"
        isFeatured
      />
      <ProductSection
        data={data.vehicles}
        type="electric"
        title="Electric Vehicles"
        isFeatured
      />
      <ProductSection
        data={data.vehicles}
        type="cycke"
        title="Cycke Vehicles"
        isFeatured
      />
    </div>
  );
}
