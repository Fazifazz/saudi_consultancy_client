import { fetchAgencyPayments } from '@/lib/api/agency-payment';
import AgencyPaymentTableClient from './agency-payment-table-client';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    from?: string;
    to?: string;
    search?: string;
  }>;
}

export default async function AgencyPaymentsPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const agencyPayments = await fetchAgencyPayments({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Agency Payments</h1>

      <AgencyPaymentTableClient agencyPaymentResponse={agencyPayments} />
    </div>
  );
}
