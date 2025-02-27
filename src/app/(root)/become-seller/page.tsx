import { SecondaryButton } from '@/components/Button';
import React from 'react';
import {
  TiAnchorOutline,
  TiArrowRepeatOutline,
  TiWeatherWindyCloudy,
} from 'react-icons/ti';
import data from '@/data.json';
import { baseUrl } from '@/utils/constant';

export const generateMetadata = () => {
  return {
    title: 'Become a Seller | Recondition Hub',
    description: 'Generated by create next app',
    openGraph: {
      title: 'Become a Seller | Recondition Hub',
      description: 'Generated by create next app',
      url: baseUrl + '/become-seller',
    },
  };
};

const BecomeSellerPage = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="container">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Become a Seller</h1>
          <p className="mt-2 text-2xl font-semibold leading-5 text-gray-600 sm:text-4xl">
            No hidden charge Choose your pricing plan.
          </p>
        </div>
        <div className="mt-10 grid grid-cols-1 items-center gap-5 sm:grid-cols-2 md:grid-cols-3">
          {data?.subscriptions?.map((item, idx) => (
            <div className="rounded-md bg-white py-7 shadow-black duration-200 hover:shadow-lg">
              <div className="flex items-center justify-center gap-3 border-b pb-7">
                <span className="text-4xl text-accent">
                  {idx == 0 && <TiWeatherWindyCloudy />}
                  {idx == 1 && <TiAnchorOutline />}
                  {idx == 2 && <TiArrowRepeatOutline />}
                </span>
                <div className="">
                  <h1 className="text-xl font-semibold">{item.name}</h1>
                  <p className="text-2xl font-bold text-primary">
                    {item.price}
                    <span className="text-md">
                      {idx == 0 ? ' ' : ' / Year'}
                    </span>
                  </p>
                </div>
              </div>
              <div className="px-10 py-7">
                {item.features?.map((feature, i) => (
                  <p className="text-md border-b py-4 text-center font-medium last:border-0">
                    {feature}
                  </p>
                ))}
              </div>
              <div className="text-center">
                <SecondaryButton>CHOOSE PLAN</SecondaryButton>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BecomeSellerPage;
