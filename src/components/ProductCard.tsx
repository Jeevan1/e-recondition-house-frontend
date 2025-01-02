import React from "react";
import Image from "next/image";
import { Product } from "@/model/type";
import { LuDot } from "react-icons/lu";
import Link from "next/link";
import { FiPhone } from "react-icons/fi";
import { IoLocation } from "react-icons/io5";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="max-w- group h-full overflow-hidden rounded-md bg-white shadow-md">
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product.image[0]}
            alt={product.name}
            width={400}
            height={300}
            className="h-[130px] w-full overflow-hidden object-cover transition-all duration-300 ease-in-out group-hover:scale-105 sm:h-[160px]"
          />
        </div>
        <div className="p-3">
          <h2 className="text-md line-clamp-1 inline-block font-semibold hover:text-primary">
            {product.name}
          </h2>
          <ul className="mt-1 line-clamp-1 space-x-1">
            {product.features.map((feature, index) => (
              <li
                key={feature}
                className="inline text-xs font-semibold text-gray-500"
              >
                {index > 0 && <LuDot className="inline" />} {feature}
              </li>
            ))}
          </ul>
          <p className="mt-1 text-xs font-semibold">
            Model Year: {product.year}
          </p>
          <p className="mt-1 text-sm font-bold">Rs.{product.price}</p>
          <div className="mt-2 border-t border-dashed border-gray-300 pt-2">
            <span className="mt-1 border-r-2 pe-2 text-xs font-semibold text-gray-700">
              <FiPhone className="me-1 inline" />
              {product.seller?.contact}
            </span>
            <span className="mt-1 ps-2 text-xs font-semibold text-gray-700">
              <IoLocation className="me-1 inline" />
              {product.seller?.address}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
