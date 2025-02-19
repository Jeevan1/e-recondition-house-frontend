'use client';
import React from 'react';
import SubscriptionRemainingCard from '../Components/SubscriptionRemainingCard';
import ContentCard from '../Components/ContentCard';
import MessageCard from '@/components/MessageCard';
import Link from 'next/link';
import { useData } from '@/context/DataContext';
import { useSubscriptionData } from '@/context/SubscriptionContext';

const DashboardPage = () => {
  const { data: reconData } = useData();
  const { data: subscription } = useSubscriptionData();

  const getRemainingDays = (end_date: string) => {
    const today = new Date();
    const endDate = new Date(end_date);
    const remainingDays = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return remainingDays;
  };
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="col-span-2">
        <ContentCard />

        {subscription && getRemainingDays(subscription.end_date) === 0 && (
          <MessageCard color="text-red-600">
            Please subscribe to continue using our services.
          </MessageCard>
        )}
        <MessageCard color="text-primary">
          <p className="space-y-2 text-sm">
            <Link href="tel:9802345678">
              <span className="text-gray-800">Contact:</span>{' '}
              {reconData?.contact_number}
            </Link>
            <p>
              <span className="text-gray-800">Address:</span>{' '}
              {reconData?.address}
            </p>
          </p>
        </MessageCard>
      </div>
    </div>
  );
};

export default DashboardPage;
