import React from "react";
import ProductSection from "@/components/ProductSection";
import { fetchData } from "@/utils/api-sercice";
import EmptyMessage from "@/components/EmptyMessage";

interface CategoryPageProps {
  params: {
    slug: string[];
  };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { slug } = await params;
  const { data, error } = await fetchData(`/vehicles/?category=${slug}`, {});

  const { data: category, error: categoryError } = await fetchData(
    `/vehilecategories/${slug[0]}`,
    {},
  );

  return (
    <div className="min-h-[300px]">
      <ProductSection
        data={data}
        type={slug[0]}
        title={`Category - ${category?.name}`}
      />
    </div>
  );
};

export default CategoryPage;
