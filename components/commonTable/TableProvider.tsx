'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from '@tanstack/react-table';
import { CommonTableProps, TableContextType } from './table.types';

const TableContext = createContext<TableContextType<any> | null>(null);

export function TableProvider<TData>({
  data,
  columns,
  children,
}: React.PropsWithChildren<CommonTableProps<TData>>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // Note: getFilteredRowModel is removed to avoid double filtering when using server-side search.
  });

  return <TableContext.Provider value={{ table }}>{children}</TableContext.Provider>;
}

export function useTable<TData>() {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error('useTable must be used inside TableProvider');
  return ctx;
}
