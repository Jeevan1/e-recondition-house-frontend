'use client';
import React from 'react';
import { PrimaryButton } from '../Button';
import FormInput from '../InputField/FormInput';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { Contact } from '@/model/type';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactSchema } from '@/schemas/contactSchema';

const handleError = (errorResponse: { [key: string]: string | string[] }) => {
  if (typeof errorResponse === 'object') {
    Object.entries(errorResponse).forEach(([key, value]) => {
      const messages = Array.isArray(value) ? value : [value];
      messages.forEach((message) =>
        enqueueSnackbar(`${key}: ${message}`, { variant: 'error' }),
      );
    });
  } else {
    enqueueSnackbar(errorResponse || 'An unexpected error occurred', {
      variant: 'error',
    });
  }
};

const ContactForm = () => {
  const [loading, setLoading] = React.useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm<Contact>({
    mode: 'all',
    resolver: yupResolver(contactSchema),
  });
  const onSubmit = async (contactData: Contact) => {
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(contactData).forEach(([key, value]) => {
        formData.append(key, value as string);
      });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/contactus/`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (response.ok) {
        setLoading(false);
        enqueueSnackbar('Message sent successfully', {
          variant: 'success',
        });
        reset();
      }

      if (!response.ok) {
        const errorResponse = await response.json();
        handleError(errorResponse);
        enqueueSnackbar('Failed to send message', {
          variant: 'error',
        });
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof Error) {
        enqueueSnackbar(error.message, {
          variant: 'error',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 sm:p-6">
      <h1 className="text-lg font-bold text-primary md:text-xl">
        Contact With Us
      </h1>
      <form
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="flex h-full flex-col gap-5 py-5 sm:grid sm:grid-cols-2"
      >
        <FormInput
          type="text"
          name="name"
          label="Enter Name"
          placeholder="Your Name"
          height="h-[45px]"
          register={register}
          error={errors.name?.message}
        />
        <FormInput
          type="email"
          name="email"
          label="Email"
          height="h-[45px]"
          placeholder="Your Email"
          register={register}
          error={errors.email?.message}
        />
        <FormInput
          type="text"
          name="subject"
          label="Subject"
          height="h-[45px]"
          placeholder="Subject"
          register={register}
          error={errors.subject?.message}
        />
        <FormInput
          type="number"
          name="phone_number"
          label="Phone Number"
          placeholder="Phone"
          height="h-[45px]"
          register={register}
          error={errors.phone_number?.message}
        />
        <FormInput
          type="textarea"
          name="message"
          label="Message"
          placeholder="Message"
          className="col-span-2"
          register={register}
          error={errors.message?.message}
        />
        <div className="col-span-2">
          <PrimaryButton type="submit" className="" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
