import React, { useEffect, useState, useCallback } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { RxCross2 } from 'react-icons/rx';
import { PrimaryButton } from '../Button';

export default function FeatureField({
  name,
  value = '',
  register,
  setValue,
  error,
  editVehicle = false,
}: {
  name: string;
  value?: string;
  register: UseFormRegister<any>;
  error?: string;
  setValue: UseFormSetValue<any>;
  editVehicle?: boolean;
}) {
  // Convert string to array (handling empty case)
  const [entries, setEntries] = useState<string[]>(
    value ? value.split(',').map((item) => item.trim()) : [],
  );
  const [entryName, setEntryName] = useState<string>('');

  const addEntry = useCallback(() => {
    const trimmedEntries = entryName
      .split(',')
      .map((entry) => entry.trim())
      .filter((entry) => entry !== '' && !entries.includes(entry)); // Prevent empty & duplicate values

    if (trimmedEntries.length === 0) return;

    const updatedEntries = [...entries, ...trimmedEntries];
    setEntries(updatedEntries);
    setEntryName('');
    setValue(name, updatedEntries.join(','), { shouldValidate: true }); // Store as a comma-separated string
  }, [entryName, entries, name, setValue]);

  const removeEntry = useCallback(
    (index: number) => {
      const updatedEntries = entries.filter((_, i) => i !== index);
      setEntries(updatedEntries);
      setValue(name, updatedEntries.join(','), { shouldValidate: true });
    },
    [entries, name, setValue],
  );

  useEffect(() => {
    setValue(name, value || '', { shouldValidate: true });
  }, [name, setValue, value]);

  return (
    <div>
      <input
        type="text"
        {...register(name)}
        value={entries.join(',')}
        readOnly
        className="hidden"
      />
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-bold text-gray-700"
      >
        Features:
      </label>
      <div className="flex flex-wrap items-center gap-2">
        {editVehicle
          ? value.split(',').map((entry, index) => (
              <div
                key={index}
                className="mb-2 inline-flex items-center gap-2 rounded-md border bg-gray-50 px-2 py-1 shadow-sm"
              >
                <span className="text-sm font-semibold capitalize text-primary">
                  {entry.trim()}
                </span>
              </div>
            ))
          : entries.map((entry, index) => (
              <div
                key={index}
                className="mb-2 inline-flex items-center gap-2 rounded-md border bg-gray-50 px-2 py-1 shadow-sm"
              >
                <span className="text-sm font-semibold capitalize text-primary">
                  {entry}
                </span>
                <RxCross2
                  aria-label={`Remove feature: ${entry}`}
                  className="cursor-pointer text-gray-600 hover:text-red-500"
                  onClick={() => removeEntry(index)}
                />
              </div>
            ))}
      </div>
      {!editVehicle && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Enter features (comma-separated)"
            value={entryName}
            onChange={(e) => setEntryName(e.target.value)}
            className={`w-full rounded-md border-2 border-gray-300 px-2 py-2 text-sm font-semibold text-gray-600 focus:outline-primary ${
              error ? 'border-red-500' : ''
            }`}
          />
          {error && (
            <p className="absolute bottom-[-20px] text-sm text-red-500">
              {error}
            </p>
          )}
          <PrimaryButton
            className="h-[38px] w-[80px]"
            onClick={addEntry}
            aria-label="Add feature"
          >
            Add
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}
