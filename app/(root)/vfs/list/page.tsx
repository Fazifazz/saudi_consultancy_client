import { fetchVfs } from '@/lib/api/vfs';
import VfsTableClient from './vfs-table-client';

interface PageProps {
  searchParams: {
    page?: string;
    limit?: string;
    from?: string;
    search?: string;
    to?: string;
    role?: string;
  };
}

export default async function VfsPage({ searchParams }: PageProps) {
  const searchParam = await searchParams;
  const page = Number(searchParam.page ?? 1);
  const limit = Number(searchParam.limit ?? 10);

  const vfsData = await fetchVfs({
    page,
    limit,
    search: searchParam.search,
    from: searchParam.from,
    to: searchParam.to,
  });

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-xl font-semibold">VFS</h1>

      {/* Client table only receives data */}
      <VfsTableClient vfsResponse={vfsData} />
    </div>
  );
}
