"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { fetchData } from "@/utils/api-sercice";
import PaginationWithData from "@/components/Pagination";
import SectionHeading from "@/components/SectionHeading";
import FilterForm from "@/components/Form/FilterForm";
import { PrimaryButton } from "@/components/Button";

const FilteredVehiclesPage = () => {
  const searchParams = useSearchParams();
  const [filteredVehicles, setFilteredVehicles] = useState([]);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getVehicles = async () => {
      const { data, error, loading } = await fetchData(
        `/vehicles?${searchParams}`,
        {},
      );

      setFilteredVehicles(data);
      setLoading(loading);
    };
    const getCategory = async () => {
      const { data, error, loading } = await fetchData(
        `/vehilecategories/`,
        {},
      );
      setCategory(data);
    };
    getVehicles();
    getCategory();
  }, [searchParams]);

  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <div className="flex items-center justify-between">
          <SectionHeading
            type="vehicles"
            title={"Filtered Vehicles"}
            length={
              filteredVehicles?.length === 0 ? 0 : filteredVehicles?.length
            }
          />
          <div>
            <FilterForm options={category} />
          </div>
        </div>
        <PaginationWithData
          data={filteredVehicles}
          itemsPerPage={5}
          title="All Vehicles"
          loading={loading}
        />
      </div>
    </div>
  );
};

export default FilteredVehiclesPage;
