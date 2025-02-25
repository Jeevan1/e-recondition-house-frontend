'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CgProfile } from 'react-icons/cg';
import { MdAssignmentAdd, MdOutlineLogout } from 'react-icons/md';
import { RiAlignItemLeftLine, RiHomeSmile2Line } from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import { useAuth } from '@/context/AuthContext';
import { useSubscriptionData } from '@/context/SubscriptionContext';
import CountdownTimer from '@/components/CountDownTimer';
import { TbSquareKey } from 'react-icons/tb';

const DashboardMenu = () => {
  const pathname = usePathname();
  const { logout } = useAuth();

  const dashboardLinks = [
    { title: 'Dashboard', link: '/dashboard', icon: RxDashboard },
    {
      title: 'Our Vehicles',
      link: '/dashboard/vehicles',
      icon: RiAlignItemLeftLine,
    },
    {
      title: 'Add Vehicle',
      link: '/dashboard/vehicles/add',
      icon: MdAssignmentAdd,
    },
    { title: 'Profile', link: '/dashboard/profile', icon: CgProfile },
    {
      title: 'Change Password',
      link: '/dashboard/change-password',
      icon: TbSquareKey,
    },
    {
      title: 'Home',
      link: '/',
      icon: RiHomeSmile2Line,
    },
  ];

  const activeLink = (link: string) => {
    return pathname === link;
  };

  const { data } = useData();

  const { data: subscriptionData, loading } = useSubscriptionData();

  const getRemainingDays = (end_date: string) => {
    const today = new Date();
    const endDate = new Date(end_date);
    const remainingDays = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );
    return remainingDays;
  };

  return (
    <div className="">
      <div className="p-4">
        {data?.logo?.startsWith('http') || data?.logo?.startsWith('https') ? (
          <Image
            src={`${data?.logo}` || ''}
            alt={data?.name || 'logo'}
            width={200}
            height={200}
            className="h-32 w-full rounded-md bg-white object-cover"
          />
        ) : (
          <Image
            src={`${process.env.NEXT_PUBLIC_MAIN_URL}/${data?.logo}` || ''}
            alt={data?.name || 'logo'}
            width={200}
            height={200}
            className="h-32 w-full rounded-md bg-white object-contain p-1"
          />
        )}
        <p className="mt-2 text-xl font-bold text-white">{data?.name}</p>
        {subscriptionData &&
          getRemainingDays(subscriptionData?.end_date) <= 7 && (
            <div className="mt-4">
              <CountdownTimer endDate={subscriptionData?.end_date} />
            </div>
          )}
        {subscriptionData &&
          getRemainingDays(subscriptionData?.end_date) <= 0 && (
            <div className="mt-4 rounded-md bg-white p-3">
              <p className="font-semibold leading-5 text-red-600">
                Your subscription has expired.
              </p>
            </div>
          )}
      </div>
      <ul className="w-full space-y-1 p-2 pb-4">
        {dashboardLinks.map((link) => (
          <li
            key={link.link}
            className={`flex w-full cursor-pointer items-center rounded-md px-2 font-semibold ${activeLink(link.link) ? 'bg-white text-primary' : 'text-white'} hover:bg-white hover:text-primary`}
          >
            <link.icon size={20} className="mr-2 inline-block" />
            <Link href={link.link} className="inline-block w-full py-2 text-sm">
              {link.title}
            </Link>
          </li>
        ))}
        <li className="py-1"></li>
        <li className="border-t-2 border-dashed py-1"></li>
        <li className="flex w-full items-center rounded-md px-2 text-white first:bg-white first:text-primary hover:bg-white hover:text-primary">
          <MdOutlineLogout size={20} className="mr-2 inline-block" />
          <Link
            href="/"
            className="inline-block w-full py-2 text-sm font-semibold"
            onClick={() => logout()}
          >
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default DashboardMenu;
