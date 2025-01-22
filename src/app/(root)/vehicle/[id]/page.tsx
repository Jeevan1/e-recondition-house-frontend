import React from "react";
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
import { GiCarWheel } from "react-icons/gi";
import SectionHeading from "@/components/SectionHeading";
import { BsPostcard } from "react-icons/bs";
import { CgColorBucket } from "react-icons/cg";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { TbPhone } from "react-icons/tb";
import { fetchData } from "@/utils/api-sercice";
import { Product } from "@/model/type";
import ErrorMessage from "@/components/ErrorMessage";

const SpecCard = ({
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
        <span className="text-sm font-semibold text-gray-600">{title} :</span>
      </span>
      <span className="text-sm font-semibold text-primary">{value}</span>
    </li>
  );
};

type Props = {
  params: { id: string };
};

const DetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const {
    data: product,
    error,
  }: { data: Product | null; error: string | null } = await fetchData(
    `/vehicles/${id}/`,
    {},
  );

  const {
    data: similarProducts,
    error: similarProductsError,
    loading: similarProductsLoading,
  } = await fetchData(`/vehicles/?discounted_price_end=200000`, {});

  if (error || similarProductsError) {
    return <ErrorMessage error={error || similarProductsError} />;
  }
  if (!product) {
    return (
      <div className="container py-10">
        <p>No product found</p>
      </div>
    );
  }
  return (
    <div className="py-10">
      <div className="container">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="col-span-1">
            <CustomPagingSlider
              images={product.images}
              featured_image={product.featured_image}
            />
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
              <span className="font-semibold text-primary">
                {product.year_of_manufacture}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-semibold">Features:</span>{" "}
              <span className="font-semibold text-primary">
                {product.features?.join(", ")}
              </span>
            </p>
            <p className="mt-2 text-sm text-gray-500">
              <span className="font-semibold">Price:</span>{" "}
              <span className="px-1 font-semibold text-primary line-through">
                Rs.{product.actual_price}
              </span>
              <span className="ms-2 font-semibold text-primary">
                Rs.{product.discounted_price}
              </span>
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <p className="flex items-center gap-1">
                <BiSolidUserDetail className="text-md text-primary" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.recondition_house.name}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <MdLocationOn className="text-md text-primary" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.recondition_house.address}
                </span>
              </p>
              <p className="flex items-center gap-1">
                <FiPhone className="text-sm text-primary" />
                <span className="text-sm font-semibold text-gray-500">
                  {product.recondition_house.contact_number}
                </span>
              </p>
            </div>
            <PrimaryButton className="mt-4">
              <Link href={`tel:${product.recondition_house.telephone_number}`}>
                Call Now
              </Link>
            </PrimaryButton>
          </div>
        </div>
      </div>
      <div className="py-10">
        <div className="container grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          <div className="col-span-1">
            <SectionHeading
              title="Specifications"
              type="petrol"
              className="text-lg"
            />
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
                value={product.seating_capicity}
                icon={MdDownloading}
              />
              <SpecCard title="Lot" value={product.lot} icon={GiCarWheel} />
              <SpecCard
                title="Number Plate"
                value={product.vehicle_registration_number}
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
              className="text-lg"
            />
            <ul className="mt-4 flex flex-col flex-wrap gap-4 rounded-lg bg-white p-4 shadow-md">
              {product.features ? (
                product.features.map((feature: string, index: number) => (
                  <li className="flex items-center gap-2" key={index}>
                    <IoMdCheckmarkCircleOutline className="text-md text-primary" />
                    <span className="inline-block text-sm font-semibold capitalize text-gray-600">
                      {feature}
                    </span>
                  </li>
                ))
              ) : (
                <li className="flex items-center gap-2">
                  <IoMdCheckmarkCircleOutline className="text-md text-primary" />
                  <span className="inline-block text-sm font-semibold capitalize text-gray-600">
                    No Data Available
                  </span>
                </li>
              )}
            </ul>
          </div>
          <div className="col-span-1">
            <SectionHeading
              title="Seller Details"
              type="petrol"
              className="text-lg"
            />
            <ul className="mt-4 flex flex-col flex-wrap gap-4 rounded-lg bg-white p-4 shadow-md">
              <li className="flex items-center gap-2">
                <FaBuildingUser className="text-md text-primary" />
                <span className="inline-block text-sm font-semibold text-gray-600">
                  Seller:{" "}
                </span>
                <span className="inline-block text-sm font-semibold text-primary">
                  {product.recondition_house.name}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <MdOutlineLocationOn className="text-md text-primary" />
                <span className="inline-block text-sm font-semibold text-gray-600">
                  Address:{" "}
                </span>
                <span className="inline-block text-sm font-semibold text-primary">
                  {product.recondition_house.address}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <TbPhone className="text-md text-primary" />
                <span className="inline-block text-sm font-semibold text-gray-600">
                  Contact Number:{" "}
                </span>
                <span className="inline-block text-sm font-semibold text-primary">
                  {product.recondition_house.contact_number}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FiMail className="text-md text-primary" />
                <span className="inline-block text-sm font-semibold text-gray-600">
                  Email:{" "}
                </span>
                <span className="inline-block text-sm font-semibold text-primary">
                  {product.recondition_house.email}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <RatingSection seller={product.recondition_house} /> */}
      <ProductSection
        title="Similar Vehicles"
        data={similarProducts}
        type="petrol"
        isFeatured
      />
    </div>
  );
};

export default DetailsPage;
