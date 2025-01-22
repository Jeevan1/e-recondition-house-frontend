import PaginationWithData from "@/components/Pagination";
import ProductSection from "@/components/ProductSection";
import React from "react";
import { fetchData } from "@/utils/api-sercice";
import Loader from "@/components/Loader";

const ProductsPage = async () => {
  const { data, error, loading } = await fetchData(`/vehicles/`, {});

  if (loading) return <Loader />;
  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <PaginationWithData data={data} itemsPerPage={5} title="All Vehicles" />
      </div>
    </div>
  );
};

export default ProductsPage;
