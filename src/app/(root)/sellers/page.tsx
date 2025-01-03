import SectionHeading from "@/components/SectionHeading";
import React from "react";
import data from "@/data.json";
import { Seller } from "@/model/type";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import Link from "next/link";

const SellersPage = () => {
  const uniqueFilteredSellers: Seller[] = data.vehicles
    .map((vehicle) => vehicle.seller)
    .filter(
      (value, index, self) =>
        self.findIndex((seller) => seller.name === value.name) === index,
    );

  return (
    <div className="min-h-[300px]  py-10">
      <div className="container">
        <SectionHeading title="Sellers" type="companies" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {uniqueFilteredSellers.length > 0 ? (
            uniqueFilteredSellers.map((seller) => (
              <div key={seller.name} className="rounded-md bg-white p-4">
                <h3 className="text-xl font-bold">{seller.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{seller.contact}</p>
                <p className="text-sm text-gray-500">{seller.email}</p>
                <p className="text-sm text-gray-500">{seller.address}</p>
                <div className="space-x-4">
                  <Link href={`/sellers/${seller.id}`}>
                    <PrimaryButton className="mt-2">
                      View Vehicles
                    </PrimaryButton>
                  </Link>
                  <Link href={`tel:${seller.contact}`}>
                    <SecondaryButton className="mt-2">Call Now</SecondaryButton>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-md font-semibold text-gray-500">
              No sellers found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellersPage;
