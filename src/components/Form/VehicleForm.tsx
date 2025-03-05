'use client';
import React, { useMemo, useState } from 'react';
import { Brand, Category, Product, ReconditionHouse } from '@/model/type';
import { useForm } from 'react-hook-form';
import FormInput from '../InputField/FormInput';
import { PrimaryButton } from '../Button';
import Cookies from 'js-cookie';
import { enqueueSnackbar } from 'notistack';
import OptionInput from '../InputField/OptionInput';
import Image from 'next/image';
import { useData } from '@/context/DataContext';
import ImagesField from '../InputField/ImagesField';
import { log } from 'console';
import FeatureField from '../InputField/FeatureField';
import { vehicleSchema } from '@/schemas/vehicleSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { convertSnakeCaseToCamelCase, reduceName } from '@/helper';

type FieldsProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  className: string;
  required: boolean;
  value?: any;
};

const inputFields: FieldsProps[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter the name',
    label: 'Vehicle Name',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'description',
    type: 'textarea',
    placeholder: 'Enter the description',
    label: 'Description',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'category',
    type: 'select',
    placeholder: 'Enter the category',
    label: 'Category',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'color',
    type: 'text',
    placeholder: 'Enter the color',
    label: 'Color',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'model',
    type: 'text',
    placeholder: 'Enter the model',
    label: 'Model',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'year_of_manufacture',
    type: 'date',
    placeholder: 'Enter the year_of_manufacture',
    label: 'Year Of Manufacture',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'mileage',
    type: 'number',
    placeholder: 'Enter the mileage',
    label: 'Mileage',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'actual_price',
    type: 'text',
    placeholder: 'Enter the actual_price',
    label: 'Actual Price',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'discounted_price',
    type: 'text',
    placeholder: 'Enter the discounted_price',
    label: 'Discounted Price',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'features',
    type: 'arrayFeatures',
    placeholder: 'Enter the features',
    label: 'Features',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'fuel_type',
    type: 'select',
    placeholder: 'Enter the fuel_type',
    label: 'Fuel Type',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'transmission',
    type: 'select',
    placeholder: 'Enter the transmission',
    label: 'Transmission',
    className: 'col-span-1',
    required: false,
    value: ['Automatic', 'Manual', 'Semi-Automatic'],
  },
  {
    name: 'seating_capacity',
    type: 'number',
    placeholder: 'Enter the seating_capacity',
    label: 'Seating Capacity',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'engine_capacity',
    type: 'number',
    placeholder: 'Enter the engine_capacity',
    label: 'Engine Capacity',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'featured_image',
    type: 'file',
    placeholder: 'Enter the featured_image',
    label: 'Featured Image',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'vehicle_registration_number',
    type: 'number',
    placeholder: 'Enter the vehicle registration number',
    label: 'Vehicle Registration Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'accident_history',
    type: 'checkbox',
    placeholder: 'Enter the accident_history',
    label: 'Accident History',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'bill_book_upto_date',
    type: 'checkbox',
    placeholder: 'Enter the bill_book_upto_date',
    label: 'Bill Book Upto Date',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'previous_owner_count',
    type: 'number',
    placeholder: 'Enter the previous_owner_count',
    label: 'Previous Owner Count',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'renew_insurance',
    type: 'checkbox',
    placeholder: 'Enter the renew_insurance',
    label: 'Renew Insurance',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'brand',
    type: 'select',
    placeholder: 'Enter the brand',
    label: 'Brand',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'km_driven',
    type: 'number',
    placeholder: 'Enter the km_driven',
    label: 'Km Driven',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'vehicle_lot',
    type: 'string',
    placeholder: 'Enter the vehicle lot',
    label: 'Vehicle Lot',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'vehicle_number',
    type: 'string',
    placeholder: 'Enter the vehicle number',
    label: 'Vehicle Number',
    className: 'col-span-1',
    required: true,
  },
];

const handleError = (errorResponse: { [key: string]: string | string[] }) => {
  if (typeof errorResponse === 'object') {
    Object.entries(errorResponse).forEach(([key, value]) => {
      const messages = Array.isArray(value) ? value : [value];
      messages.forEach((message) =>
        enqueueSnackbar(`${convertSnakeCaseToCamelCase(key)}: ${message}`, {
          variant: 'error',
        }),
      );
    });
  } else {
    enqueueSnackbar(errorResponse || 'An unexpected error occurred', {
      variant: 'error',
    });
  }
};

