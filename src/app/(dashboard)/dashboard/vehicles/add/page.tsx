import VehicleForm from "@/components/Form/VehicleForm";
import SectionHeading from "@/components/SectionHeading";
import React from "react";
import { fetchData } from "@/utils/api-sercice";

const AddProductPage = async () => {
  const {
    data: category,
    error: categoryError,
    loading: categoryLoading,
  } = await fetchData(`/vehilecategories/`, {});
  return (
    <div className="rounded-md bg-white p-4">
      <SectionHeading title="Add Vehicle Form" type="add" className="text-lg" />
      <VehicleForm category={category} />
    </div>
  );
};

export default AddProductPage;
