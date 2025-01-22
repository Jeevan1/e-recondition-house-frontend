import { Product } from "@/model/type";
import React from "react";
import ProductCard from "./ProductCard";
import { PrimaryButton } from "./Button";
import SectionHeading from "./SectionHeading";
import Loader from "./Loader";

const ProductSection = ({
  title,
  data = [],
  type,
  isFeatured = false,
  loading = false,
  totalProducts = 5,
}: {
  title: string;
  data: Product[];
  type: string;
  isFeatured?: boolean;
  loading?: boolean;
  totalProducts?: number;
}) => {
  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading
          title={title}
          type={type}
          length={data?.length === 0 ? 0 : data?.length}
        />
        {loading && <Loader />}
        {data?.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
            {data
              ?.slice(0, isFeatured ? 5 : totalProducts)
              .map((product) => (
                <ProductCard key={product.idx} product={product} />
              ))}
          </div>
        ) : (
          <p className="mt-6 px-3 font-semibold text-gray-500">
            No Vehicles Found
          </p>
        )}
        {data?.length > 0 && isFeatured && (
          <div className="mt-6 text-center">
            <PrimaryButton className="w-[100px]">View All</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSection;
