"use client";
import VehicleForm from "@/components/Form/VehicleForm";
import SectionHeading from "@/components/SectionHeading";
import { Product } from "@/model/type";
import React, { useEffect } from "react";
import { fetchData } from "@/utils/api-sercice";
import Loader from "@/components/Loader";

const EditProductPage = ({ params }: { params: { id: string } }) => {
  const [vehicle, setVehicle] = React.useState<Product>();
  const [loading, setLoading] = React.useState(false);
  const [category, setCategory] = React.useState([]);

  useEffect(() => {
    const fetchVehicle = async () => {
      setLoading(true);
      const { id } = await params;
      const { data, loading } = await fetchData(`/vehicles/${id}`, {});
      setVehicle(data);
      setLoading(loading);
    };

    const fetchCategory = async () => {
      const { data } = await fetchData("/vehilecategories/", {});
      setCategory(data);
    };

    fetchCategory();

    fetchVehicle();
  }, [params]);

  return (
    <div className="rounded-md bg-white p-4">
      <SectionHeading title="Add Vehicle Form" type="add" className="text-lg" />
      {!loading ? (
        <VehicleForm data={vehicle} editVehicle={true} category={category} />
      ) : (
        <>
          <Loader />
        </>
      )}
    </div>
  );
};

export default EditProductPage;
