'use client';
import { useState, useEffect } from 'react';

export default function CountdownTimer({
  endDate,
}: {
  endDate: string; // Expected to be a date string (e.g., "2025-12-31T23:59:59")
}) {
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  useEffect(() => {
    const endTime = new Date(endDate).getTime();

    const calculateTimeLeft = () => {
      const now = Date.now();
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        // Timer has ended
        // clearInterval(interval);
        setDays(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
      } else {
        // Calculate remaining time
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

    // Initial calculation
    calculateTimeLeft();

    // Set up interval
    const interval = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, [endDate]);

  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return (
      <div className="w-full rounded-lg bg-white p-4 shadow-lg">
        <span className="text-md text-center font-bold leading-5 text-red-600">
          Your Subscription is Expired. Please Renew your Subscription to
          continue using our services.
        </span>
      </div>
    );
  }
  return (
    <div className="w-full rounded-lg bg-white p-4 shadow-lg">
      <h2 className="text-center text-lg font-bold">Remaining Time</h2>

      <div className="text-center text-lg font-bold text-primary">
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    </div>
  );
}
