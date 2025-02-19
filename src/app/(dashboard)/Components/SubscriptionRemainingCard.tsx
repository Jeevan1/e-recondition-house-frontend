'use client';
import CountdownTimer from '@/components/CountDownTimer';
import { useSubscriptionData } from '@/context/SubscriptionContext';
import { useEffect, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';

const SubscriptionRemainingCard = () => {
  const [showCountdown, setShowCountdown] = useState(true);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const { data: subscription } = useSubscriptionData();
  const subscriptionEndDate = subscription && subscription.end_date;

  useEffect(() => {
    const endTime = new Date(subscriptionEndDate as string).getTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        setDays(days);
        setHours(hours);
        setMinutes(minutes);
        setSeconds(seconds);
      }
    };

    calculateTimeLeft();

    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, [subscriptionEndDate]);

  if (!showCountdown) return null;
  if (subscriptionEndDate && days <= 7)
    return (
      <div className="fixed right-6 top-[9%] z-50 w-[250px] space-y-4 rounded-md md:w-[300px]">
        <div className="w-full rounded-md border">
          <CountdownTimer time={{ days, hours, minutes, seconds }} />

          <RxCross2
            size={18}
            onClick={() => setShowCountdown(false)}
            className="absolute right-2 top-2 cursor-pointer"
          />
        </div>
      </div>
    );
};

export default SubscriptionRemainingCard;
