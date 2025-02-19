'use client';
import React, { useEffect, useState } from 'react';
import { PrimaryButton } from '../Button';
import { User } from '@/types/auth';
import FormInput from '../InputField/FormInput';
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import ReconditionForm from './ReconditionForm';
import { ClipLoader } from 'react-spinners';
import { handleError } from '@/helper';
import { useAuth } from '@/context/AuthContext';
import { signupSchema } from '@/schemas/registerSchema';
import { loginSchema } from '@/schemas/loginSchema';
import { yupResolver } from '@hookform/resolvers/yup';

type FieldsProps = {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  className: string;
  required: boolean;
};

const userFields: FieldsProps[] = [
  {
    name: 'email',
    type: 'text',
    placeholder: 'Enter your email',
    label: 'Email',
    className: '',
    required: true,
  },
  {
    name: 'username',
    type: 'text',
    placeholder: 'Enter your username',
    label: 'Username',
    className: '',
    required: true,
  },
  {
    name: 'password',
    type: 'password',
    placeholder: 'Enter your password',
    label: 'Password',
    className: '',
    required: true,
  },
  {
    name: 'confirmPassword',
    type: 'password',
    placeholder: 'Confirm your password',
    label: 'Confirm Password',
    className: '',
    required: true,
  },
];

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [activeForm, setActiveForm] = useState<'user' | 'recondition'>('user');
  const [userData, setUserData] = useState<{
    user: User | null;
    access: string | null;
  }>({
    user: null,
    access: null,
  });

  const { login, setIsAuthenticated } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(loginSchema) as any,
    mode: 'all',
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('activeReconUser');

    if (storedUser && !userData.access && !userData.user) {
      setUserData(JSON.parse(storedUser));

      if (activeForm !== 'recondition') {
        setActiveForm('recondition');
      }
    }
  }, []);

  const onSubmitHandler = async (data: User) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/auth/users/`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        handleError(errorResponse);
        return;
      }

      const user = await response.json();
      const access = await login(data.username, data.password);

      if (user && access) {
        setUserData({ user, access });
        localStorage.setItem(
          'activeReconUser',
          JSON.stringify({ user, access }),
        );
        enqueueSnackbar(
          'Signup success. Please Fill out the recondition form.',
          {
            variant: 'success',
          },
        );
        setActiveForm('recondition');
      }
    } catch (error) {
      enqueueSnackbar('Sign up failed. Please try again.', {
        variant: 'error',
      });
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {activeForm === 'user' && !userData.access && !userData.user ? (
        <form className="mt-6" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="grid grid-cols-1 gap-6">
            {userFields.map(
              ({ name, type, placeholder, label, className, required }) => (
                <FormInput
                  key={name}
                  label={label}
                  placeholder={placeholder}
                  type={type}
                  name={name}
                  register={register}
                  className={className}
                  required={required}
                  error={errors[name]?.message}
                />
              ),
            )}
          </div>
          <div className="mt-10">
            <PrimaryButton
              type="submit"
              className="h-[40px] w-[150px] text-[14px] font-bold"
            >
              {loading ? <ClipLoader color="#ff7207" size={20} /> : 'Next'}
            </PrimaryButton>
          </div>
        </form>
      ) : activeForm === 'recondition' && userData.access && userData.user ? (
        <ReconditionForm userData={userData} />
      ) : null}
    </div>
  );
};

export default RegisterForm;
