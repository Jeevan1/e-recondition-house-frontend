import React, { useEffect, useState, useCallback } from 'react';
import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { RxCross2 } from 'react-icons/rx';
import Image, { StaticImageData } from 'next/image';
import { FcAddImage } from 'react-icons/fc';
import Cookies from 'js-cookie';
import { LuTrash2 } from 'react-icons/lu';
import { RiImageEditLine } from 'react-icons/ri';
import { FaRegEye } from 'react-icons/fa';
import { reduceName } from '@/helper';

export default function ImagesField({
  name,
  value = [],
  register,
  setValue,
  error,
  editVehicle = false,
  vehicleIdx,
  label,
}: {
  name: string;
  value?: { idx: string; image: string; vehicle: string }[];
  register: UseFormRegister<any>;
  error?: string;
  setValue: UseFormSetValue<any>;
  editVehicle?: boolean;
  vehicleIdx?: string;
  label?: string;
}) {
  const [images, setImages] = useState<
    { idx?: string; image: File | string; vehicle?: string }[]
  >(value || []);

  const [viewImage, setViewImage] = useState<{
    isOpen: boolean;
    image: string;
  }>({
    isOpen: false,
    image: '',
  });

  const accessToken = Cookies.get('accessToken');

  const handleImageUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;

      if (!files || files.length === 0) return;

      const formData = new FormData();

      Array.from(files).forEach((file) => {
        const newFile = new File([file], reduceName(file.name), {
          type: file.type,
        });
        console.log(newFile);

        formData.append('image', newFile);
      });

      if (!editVehicle) {
        const updatedImages = [
          ...images,
          ...Array.from(files)?.map((file) => ({
            image: new File([file], reduceName(file.name), { type: file.type }),
          })),
        ];
        setImages(updatedImages);
        setValue(name, updatedImages, { shouldValidate: true });
        return;
      }

      formData.append('vehicle', vehicleIdx || '');

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/${vehicleIdx}/images/`,
          {
            method: 'POST',
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          enqueueSnackbar('Error uploading image', { variant: 'error' });
          return;
        }

        const data = await response.json();

        const updatedImages = [...images, data];
        setImages(updatedImages);
        setValue(name, updatedImages, { shouldValidate: true });

        enqueueSnackbar('Image uploaded successfully!', { variant: 'success' });
      } catch (error) {
        console.error('Image upload error:', error);
        enqueueSnackbar('Failed to upload image', { variant: 'error' });
      }
    },
    [images, name, setValue, vehicleIdx],
  );

  const removeImage = useCallback(
    async (index: number, img_idx?: string) => {
      if (editVehicle && img_idx) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/${vehicleIdx}/images/${img_idx}/`,
            {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${accessToken}` },
            },
          );

          if (!response.ok) {
            const errorData = await response.json();
            console.error('Image delete error:', errorData);
            throw new Error(errorData.message || 'Failed to delete image');
          }

          enqueueSnackbar('Image deleted successfully!', {
            variant: 'success',
          });

          setImages((prevImages) => prevImages.filter((_, i) => i !== index));
          setValue(
            name,
            images.filter((_, i) => i !== index),
            { shouldValidate: true },
          );
        } catch (error) {
          console.error('Error deleting image:', error);
          enqueueSnackbar('Error deleting image. Please try again.', {
            variant: 'error',
          });
          return;
        }
      } else {
        setImages((prevImages) => prevImages.filter((_, i) => i !== index));
        setValue(
          name,
          images.filter((_, i) => i !== index),
          { shouldValidate: true },
        );
      }
    },
    [images, name, setValue, editVehicle, vehicleIdx],
  );

  const x = useCallback(
    async (
      e: React.ChangeEvent<HTMLInputElement>,
      idx?: string,
      index?: number,
    ) => {
      e.preventDefault();

      if (
        !idx ||
        index === undefined ||
        index === null ||
        !editVehicle ||
        !vehicleIdx
      )
        return;

      if (!e.target.files || e.target.files.length === 0) return;

      const newFile = e.target.files[0];
      const formData = new FormData();
      formData.append('image', newFile);

      formData.append('vehicle', vehicleIdx);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/vehicles/${vehicleIdx}/images/${idx}/`,
          {
            method: 'PUT',
            body: formData,
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        );

        if (!response.ok) {
          enqueueSnackbar('Error uploading image', { variant: 'error' });
          return;
        }

        const data = await response.json();

        const objectURL = URL.createObjectURL(newFile);
        const updatedImages = images?.map((image, i) =>
          i === index ? { ...image, image: objectURL } : image,
        );

        setImages(updatedImages);
        setValue(name, updatedImages, { shouldValidate: true });

        enqueueSnackbar('Image updated successfully!', { variant: 'success' });
        return () => URL.revokeObjectURL(objectURL);
      } catch (error) {
        console.error('Error uploading image:', error);
        enqueueSnackbar('Error uploading image. Please try again.', {
          variant: 'error',
        });
      }
    },
    [images, editVehicle, vehicleIdx, name, setValue],
  );

  useEffect(() => {
    setImages(value || []);
    setValue(name, value, { shouldValidate: true });
  }, [name, setValue]);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
        id={name}
      />
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-bold text-gray-700"
      >
        {label || 'Upload Images:'}
      </label>

      <div className="mb-4 flex flex-wrap items-center gap-4 overflow-hidden">
        {images?.map((imgSrc, index) => (
          <div key={index} className="group relative mt-2 inline-block">
            <Image
              src={
                imgSrc.image instanceof File
                  ? URL.createObjectURL(imgSrc.image)
                  : imgSrc.image
              }
              alt={`Uploaded ${index}`}
              width={150}
              height={100}
              className="h-28 w-36 rounded-md object-cover shadow-md"
            />
            <div className="relative bottom-8 left-1 right-1 flex cursor-pointer items-center justify-center gap-3 transition-all duration-300 ease-in-out sm:absolute sm:bottom-0 sm:translate-y-full sm:opacity-0 sm:group-hover:-translate-y-2 sm:group-hover:opacity-100">
              <LuTrash2
                size={26}
                onClick={() => removeImage(index, imgSrc.idx)}
                className="cursor-pointer rounded-full border-2 border-red-500 bg-white p-1 text-red-500 hover:bg-red-500 hover:text-white"
              />
              <div className="relative cursor-pointer rounded-full bg-white text-green-500 hover:bg-green-500 hover:text-white">
                <RiImageEditLine
                  size={26}
                  className="cursor-pointer p-1"
                  onClick={() =>
                    document.getElementById(`edit-image-${index}`)?.click()
                  }
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => x(e, imgSrc.idx, index)}
                  className="hidden"
                  id={`edit-image-${index}`}
                />
              </div>
              <FaRegEye
                size={26}
                onClick={() =>
                  setViewImage({
                    isOpen: true,
                    image:
                      imgSrc.image instanceof File
                        ? URL.createObjectURL(imgSrc.image)
                        : imgSrc.image,
                  })
                }
                className="cursor-pointer rounded-full border-2 border-secondary bg-white p-1 text-secondary hover:bg-secondary hover:text-white"
              />
            </div>
            {viewImage.isOpen && (
              <div className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-gray-100 p-10">
                <div className="overflow-hidden">
                  <Image
                    src={viewImage.image}
                    alt={`View ${index}`}
                    width={500}
                    height={500}
                    className="h-full w-full rounded-md border-2 object-cover"
                  />
                </div>
                <button
                  type="button"
                  className="absolute right-6 top-6 rounded-full bg-red-500 p-1 text-white"
                  onClick={() => setViewImage({ isOpen: false, image: '' })}
                >
                  <RxCross2 size={20} />
                </button>
              </div>
            )}
            <button
              type="button"
              aria-label={`Remove image ${index}`}
              className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white shadow-md"
              onClick={() => removeImage(index, imgSrc.idx)}
            >
              <RxCross2 size={12} />
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <span className="flex h-20 w-32 items-center gap-2 rounded-md border-2 border-dashed border-gray-300">
          <label
            htmlFor={name}
            className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-2 text-sm font-semibold text-gray-600"
          >
            <FcAddImage size={20} />
            Select Images
          </label>
        </span>

        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
}
