'use client';

import { Button } from '@/components/ui/button';
import { useTable } from '../TableProvider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const PAGE_SIZES = [5, 10, 20, 50, 100];

interface PaginationProps {
  /** Enable URL-based pagination (SSR-safe) */
  syncToUrl?: boolean;

  /** Query param names */
  pageParam?: string;
  limitParam?: string;

  /** Server values */
  currentPage?: number; // 1-based
  totalPages?: number;
  totalItems?: number;

  /** replace vs push */
  replace?: boolean;
}

export function Pagination({
  syncToUrl = false,
  pageParam = 'page',
  limitParam = 'limit',
  currentPage,
  totalPages = 1,
  totalItems = 0,
  replace = true,
}: PaginationProps) {
  const { table } = useTable<any>();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const pageSize = table.getState().pagination.pageSize;

  // Prefer server page → fallback to table
  const effectivePage =
    typeof currentPage === 'number' && currentPage > 0
      ? currentPage
      : table.getState().pagination.pageIndex + 1;

  /* --------------------------------------------
       URL PAGE CHANGE HANDLER (SSR-safe)
    --------------------------------------------- */

  useEffect(() => {
    if (!syncToUrl) return;

    const limitFromUrl = Number(searchParams.get(limitParam));

    if (!Number.isNaN(limitFromUrl) && limitFromUrl > 0 && limitFromUrl !== pageSize) {
      table.setPageSize(limitFromUrl);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!syncToUrl) return;

    const hasPage = searchParams.has(pageParam);
    const hasLimit = searchParams.has(limitParam);

    // If both exist, do nothing
    if (hasPage && hasLimit) return;

    const params = new URLSearchParams(searchParams.toString());

    if (!hasPage) {
      params.set(pageParam, '1');
    }

    if (!hasLimit) {
      params.set(limitParam, String(pageSize));
    }

    const url = pathname + (params.toString() ? `?${params.toString()}` : '');

    // Replace to avoid history pollution
    router.replace(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goToPage = (page: number) => {
    if (!syncToUrl) {
      table.setPageIndex(page - 1);
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set(pageParam, String(page));
    params.set(limitParam, String(pageSize));

    const url = pathname + (params.toString() ? `?${params.toString()}` : '');

    replace ? router.replace(url) : router.push(url);
  };

  const startItem = totalItems > 0 ? (effectivePage - 1) * pageSize + 1 : 0;

  const endItem = totalItems > 0 ? Math.min(effectivePage * pageSize, totalItems) : 0;

  const canGoPrevious = effectivePage > 1;
  const canGoNext = effectivePage < totalPages;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 py-4">
      {/* LEFT: ITEMS COUNT */}
      <div className="text-sm text-muted-foreground">
        {totalItems ? (
          <>
            Showing <strong>{startItem}</strong> – <strong>{endItem}</strong> of{' '}
            <strong>{totalItems}</strong>
          </>
        ) : (
          <>
            Page <strong>{effectivePage}</strong>
          </>
        )}
      </div>

      {/* RIGHT: CONTROLS */}
      <div className="flex items-center gap-2">
        {/* PAGE SIZE */}
        <Select
          value={String(pageSize)}
          onValueChange={(value) => {
            const newLimit = Number(value);

            // 1️ Update TanStack immediately
            table.setPageSize(newLimit);
            table.setPageIndex(0);

            // 2Update URL for SSR
            if (syncToUrl) {
              const params = new URLSearchParams(searchParams.toString());
              params.set(limitParam, String(newLimit));
              params.set(pageParam, '1');

              const url = pathname + (params.toString() ? `?${params.toString()}` : '');

              replace ? router.replace(url) : router.push(url);
            }
          }}
        >
          <SelectTrigger className="bg-gray-50 dark:bg-gray-800 w-[90px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAGE_SIZES.map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* FIRST */}
        <Button variant="outline" size="icon" onClick={() => goToPage(1)} disabled={!canGoPrevious}>
          <ChevronsLeft className="h-4 w-4" />
        </Button>

        {/* PREVIOUS */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(effectivePage - 1)}
          disabled={!canGoPrevious}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* PAGE INFO */}
        <span className="text-sm whitespace-nowrap">
          Page <strong>{effectivePage}</strong> of <strong>{totalPages}</strong>
        </span>

        {/* NEXT */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(effectivePage + 1)}
          disabled={!canGoNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>

        {/* LAST */}
        <Button
          variant="outline"
          size="icon"
          onClick={() => goToPage(totalPages)}
          disabled={!canGoNext}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
