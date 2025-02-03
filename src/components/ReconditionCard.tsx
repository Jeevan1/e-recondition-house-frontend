import { ReconditionHouse } from '@/model/type';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { PrimaryButton, SecondaryButton } from './Button';

const ReconditionCard = ({ seller }: { seller: ReconditionHouse }) => {
  return (
    <div className="rounded-md bg-white p-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">{seller?.name}</h3>
          <p className="mt-2 text-sm text-gray-500">{seller?.contact_number}</p>
          <p className="text-sm text-gray-500">{seller?.email}</p>
          <p className="text-sm text-gray-500">{seller?.address}</p>
        </div>
        <Image
          src={seller?.logo || ''}
          alt={seller?.name}
          width={100}
          height={100}
          className="h-20 w-24 object-cover"
        />
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
  );
};

export default ReconditionCard;
