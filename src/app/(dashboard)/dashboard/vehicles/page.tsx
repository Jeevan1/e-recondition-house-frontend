"use client";

import BaseTable from "@/components/tables/BaseTable";
import { useData } from "@/context/DataContext";
import useFetchTable from "@/hooks/useFetchTable";
import { Column, Product } from "@/model/type";
import { ColumnDef, RowData } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";

const OurVehiclePage = () => {
  const { data: reconData } = useData();
  const [vehicles, setVehicles] = useState<any>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { rowData, columns, loading } = await useFetchTable({
          url: `/vehicles/?recondition_house=${reconData?.idx}`,
          columnsToHide: ["idx", "owner", "logo"],
        });

        setVehicles(rowData);
        setColumns(columns);
        setLoading(loading);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [reconData?.idx]);

  return (
    <div>
      <BaseTable
        data={vehicles}
        columns={columns}
        title={"Vehicles"}
        isLoading={loading}
      />
    </div>
  );
};

export default OurVehiclePage;
