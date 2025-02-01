'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import Cookie from 'js-cookie';
import { fetchData } from '@/utils/api-sercice';
import { useData } from './DataContext';
import { Subscription, Tier } from '@/model/type';

interface DataContextType {
  data: Subscription | null;
  tier: Tier | null;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<Subscription | null>(null);
  const [tier, setTier] = useState<Tier | null>(null);

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
        `/subscription/subscriptions/my/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
        true,
      );

      if (error) {
        setError(error);
        setData(null);
      } else {
        setData(data);
        const {
          data: tier,
          error,
          loading,
        } = await fetchData(
          `/subscription/subscriptiontiers/${data?.tier}/`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
          true,
        );
        if (error) {
          setError(error);
          setTier(null);
        } else {
          setTier(tier);
        }
      }

      setLoading(loading);
    };

    fetchProfileData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, tier }}>
      {children}
    </DataContext.Provider>
  );
};

export const useSubscriptionData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
