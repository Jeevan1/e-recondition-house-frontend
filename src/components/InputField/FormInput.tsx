import React from "react";
import { UseFormRegister } from "react-hook-form";

type FormInputProps = {
  label?: string;
  placeholder: string;
  type: string;
  name: string;
  value?: any;
  onChange?: (e: string | boolean | File | null) => void;
  className?: string;
  error?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  height?: string;
};

const FormInput = ({
  label,
  placeholder,
  type,
  name,
  value = "",
  onChange = () => {},
  error,
  className,
  register,
  required,
  height,
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
          accept="image/*"
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.files ? e.target.files[0] : null)}
          className={`w-full rounded-md border-2 border-gray-300 px-2 py-2 text-xs font-semibold text-gray-600 focus:outline-primary ${error ? "border-red-500" : ""} ${height}`}
        />
      ) : type === "checkbox" ? (
        <input
          type={type}
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={``}
        />
      ) : type === "textarea" ? (
        <textarea
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={value}
          className={`w-full rounded-md border-2 border-gray-300 px-2 py-2 text-sm font-semibold text-gray-600 focus:outline-primary ${error ? "border-red-500" : ""} ${height}`}
        />
      ) : (
        <input
          type={type}
          name={name}
          {...(register && register(name))}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          defaultValue={value}
          className={`w-full rounded-md border-2 border-gray-300 px-2 py-2 text-sm font-semibold text-gray-600 focus:outline-primary ${error ? "border-red-500" : ""} ${height}`}
        />
      )}
      {error && (
        <p className="absolute bottom-[-20px] text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default FormInput;
