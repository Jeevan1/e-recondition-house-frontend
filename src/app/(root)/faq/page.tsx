'use client';
import React, { useState } from 'react';
import data from '@/data.json';
import SectionHeading from '@/components/SectionHeading';

const FaqPage = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Function to toggle the visibility of an answer
  const toggleAnswer = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="py-10">
      <div className="container">
        <SectionHeading
          title="Frequently Asked Questions"
          type="add"
          className="text-xl"
        />
        <div className="mt-4 space-y-4">
          {data?.faqs?.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <div
                className="flex cursor-pointer items-center justify-between py-4"
                onClick={() => toggleAnswer(index)}
              >
                <h2 className="text-md font-semibold">{faq.question}</h2>
                <span className="text-gray-500">
                  {expandedIndex === index ? '-' : '+'}
                </span>
              </div>
              {expandedIndex === index && (
                <div className="bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FaqPage;
