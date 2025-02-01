import React from 'react';
import { BsPostcard } from 'react-icons/bs';
import { GiFlatTire } from 'react-icons/gi';
import { MdOutlineAddBusiness, MdOutlineElectricCar } from 'react-icons/md';

const SectionHeading = ({
  title,
  type,
  length,
  className,
}: {
  title: string;
  type: string;
  length?: number;
  className?: string;
}) => {
  return (
    <h1
      className={`flex items-center space-x-2 text-2xl font-bold capitalize text-primary ${className}`}
    >
      <span className="inline-block">
        {type === 'electric' ? (
          <MdOutlineElectricCar size={18} />
        ) : type === 'add' ? (
          <MdOutlineAddBusiness size={18} />
        ) : type === 'profile' ? (
          <BsPostcard size={18} />
        ) : (
          <GiFlatTire size={18} />
        )}
      </span>
      <span className="border-b-2 border-dashed border-primary pb-1">
        {title}
        {length !== undefined && (
          <span className="text-xl text-gray-500">({length})</span>
        )}
      </span>
    </h1>
  );
};

export default SectionHeading;
