'use client';
import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../Button';
import { RegisterFormProps } from '@/model/type';
import FormInput from '../InputField/FormInput';
import * as Yup from 'yup';
import { Resolver, set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@/context/AuthContext';
import { enqueueSnackbar } from 'notistack';
import { redirect, useRouter } from 'next/navigation';
import { signupSchema } from '@/schemas/registerSchema';
import { handleUnknownError } from '@/helper';
import { User } from '@/types/auth';
import { loginSchema } from '@/schemas/loginSchema';
import Cookies from 'js-cookie';
import { fetchData } from '@/utils/api-sercice';
type FieldsProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  className: string;
  required: boolean;
};

const reconFields: FieldsProps[] = [
  {
    name: 'name',
    type: 'text',
    placeholder: 'Enter the name',
    label: 'Name',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'telephone_number',
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
    name: 'contact_number',
    type: 'number',
    placeholder: 'Enter contact number',
    label: 'Contact Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'vat_registration_number',
    type: 'text',
    placeholder: 'Enter VAT registration number',
    label: 'VAT Registration Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'vat_registration_document_image',
    type: 'file',
    placeholder: 'Upload VAT registration document',
    label: 'VAT Registration Document',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'pan_registration_number',
    type: 'text',
    placeholder: 'Enter PAN registration number',
    label: 'PAN Registration Number',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'pan_registration_document_image',
    type: 'file',
    placeholder: 'Upload PAN registration document',
    label: 'PAN Registration Document',
    className: 'col-span-1',
    required: true,
  },
  {
    name: 'tax_compliance_document_image',
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
    name: 'website_url',
    type: 'url',
    placeholder: 'Enter website URL',
    label: 'Website URL',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'facebook_url',
    type: 'url',
    placeholder: 'Enter Facebook URL',
    label: 'Facebook URL',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'tiktok_url',
    type: 'url',
    placeholder: 'Enter TikTok URL',
    label: 'TikTok URL',
    className: 'col-span-1',
    required: false,
  },
  {
    name: 'instagram_url',
    type: 'url',
    placeholder: 'Enter Instagram URL',
    label: 'Instagram URL',
    className: 'col-span-1',
    required: false,
  },
];

const ReconditionForm = ({
  userData,
}: {
  userData: {
    user: User | null;
    access: string | null;
  };
}) => {
  console.log('userData', userData);

  const [logoImage, setLogoImage] = React.useState<File | null>(null);

  const [vatRegistrationDocumentImage, setVatRegistrationDocumentImage] =
    React.useState<File | null>(null);

  const [panRegistrationDocumentImage, setPanRegistrationDocumentImage] =
    React.useState<File | null>(null);

  const [taxComplianceDocumentImage, setTaxComplianceDocumentImage] =
    React.useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const { registerRecon } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormProps>({
    // resolver: yupResolver(
    //   activeForm === 'user' ? loginSchema : signupSchema,
    // ) as any,
    mode: 'all',
  });

  const onSubmitHandler = async (data: RegisterFormProps) => {
    setLoading(true);

    try {
      if (userData) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          formData.append(key, value as string | Blob);
        });
        formData.append('owner', userData?.user?.idx);

        if (vatRegistrationDocumentImage) {
          formData.append(
            'vat_registration_document_image',
            vatRegistrationDocumentImage,
          );
        } else {
          enqueueSnackbar('VAT registration document is required.', {
            variant: 'error',
          });
          return;
        }

        if (logoImage) {
          formData.append('logo', logoImage);
        }

        if (panRegistrationDocumentImage) {
          formData.append(
            'pan_registration_document_image',
            panRegistrationDocumentImage,
          );
        }

        if (taxComplianceDocumentImage) {
          formData.append(
            'tax_compliance_document_image',
            taxComplianceDocumentImage,
          );
        }

        // Submit the Recondition Hub data
        const res = await registerRecon(formData);
      }
    } catch (error) {
      console.error('Error during submission:', error);
      enqueueSnackbar(`An error occurred: ${error}`, {
        variant: 'error',
      });
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="grid grid-cols-2 gap-6">
        {reconFields?.map((field) => {
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
                onChange={(e) => {
                  if (e) {
                    if (name === 'logo') {
                      setLogoImage(e as File);
                    }
                    if (name === 'vat_registration_document_image') {
                      setVatRegistrationDocumentImage(e as File);
                    } else if (name === 'pan_registration_document_image') {
                      setPanRegistrationDocumentImage(e as File);
                    } else if (name === 'tax_compliance_document_image') {
                      setTaxComplianceDocumentImage(e as File);
                    }
                  }
                }}
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
          disabled={loading}
        >
          {loading ? 'Submitting..' : 'Submit'}
        </PrimaryButton>
      </div>
    </form>
  );
};

export default ReconditionForm;
