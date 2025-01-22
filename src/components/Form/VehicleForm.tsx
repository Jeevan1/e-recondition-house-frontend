"use client";
import React, { useState } from "react";
import { Category, Product, ReconditionHouse } from "@/model/type";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormInput from "../InputField/FormInput";
import { PrimaryButton } from "../Button";
import Cookies from "js-cookie";
import { enqueueSnackbar } from "notistack";
import OptionInput from "../InputField/OptionInput";
import { vehicleSchema } from "@/schemas/vehicleSchema";
import { useData } from "@/context/DataContext";
import Image from "next/image";

type FieldsProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  className: string;
  required: boolean;
  value?: string[] | number | boolean | File;
};

const inputFields: FieldsProps[] = [
  {
    name: "name",
    type: "text",
    placeholder: "Enter the name",
    label: "Vehicle Name",
    className: "col-span-1",
    required: false,
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Enter the description",
    label: "Description",
    className: "col-span-1",
    required: false,
  },
  {
    name: "category",
    type: "select",
    placeholder: "Enter the category",
    label: "Category",
    className: "col-span-1",
    required: false,
  },
  {
    name: "recondition_house",
    type: "select",
    placeholder: "Enter the recondition_house",
    label: "Recondition House",
    className: "col-span-1",
    required: false,
  },
  {
    name: "color",
    type: "text",
    placeholder: "Enter the color",
    label: "Color",
    className: "col-span-1",
    required: false,
  },
  {
    name: "model",
    type: "text",
    placeholder: "Enter the model",
    label: "Model",
    className: "col-span-1",
    required: false,
  },
  {
    name: "year_of_manufacture",
    type: "date",
    placeholder: "Enter the year_of_manufacture",
    label: "Year Of Manufacture",
    className: "col-span-1",
    required: false,
  },
  {
    name: "mileage",
    type: "number",
    placeholder: "Enter the mileage",
    label: "Mileage",
    className: "col-span-1",
    required: false,
  },
  {
    name: "actual_price",
    type: "text",
    placeholder: "Enter the actual_price",
    label: "Actual Price",
    className: "col-span-1",
    required: false,
  },
  {
    name: "discounted_price",
    type: "text",
    placeholder: "Enter the discounted_price",
    label: "Discounted Price",
    className: "col-span-1",
    required: false,
  },
  {
    name: "fuel_type",
    type: "select",
    placeholder: "Enter the fuel_type",
    label: "Fuel Type",
    className: "col-span-1",
    required: false,
  },
  {
    name: "transmission",
    type: "select",
    placeholder: "Enter the transmission",
    label: "Transmission",
    className: "col-span-1",
    required: false,
    value: ["Automatic", "Manual", "Semi-Automatic"],
  },
  {
    name: "seating_capacity",
    type: "number",
    placeholder: "Enter the seating_capacity",
    label: "Seating Capacity",
    className: "col-span-1",
    required: false,
  },
  {
    name: "engine_capacity",
    type: "number",
    placeholder: "Enter the engine_capacity",
    label: "Engine Capacity",
    className: "col-span-1",
    required: false,
  },
  {
    name: "featured_image",
    type: "file",
    placeholder: "Enter the featured_image",
    label: "Featured Image",
    className: "col-span-1",
    required: false,
  },
  {
    name: "vehicle_registration_number",
    type: "number",
    placeholder: "Enter the vehicle registration number",
    label: "Vehicle Registration Number",
    className: "col-span-1",
    required: true,
  },
  {
    name: "accident_history",
    type: "checkbox",
    placeholder: "Enter the accident_history",
    label: "Accident History",
    className: "col-span-1",
    required: false,
  },
  {
    name: "bill_book_upto_date",
    type: "checkbox",
    placeholder: "Enter the bill_book_upto_date",
    label: "Bill Book Upto Date",
    className: "col-span-1",
    required: false,
  },
  {
    name: "previous_owner_count",
    type: "number",
    placeholder: "Enter the previous_owner_count",
    label: "Previous Owner Count",
    className: "col-span-1",
    required: false,
  },
  {
    name: "renew_insurance",
    type: "checkbox",
    placeholder: "Enter the renew_insurance",
    label: "Renew Insurance",
    className: "col-span-1",
    required: false,
  },
];

const handleUnknownError = (errorResponse: {
  [key: string]: string | string[];
}) => {
  if (typeof errorResponse === "object" && errorResponse) {
    Object.entries(errorResponse).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((message: string) =>
          enqueueSnackbar(` ${key}: ${message}`, { variant: "error" }),
        );
      } else if (typeof value === "string") {
        enqueueSnackbar(` ${key}: ${value}`, { variant: "error" });
      }
    });
  } else if (typeof errorResponse === "string") {
    enqueueSnackbar(errorResponse, { variant: "error" });
  } else {
    enqueueSnackbar("An unexpected error occurred. Please try again.", {
      variant: "error",
    });
  }
};

