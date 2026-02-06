import { fetchTradeCertificates } from '@/lib/api/trade-certificate';
import TradeCertificateTableClient from './trade-certificate-table-client';
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

export default async function TradeCertificatePage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const tradeCertificates = await fetchTradeCertificates({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Trade Certificate</h1>
        <Link href="/trade-certificate/create" className={buttonVariants({ variant: 'outline' })}>
          Create
        </Link>
      </div>

      {/* Client table only receives data */}
      <TradeCertificateTableClient tradeCertificateResponse={tradeCertificates} />
    </div>
  );
}
