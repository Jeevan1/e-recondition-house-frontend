import React from "react";
import { fetchData } from "@/utils/api-sercice";
import ErrorMessage from "@/components/ErrorMessage";
import SectionHeading from "@/components/SectionHeading";
import PaginationWithData from "@/components/Pagination";
import { ReconditionHouse } from "@/model/type";
import ReconditionCard from "@/components/ReconditionCard";
type Props = {
  params: { slug: string[] };
};

const SellerVehiclesPage = async ({ params }: Props) => {
  const { slug } = await params;
  const { data, error, loading } = await fetchData(
    `/vehicles/?recondition_house=${slug[1]}`,
    {},
  );

  const {
    data: seller,
    error: sellerError,
    loading: sellerLoading,
  } = await fetchData(`/reconditionhouses/`, {});

  if (error) return <ErrorMessage error={error} />;
  return (
    <>
      <div className="min-h-[300px] py-10">
        <div className="container">
          <SectionHeading
            type="vehicles"
            title={"Vehicles of " + decodeURIComponent(slug[0])}
            length={data?.length === 0 ? 0 : data?.length}
          />

          <PaginationWithData data={data} itemsPerPage={5} loading={loading} />
          <div className="pt-10">
            <SectionHeading
              type="sellers"
              title={"Sellers"}
              length={seller?.length === 0 ? 0 : seller?.length}
            />
            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
              {sellerLoading && (
                <div className="col-span-1 rounded-md bg-white p-4">
                  <h3 className="text-xl font-bold">Loading</h3>
                </div>
              )}
              {seller?.length > 0 && !sellerLoading ? (
                seller?.map((seller: ReconditionHouse) => (
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
      </div>
    </>
  );
};

export default SellerVehiclesPage;
