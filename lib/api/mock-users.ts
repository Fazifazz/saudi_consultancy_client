import { IUser } from '@/types/user';

interface FetchUsersArgs {
  page: number;
  limit: number;
  search?: string;
  from?: string;
  to?: string;
}

// IN A REAL APP, REPLACE THIS WITH ACTUAL API CALLS and queries
// also dont use any
export async function fetchUsers({
  page,
  limit,
  search,
  from,
  to,
}: FetchUsersArgs): Promise<IUser[]> {
  const res = await fetch('https://jsonplaceholder.typicode.com/users', { cache: 'no-store' });

  const data = await res.json();

  let users = data.map((user: any, index: number) => ({
    ...user,
    createdAt: new Date(Date.now() - index * 24 * 60 * 60 * 1000).toISOString(),
  }));

  // 🔍 search
  if (search) {
    users = users.filter((u: any) => u.email.toLowerCase().includes(search.toLowerCase()));
  }

  // 📅 date filters
  if (from) users = users.filter((u: any) => new Date(u.createdAt) >= new Date(from));
  if (to) users = users.filter((u: any) => new Date(u.createdAt) <= new Date(to));

  // 📄 pagination
  const start = (page - 1) * limit;
  return users.slice(start, start + limit);
}
