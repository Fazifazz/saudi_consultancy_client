'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { useTable } from '../TableProvider';

interface TableSearchProps {
  column: string;
  placeholder?: string;
  syncToUrl?: boolean;
  paramName?: string;
  replace?: boolean;
}

export function TableSearch({
  column,
  placeholder = 'Search...',
  syncToUrl = false,
  paramName,
  replace = true,
}: TableSearchProps) {
  const { table } = useTable<any>();
  const columnInstance = table.getColumn(column);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [value, setValue] = useState(() => (columnInstance?.getFilterValue() as string) ?? '');

  // init from url when syncToUrl is true
  useEffect(() => {
    if (!syncToUrl) return;
    const param = paramName ?? column;
    const v = searchParams?.get(param) ?? '';
    setValue(v);
    columnInstance?.setFilterValue(v || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [syncToUrl, searchParams?.toString(), paramName, column]);

  const onChange = (v: string) => {
    setValue(v);
    columnInstance?.setFilterValue(v || undefined);

    if (!syncToUrl) return;

    const param = paramName ?? column;
    const params = new URLSearchParams(searchParams?.toString() ?? '');
    if (!v) params.delete(param);
    else params.set(param, v);
    const url = pathname + (params.toString() ? `?${params.toString()}` : '');
    if (replace) router.replace(url);
    else router.push(url);
  };

  if (!columnInstance) return null;

  return (
    <Input
      value={value}
      className="max-w-sm"
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
}
