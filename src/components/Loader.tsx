import React from 'react';
import { ClipLoader } from 'react-spinners';

const Loader = ({ size, ...props }: { size?: number; height?: string }) => {
  return (
    <span
      className={`flex w-full items-center justify-center ${props.height || 'h-[300px]'}`}
    >
      <ClipLoader color="#ff7207" size={30} />
    </span>
  );
};

export default Loader;
