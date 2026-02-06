import { fetchUsers } from '@/lib/api/users';
import UsersTableClient from './users-table-client';
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

export default async function UsersPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const users = await fetchUsers({
    page,
    limit,
    search: searchParam.search,
    role: searchParam.role,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Users</h1>
        <Link href="/user/create" className={buttonVariants({ variant: 'outline' })}>
          Create
        </Link>
      </div>

      {/* Client table only receives data */}
      <UsersTableClient usersResponse={users} />
    </div>
  );
}
