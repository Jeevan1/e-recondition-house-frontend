'use client';
import CountdownTimer from '@/components/CountDownTimer';
import { useSubscriptionData } from '@/context/SubscriptionContext';
import React, { useEffect, useState, useCallback } from 'react';

const getRemainingDays = (end_date: string) => {
  const today = new Date();
  const endDate = new Date(end_date);
  const remainingDays = Math.ceil(
    (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );
  return remainingDays >= 0 ? remainingDays : 0;
};

const SubscriptionRemainingCard = () => {
  const { data: subscription, loading, tier } = useSubscriptionData();

  const subscriptionEndDate = subscription && subscription.end_date;

  return (
    <div className="space-y-4 rounded-md">
      {subscriptionEndDate ? (
        <CountdownTimer endDate={subscriptionEndDate} />
      ) : (
        <p className="text-gray-500">No active subscription found.</p>
      )}
    </div>
  );
};

export default SubscriptionRemainingCard;
