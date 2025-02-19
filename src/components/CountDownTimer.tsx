'use client';

export default function CountdownTimer({
  time,
}: {
  time: { days: number; hours: number; minutes: number; seconds: number };
}) {
  const { days, hours, minutes, seconds } = time;
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
      <h2 className="text-center text-sm font-bold sm:text-[16px]">
        Your Subscription Expires in
      </h2>

      <div className="mt-2 text-center text-sm font-bold text-red-600 sm:text-[16px]">
        {days}d {hours}h {minutes}m {seconds}s
      </div>
    </div>
  );
}
