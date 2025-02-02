'use client';
import React, { useState } from 'react';
import { PrimaryButton } from '../Button';
import FormInput from '../InputField/FormInput';
import Image from 'next/image';
import SectionHeading from '../SectionHeading';
import { ReconditionHouse } from '@/model/type';
import Loader from '../Loader';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { handleUnknownError } from '@/helper';
import { useData } from '@/context/DataContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupSchema } from '@/schemas/registerSchema';
import Cookies from 'js-cookie';

const ProfileForm = () => {
  const { data, loading } = useData();
  const [logoImage, setLogoImage] = React.useState<File | null>(null);
  const [loadingButton, setLoadingButton] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReconditionHouse>({
    // resolver: yupResolver(signupSchema) as any,
    mode: 'all',
  });

  const onSubmitHandler = async (updatedData: ReconditionHouse) => {
    setLoadingButton(true);

    console.log('Form data submitted:', updatedData);

    const formData = new FormData();
    formData.append('name', updatedData.name);
    formData.append(
      'telephone_number',
      updatedData.telephone_number.toString(),
    );
    formData.append('address', updatedData.address);
    formData.append('email', updatedData.email);
    formData.append('contact_number', updatedData.contact_number.toString());

    if (logoImage) {
      formData.append('logo', logoImage);
    }
    if (updatedData.website_url)
      formData.append('website_url', updatedData.website_url);
    if (updatedData.facebook_url)
      formData.append('facebook_url', updatedData.facebook_url);
    if (updatedData.tiktok_url)
      formData.append('tiktok_url', updatedData.tiktok_url);
    if (updatedData.instagram_url)
      formData.append('instagram_url', updatedData.instagram_url);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/reconditionhouses/${data?.idx}/`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const result = await response.json();
        if (result)
          enqueueSnackbar('Updating Successfull', {
            variant: 'success',
          });
      } else {
        const errorResponse = await response.json();
        handleUnknownError(errorResponse);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      enqueueSnackbar('Error updating profile', {
        variant: 'error',
      });
    } finally {
      setLoadingButton(false);
    }
  };
  if (!data) {
    return <Loader />;
  }

  return (
    <div className="w-full rounded-md bg-white px-4 py-6">
      <SectionHeading
        title="Profile Information"
        type="profile"
        className="text-lg"
      />
      <p className="border-b border-gray-200 py-4 text-sm font-semibold text-gray-500">
        Update your profile information and password here.
      </p>
      {loading ? (
        <Loader />
      ) : (
        <form method="patch" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="">
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Company Name</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company name.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="text"
                  name="name"
                  value={data.name}
                  placeholder="Company Name"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={true}
                  error={errors['name']?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Address</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company address.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="text"
                  name="address"
                  value={data.address}
                  placeholder="Address"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={true}
                  error={errors['address']?.message}
                />
              </div>
            </div>
            <div className="item-center grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">
                  Contact Number
                </p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company contact number.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="number"
                  name="contact_number"
                  value={data.contact_number}
                  placeholder="Company Contact Number"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={true}
                  error={errors['contact_number']?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Company Email</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company email.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="email"
                  name="email"
                  value={data.email}
                  placeholder="Company Email"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={true}
                  error={errors['email']?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">
                  Telephone Number
                </p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company telephone number.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="text"
                  name="telephone_number"
                  value={data.telephone_number}
                  placeholder="Telephone Number"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={true}
                  error={errors['telephone_number']?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Company Logo</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company logo.
                </p>
              </div>
              <div className="col-span-2 flex items-center gap-4">
                {data.logo.startsWith('http') ||
                data.logo.startsWith('https') ? (
                  <Image
                    src={data.logo}
                    alt="Company Logo"
                    width={200}
                    height={200}
                    className="h-[60px] w-[100px] rounded-md bg-gray-100 object-cover"
                  />
                ) : (
                  <Image
                    src={`https://dem-cingular-receptors-philippines.trycloudflare.com/${data.logo}`}
                    alt="Company Logo"
                    width={200}
                    height={200}
                    className="h-[60px] w-[100px] rounded-md bg-gray-100 object-cover"
                  />
                )}
                <FormInput
                  type="file"
                  name="logo"
                  placeholder="Company Logo"
                  className="inline-blockmt-2 max-w-[300px]"
                  register={register}
                  required={true}
                  error={errors['logo']?.message}
                  onChange={(e) => {
                    if (e) {
                      setLogoImage(e as File);
                    }
                  }}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Website URL</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company website URL.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="text"
                  name="website_url"
                  value={data.website_url}
                  placeholder="Website URL"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={false}
                  error={errors['website_url']?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Facebook URL</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company facebook URL.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="text"
                  name="facebook_url"
                  value={data.facebook_url}
                  placeholder="Facebook URL"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={false}
                  error={errors['facebook_url']?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 border-b border-gray-200 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Tiktok URL</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company Tiktok URL.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="text"
                  name="tiktok_url"
                  value={data.tiktok_url}
                  placeholder="Tiktok URL"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={false}
                  error={errors['tiktok_url']?.message}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 py-4">
              <div className="col-span-1">
                <p className="text-sm font-bold text-gray-700">Inatagram URL</p>
                <p className="mt-1 text-xs font-semibold text-gray-500">
                  This will be your company Inatagram URL.
                </p>
              </div>
              <div className="col-span-2">
                <FormInput
                  type="text"
                  name="instagram_url"
                  value={data.instagram_url}
                  placeholder="Inatagram URL"
                  className="mt-2 max-w-[300px]"
                  register={register}
                  required={false}
                  error={errors['instagram_url']?.message}
                />
              </div>
            </div>
          </div>
          <div className="mt-2">
            <PrimaryButton type="submit">
              {loadingButton ? 'Updating...' : 'Update'}
            </PrimaryButton>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileForm;
