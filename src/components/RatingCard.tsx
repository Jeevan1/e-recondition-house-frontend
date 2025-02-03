import { getRelativeTime } from '@/helper';
import { Rating } from '@/model/type';
import Image from 'next/image';
import React from 'react';
import { BiDislike, BiLike } from 'react-icons/bi';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaStar, FaRegStar } from 'react-icons/fa6';

const RatingCard = ({ data }: { data: Rating }) => {
  const renderStars = (stars: number) => {
    const fullStars = Math.floor(stars);
    const hasHalfStar = stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }, (_, index) => (
          <FaStar key={`full-${index}`} className="text-primary" />
        ))}
        {hasHalfStar && <FaStarHalfAlt className="text-primary" />}
        {Array.from({ length: emptyStars }, (_, index) => (
          <FaRegStar key={`empty-${index}`} className="text-primary" />
        ))}
      </>
    );
  };
  return (
    <div className="rounded-md bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnSA1zygA3rubv-VK0DrVcQ02Po79kJhXo_A&s"
            alt=""
            width={50}
            height={50}
            className="rounded-full border border-primary object-cover p-1"
          />
          <div className="">
            <p className="text-sm font-bold text-gray-700">{data.name} </p>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="flex items-center space-x-[1px] text-xs">
                {renderStars(data.stars || 0)}
              </span>
              <p className="text-xs font-semibold text-gray-500">
                {getRelativeTime(data.upload_time)}
              </p>
            </div>
          </div>
        </div>
        <BsThreeDotsVertical className="cursor-pointer text-gray-500 hover:text-primary" />
      </div>

      <p className="mt-3 line-clamp-5 text-sm font-semibold text-gray-500">
        {data.review}
      </p>
      {/* <div className="mt-3 flex flex-wrap items-center gap-2">
        {data.images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt=""
            width={100}
            height={100}
            className="h-[80px] w-[100px] cursor-pointer rounded-md border border-secondary object-cover p-1"
          />
        ))}
      </div> */}
      <p className="mt-3 space-x-2">
        <span className="text-sm font-semibold text-gray-500">Helpful?</span>
        <BiLike className="inline cursor-pointer text-gray-700 hover:text-primary" />
        <BiDislike className="inline cursor-pointer text-gray-700 hover:text-primary" />
      </p>
    </div>
  );
};

export default RatingCard;
