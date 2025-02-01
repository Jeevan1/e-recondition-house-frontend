'use client';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Image, { StaticImageData } from 'next/image';

export default function ImageWithView({
  height = 500,
  width = 500,
  image,
  alt,
}: {
  height?: number;
  width?: number;
  image: string | StaticImageData;
  alt: string;
}) {
  const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
  const [isBrowser, setIsBrowser] = useState(false);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    setIsBrowser(true);
    if (isFullScreen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = '';
      document.body.style.height = 'auto';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.height = 'auto';
    };
  }, [isFullScreen]);

  const FullScreenModal = (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-white transition-opacity duration-1000 ease-in-out ${
        isFullScreen ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      <Image
        src={image}
        alt={alt}
        height={1000}
        width={1000}
        className="h-full w-full cursor-pointer rounded-md object-cover object-center p-4 sm:p-8"
        onClick={toggleFullScreen}
      />
      <button
        type="button"
        className="absolute right-4 top-4 z-50 flex items-center justify-center rounded-full bg-white p-2 text-black shadow-lg"
        onClick={toggleFullScreen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
    </div>
  );

  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-white">
      <Image
        src={image}
        alt={alt}
        height={height}
        width={width}
        className="h-full w-full cursor-pointer object-cover object-center"
        onClick={toggleFullScreen}
      />

      {/* Fullscreen Modal in Portal */}
      {isFullScreen &&
        isBrowser &&
        ReactDOM.createPortal(FullScreenModal, document.body)}
    </div>
  );
}
