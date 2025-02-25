'use client';
import React from 'react';
import Image, { StaticImageData } from 'next/image';
import dynamic from 'next/dynamic';
import ImageWithView from './ImageWithView';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

const Arrow = ({
  className,
  style,
  onClick,
  direction,
}: {
  className?: string;
  style?: object;
  onClick?: () => void;
  direction: string;
}) => (
  <div
    className={`${className}`}
    style={{
      ...style,
      transform: direction === 'prev' ? 'rotate(180deg)' : 'rotate(0deg)',
    }}
    onClick={onClick}
    aria-label={direction === 'next' ? 'Next Slide' : 'Previous Slide'}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
      height="24"
      width="24"
      viewBox="0 -960 960 960"
    >
      <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
    </svg>
  </div>
);

type ImagesProps = {
  image: StaticImageData | string;
  idx: string;
};

const CustomPagingSlider = ({
  images,
  featured_image,
  alt = '',
}: {
  images: ImagesProps[];
  featured_image: string;
  alt?: string;
}) => {
  images = [...images, { image: featured_image, idx: '0' }];

  if (!images || images.length === 0) {
    images = [{ image: '/assets/fallback/image.png', idx: '1' }];
  }

  const settings = {
    customPaging: (i: number) => (
      <div className="cursor-pointer rounded-md border-2 p-1">
        <Image
          src={images[i].image}
          alt={`${alt} ${i + 1}`}
          width={100}
          height={100}
          className="h-[30px] w-[100px] object-cover sm:h-[40px] md:h-[50px]"
        />
      </div>
    ),
    dots: true,
    dotsClass: 'slick-dots-custom slick-thumb-custom',
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images?.map((image, index) => (
          <div
            key={index}
            className="h-[300px] w-full rounded-lg border-2 border-primary object-cover p-1 sm:h-[350px] md:h-[350px]"
          >
            <ImageWithView image={image.image} alt={alt} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomPagingSlider;
