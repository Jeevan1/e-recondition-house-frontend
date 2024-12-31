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

const categoryIcons: { [key: string]: JSX.Element } = {
  car: <MdCarCrash />,
  truck: <MdLocalShipping />,
  suv: <MdAirportShuttle />,
  motorcycle: <FaMotorcycle />,
  bicycle: <MdPedalBike />,
  "electric-car": <MdElectricCar />,
  "sports-car": <MdSportsSoccer />,
  van: <MdDirectionsBus />,
  trailer: <PiTruckTrailer />,
  bus: <MdDirectionsBus />,
};

const Categories = ({ data }: { data: any }) => {
  const [open, setOpen] = useState<boolean>(true);
  const toggleOpen = () => setOpen(!open);

  return (
    <div className="py-10">
      <div className="container">
        <div className="flex gap-5">
          <div
            className={`transition-[width] duration-300 ease-in-out ${
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
            <ul className="scrollbar max-h-[339px] overflow-x-hidden overflow-y-scroll rounded-b-lg border-2 bg-white">
              {data.categories.map((category: Category) => (
                <li
                  key={category.id}
                  className="ms-1 border-b-2 px-4 font-semibold last:border-b-0 hover:bg-secondary hover:text-white"
                >
                  <Link href={category.link} className="flex items-center py-2">
                    <span className="text-xl">
                      {categoryIcons[category.icon]}
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
              ))}
            </ul>
          </div>
          <div className="flex-1">
            <div
              className={`grid grid-cols-2 ${!open && "grid-cols-2 md:grid-cols-5"} gap-5 sm:grid-cols-2 md:grid-cols-4`}
            >
              {data.vehicles.slice(0, open ? 8 : 10).map((vehicle: Product) => (
                <div
                  key={vehicle.id}
                  className="col-span-2 transition-transform duration-300 ease-in-out md:col-span-1"
                >
                  <ProductCard product={vehicle} />
                </div>
              ))}
            </div>
            <div className="mt-5 text-center">
              <PrimaryButton className="w-[130px]">View All</PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
