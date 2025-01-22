"use client";

import React, { JSX, useState } from "react";
import Link from "next/link";
import {
  MdCarCrash,
  MdLocalShipping,
  MdDirectionsBus,
  MdPedalBike,
  MdElectricCar,
  MdSportsSoccer,
  MdAirportShuttle,
} from "react-icons/md";
import { FaMotorcycle } from "react-icons/fa6";
import { PiTruckTrailer } from "react-icons/pi";
import { RiMenuUnfold2Line, RiMenuFoldLine } from "react-icons/ri";
import ProductCard from "./ProductCard";
import { PrimaryButton } from "./Button";
import { Category, Product } from "@/model/type";
import EmptyMessage from "./EmptyMessage";

const renderCategoryIcons = (category: string) => {
  switch (category.toLowerCase()) {
    case "car":
      return <MdCarCrash size={20} />;
    case "truck":
      return <MdLocalShipping size={20} />;
    case "suv":
      return <MdAirportShuttle size={20} />;
    case "bike":
      return <FaMotorcycle size={20} />;
    case "bicycle":
      return <MdPedalBike size={20} />;
    case "electric":
      return <MdElectricCar size={20} />;
    case "sports-car":
      return <MdSportsSoccer size={20} />;
    case "van":
      return <MdDirectionsBus size={20} />;
    case "trailer":
      return <PiTruckTrailer size={20} />;
    case "bus":
      return <MdDirectionsBus size={20} />;
    default:
      return null;
  }
};

const Categories = ({
  data,
  category,
}: {
  data: Product[];
  category: Category[];
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const toggleOpen = () => setOpen(!open);

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-5">
          <div
            className={`hidden transition-[width] duration-300 ease-in-out sm:block ${
              open ? "w-[250px]" : "w-16"
            }`}
          >
            <h1 className="flex h-12 items-center justify-between rounded-t-lg bg-primary font-bold text-white ">
              {open && <span className="ps-4 text-xl">Categories</span>}
              <span
                onClick={toggleOpen}
                className={`${!open ? "flex w-full justify-center" : "pe-4"} cursor-pointer`}
              >
                {open ? (
                  <RiMenuFoldLine size={20} />
                ) : (
                  <RiMenuUnfold2Line size={20} />
                )}
              </span>
            </h1>
            <ul className="scrollbar max-h-[339px] min-h-[339px] overflow-x-hidden overflow-y-scroll rounded-b-lg border-2 bg-white">
              {category ? (
                category.map((category: Category) => (
                  <li
                    key={category.idx}
                    className="ms-1 border-b-2 px-3 font-semibold last:border-b-0 hover:bg-secondary hover:text-white"
                  >
                    <Link
                      href={{
                        pathname: `/category/${category.idx}`,
                      }}
                      className="flex items-center py-2"
                    >
                      <span className="text-xl">
                        {renderCategoryIcons(category.name)}
                      </span>
                      <p
                        className={`text-md ml-4 inline-block opacity-0 transition-transform duration-500 ease-in-out ${
                          open
                            ? "translate-x-0 opacity-100"
                            : "translate-x-[-20%] opacity-0 "
                        }`}
                      >
                        <span className={"line-clamp-1"}>{category.name}</span>
                      </p>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="ms-1 border-b-2 px-3 font-semibold last:border-b-0 hover:bg-secondary hover:text-white">
                  <Link
                    href={{
                      pathname: `/category`,
                    }}
                    className="flex items-center py-2"
                  >
                    <span className="text-xl">
                      <MdCarCrash size={20} />
                    </span>
                    <p
                      className={`text-md ml-4 inline-block opacity-0 transition-transform duration-500 ease-in-out ${
                        open
                          ? "translate-x-0 opacity-100"
                          : "translate-x-[-20%] opacity-0 "
                      }`}
                    >
                      <span className={"line-clamp-1"}>All Vehicles</span>
                    </p>
                  </Link>
                </li>
              )}
            </ul>
          </div>
          {data ? (
            <div className="flex-1">
              <div
                className={`grid grid-cols-2 ${!open && "grid-cols-2 md:grid-cols-5"} gap-5 sm:grid-cols-2 md:grid-cols-4`}
              >
                {data.slice(0, open ? 8 : 10).map((vehicle: Product) => (
                  <div
                    key={vehicle.idx}
                    className="col-span-1 transition-transform duration-300 ease-in-out md:col-span-1"
                  >
                    <ProductCard product={vehicle} />
                  </div>
                ))}
              </div>
              <div className="mt-5 text-center">
                <PrimaryButton className="w-[130px]">View All</PrimaryButton>
              </div>
            </div>
          ) : (
            <p className="flex flex-1 items-center justify-center py-10 font-bold">
              <span>No Vehicles Found</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Categories;
