"use client";
import { useMemo, useState, JSX } from "react";
import {
  FaCaretDown,
  FaCaretUp,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";
import { TbFilter, TbFilterEdit } from "react-icons/tb";
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
} from "@tanstack/react-table";
import Link from "next/link";
import { PrimaryButton } from "../Button";
import { FaPen, FaTrash } from "react-icons/fa6";
import { Column, Product } from "@/model/type";
import Image from "next/image";
import Loader from "../Loader";

interface BaseTableProps {
  data: Product[];
  columns: Column[];
  height?: string;
  isLoading?: boolean;
  title?: string;
  toolbarActions?: JSX.Element | JSX.Element[];
  navigateOnRowClick?: (row: Product) => void;
}

const BaseTable = ({
  data,
  columns,
  height,
  isLoading = false,
  title,
  toolbarActions,
  navigateOnRowClick,
}: BaseTableProps) => {
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: "onChange",
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w-full space-y-4 rounded-md bg-white py-4 shadow-md">
      {/* Toolbar */}
      <div className="relative flex items-center justify-between rounded-md px-4">
        <div className="space-y-2">
          {title && <h1 className="text-lg font-bold">{title}</h1>}

          <div className="flex items-center gap-4">
            {toolbarActions && toolbarActions}
            <input
              type="text"
              className="rounded-md border border-gray-300 px-2 py-1"
              placeholder="Search"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            className="rounded-full p-2 transition hover:bg-gray-300"
            onClick={() => setShowFilterForm(!showFilterForm)}
          >
            {showFilterForm ? <TbFilterEdit /> : <TbFilter />}
          </button>
          <Link href="/dashboard/vehicles/add" className="text-sm">
            <PrimaryButton className="text-sm">Add Vehicle</PrimaryButton>
          </Link>
        </div>
      </div>

      {/* Table */}
      <div
        className={`rounded-md transition ${height ? `h-[${height}]` : "auto"}`}
      >
        <div className="table-container overflow-y-hidden overflow-x-scroll">
          {data.length === 0 && !isLoading ? (
            <div className="mt-4 text-center">No data</div>
          ) : isLoading ? (
            <Loader />
          ) : (
            <table className="w-full border-collapse">
              {/* Header */}
              <thead>
                {table?.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    <th className="w-[40px] border-b px-4 py-2"></th>
                    {headerGroup.headers.map((header) => (
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
                          {header.column.getIsSorted() === "asc" && (
                            <FaCaretUp />
                          )}
                          {header.column.getIsSorted() === "desc" && (
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
                {table?.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="group relative cursor-pointer border-b px-4 hover:bg-gray-100 focus:bg-gray-100"
                    onClick={() =>
                      navigateOnRowClick && navigateOnRowClick(row.original)
                    }
                  >
                    <td className="mt-6 flex items-center px-2 py-2">
                      <Link
                        href={`/dashboard/vehicles/${row.original.idx}`}
                        className="border-r px-2 text-primary"
                      >
                        <FaPen size={14} />
                      </Link>
                      <Link
                        href="/dashboard/vehicles/delete"
                        className="px-2 text-red-700"
                      >
                        <FaTrash size={14} />
                      </Link>
                    </td>
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="h-[40px] min-w-[200px] px-4 py-2 text-sm font-semibold"
                      >
                        {cell.column.id === "featured_image" ? (
                          <Image
                            src={cell.getValue() as string}
                            alt=""
                            width={100}
                            height={100}
                            className="h-[30px] w-[100px] border-2 border-gray-300 object-cover sm:h-[40px] md:h-[50px]"
                          />
                        ) : (
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="mt-4 flex items-center gap-4 px-4">
          <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            First
          </button>
          <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            <FaAngleLeft />
          </button>
          <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            <FaAngleRight />
          </button>
          <button
            className="rounded-md bg-gray-200 px-4 py-2 disabled:opacity-50"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            Last
          </button>
        </div>
      </div>
    </div>
  );
};

export default BaseTable;
