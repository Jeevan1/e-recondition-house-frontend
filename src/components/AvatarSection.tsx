import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const AvatarSection = () => {
  const user = JSON.parse(localStorage.getItem('activeReconUser') || '{}');
  const { logout } = useAuth();

  return (
    <div className="group relative">
      <Image
        src={
          user?.image ||
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s'
        }
        alt="Avatar"
        width={50}
        height={50}
        priority
        className="cursor-pointer rounded-full border border-primary bg-white object-cover p-1"
      />
      <div className="absolute right-0 top-[110%] z-[-1] h-0 transform cursor-pointer overflow-hidden rounded-md bg-white opacity-0 shadow transition-all duration-300 ease-in-out before:absolute before:right-[10px] before:top-[-5px] before:z-[-1] before:h-4 before:w-4 before:rotate-45 before:bg-white before:content-[''] group-hover:top-[100%] group-hover:z-10 group-hover:h-auto group-hover:opacity-100 md:top-[110%]">
        <h1 className="border-b-2 p-3 font-bold">{user?.username}</h1>
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
