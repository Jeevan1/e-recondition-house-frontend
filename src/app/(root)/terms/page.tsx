import React from 'react';

import data from '@/data.json';
import { webUrl } from '@/utils/constant';

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
        <h1 className="mb-4 text-2xl font-bold">Terms and Conditions</h1>
        <div className="space-y-4">
          {data?.terms?.map((section, index) => (
            <section key={index}>
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="text-sm text-gray-600">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
