'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import Cookie from 'js-cookie';
import { fetchData } from '@/utils/api-sercice';
import { enqueueSnackbar } from 'notistack';

interface DataContextType {
  loading: boolean;
  deleteVehicle: (vehicleId: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const VehicleDeleteProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [loading, setLoading] = useState(false);

  const deleteVehicle = async (vehicleId: string) => {
    setLoading(true);
    const accessToken = Cookie.get('accessToken');
    if (!accessToken) {
      enqueueSnackbar('Access token not found. Please log in again.', {
        variant: 'error',
      });
      return;
    }

    try {
      const { data, loading, error } = await fetchData(
        `/vehicles/${vehicleId}/`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (error && data) {
        enqueueSnackbar('Failed to delete vehicldsbdje.', {
          variant: 'error',
        });
        setLoading(loading);
      } else {
        enqueueSnackbar('Vehicle deleted successfully.', {
          variant: 'success',
        });
        setLoading(loading);
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      enqueueSnackbar('An error occurred while deleting the vehicle.', {
        variant: 'error',
      });
      setLoading(loading);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DataContext.Provider value={{ loading, deleteVehicle }}>
      {children}
    </DataContext.Provider>
  );
};

export const useVehicleDelete = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
