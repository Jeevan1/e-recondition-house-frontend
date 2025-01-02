"use client";
import React from "react";

import Image from "next/image";
import dynamic from "next/dynamic";
import { Settings } from "react-slick";

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

      transform: direction === "prev" ? "rotate(180deg)" : "rotate(0deg)",
    }}
    onClick={onClick}
    aria-label={direction === "next" ? "Next Slide" : "Previous Slide"}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      stroke="black"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
    >
      <path d="m242-200 200-280-200-280h98l200 280-200 280h-98Zm238 0 200-280-200-280h98l200 280-200 280h-98Z" />
    </svg>
  </div>
);

const CustomPagingSlider = ({ images }: { images: string[] }) => {
  const Slider = dynamic(() => import("react-slick"), { ssr: false });
  const settings: Settings = {
    customPaging: function (i: number) {
      return (
        <div className="cursor-pointer rounded-md border-2 p-1">
          <Image
            src={images[i]}
            alt={`Thumbnail ${i + 1}`}
            width={100} // Adjust thumbnail width
            height={100} // Adjust thumbnail height
            className="md-h-[50px] h-[30px] w-[100px] object-cover sm:h-[40px]"
          />
        </div>
      );
    },
    dots: true,
    dotsClass: "slick-dots-custom slick-thumb-custom",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <Arrow direction="next" />,
    prevArrow: <Arrow direction="prev" />,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="rounded-lg border-2 border-primary p-1">
            <Image
              src={image}
              alt={`Slide ${index + 1}`}
              width={800}
              height={600}
              priority
              className="md-h-[300px] h-[200px] w-full object-cover sm:h-[250px]"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CustomPagingSlider;
