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
   * Use replace instead of push (default: true)
   */
  replace?: boolean;

  /**
   * Optional label (defaults to "Clear filters")
   */
  label?: string;
}

export function ClearFilters({
  syncToUrl = false,
  replace = true,
  label = 'Clear filters',
}: ClearFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!syncToUrl) return null;

  const hasFilters = searchParams.toString().length > 0;

  if (!hasFilters) return null;

  const handleClear = () => {
    // Remove all search params
    const url = pathname;
    replace ? router.replace(url) : router.push(url);
  };

  return (
    <Button variant="destructive" size="sm" onClick={handleClear} className="gap-2">
      <X className="h-4 w-4" />
      {label}
    </Button>
  );
}
