import Image from 'next/image';
import { Product } from '@/model/type';
import { IoLocation } from 'react-icons/io5';
import { HiHomeModern } from 'react-icons/hi2';
import Link from 'next/link';

const formatCurrency = (
  value: number | string,
  symbol: string = 'रु',
): string => {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(numberValue)) return '';

  const formatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return `${symbol} ${formatter.format(numberValue)}`;
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group h-full w-full overflow-hidden rounded-md bg-white transition-all duration-200 ease-in-out hover:shadow-md">
      <Link href={`/vehicle/${product?.idx}`} className="block">
        <div className="relative h-[160px] overflow-hidden md:h-[200px] lg:h-[200px]">
          <Image
            src={product?.featured_image}
            alt={product?.name}
            width={300}
            height={200}
            className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
          />
        </div>
        <div className="space-y-1.5 border-t px-3 pb-3 pt-2">
          <h2 className="line-clamp-1 text-sm font-bold text-gray-700 group-hover:text-primary md:text-base lg:text-lg">
            {product?.name}
          </h2>
          <p className="flex items-center text-xs font-semibold text-secondary md:text-sm">
            <HiHomeModern size={16} className="me-1 text-secondary" />
            {product?.recondition_house_name}
          </p>
          <p className="flex flex-wrap items-center gap-2 text-sm font-bold text-gray-800 md:text-lg">
            <span className="text-xs font-semibold text-gray-500 line-through md:text-sm">
              {formatCurrency(product?.actual_price)}
            </span>
            <span>{formatCurrency(product?.discounted_price)}</span>
          </p>

          <div className="mt-2 grid grid-cols-3 gap-2 border-t border-dashed border-gray-300 pt-2 text-xs md:text-sm">
            <p className="flex flex-col items-center text-gray-700">
              <span className="font-bold">Mileage</span>
              <span className="text-sm font-bold text-primary md:text-lg">
                {product?.mileage || 'N/A'}
              </span>
            </p>
            <p className="flex flex-col items-center text-gray-700">
              <span className="font-bold">KM</span>
              <span className="text-sm font-bold text-primary md:text-lg">
                {product?.km_driven || 'N/A'}
              </span>
            </p>
            <p className="flex flex-col items-center text-gray-700">
              <span className="font-bold">Year</span>
              <span className="text-sm font-bold text-primary md:text-lg">
                {product?.year_of_manufacture.slice(0, 4) || 'N/A'}
              </span>
            </p>
          </div>
          <p className="mt-2 flex items-center border-t border-dashed border-gray-300 pt-2 text-xs font-semibold text-gray-500 md:text-sm">
            <IoLocation size={16} className="me-1 text-primary" />
            {product?.location}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
