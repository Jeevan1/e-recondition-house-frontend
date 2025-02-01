import Loader from '@/components/Loader';
import React from 'react';

const loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center text-3xl">
      <Loader />
    </div>
  );
};

export default loading;
