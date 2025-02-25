import React, { useState } from 'react';
import { PrimaryButton } from '../Button';
import { ReconditionHouse } from '@/model/type';
import FormInput from '../InputField/FormInput';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type FieldsProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  className: string;
  required: boolean;
};

const inputFields: FieldsProps[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter the name',
    label: 'Name',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'telephoneNumber',
    type: 'number',
    placeholder: 'Enter telephone number',
    label: 'Telephone Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'address',
    type: 'text',
    placeholder: 'Enter the address',
    label: 'Address',
    className: 'col-span-1 md:col-span-2',
    required: true,
  },
  {
    name: 'email',
    type: 'email',
    placeholder: 'Enter email',
    label: 'Email',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'contactNumber',
    type: 'number',
    placeholder: 'Enter contact number',
    label: 'Contact Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'vatRegistrationNumber',
    type: 'text',
    placeholder: 'Enter VAT registration number',
    label: 'VAT Registration Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'vatRegistrationDocumentImage',
    type: 'file',
    placeholder: 'Upload VAT registration document',
    label: 'VAT Registration Document',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'panRegistrationNumber',
    type: 'text',
    placeholder: 'Enter PAN registration number',
    label: 'PAN Registration Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'panRegistrationDocumentImage',
    type: 'file',
    placeholder: 'Upload PAN registration document',
    label: 'PAN Registration Document',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'taxComplianceDocumentImage',
    type: 'file',
    placeholder: 'Upload tax compliance document',
    label: 'Tax Compliance Document',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'logo',
    type: 'file',
    placeholder: 'Upload logo',
    label: 'Logo',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'websiteUrl',
    type: 'url',
    placeholder: 'Enter website URL',
    label: 'Website URL',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'facebookUrl',
    type: 'url',
    placeholder: 'Enter Facebook URL',
    label: 'Facebook URL',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'tiktokUrl',
    type: 'url',
    placeholder: 'Enter TikTok URL',
    label: 'TikTok URL',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'instagramUrl',
    type: 'url',
    placeholder: 'Enter Instagram URL',
    label: 'Instagram URL',
    className: 'col-span-1',
    required: false,
  },
];

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),

  telephoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Telephone number must be 10 digits')
    .required('Telephone number is required'),

  address: Yup.string().required('Address is required'),

  email: Yup.string().email('Invalid email format').notRequired(),

  contactNumber: Yup.string()
    .matches(/^\d{10}$/, 'Contact number must be 10 digits')
    .required('Contact number is required'),

  vatRegistrationNumber: Yup.string().required(
    'VAT registration number is required',
  ),

  vatRegistrationDocumentImage: Yup.mixed<File>()
    .required('VAT registration document is required')
    .test('required', 'VAT registration document is required', (value: any) => {
      return value && value[0];
    }),

  panRegistrationNumber: Yup.string().required(
    'PAN registration number is required',
  ),

  // PAN Registration document file validation
  panRegistrationDocumentImage: Yup.mixed<File>()
    .required('PAN registration document is required')
    .test('required', 'PAN registration document is required', (value: any) => {
      return value && value[0];
    }),

  // Tax Compliance document file validation
  taxComplianceDocumentImage: Yup.mixed<File>()
    .required('Tax compliance document is required')
    .test('required', 'Logo is required', (value: any) => {
      return value && value[0];
    }),

  // Logo file validation
  logo: Yup.mixed<File>()
    .test('required', 'Logo is required', (value: any) => {
      return value && value[0];
    })
    .required('Logo is required'),
  websiteUrl: Yup.string().url('Invalid website URL').notRequired(),
  facebookUrl: Yup.string().url('Invalid Facebook URL').notRequired(),
  tiktokUrl: Yup.string().url('Invalid TikTok URL').notRequired(),
  instagramUrl: Yup.string().url('Invalid Instagram URL').notRequired(),
});

const SignUpForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ReconditionHouse>({
    resolver: yupResolver(signupSchema) as any,
    mode: 'all',
  });

  const onSubmit = (data: ReconditionHouse) => {
    console.log(data);
  };
  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {inputFields?.map((field) => {
          const { name, type, placeholder, label, className, required } = field;
          if (type === 'file') {
            return (
              <FormInput
                key={name}
                label={label}
                placeholder={placeholder}
                type={type}
                name={name}
                className={className}
                register={register}
                required={required}
                error={errors[name as keyof typeof errors]?.message}
              />
            );
          } else if (type === 'checkbox') {
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
          } else {
            return (
              <FormInput
                key={name}
                label={label}
                placeholder={placeholder}
                type={type}
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
        <PrimaryButton
          type="submit"
          className="h-[40px] w-[150px] text-[14px] font-bold"
          disabled={false}
        >
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
};

export default SignUpForm;
