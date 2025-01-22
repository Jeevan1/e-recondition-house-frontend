import React, { useEffect, useRef } from "react";
import { PrimaryButton, SecondaryButton } from "../Button";
import { TbFilterEdit } from "react-icons/tb";
import FormInput from "../InputField/FormInput";
import { fetchData } from "@/utils/api-sercice";
import { useRouter } from "next/navigation";
import SectionHeading from "../SectionHeading";
import { MdOutlineCancel } from "react-icons/md";
import OptionInput from "../InputField/OptionInput";
import { Category } from "@/model/type";

const FilterForm = ({ options }: { options: Category[] }) => {
  const router = useRouter();

  const [openFilter, setOpenFilter] = React.useState(false);
  const [minRange, setMinRange] = React.useState<number>(0);
  const [maxRange, setMaxRange] = React.useState<number>(0);

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const validParams = Object.entries(data)
      .filter(([key, value]) => Number(value) > 0)
      .map(([key, value]) => `${key}=${value}`)
      .join("&");

    console.log("validParams", validParams);
    if (validParams) {
      const res = await fetchData(`/vehicles/?${validParams}`, {});
      router.push(`/vehicle/filter/?${validParams}`);
      setOpenFilter(false);

      console.log(res);
    } else {
      console.log("No valid data provided.");
    }
  };

  return (
    <div className="relative">
      <PrimaryButton
        className="flex items-center px-3 sm:px-4"
        onClick={() => setOpenFilter(true)}
      >
        Filter
        <TbFilterEdit className="ml-1" />
      </PrimaryButton>
      {openFilter && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-800 bg-opacity-30 shadow-md">
          <div
            className="relative w-full max-w-md rounded-md bg-white p-4"
            ref={modalRef}
          >
            <form
              method="post"
              onSubmit={handleSearch}
              className="flex flex-col gap-4"
            >
              <SectionHeading
                title="Filter Form"
                type="add"
                className="text-lg"
              />
              <MdOutlineCancel
                onClick={() => setOpenFilter(false)}
                size={25}
                className="absolute right-2 top-4 cursor-pointer"
              />
              <div className="mt-3 flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-left text-sm font-semibold text-gray-700 drop-shadow-sm"
                >
                  Vehicle Name
                </label>
                <FormInput
                  type="text"
                  name="name"
                  placeholder="Enter vahicle name"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="category"
                  className="text-left text-sm font-semibold text-gray-700 drop-shadow-sm"
                >
                  Vehicle Category
                </label>
                <OptionInput
                  name="category"
                  placeholder="Enter vehicle category"
                  data={options.map((option) => option.name)}
                  className="h-[38px] w-full rounded-md focus:outline-primary"
                  type="select"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="minPrice"
                  className="text-left text-sm font-semibold text-gray-700 drop-shadow-sm"
                >
                  Min Price
                </label>

                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="discounted_price_start"
                    value={minRange}
                    placeholder=""
                    className="h-[38px] w-[100px] rounded-md border border-gray-300 px-2 py-1 text-sm font-semibold focus:outline-primary"
                    onChange={(e) => setMinRange(parseInt(e.target.value))}
                  />
                  <input
                    type="range"
                    name="discounted_price_start"
                    step={100}
                    min="0"
                    max={maxRange ? maxRange - 100 : 100000}
                    placeholder="Enter min price"
                    className="w-full"
                    value={minRange}
                    onChange={(e) => setMinRange(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="maxPrice"
                  className="text-left text-sm font-semibold text-gray-700 drop-shadow-sm"
                >
                  Max Price
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    name="discounted_price_end"
                    value={maxRange}
                    placeholder=""
                    className="h-[38px] w-[100px] rounded-md border border-gray-300 px-2 py-1 text-sm font-semibold focus:outline-primary"
                    onChange={(e) => setMaxRange(parseInt(e.target.value))}
                  />
                  <input
                    type="range"
                    name="discounted_price_end"
                    min={minRange ? minRange : 0}
                    step={100}
                    max="100000"
                    placeholder="Enter max price"
                    className="w-full"
                    value={maxRange}
                    onChange={(e) => setMaxRange(parseInt(e.target.value))}
                  />
                </div>
              </div>
              <SecondaryButton className="h-[39px] w-[100px] bg-white text-gray-700">
                Filter
              </SecondaryButton>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterForm;
