'use client';
import FeatureField from '@/components/InputField/FeatureField';
import React from 'react';
import { useForm } from 'react-hook-form';

const PracticePage = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const addData = async (data: any) => {
    console.log('Submitted Data:', data);
  };

  return (
    <form
      onSubmit={handleSubmit(addData)}
      className="container flex min-h-screen flex-col bg-gray-100 py-10"
    >
      <FeatureField
        name="features"
        value={['Responsive Design', 'SEO Optimized']}
        register={register}
        setValue={setValue}
      />
      <button
        type="submit"
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit
      </button>
    </form>
  );
};

export default PracticePage;
