import React from "react";
import ProductSection from "@/components/ProductSection";
import SectionHeading from "@/components/SectionHeading";
import data from "@/data.json";

type PageProps = Promise<{ slug: string[] }>;

const CategoryPage = async (props: { params: PageProps }) => {
  const params = await props.params;
  const slug = params.slug;
  return (
    <div className="min-h-[300px]">
      <ProductSection
        data={data.vehicles}
        type={slug[0]}
        title={`Category / ${slug[0].toUpperCase() + slug.slice(1)}`}
      />
    </div>
  );
};

export default CategoryPage;
