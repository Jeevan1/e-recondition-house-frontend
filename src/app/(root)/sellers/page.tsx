import SectionHeading from "@/components/SectionHeading";
import React from "react";
import data from "@/data.json";
import { ReconditionHouse, Seller } from "@/model/type";
import { PrimaryButton, SecondaryButton } from "@/components/Button";
import Link from "next/link";
import { fetchData } from "@/utils/api-sercice";
import Image from "next/image";
import ReconditionCard from "@/components/ReconditionCard";

const SellersPage = async () => {
  const { data, error, loading } = await fetchData(`/reconditionhouses/`, {});

  return (
    <div className="min-h-[300px]  py-10">
      <div className="container">
        <SectionHeading title="Sellers" type="companies" />
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
          {loading && (
            <div className="col-span-1 rounded-md bg-white p-4">
              <h3 className="text-xl font-bold">Loading</h3>
            </div>
          )}
          {data?.length > 0 && !loading ? (
            data?.map((seller: ReconditionHouse) => (
              <ReconditionCard key={seller.idx} seller={seller} />
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
