import React from 'react';

import data from '@/data.json';
import { webUrl } from '@/utils/constant';
import { CgNotes } from 'react-icons/cg';

export const metadata = {
  title: 'Terms and Conditions | Recondition Hub',
  description:
    'Read the Terms and Conditions of Recondition Hub. Learn about our policies regarding purchases, warranties, and user agreements.',
  openGraph: {
    title: 'Terms and Conditions | Recondition Hub',
    description:
      'Stay informed about Recondition Hub’s policies on purchases, warranties, and services. Read our full Terms and Conditions here.',
    url: webUrl + '/terms',
    siteName: 'Recondition Hub',
    locale: 'en_US',
    type: 'article',
  },
};

export default function TermsAndConditions() {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container">
        <h1 className="mb-4 inline-flex items-center gap-1 border-b-2 border-dashed border-secondary text-2xl font-bold text-secondary">
          <CgNotes size={24} />
          <span>Terms and Conditions</span>
        </h1>
        <p className="mb-4 font-semibold text-gray-600">
          Welcome to Recondition Hub! By using our platform, you agree to the
          following terms and conditions. Please read them carefully before
          using the service.
        </p>
        <div className="space-y-6">
          {data?.terms?.map((section, index) => (
            <section key={index}>
              <h2 className="text-lg font-bold">
                {index + 1}. {section.title}
              </h2>
              <ul className="list-disc pl-9">
                {section.content?.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="mt-1 font-semibold text-gray-600"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
