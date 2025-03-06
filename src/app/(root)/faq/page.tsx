import Faqs from '@/components/Faqs';
import React from 'react';

export const metadata = {
  title: 'FAQs | Recondition Hub',
  description:
    'Find answers to your most frequently asked questions about reconditioned vehicles, warranties, purchases, and more at Recondition Hub.',
  openGraph: {
    title: 'FAQs | Recondition Hub',
    description:
      'Browse frequently asked questions about reconditioned vehicles, warranties, purchase processes, and more at Recondition Hub.',
    locale: 'en_US',
    type: 'website',
  },
};

const FaqPage = () => {
  return <Faqs />;
};

export default FaqPage;
