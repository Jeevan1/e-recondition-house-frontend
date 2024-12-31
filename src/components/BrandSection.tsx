import { brand } from "@/model/type";
import React from "react";
import SectionHeading from "./SectionHeading";
import Image from "next/image";
import { PrimaryButton } from "./Button";
import Link from "next/link";

const BrandSection = ({ data, title }: { data: brand[]; title: string }) => {
  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading title={title} type="" />
        {data.length > 0 ? (
          <>
            <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-4 md:grid-cols-6">
              {data.slice(0, 6).map((brand) => (
                <div
                  key={brand.id}
                  className="group rounded-md bg-white p-5 shadow-sm"
                >
                  <Link href={`/brand/${brand.id}`}>
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="h-[120px] w-full object-contain transition-all duration-300 ease-in-out group-hover:scale-105"
                    />
                    <p className="text-md mt-2 text-center font-semibold">
                      {brand.name}
                    </p>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center">
              <PrimaryButton className="w-[100px]">View All</PrimaryButton>
            </div>
          </>
        ) : (
          <p className="mt-6 px-3 font-semibold text-gray-500">
            No Vehicles Found
          </p>
        )}
      </div>
    </div>
  );
};

export default BrandSection;
