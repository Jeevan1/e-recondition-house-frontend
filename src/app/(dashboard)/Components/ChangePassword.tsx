'use client';
import { PrimaryButton } from '@/components/Button';
import FormInput from '@/components/InputField/FormInput';
import SectionHeading from '@/components/SectionHeading';
import React from 'react';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { handleUnknownError } from '@/helper';
import Cookies from 'js-cookie';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '@/schemas/changePasswordSchema';

type ChangePassword = {
  current_password: string;
  new_password: string;
  confirm_password: string;
};

const ChangePassword = () => {
  const [loading, setLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePassword>({
    resolver: yupResolver(changePasswordSchema) as any,
    mode: 'all',
  });

  const onSubmitHandler = async (data: ChangePassword) => {
    console.log(data);
    setLoading(true);

    const formData = new FormData();
    formData.append('current_password', data.current_password);
    formData.append('new_password', data.new_password);
    formData.delete('confirm_password');

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/auth/users/set-password/`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${Cookies.get('accessToken')}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        const result = await response.json();
        if (result) {
          enqueueSnackbar('Updating Successfull', {
            variant: 'success',
          });
          reset();
        }
      } else {
        const errorResponse = await response.json();
        handleUnknownError(errorResponse);
      }
    } catch (error) {
      console.error('Error updating password:', error);
      enqueueSnackbar('Error updating password', {
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full rounded-md bg-white px-4 py-6">
      <SectionHeading
        title="Change Password"
        type="profile"
        className="text-lg"
      />
      <p className="border-b border-gray-200 py-4 text-sm font-semibold text-gray-500">
        Change your password.
      </p>
      <form method="patch" onSubmit={handleSubmit(onSubmitHandler)}>
        <div className="">
          <div className="grid grid-cols-4 border-b border-gray-200 py-4">
            <div className="col-span-1">
              <p className="text-sm font-bold text-gray-700">
                Current Password
              </p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                Enter your current password.
              </p>
            </div>
            <div className="col-span-3 py-2">
              <FormInput
                type="password"
                name="current_password"
                placeholder="Current Password"
                className="max-w-[300px]"
                register={register}
                required={true}
                error={errors['current_password']?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 border-b border-gray-200 py-4">
            <div className="col-span-1">
              <p className="text-sm font-bold text-gray-700">New Password</p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                Enter your new password.
              </p>
            </div>
            <div className="col-span-3 py-2">
              <FormInput
                type="password"
                name="new_password"
                placeholder="New Password"
                className="max-w-[300px]"
                register={register}
                required={true}
                error={errors['new_password']?.message}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 border-b border-gray-200 py-4">
            <div className="col-span-1">
              <p className="text-sm font-bold text-gray-700">
                Re-Enter Password
              </p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                Enter your confirm password.
              </p>
            </div>
            <div className="col-span-3 py-2">
              <FormInput
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                className="max-w-[300px]"
                register={register}
                required={true}
                error={errors['confirm_password']?.message}
              />
            </div>
          </div>
        </div>
        <div className="mt-4">
          <PrimaryButton type="submit">
            {loading ? 'Updating...' : 'Update Password'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
