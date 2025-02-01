import React from 'react';

const EmptyMessage = ({
  message = 'No Vehicles Found',
}: {
  message: string;
}) => {
  return <p className="container min-h-[300px] py-10">{message}</p>;
};

export default EmptyMessage;
