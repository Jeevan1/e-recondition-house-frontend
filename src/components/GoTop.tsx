'use client';
import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleUp } from 'react-icons/fa';

const GoTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 text-3xl text-secondary transition-opacity duration-300 md:text-4xl ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <FaArrowAltCircleUp />
    </button>
  );
};

export default GoTop;
