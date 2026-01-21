import { fetchMedicalStatuses } from '@/lib/api/medical-status';
import MedicalStatusTableClient from './medical-status-table-client';

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

export default async function MedicalStatusPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const medicalStatuses = await fetchMedicalStatuses({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Medical Status</h1>

      {/* Client table only receives data */}
      <MedicalStatusTableClient medicalStatusResponse={medicalStatuses} />
    </div>
  );
}
