'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { useTable } from '../TableProvider';
import { Label } from '@/components/ui/label';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

type DateFilterValue =
  | { type: 'single'; date: string }
  | { type: 'range'; from?: string; to?: string }
  | null;

interface TableDateFilterProps {
  column: string;
  mode?: 'single' | 'range';

  syncToUrl?: boolean;
  paramName?: string;
  replace?: boolean;
  onChange?: (value?: DateFilterValue) => void;
}

export function TableDateFilter({
  column,
  mode = 'range',
  syncToUrl = false,
  paramName,
  replace = true,
  onChange,
}: TableDateFilterProps) {
  const { table } = useTable<any>();
  const col = table.getColumn(column);

  const [singleDate, setSingleDate] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!col) return null;

  const base = paramName ?? column;

  useEffect(() => {
    if (!syncToUrl) return;

    if (mode === 'single') {
      setSingleDate(searchParams.get(base) ?? '');
    } else {
      setFrom(searchParams.get(`${base}_from`) ?? '');
      setTo(searchParams.get(`${base}_to`) ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams?.toString(), syncToUrl, mode]);

  useEffect(() => {
    if (mode !== 'single') return;

    const value: DateFilterValue = singleDate ? { type: 'single', date: singleDate } : null;

    onChange?.(value);

    // CLIENT-SIDE FILTERING ONLY
    if (!syncToUrl) {
      col.setFilterValue(value);
      return;
    }

    // URL-ONLY MODE
    const params = new URLSearchParams(searchParams.toString());
    params.delete(`${base}_from`);
    params.delete(`${base}_to`);
    params.delete(base);

    if (singleDate) params.set(base, singleDate);

    const url = pathname + (params.toString() ? `?${params.toString()}` : '');
    replace ? router.replace(url) : router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleDate]);

  useEffect(() => {
    if (mode !== 'range') return;

    const value: DateFilterValue =
      !from && !to ? null : { type: 'range', from: from || undefined, to: to || undefined };

    onChange?.(value);

    // CLIENT-SIDE FILTERING ONLY
    if (!syncToUrl) {
      col.setFilterValue(value);
      return;
    }

    // URL-ONLY MODE
    const params = new URLSearchParams(searchParams.toString());
    params.delete(base);
    params.delete(`${base}_from`);
    params.delete(`${base}_to`);

    if (from) params.set(`${base}_from`, from);
    if (to) params.set(`${base}_to`, to);

    const url = pathname + (params.toString() ? `?${params.toString()}` : '');
    replace ? router.replace(url) : router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  return (
    <div className="flex gap-2">
      {mode === 'single' && (
        <Input type="date" value={singleDate} onChange={(e) => setSingleDate(e.target.value)} />
      )}

      {mode === 'range' && (
        <>
          <Input
            type="date"
            placeholder="From"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <div className="flex items-center">
            <Label className="text-xs text-muted-foreground">to</Label>
          </div>
          <Input type="date" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} />
        </>
      )}
    </div>
  );
}
