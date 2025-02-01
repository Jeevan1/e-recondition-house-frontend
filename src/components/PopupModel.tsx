'use client';
import { useState, useRef } from 'react';

export default function PopupModal({
  title = '',
  description = '',
  label,
  onClick,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement | null>(null);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    if (!isPopupOpen) {
      document.body.classList.add('overflow-hidden');
      document.body.classList.add('h-screen');
    } else {
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('h-screen');
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsPopupOpen(false);
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('h-screen');
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsPopupOpen(false);
      document.body.classList.remove('overflow-hidden');
      document.body.classList.remove('h-screen');
    }
  };

  if (isPopupOpen) {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
  } else {
    document.removeEventListener('mousedown', handleClickOutside);
    document.removeEventListener('keydown', handleKeyDown);
  }

  return (
    <div className="" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          togglePopup();
        }}
      >
        {children}
      </button>

      {isPopupOpen && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">
          <div
            ref={popupRef}
            className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="md:text-md font-bold">{title}</h2>
              <button
                type="button"
                className="text-2xl text-gray-500 hover:text-gray-700"
                onClick={togglePopup}
              >
                &times;
              </button>
            </div>
            <div className="mb-4">
              <p className="text-sm">{description}</p>
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                className="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                onClick={onClick}
              >
                {label}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
