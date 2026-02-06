import { fetchKsaStatuses } from '@/lib/api/ksa-status';
import KsaStatusTableClient from './ksa-status-table-client';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    from?: string;
    to?: string;
    role?: string;
    search?: string;
  };
}

export default async function KsaStatusPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const ksaStatuses = await fetchKsaStatuses({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">KSA Status</h1>
        <Link href="/ksa-status/create" className={buttonVariants({ variant: 'outline' })}>
          Create
        </Link>
      </div>

      <KsaStatusTableClient ksaStatusResponse={ksaStatuses} />
    </div>
  );
}
