import { convertToValueLabel } from '@/helper';
import { Brand, Category, InputData } from '@/model/type';
import { useEffect, useState, useRef } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { IoIosArrowDown } from 'react-icons/io';

type OptionInputProps = {
  label?: string;
  placeholder?: string;
  name: string;
  value?: string | { idx: string; name: string };
  onChange?: (selectedValue: string) => void;
  className?: string;
  error?: string;
  register?: UseFormRegister<any>;
  setValue?: UseFormSetValue<any>; // To manually set form values
  required?: boolean;
  data?: InputData | Category[] | Brand[];
};

const OptionInput = ({
  label,
  placeholder = 'Select an option',
  name,
  value,
  onChange,
  error,
  className = '',
  register,
  required = false,
  data = [],
  setValue,
}: OptionInputProps) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [options, setOptions] = useState<{ value: string; label: string }[]>(
    [],
  );
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const transformedData = convertToValueLabel(data as InputData);
    setOptions(transformedData);
  }, [data]);

  useEffect(() => {
    if (value) {
      const initialValue = typeof value === 'object' ? value.idx : value;
      setSelectedValue(initialValue);
      if (setValue) setValue(name, initialValue);
    }
  }, [value, name]);

  const handleSelect = (idx: string) => {
    setSelectedValue(idx);
    if (setValue) setValue(name, idx);
    setIsOpen(false);
    if (onChange) onChange(idx);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {label && (
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-bold capitalize text-gray-700"
        >
          {label}: {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <input
        type="text"
        name={name}
        {...register?.(name)}
        hidden
        value={selectedValue}
        readOnly
      />

      <div
        className={`flex w-full cursor-pointer items-center justify-between rounded-md border-2 bg-white p-2 text-sm font-semibold ${
          error
            ? 'border-red-500 text-red-500'
            : 'border-gray-300 text-gray-700'
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {selectedValue
          ? options.find((item) => item.value === selectedValue)?.label ||
            'Select an option'
          : placeholder}
        <IoIosArrowDown className="h-5 w-5 text-gray-500" />
      </div>

      {isOpen && (
        <ul className="scrollbar absolute left-0 z-10 mt-1 max-h-40 w-full overflow-auto rounded-md border bg-white shadow-md">
          {options.length === 0 ? (
            <li className="p-2 text-sm text-gray-500">No options available</li>
          ) : (
            options.map((item) => (
              <li
                key={item.value}
                className={`cursor-pointer px-2 py-1 ${
                  selectedValue === item.value
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-200'
                }`}
                onClick={() => handleSelect(item.value)}
              >
                {item.label}
              </li>
            ))
          )}
        </ul>
      )}

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default OptionInput;
