import { convertToValueLabel } from "@/helper";
import React, { useEffect, useState } from "react";
import { UseFormRegister } from "react-hook-form";

type OptionInputProps = {
  label?: string;
  placeholder?: string;
  name: string;
  value?: string | { idx: string; name: string };
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  error?: string;
  register?: UseFormRegister<any>;
  required?: boolean;
  data?: string[] | { idx: string; name: string }[];
};

const OptionInput = ({
  label,
  placeholder = "Select an option",
  name,
  value,
  onChange,
  error,
  className = "",
  register,
  required = false,
  data = [],
}: OptionInputProps) => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );

  useEffect(() => {
    const transformedData = convertToValueLabel(data);
    setOptions(transformedData);
  }, [data]);

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
      <select
        name={name}
        id={name}
        defaultValue={typeof value === "object" ? value?.idx : value}
        onChange={onChange}
        {...(register && register(name))}
        className={`block h-[40px] w-full rounded-md border-2 p-1 text-sm font-semibold focus:border-primary ${
          error
            ? "border-red-500 text-red-500"
            : "border-gray-300 text-gray-500"
        }`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="absolute bottom-[-20px] left-0 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default OptionInput;
