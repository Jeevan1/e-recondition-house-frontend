import { Product } from "@/model/type";
import React from "react";
import ProductCard from "./ProductCard";
import { PrimaryButton } from "./Button";
import SectionHeading from "./SectionHeading";

const ProductSection = ({
  title,
  data,
  type,
}: {
  title: string;
  data: Product[];
  type: string;
}) => {
  const filteredData = data.filter((product) =>
    product.features.includes(type.toLowerCase()),
  );

  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading
          title={title}
          type={type}
          length={filteredData.length}
        />
        {filteredData.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-5">
            {filteredData.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-6 px-3 font-semibold text-gray-500">
            No Vehicles Found
          </p>
        )}
        {filteredData.length > 0 && (
          <div className="mt-6 text-center">
            <PrimaryButton className="w-[100px]">View All</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
