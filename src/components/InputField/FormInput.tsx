import React from "react";

type FormInputProps = {
  label?: string;
  placeholder: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: string) => void;
  className?: string;
};

const FormInput = ({
  label,
  placeholder,
  type,
  name,
  value,
  onChange,
  className,
}: FormInputProps) => {
  return (
    <div className={`${className}`}>
      {label && <label htmlFor="">{label}</label>}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-md border-2 border-gray-300 px-2 py-2 text-sm focus:outline-primary"
      />
    </div>
  );
};

export default FormInput;
