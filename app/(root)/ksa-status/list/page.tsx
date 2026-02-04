import { fetchKsaStatuses } from '@/lib/api/ksa-status';
import KsaStatusTableClient from './ksa-status-table-client';

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
      <h1 className="text-xl font-semibold">KSA Status</h1>

      <KsaStatusTableClient ksaStatusResponse={ksaStatuses} />
    </div>
  );
}
