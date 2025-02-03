import Image from 'next/image';
import { Product } from '@/model/type';
import { LuDot } from 'react-icons/lu';
import Link from 'next/link';
import { IoLocation } from 'react-icons/io5';

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
    <div className="max-w- group h-full overflow-hidden rounded-md bg-white transition-all duration-200 ease-in-out hover:shadow-md">
      <Link href={`/vehicle/${product?.idx}`}>
        <div className="relative overflow-hidden">
          <Image
            src={product?.featured_image}
            alt={product?.name}
            width={200}
            height={200}
            className="h-[130px] w-full overflow-hidden object-cover transition-all duration-300 ease-in-out group-hover:scale-105 sm:h-[150px]"
          />
        </div>
        <div className="space-y-2 border-t p-3">
          <h2 className="text-md line-clamp-1 inline-block font-bold text-gray-800 hover:text-primary">
            {product?.name}
          </h2>
          {/* <ul className="mt-1 line-clamp-1 space-x-1">
            {product.tags?.map((tag, index) => (
              <li
                key={tag}
                className="inline text-xs font-semibold text-gray-500"
              >
                {index > 0 && <LuDot className="inline" />} {tag}
              </li>
            ))}
          </ul> */}
          <p className="text-xs font-semibold text-gray-700">
            Model Year: {product?.year_of_manufacture}
          </p>
          <p className="flex flex-wrap gap-2 text-xs font-semibold text-gray-700 md:text-sm">
            <span className="line-through">
              {formatCurrency(product?.actual_price)}
            </span>
            <span>{formatCurrency(product?.discounted_price)}</span>
          </p>
          <div className="mt-2 border-t border-dashed border-gray-300 pt-2">
            {/* <p className="text-xs font-semibold text-gray-700">
              <FiPhone className="me-2 inline text-primary" />
              {product?.contact_number}
            </p> */}
            <p className="line-clamp-1 text-xs font-semibold text-gray-700">
              <IoLocation className="me-2 inline text-primary" />
              {product?.location}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
