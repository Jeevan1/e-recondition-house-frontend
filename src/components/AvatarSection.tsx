import { useAuth } from '@/context/AuthContext';
import { useData } from '@/context/DataContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AvatarSection = () => {
  const { logout } = useAuth();
  const { data, loading } = useData();
  if (!loading && data)
    return (
      <div className="group relative">
        <div className="h-[50px] w-[50px] rounded-full border bg-gray-200 p-1">
          <Image
            src={`${process.env.NEXT_PUBLIC_MAIN_URL}/${data.logo}`}
            alt="Avatar"
            width={60}
            height={60}
            priority
            className="h-full w-full cursor-pointer rounded-full object-contain"
          />
        </div>
        <div className="absolute right-0 top-[110%] z-[-1] h-0 min-w-[180px] transform cursor-pointer overflow-hidden rounded-md bg-white opacity-0 shadow transition-all duration-300 ease-in-out before:absolute before:right-[10px] before:top-[-5px] before:z-[-1] before:h-4 before:w-4 before:rotate-45 before:bg-white before:content-[''] group-hover:top-[100%] group-hover:z-10 group-hover:h-auto group-hover:opacity-100 md:top-[110%]">
          <h1 className="line-clamp-1 border-b-2 px-3 font-bold leading-9">
            {data?.name}
          </h1>
          <Link
            href="/dashboard"
            className="block rounded-b-md border-b px-3 py-2 text-sm font-semibold hover:bg-gray-100"
          >
            Dashboard
          </Link>
          <span
            className="block rounded-b-md px-3 py-2 text-sm font-semibold hover:bg-gray-100"
            onClick={() => logout()}
          >
            Logout
          </span>
        </div>
      </div>
    );
};

export default AvatarSection;
