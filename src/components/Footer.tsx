import React from 'react';
import { FaRankingStar, FaWhatsapp } from 'react-icons/fa6';
import { GrCompare } from 'react-icons/gr';
import { LiaTagSolid, LiaViber } from 'react-icons/lia';
import { TbTruckDelivery } from 'react-icons/tb';
import data from '../data.json';
import Link from 'next/link';
import { RiMessengerFill } from 'react-icons/ri';
import FooterForm from './FooterForm';
import { IconType } from 'react-icons';

type FeatureProps = {
  id: number;
  title: string;
  subtitle: string;
  icon: IconType;
};

const features: FeatureProps[] = [
  {
    id: 1,
    title: "Nepal's #1",
    subtitle: 'Vehicle Marketplace',
    icon: FaRankingStar,
  },
  {
    id: 2,
    title: 'Vehicle Sold',
    subtitle: 'Everyday',
    icon: TbTruckDelivery,
  },
  {
    id: 3,
    title: 'Offers',
    subtitle: 'Get the best offers',
    icon: LiaTagSolid,
  },
  {
    id: 4,
    title: 'Compare',
    subtitle: 'Decide the real deal',
    icon: GrCompare,
  },
];

const Footer = () => {
  return (
    <div className="min-h-40 bg-white">
      <div className="container border-b-2 border-dashed border-gray-300">
        <div className="grid grid-cols-2 items-center gap-4 py-6 sm:grid-cols-2 md:grid-cols-4">
          {features?.map((feature: FeatureProps) => (
            <div key={feature.id} className="flex items-center space-x-3 py-2">
              <feature.icon size={35} className="text-primary" />
              <div className="">
                <p className="text-xl font-semibold">{feature.title}</p>
                <p className="text-sm font-semibold text-gray-500">
                  {feature.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container">
        <div className="grid grid-cols-1 gap-6 py-8 sm:grid-cols-2 md:grid-cols-4 md:gap-4">
          {data.footer?.map((item) => (
            <div key={item.id} className="col-span-1">
              <h2 className="text-sm font-bold uppercase">{item.title}</h2>
              <ul className="mt-2 space-y-2">
                {item.links?.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.link}
                      className="text-xs font-semibold text-gray-500"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-1">
            <h2 className="text-sm font-bold uppercase">About Us</h2>
            <p className="mt-2 text-xs font-semibold text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod
              quibusdam, quia, quam, quos, quae quod quidem quibusdam, quia,
            </p>
            <div className="mt-4 space-x-2">
              <RiMessengerFill size={20} className="inline text-primary" />
              <LiaViber size={20} className="inline text-primary" />
              <FaWhatsapp size={20} className="inline text-primary" />
            </div>
            <FooterForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
