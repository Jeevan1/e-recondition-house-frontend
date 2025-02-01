import React from 'react';

const MessageCard = ({
  children,
  color,
}: {
  color?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-4 rounded-md bg-white p-4 hover:shadow-md">
      <div className={`text-md font-semibold ${color || 'text-primary'} `}>
        {children}
      </div>
    </div>
  );
};

export default MessageCard;
