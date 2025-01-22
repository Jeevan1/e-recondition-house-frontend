import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex h-[300px] w-full items-center justify-center">
      <ClipLoader color="#ff7207" size={30} />
    </div>
  );
};

export default Loader;
