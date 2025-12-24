'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

/**
 * Optional label mapping
 * Good for replacing slugs or ids
 */
const ROUTE_LABELS: Record<string, string> = {
  app: 'App',
  dashboard: 'Dashboard',
  settings: 'Settings',
  profile: 'Profile',
  users: 'Users',
  create: 'Create',
};

function formatSegment(segment: string) {
  return (
    ROUTE_LABELS[segment] ?? segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export function AppBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Root "App" item (disabled / not clickable) */}
        <div key="/" className="flex items-center">
          <BreadcrumbItem>
            <BreadcrumbPage>App</BreadcrumbPage>
          </BreadcrumbItem>
          {segments.length > 0 && <BreadcrumbSeparator />}
        </div>

        {segments.map((segment, index) => {
          const href = '/' + segments.slice(0, index + 1).join('/');
          const isLast = index === segments.length - 1;

          return (
            <div key={href} className="flex items-center">
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{formatSegment(segment)}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && <BreadcrumbSeparator />}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