const VehicleForm = ({
  data,
  editVehicle = false,
  category,
  brand,
}: {
  data?: Product;
  editVehicle?: boolean;
  category?: Category[];
  brand?: Brand[];
}) => {
  const [loading, setLoading] = useState(false);
  const [featuredImage, setFeaturedImage] = useState<File | null>(null);
  const { data: activeUser } = useData();

  // Update input fields with initial values
  const updatedInputFields = useMemo(() => {
    if (editVehicle && data) {
      return inputFields?.map((field) => ({
        ...field,
        value: data[field.name as keyof Product] || '',
      }));
    }
    return inputFields;
  }, [editVehicle, data]);

  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Product>({
    mode: 'all',
    // resolver: yupResolver(vehicleSchema) as any,
    defaultValues: editVehicle ? data : {},
  });

  const addVehicle = async (newData: Product) => {
    setLoading(true);
    console.log('newData', newData);

    try {
      const formData = new FormData();
      Object.entries(newData).forEach(([key, value]) => {
        if (key !== 'images' && key !== 'features') {
          if (
            editVehicle &&
            (value === null || value === undefined || value === '')
          )
            formData.delete(key);

          formData.append(key, value as string | Blob);
        }
      });

      if (newData.features) {
        newData.features.forEach((feature) =>
          formData.append('features', feature),
        );
      }

      if (featuredImage === null) formData.delete('featured_image');
      else {
        const newImage = new File(
          [featuredImage],
          reduceName(featuredImage.name),
          { type: featuredImage.type },
        );
        formData.append('featured_image', newImage);
      }

      formData.append('recondition_house', activeUser?.idx?.toString() || '');

      const accessToken = Cookies.get('accessToken');
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/${editVehicle ? `${data?.idx}/` : ''}`;
      const method = editVehicle ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${accessToken}` },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        handleError(errorResponse);
        return;
      }

      const res = await response.json();
      const idx = res?.idx;

      if (idx && !editVehicle && newData.images && newData.images.length > 0) {
        for (const imgObj of newData.images) {
          const imageFormData = new FormData();
          imageFormData.append('image', imgObj.image);
          imageFormData.append('vehicle', idx.toString());

          const imageResponse = await fetch(`${url}${idx}/images/`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: imageFormData,
          });

          if (!imageResponse.ok) {
            const errorResponse = await imageResponse.json();
            handleError(errorResponse);
          }
        }
      }

      enqueueSnackbar(
        `Vehicle ${editVehicle ? 'updated' : 'added'} successfully`,
        {
          variant: 'success',
        },
      );

      reset();
    } catch (error) {
      enqueueSnackbar(
        `Failed to ${editVehicle ? 'update' : 'add'} vehicle: ${error}`,
        {
          variant: 'error',
        },
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <form
        method={editVehicle ? 'PATCH' : 'POST'}
        className="mt-6 h-full"
        onSubmit={handleSubmit(addVehicle)}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {updatedInputFields?.map(
            ({
              name,
              type,
              placeholder,
              label,
              className,
              required,
              value,
            }) => {
              if (type === 'file') {
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
                      onChange={(e) => setFeaturedImage(e as File)}
                      error={errors[name as keyof typeof errors]?.message}
                    />
                    {featuredImage && !editVehicle && (
                      <Image
                        src={URL.createObjectURL(featuredImage as Blob)}
                        alt="Featured"
                        width={200}
                        height={200}
                        className="h-[80px] w-[150px] rounded-md bg-gray-100 object-cover"
                      />
                    )}
                    {editVehicle && (
                      <Image
                        src={
                          featuredImage
                            ? URL.createObjectURL(featuredImage)
                            : (value as string)
                        }
                        alt="Featured"
                        width={200}
                        height={200}
                        className="h-[80px] w-[150px] rounded-md bg-gray-100 object-cover"
                      />
                    )}
                  </div>
                );
              }
              if (type === 'select') {
                const options =
                  name === 'category'
                    ? category
                    : name === 'brand'
                      ? brand
                      : name === 'fuel_type'
                        ? ['Petrol', 'Diesel', 'Electric']
                        : name === 'transmission'
                          ? ['Automatic', 'Manual']
                          : [];
                return (
                  <OptionInput
                    key={name}
                    label={label}
                    placeholder={placeholder}
                    name={name}
                    value={value as string | { idx: string; name: string }}
                    register={register}
                    required={required}
                    className={className}
                    error={errors[name as keyof typeof errors]?.message}
                    data={options}
                    setValue={setValue}
                  />
                );
              }
              if (type === 'arrayFeatures') {
                return (
                  <FeatureField
                    key={name}
                    name={name}
                    value={value as string[]}
                    setValue={setValue}
                    register={register}
                    error={errors[name as keyof typeof errors]?.message}
                  />
                );
              }
              return (
                <FormInput
                  key={name}
                  label={label}
                  placeholder={placeholder}
                  type={type}
                  name={name}
                  value={value as string}
                  className={className}
                  register={register}
                  required={required}
                  error={errors[name as keyof typeof errors]?.message}
                />
              );
            },
          )}
        </div>
        {!editVehicle && (
          <div
            className={`mt-6 rounded-md border-2 ${errors.images ? 'border-red-500' : 'border-gray-300'} p-3`}
          >
            <ImagesField
              name="images"
              register={register}
              setValue={setValue}
              editVehicle={editVehicle}
              value={[]}
            />
          </div>
        )}
        <div className="mt-10">
          <PrimaryButton
            type="submit"
            className="h-[40px] w-[150px] text-[14px] font-bold"
            disabled={loading}
          >
            {loading
              ? 'Submitting...'
              : editVehicle
                ? 'Update Vehicle'
                : 'Add Vehicle'}
          </PrimaryButton>
        </div>
      </form>
      {editVehicle && (
        <div className="mt-10 border-t-2 border-gray-300 p-3">
          <ImagesField
            name="images"
            register={register}
            setValue={setValue}
            label="Edit Vehicle Images:"
            editVehicle={true}
            vehicleIdx={data?.idx}
            value={data?.images}
          />
        </div>
      )}
    </div>
  );
};

export default VehicleForm;
