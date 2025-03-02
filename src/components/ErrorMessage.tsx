import React from 'react';

const ErrorMessage = ({ error }: { error?: string }) => {
  return (
    <div className="container min-h-[300px] py-10">
      <span className="text-xl font-bold text-red-500">
        {error || 'Something went wrong'}
      </span>
    </div>
  );
};

export default ErrorMessage;
