import { fetchVisaDetails } from '@/lib/api/visa-details';
import VisaDetailsTableClient from './visa-details-table-client';

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    from?: string;
    to?: string;
    search?: string;
  };
}

export default async function VisaDetailsPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const visaDetails = await fetchVisaDetails({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Visa Details</h1>

      {/* Client table only receives data */}
      <VisaDetailsTableClient visaDetailsResponse={visaDetails} />
    </div>
  );
}
