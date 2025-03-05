import { reduceName } from '@/helper';
import React from 'react';
import {
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegister,
} from 'react-hook-form';

type FormInputProps = {
  label?: string;
  placeholder: string;
  type: string;
  name: string;
  value?: any;
  onChange?: (e: string | boolean | File | null) => void;
  className?: string;
  error?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | undefined;
  register?: UseFormRegister<any>;
  required?: boolean;
  height?: string;
  props?: any;
};

const FormInput = ({
  label,
  placeholder,
  type,
  name,
  value = '',
  onChange = () => {},
  error,
  className,
  register,
  required,
  height,
  props,
}: FormInputProps) => {
  const inputClass = `w-full rounded-md border-2 px-2 py-2 text-sm font-semibold text-gray-600 focus:outline-primary ${error ? 'border-red-500' : 'border-gray-300'} ${height} ${className}`;

  return (
    <div className="relative w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-bold text-gray-700"
        >
          {label}: {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === 'file' ? (
        <input
          type={type}
          name={name}
          accept="image/*"
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => {
            const file = e.target.files ? e.target.files[0] : null;
            if (!file) return;
            const renamedFile = new File([file], reduceName(file.name, name), {
              type: file.type,
            });

            onChange(renamedFile);
          }}
          className={inputClass}
          {...props}
        />
      ) : type === 'checkbox' ? (
        <input
          type={type}
          name={name}
          defaultChecked={value}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.checked)}
          className={`w-[20px] ${inputClass}`}
        />
      ) : type === 'textarea' ? (
        <textarea
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={value}
          className={`${inputClass}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={value}
          className={inputClass}
        />
      )}
      {error && (
        <p className="absolute bottom-[-20px] text-sm text-red-500">
          {error.toString()}
        </p>
      )}
    </div>
  );
};

export default FormInput;
