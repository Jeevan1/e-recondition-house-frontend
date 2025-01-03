import { ErrorMessage } from "formik";
import React from "react";
import { UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label?: string;
  placeholder: string;
  type: string;
  name: string;
  value?: string | number | boolean | File | null;
  onChange?: (e: string | boolean | File | null) => void;
  className?: string;
  error?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
};

const FormInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange = () => {},
  error,
  className,
  register,
  required,
}: FormInputProps) => {
  return (
    <div className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-bold text-gray-700"
        >
          {label}: {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {type === "file" ? (
        <input
          type={type}
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`w-full rounded-md border-2 border-gray-300 px-2 py-2 text-sm focus:outline-primary ${error ? "border-red-500" : ""}`}
        />
      ) : type === "checkbox" ? (
        <input
          type={type}
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`w-full rounded-md border-2 border-gray-300 px-2 py-2 text-sm focus:outline-primary ${error ? "border-red-500" : ""}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          required
          className={`w-full rounded-md border-2 border-gray-300 px-2 py-2 text-sm focus:outline-primary ${error ? "border-red-500" : ""}`}
        />
      )}
      {error && (
        <p className="absolute bottom-[-20px] text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
