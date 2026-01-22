'use client';

import { useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useTable } from '../TableProvider';

interface ColumnVisibilityProps {
  defaultHiddenColumns?: string[];
}

export function ColumnVisibility({ defaultHiddenColumns }: ColumnVisibilityProps) {
  const { table } = useTable<any>();

  useEffect(() => {
    if (defaultHiddenColumns) {
      defaultHiddenColumns.forEach((columnId) => {
        table.getColumn(columnId)?.toggleVisibility(false);
      });
    }
  }, [table, defaultHiddenColumns]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {table
          .getAllColumns()
          .filter((col: any) => col.getCanHide())
          .map((col: any) => (
            <DropdownMenuCheckboxItem
              key={col.id}
              checked={col.getIsVisible()}
              onCheckedChange={(v) => col.toggleVisibility(!!v)}
            >
              {col.id}
            </DropdownMenuCheckboxItem>
          ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
