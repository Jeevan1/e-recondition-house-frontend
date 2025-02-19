import { ReconditionHouse } from '@/model/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PrimaryButton, SecondaryButton } from './Button';
import { MdOutlineContacts, MdOutlineLocationOn } from 'react-icons/md';
import { HiOutlineMail } from 'react-icons/hi';

const ReconditionCard = ({ seller }: { seller: ReconditionHouse }) => {
  return (
    <div className="h-full overflow-hidden rounded-md bg-white">
      <Image
        src={seller?.logo || ''}
        alt={seller?.name}
        width={300}
        height={200}
        className="h-[180px] w-full object-cover"
      />
      <div className="border-t p-4">
        <h3 className="text-lg font-bold md:text-xl">{seller?.name}</h3>
        <div className="my-2 flex flex-wrap gap-x-2 gap-y-1">
          {seller?.contact_number && (
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-500">
              <MdOutlineContacts className="text-secondary" size={14} />
              {seller.contact_number}
            </p>
          )}
          {seller?.email && (
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-500">
              <HiOutlineMail className="text-secondary" size={14} />{' '}
              {seller.email}
            </p>
          )}
          {seller?.address && (
            <p className="flex items-center gap-1 text-sm font-semibold text-gray-500">
              <MdOutlineLocationOn className="text-secondary" size={14} />
              {seller.address}
            </p>
          )}
        </div>
        <div className="space-x-4">
          <Link
            href={{
              pathname: `/vehicle/filter`,
              query: {
                for: seller?.name,
                recondition_house: seller?.idx,
              },
            }}
          >
            <PrimaryButton className="mt-2">View Vehicles</PrimaryButton>
          </Link>
          <Link href={`tel:${seller?.contact_number}`}>
            <SecondaryButton className="mt-2">Call Now</SecondaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReconditionCard;
