'use client';

import { TableProvider, DataTable, Pagination, TableSearch } from '@/components/commonTable';
import { VfsResponse } from '@/types/vfs';
import { vfsColumns } from './vfs-table-columns';

export default function VfsTableClient({ vfsResponse }: { vfsResponse: VfsResponse }) {
  const vfsData = vfsResponse.data;
  return (
    <TableProvider data={vfsData} columns={vfsColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="name"
          syncToUrl
          paramName="search"
          searchResults={vfsResponse.meta.total}
        />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={vfsResponse.meta.page}
        totalPages={vfsResponse.meta.pages}
        totalItems={vfsResponse.meta.total}
      />
    </TableProvider>
  );
}
