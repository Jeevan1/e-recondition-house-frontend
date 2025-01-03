import React from "react";
import SectionHeading from "./SectionHeading";
import RatingCard from "./RatingCard";
import { Seller } from "@/model/type";

const RatingSection = ({ seller }: { seller: Seller }) => {
  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading
          title="Sellers Rating"
          type="Top Rated"
          className="text-lg"
        />
        <div className="grid-clos-1 mt-6 grid gap-x-4 gap-y-6 sm:grid-cols-2 md:grid-cols-3">
          {seller.rating?.map((item) => (
            <RatingCard key={item.id} data={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
