import React from 'react';
import SubscriptionRemainingCard from '../Components/SubscriptionRemainingCard';
import ContentCard from '../Components/ContentCard';
import MessageCard from '@/components/MessageCard';
import Link from 'next/link';

export const metadata = {
  title: 'Dashboard | Recondition House',
  description: 'Generated by create next app',
  openGraph: {
    title: 'Dashboard | Recondition House',
    description: 'Generated by create next app',
  },
};

const DashboardPage = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <div className="col-span-2">
        <ContentCard />

        <MessageCard color="text-red-600">
          Please subscribe to continue using our services.
        </MessageCard>
        <MessageCard color="text-primary">
          <p className="space-y-2 text-sm">
            <Link href="tel:9802345678">
              <span className="text-gray-800">Contact:</span> 9802345678
            </Link>
            <p>
              <span className="text-gray-800">Address:</span> 123 Main Street,
              City, Country
            </p>
          </p>
        </MessageCard>
      </div>
      <SubscriptionRemainingCard />
    </div>
  );
};

export default DashboardPage;
