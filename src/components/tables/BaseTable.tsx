'use client';

import { useMemo, useState, JSX, use, useEffect } from 'react';
import {
  FaCaretDown,
  FaCaretUp,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { TbFilter, TbFilterEdit } from 'react-icons/tb';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
  RowData,
} from '@tanstack/react-table';
import Link from 'next/link';
import { PrimaryButton } from '../Button';
import { FaPen, FaTrash } from 'react-icons/fa6';
import { Column, Product, Vehicle } from '@/model/type';
import Image from 'next/image';
import { formatCurrency } from '@/helper';
import PopupModal from '../PopupModel';
import useDebounce from '@/hooks/useDebounce';
import useFetchTable from '@/hooks/useFetchTable';
import { useData } from '@/context/DataContext';
import { ClipLoader } from 'react-spinners';

interface BaseTableProps {
  data: Vehicle;
  columns: Column[];
  height?: string;
  isLoading?: boolean;
  title?: string;
  toolbarActions?: JSX.Element | JSX.Element[];
  navigateOnRowClick?: (row: Product) => void;
  onDeleteVehicle?: (idx: string) => void;
}

const BaseTable = ({
  data = { results: [], count: 0, next: null, previous: null },
  columns,
  height,
  isLoading = false,
  title,
  toolbarActions,
  onDeleteVehicle,
}: BaseTableProps) => {
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [searchedItems, setSearchedItems] = useState<Vehicle>(data);
  const [search, setSearch] = useState<string>('');

  const [filtering, setFiltering] = useState('');
  const { data: reconData } = useData();

  const table = useReactTable({
    data: searchedItems.results || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    rowCount: searchedItems.count,
    columnResizeMode: 'onChange',
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  const [debouncedSearch, loading] = useDebounce((value: string) => {
    const fetchVehicles = async (value: string) => {
      const { rowData, columns, loading } = await useFetchTable({
        url: `/vehicles/?recondition_house=${reconData?.idx}&search=${value}`,
        columnsToHide: ['idx', 'owner', 'logo', 'contact_number', 'location'],
      });
      if (!rowData)
        setSearchedItems({ results: [], count: 0, next: null, previous: null });
      setSearchedItems(rowData);
    };
    if (value.length > 0) {
      fetchVehicles(value);
    } else {
      setSearchedItems({ results: [], count: 0, next: null, previous: null });
    }
  }, 500);

  const handleSearch = (value: string) => {
    setSearch(value);
    if (value.length === 0) return;
    debouncedSearch(value);
  };

  const handlePageChange = async (page: string | null) => {
    if (page === null) return;
    //convert to https if http
    if (page.startsWith('http://')) {
      page = page.replace('http://', 'https://');
    }

    try {
      const res = await fetch(page, {
        method: 'GET',
      });

      if (!res.ok) throw new Error('Failed to fetch data');

      if (res.status === 404) {
        setSearchedItems({ results: [], count: 0, next: null, previous: null });
        return;
      }

      const data = await res.json();

      setSearchedItems(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setSearchedItems(
      data || { results: [], count: 0, next: null, previous: null },
    );
  }, [data]);

  return (
    <div className="w-full space-y-4 rounded-md bg-white py-4 shadow-md">
      {/* Toolbar */}
      <div className="relative flex items-center justify-between rounded-md px-4">
        <div className="space-y-2">
          {title && (
            <h1 className="text-lg font-bold">
              {title} ({' '}
              <span className="text-sm text-primary sm:text-[16px]">
                {data?.count}
              </span>{' '}
              )
            </h1>
          )}
          <div className="flex items-center gap-4">
            {toolbarActions && toolbarActions}
            <input
              type="text"
              className="rounded-md border border-gray-300 px-2 py-1"
              placeholder="Search"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          {/* <button
            className="rounded-full p-2 transition hover:bg-gray-300"
            onClick={() => setShowFilterForm(!showFilterForm)}
          >
            {showFilterForm ? <TbFilterEdit /> : <TbFilter />}
          </button> */}
          <Link href="/dashboard/vehicles/add" className="text-sm">
            <PrimaryButton className="text-sm">Add Vehicle</PrimaryButton>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-md transition ${height ? `h-[${height}]` : 'auto'}`}
      >
        <div className="table-container overflow-y-hidden overflow-x-scroll">
          <table className="w-full border-collapse">
            {/* Header */}
            <thead>
              {table?.getHeaderGroups()?.map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <th className="w-[40px] border-b px-4 py-2"></th>
                  {headerGroup.headers?.map((header) => (
                    <th
                      key={header.id}
                      className="relative cursor-pointer border-b py-2 text-left"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2 px-4">
                        <span className="text-sm capitalize text-gray-500">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </span>
                        {header.column.getIsSorted() === 'asc' && <FaCaretUp />}
                        {header.column.getIsSorted() === 'desc' && (
                          <FaCaretDown />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            {/* Body */}
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="min-h-[100px] py-4 text-center"
                  >
                    <ClipLoader color="#ff7207" size={30} />
                  </td>
                </tr>
              ) : loading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="min-h-[100px] py-4 text-center"
                  >
                    <ClipLoader color="#ff7207" size={30} />
                  </td>
                </tr>
              ) : searchedItems.results?.length === 0 &&
                !isLoading &&
                search.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="flex items-center justify-center py-4">
                      <span className="text-sm text-gray-500">
                        No data available
                      </span>
                    </div>
                  </td>
                </tr>
              ) : !loading && searchedItems.count === 0 && search.length > 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="flex items-center justify-center py-4">
                      <span className="text-sm text-gray-500">
                        No data available
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                searchedItems.results?.length > 0 &&
                table.getRowModel().rows?.map((row) => (
                  <tr
                    key={row.id}
                    className="group relative cursor-pointer border-b px-4 hover:bg-gray-100 focus:bg-gray-100"
                  >
                    <td className="mt-6 flex items-center space-x-2 px-2">
                      <Link
                        href={`/dashboard/vehicles/edit/${row.original.idx}`}
                        className="border-r px-2 text-primary"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaPen size={14} />
                      </Link>

                      <PopupModal
                        label="Delete"
                        title="Delete Vehicle"
                        description="Are you sure you want to delete this vehicle?"
                        onClick={() =>
                          onDeleteVehicle && onDeleteVehicle(row.original.idx)
                        }
                      >
                        <span className="flex text-red-500">
                          <FaTrash className="" size={14} />
                        </span>
                      </PopupModal>
                    </td>
                    {row.getVisibleCells()?.map((cell) => (
                      <td
                        key={cell.id}
                        className="h-[40px] min-w-[200px] px-4 text-sm font-semibold"
                      >
                        <Link
                          href={`/dashboard/vehicles/${row.original.idx}`}
                          className="flex h-full w-full items-center py-2"
                        >
                          {cell.column.id === 'featured_image' &&
                          cell.getValue() !== null ? (
                            <Image
                              src={cell.getValue() as string}
                              alt=""
                              width={100}
                              height={100}
                              className="h-full w-[100px] rounded-md border-2 border-gray-300 object-cover sm:h-[40px] md:h-[50px]"
                            />
                          ) : cell.column.id === 'actual_price' ||
                            cell.column.id === 'discounted_price' ? (
                            <span>
                              {formatCurrency(cell.getValue() as number)}
                            </span>
                          ) : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )
                          )}
                        </Link>
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center gap-4 px-4">
          {/* <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            First
          </button> */}
          <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={searchedItems.previous === null}
            onClick={() => handlePageChange(searchedItems.previous)}
          >
            <FaAngleLeft />
          </button>
          <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={searchedItems.next === null}
            onClick={() => handlePageChange(searchedItems.next)}
          >
            <FaAngleRight />
          </button>
          {/* <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default BaseTable;
