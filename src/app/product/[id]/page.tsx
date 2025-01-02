import React from "react";
import data from "@/data.json";
import CustomPagingSlider from "@/components/CustomPagingSlider";
import { BiSolidUserDetail } from "react-icons/bi";
import {
  MdDownloading,
  MdLocationOn,
  MdOutlineEngineering,
  MdOutlineLocationOn,
} from "react-icons/md";
import { PrimaryButton } from "@/components/Button";
import { FiMail, FiPhone } from "react-icons/fi";
import Link from "next/link";
import ProductSection from "@/components/ProductSection";
import { FaBuildingUser, FaRegHeart } from "react-icons/fa6";
import { SiGoogleearthengine } from "react-icons/si";
import { GiCarWheel } from "react-icons/gi";
import SectionHeading from "@/components/SectionHeading";
import { BsPostcard } from "react-icons/bs";
import { CgColorBucket } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbPhone } from "react-icons/tb";
import RatingSection from "@/components/RatingSection";
import { Product } from "@/model/type";

export const SpecCard = ({
  title,
  value,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  icon?: React.ElementType;
}) => {
  return (
    <li className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-2">
        {Icon && <Icon className="text-md inline text-primary" />}
        <span className="text-md font-semibold text-gray-600">{title} :</span>
      </span>
      <span className="text-md font-semibold text-primary">{value}</span>
    </li>
  );
};

const DetailsPage = async ({ params }: { params: { id: string | number } }) => {
  const { id } = await params;
  const product = data.vehicles.find((vehicle) => vehicle.id == id);
  if (!product) return <p>Product not found</p>;
  return (
    <div className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-1">
            <CustomPagingSlider images={product.image} />
          </div>
          <div className="col-span-1">
            <div className="flex items-center justify-between gap-5">
              <h2 className="text-xl font-bold">{product.name}</h2>
              <span className="cursor-pointer">
                {/* <FaHeart className="inline text-2xl" /> */}
                <FaRegHeart className="inline text-2xl" />
              </span>
            </div>
            <p className="mt-2 leading-normal text-gray-500">
              {product.description} Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Hic libero mollitia nulla cupiditate. Harum iste
              possimus dignissimos, reprehenderit fuga a.
            </p>
            <p className="mt-4 text-sm text-gray-500">
              <span className="font-semibold">Model Year:</span>{" "}
              <span className="font-semibold text-primary">{product.year}</span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-semibold">Features:</span>{" "}
              <span className="font-semibold text-primary">
                {product.features.join(", ")}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-semibold">Price:</span>{" "}
              <span className="px-1 font-semibold text-primary line-through">
                Rs.{product.price}
              </span>
              <span className="ms-2 font-semibold text-primary">Rs.83,000</span>
            </p>
            <div className="mt-2 flex items-center gap-3">
              <p className="flex items-center gap-1">
                <BiSolidUserDetail className="text-md text-primary" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.seller.name}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <MdLocationOn className="text-md text-primary" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.seller.address}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <FiPhone className="text-sm text-primary" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.seller.contact}
                </span>
              </p>
            </div>
            <PrimaryButton className="mt-4">
              <Link href={`tel:${product.seller.contact}`}>Call Now</Link>
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="container grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-1">
            <SectionHeading title="Specifications" type="petrol" />
            <ul className="mt-4 flex flex-col gap-x-6 gap-y-4  rounded-lg bg-white p-4 shadow-md">
              <SpecCard
                title="Mileage"
                value={product.mileage}
                icon={GiCarWheel}
              />
              <SpecCard
                title="Transmission"
                value={product.transmission}
                icon={MdOutlineEngineering}
              />
              <SpecCard
                title="Km Driven"
                value={product.km_driven}
                icon={GiCarWheel}
              />
              <SpecCard
                title="Seat Capacity"
                value={product.seat_capicity}
                icon={MdDownloading}
              />
              <SpecCard title="Lot" value={product.lot} icon={GiCarWheel} />
              <SpecCard
                title="Number Plate"
                value={product.number_plate}
                icon={BsPostcard}
              />
              <SpecCard
                title="Color"
                value={product.color}
                icon={CgColorBucket}
              />
            </ul>
          </div>
          <div className="col-span-1">
            <SectionHeading
              title="Features"
              type="petrol"
              className="text-md"
            />
            <ul className="mt-4 flex flex-col flex-wrap gap-4 rounded-lg bg-white p-4 shadow-md">
              {product.features.map((feature: string, index: number) => (
                <li className="flex items-center gap-2" key={index}>
                  <IoMdCheckmarkCircleOutline className="text-md text-primary" />
                  <span className="text-md inline-block font-semibold capitalize text-gray-600">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-1">
            <SectionHeading
              title="Seller Details"
              type="petrol"
              className="text-md"
            />
            <ul className="mt-4 flex flex-col flex-wrap gap-4 rounded-lg bg-white p-4 shadow-md">
              <li className="flex items-center gap-2">
                <FaBuildingUser className="text-md text-primary" />
                <span className="text-md inline-block font-semibold text-gray-600">
                  Seller:{" "}
                </span>
                <span className="text-md inline-block font-semibold text-primary">
                  {product.seller.name}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineLocationOn className="text-md text-primary" />
                <span className="text-md inline-block font-semibold text-gray-600">
                  Address:{" "}
                </span>
                <span className="text-md inline-block font-semibold text-primary">
                  {product.seller.address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <TbPhone className="text-md text-primary" />
                <span className="text-md inline-block font-semibold text-gray-600">
                  Contact Number:{" "}
                </span>
                <span className="text-md inline-block font-semibold text-primary">
                  {product.seller.contact}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-md text-primary" />
                <span className="text-md inline-block font-semibold text-gray-600">
                  Seller:{" "}
                </span>
                <span className="text-md inline-block font-semibold text-primary">
                  {product.seller.email}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <RatingSection seller={product.seller} />
      <ProductSection
        title="Similar Vehicles"
        data={data.vehicles}
        type="petrol"
      />
    </div>
  );
};

export default DetailsPage;
