import { fetchTickets } from '@/lib/api/ticket';
import TicketsTableClient from './tickets-table-client';
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

export default async function TicketsPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const tickets = await fetchTickets({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Tickets</h1>
        <Link href="/ticket/create" className={buttonVariants({ variant: 'outline' })}>
          Create
        </Link>
      </div>

      {/* Client table only receives data */}
      <TicketsTableClient ticketsResponse={tickets} />
    </div>
  );
}
