import { fetchMedicalPayments } from '@/lib/api/medical-payment';
import MedicalPaymentsTableClient from './medical-payment-table-client';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    from?: string;
    to?: string;
    search?: string;
  };
}

export default async function MedicalPaymentsPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const medicalPayments = await fetchMedicalPayments({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Medical Payments</h1>
        <Link href="/medical-payment/create" className={buttonVariants({ variant: 'outline' })}>
          Create
        </Link>
      </div>

      {/* Client table only receives data */}
      <MedicalPaymentsTableClient medicalPaymentsResponse={medicalPayments} />
    </div>
  );
}
