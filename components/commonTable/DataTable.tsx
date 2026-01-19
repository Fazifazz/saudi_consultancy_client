'use client';

import { flexRender } from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTable } from './TableProvider';

export function DataTable() {
  const { table } = useTable<any>();

  const columnsCount = table.getVisibleFlatColumns().length;

  return (
    <div className="rounded-md border overflow-hidden">
      <Table>
        <TableHeader className="bg-primary">
          {table.getHeaderGroups().map((hg: any) => (
            <TableRow key={hg.id} className="*:border-border [&>:not(:last-child)]:border-r">
              {hg.headers.map((header: any) => (
                <TableHead className="text-white" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row: any) => (
              <TableRow key={row.id} className="*:border-border [&>:not(:last-child)]:border-r">
                {row.getVisibleCells().map((cell: any) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnsCount} className="h-24 text-center">
                No results
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