const VehicleForm = ({
  data,
  editVehicle = false,
  category,
}: {
  data?: Product;
  editVehicle?: boolean;
  category?: Category[];
}) => {
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [fuelType, setFuelType] = useState<string[]>([
    "Petrol",
    "Diesel",
    "Electric",
  ]);

  const { data: activeUser } = useData();

  const updatedInputFields =
    data && editVehicle
      ? inputFields.map((field) => {
          const { name } = field;
          return {
            ...field,
            value: data[name as keyof typeof data],
          };
        })
      : inputFields.map((field) => {
          const { name } = field;
          return {
            ...field,
            value: "",
          };
        });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ReconditionHouse>({
    // resolver: yupResolver(vehicleSchema) as any,
    // mode: "all",
  });

  const addVehicle = async (newData: ReconditionHouse) => {
    setLoading(true);

    try {
      const formData = new FormData();
      const accessToken = Cookies.get("accessToken");
      Object.entries(newData).forEach(([key, value]) => {
        formData.append(key, value as string | Blob);
      });
      if (featuredImage) {
        formData.append("featured_image", featuredImage);
      }
      if (!featuredImage) {
        formData.delete("featured_image");
      }
      formData.append("recondition_house", activeUser?.idx as string);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/${editVehicle ? data?.idx : ""}/`,
        {
          method: editVehicle ? "PATCH" : "POST",

          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        !editVehicle
          ? enqueueSnackbar("Vehicle add successful", { variant: "success" })
          : enqueueSnackbar("Vehicle update successful", {
              variant: "success",
            });
      } else if (response.status === 500) {
        enqueueSnackbar("Internal Server Error", { variant: "error" });
      } else if (response.status === 401) {
        enqueueSnackbar("Unauthorized Access", { variant: "error" });
      } else if (response.status === 405) {
        enqueueSnackbar("Method Not Allowed", { variant: "error" });
      } else {
        const errorResponse = await response.json();
        handleUnknownError(errorResponse);
      }
    } catch (error) {
      !editVehicle
        ? enqueueSnackbar(`Sign up failed. Please try again. ${error}`, {
            variant: "error",
          })
        : enqueueSnackbar(`Sign up failed. Please try again. ${error}`, {
            variant: "error",
          });
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      method={editVehicle ? "PATCH" : "POST"}
      className="mt-6"
      onSubmit={handleSubmit(addVehicle)}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {updatedInputFields.map((field) => {
          const { name, type, placeholder, label, className, required, value } =
            field;
          if (type === "file") {
            return (
              <div key={name} className="flex items-center gap-4">
                <FormInput
                  key={name}
                  label={label}
                  placeholder={placeholder}
                  type={type}
                  name={name}
                  className={className}
                  register={register}
                  required={required}
                  onChange={(e) => {
                    setFeaturedImage(e as File);
                  }}
                  error={errors[name as keyof typeof errors]?.message}
                />
                {data?.featured_image.startsWith("http") ||
                data?.featured_image.startsWith("https") ? (
                  <Image
                    src={data?.featured_image || ""}
                    alt="Company Logo"
                    width={200}
                    height={200}
                    className="h-[60px] w-[100px] rounded-md bg-gray-100 object-cover"
                    priority
                  />
                ) : (
                  <Image
                    src={`http://localhost:2000/${data?.featured_image}`}
                    alt="Company Logo"
                    width={200}
                    height={200}
                    className="h-[60px] w-[100px] rounded-md bg-gray-100 object-cover"
                    priority
                  />
                )}
              </div>
            );
          } else if (type === "checkbox") {
            return (
              <FormInput
                key={name}
                label={label}
                placeholder={placeholder}
                type={type}
                name={name}
                register={register}
                required={required}
                className={className}
                error={errors[name as keyof typeof errors]?.message}
              />
            );
          } else if (type === "select") {
            if (name === "category") {
              return (
                <OptionInput
                  key={name}
                  label={label}
                  placeholder={placeholder}
                  name={name}
                  value={value}
                  register={register}
                  required={required}
                  className={className}
                  error={errors[name as keyof typeof errors]?.message}
                  data={category}
                />
              );
            }
            if (name === "fuel_type") {
              return (
                <OptionInput
                  key={name}
                  label={label}
                  placeholder={placeholder}
                  name={name}
                  value={value}
                  register={register}
                  required={required}
                  className={className}
                  error={errors[name as keyof typeof errors]?.message}
                  data={fuelType}
                />
              );
            }
          } else {
            return (
              <FormInput
                key={name}
                label={label}
                placeholder={placeholder}
                type={type}
                value={field.value}
                name={name}
                register={register}
                className={className}
                required={required}
                error={errors[name as keyof typeof errors]?.message}
              />
            );
          }
        })}
      </div>
      <div className="mt-10">
        {!editVehicle ? (
          <PrimaryButton className="h-[40px] w-[150px] text-[14px] font-bold">
            {loading ? "Adding..." : "Add Vehicle"}
          </PrimaryButton>
        ) : (
          <PrimaryButton className="h-[40px] w-[150px] text-[14px] font-bold">
            {loading ? "Updating..." : "Update Vehicle"}
          </PrimaryButton>
        )}
      </div>
    </form>
  );
};

export default VehicleForm;
