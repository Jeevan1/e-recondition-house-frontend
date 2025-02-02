'use client';

import { Product } from '@/model/type';
import { useState } from 'react';
import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { RxDotsHorizontal } from 'react-icons/rx';
import Loader from './Loader';
import ProductCard from './ProductCard';

export default function PaginationWithData({
  itemsPerPage = 10,
  data = [],
  loading,
  title = '',
}: {
  itemsPerPage: number;
  data: Product[];
  loading?: boolean;
  title?: string;
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data?.length / itemsPerPage);

  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);
  const handlePrevious = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handlePageClick = (page: number) => setCurrentPage(page);

  const renderPageNumbers = () => {
    const maxVisiblePages = 5;
    const halfMax = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - halfMax);
    let endPage = Math.min(totalPages, currentPage + halfMax);

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (currentPage <= halfMax) {
        endPage = Math.min(maxVisiblePages, totalPages);
      } else {
        startPage = Math.max(totalPages - maxVisiblePages + 1, 1);
      }
    }

    const pages = [];
    if (startPage > 1) {
      pages.push(
        <button
          type="button"
          key={1}
          onClick={() => handlePageClick(1)}
          className="h-[30px] rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
        >
          1
        </button>,
      );
      if (startPage > 2) pages.push(<RxDotsHorizontal key="start-ellipsis" />);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          type="button"
          key={i}
          onClick={() => handlePageClick(i)}
          className={`h-[30px] rounded px-3 py-1 ${
            currentPage === i
              ? 'bg-blue-500 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>,
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1)
        pages.push(<RxDotsHorizontal key="end-ellipsis" />);
      pages.push(
        <button
          type="button"
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className="h-[30px] rounded bg-gray-200 px-3 py-1 hover:bg-gray-300"
        >
          {totalPages}
        </button>,
      );
    }

    return pages;
  };

  const currentItems = data?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (loading) return <Loader />;

  return (
    <>
      {data?.length > 0 ? (
        <div className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
          {currentItems?.map((product) => (
            <ProductCard key={product.idx} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-6 px-3 font-semibold text-gray-500">
          No Vehicles Found
        </p>
      )}
      {!loading && data?.length > 0 && (
        <div className="mt-8 flex items-center justify-center">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="h-[30px] rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
          >
            <MdArrowBack />
          </button>
          <div className="mx-4 flex items-center gap-3">
            {renderPageNumbers()}
          </div>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="h-[30px] rounded bg-gray-200 px-3 py-1 hover:bg-gray-300 disabled:opacity-50"
          >
            <MdArrowForward />
          </button>
        </div>
      )}
    </>
  );
}
