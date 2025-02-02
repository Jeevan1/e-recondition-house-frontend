import { Vehicle } from '@/model/type';
import { JSX } from 'react';

interface RowData {
  [key: string]: string | number | boolean | File | Date | null;
}

interface ColumnDef {
  header: string;
  accessorKey: string;
}

interface UseFetchTableParams<T, U> {
  url: string;
  columnsToHide?: string[];
  responseHandler?: (data: T) => T;
  customRenderer?: {
    [key: string]: JSX.Element | ((value: U) => JSX.Element);
  };
}

interface TableDataResponse<T> {
  loading: boolean;
  rowData: T;
  columns: ColumnDef[];
}

const fetchTableData = async <T extends Vehicle, U>({
  url,
  columnsToHide = [],
  responseHandler = (data: T) => data,
  customRenderer = {},
}: UseFetchTableParams<T, U>): Promise<TableDataResponse<T>> => {
  const base_url = process.env.NEXT_PUBLIC_BASE_URL;
  const fullUrl = `${base_url}${url}`;

  let loading = true;
  let rowData = {} as T;
  let columns: ColumnDef[] = [];

  try {
    const response = await fetch(fullUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    let results = await response.json();
    if (responseHandler) {
      results = responseHandler(results);
    }

    rowData = results;

    if (results.results && results.results.length > 0) {
      let cols = Object.keys(results.results[0])?.map((key) => ({
        header: key,
        accessorKey: key,
      }));

      cols = cols.filter((col) => !columnsToHide.includes(col.accessorKey));

      cols = cols?.map((col) => {
        if (customRenderer[col.accessorKey]) {
          return {
            ...col,
            cell: customRenderer[col.accessorKey],
          };
        }
        return col;
      });

      columns = cols;
    }

    loading = false;

    return {
      loading,
      rowData,
      columns,
    };
  } catch (error) {
    console.error('Error fetching table data:', error);
    return {
      loading: false,
      rowData: {} as T,
      columns: [],
    };
  }
};

export default fetchTableData;
