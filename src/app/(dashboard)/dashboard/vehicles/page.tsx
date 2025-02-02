'use client';

import BaseTable from '@/components/tables/BaseTable';
import { useData } from '@/context/DataContext';
import { useVehicleDelete } from '@/context/VehicleDeleteContext';
import useFetchTable from '@/hooks/useFetchTable';
import { Column } from '@/model/type';
import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

const OurVehiclePage = () => {
  const { data: reconData } = useData();
  const [vehicles, setVehicles] = useState<any>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(false);

  const { loading: deleteLoading, deleteVehicle } = useVehicleDelete();

  const handleDeleteVehicle = async (idx: string) => {
    try {
      await deleteVehicle(idx);
      setRefetch((prev) => !prev);
    } catch (error) {
      enqueueSnackbar('Failed to delete vehicle.', { variant: 'error' });
    }
  };

  const fetchData = async () => {
    try {
      const { rowData, columns, loading } = await useFetchTable({
        url: `/vehicles/?recondition_house=${reconData?.idx}`,
        columnsToHide: ['idx', 'owner', 'logo', 'contact_number', 'location'],
      });

      setVehicles(rowData);
      setColumns(columns);
      setLoading(loading);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [reconData?.idx, refetch]);

  const isLoading = loading || deleteLoading;

  if (!vehicles) return <div>Loading...</div>;

  return (
    <div>
      <BaseTable
        data={vehicles}
        columns={columns}
        title={'Vehicles'}
        isLoading={isLoading}
        onDeleteVehicle={handleDeleteVehicle}
      />
    </div>
  );
};

export default OurVehiclePage;
