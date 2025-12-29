import { fetchCustomers } from '@/lib/api/customer';
import CustomersTableClient from './customers-table-client';

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

export default async function CustomersPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const customers = await fetchCustomers({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">Customers</h1>

      {/* Client table only receives data */}
      <CustomersTableClient customersResponse={customers} />
    </div>
  );
}
