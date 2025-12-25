'use client';

import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface ClearFiltersProps {
  /**
   * Enable clearing URL filters.
   * If false, the button renders nothing.
   */
  syncToUrl?: boolean;

  /**
   * If true, clears page & limit also.
   * If false (default), page & limit are preserved.
   */
  clearLimitAndPage?: boolean;

  /**
   * Use replace instead of push (default: true)
   */
  replace?: boolean;

  /**
   * Optional label
   */
  label?: string;
}

export function ClearFilters({
  syncToUrl = false,
  clearLimitAndPage = false,
  replace = true,
  label = 'Clear filters',
}: ClearFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!syncToUrl) return null;

  const hasParams = searchParams.toString().length > 0;
  if (!hasParams) return null;

  const handleClear = () => {
    const params = new URLSearchParams();

    if (!clearLimitAndPage) {
      const page = searchParams.get('page');
      const limit = searchParams.get('limit');

      if (page) params.set('page', page);
      if (limit) params.set('limit', limit);
    }

    const url = pathname + (params.toString() ? `?${params.toString()}` : '');

    replace ? router.replace(url) : router.push(url);
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleClear} className="gap-2">
      <X className="h-4 w-4" />
      {label}
    </Button>
  );
}
