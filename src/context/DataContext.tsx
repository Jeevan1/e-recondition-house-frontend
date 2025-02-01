'use client';

import { ReconditionHouse } from '@/model/type';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Cookie from 'js-cookie';
import { fetchData } from '@/utils/api-sercice';

interface DataContextType {
  data: ReconditionHouse | null;
  setData: (value: ReconditionHouse) => void;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ReconditionHouse | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      const accessToken = Cookie.get('accessToken');
      if (!accessToken) {
        setError('Access token not found.');
        setLoading(false);
        return;
      }

      const { data, error, loading } = await fetchData(
        `/reconditionhouses/me/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (error) {
        setError(error);
      } else {
        setData(data);
      }

      setLoading(loading);
    };

    fetchProfileData();
  }, []);

  return (
    <DataContext.Provider value={{ data, setData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
