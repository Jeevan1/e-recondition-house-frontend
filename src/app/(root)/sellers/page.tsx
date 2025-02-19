import SectionHeading from '@/components/SectionHeading';
import React from 'react';
import { ReconditionHouse } from '@/model/type';
import ReconditionCard from '@/components/ReconditionCard';
import { baseUrl } from '@/utils/constant';
import Loader from '@/components/Loader';
import { fetchData } from '@/utils/api-sercice';
import ErrorMessage from '@/components/ErrorMessage';
import SellerSection from '@/components/SellerSection';

export const metadata = {
  title: 'Sellers',
  description: 'Explore our trusted sellers',
  openGraph: {
    title: 'Sellers',
    description: 'Explore our trusted sellers',
    url: `${baseUrl}/sellers`,
  },
};

const SellersPage = () => {
  return (
    <div className="min-h-[300px] py-10">
      <div className="container">
        <SectionHeading title="Sellers" type="companies" />
        <SellerSection url="/reconditionhouses/" />
      </div>
    </div>
  );
};

export default SellersPage;
