import React from "react";
import { GiFlatTire } from "react-icons/gi";
import { MdOutlineElectricCar } from "react-icons/md";

const SectionHeading = ({
  title,
  type,
  length,
}: {
  title: string;
  type: string;
  length?: number;
}) => {
  return (
    <h1 className="flex items-center space-x-2 text-2xl font-bold capitalize text-primary">
      <span className="inline-block">
        {type === "electric" ? (
          <MdOutlineElectricCar size={18} />
        ) : (
          <GiFlatTire size={18} />
        )}
      </span>
      <span className="border-b-2 border-dashed border-primary pb-1">
        {title}
      </span>
      {length && <span className="text-xl text-gray-500">({length})</span>}
    </h1>
  );
};

export default SectionHeading;
