'use client';

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from '@/components/commonTable';

import { PassportPossessionListResponse } from '@/types/passportPossessions';
import { passportPossessionColumns } from './passport-possession-table-columns';
import { ClearFilters } from '@/components/commonTable/controls/ClearFilters';

export default function PassportPossessionsTableClient({
  passportPossessionsResponse,
}: {
  passportPossessionsResponse: PassportPossessionListResponse;
}) {
  const passportPossessions = passportPossessionsResponse.data || [];
  return (
    <TableProvider data={passportPossessions} columns={passportPossessionColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="agency"
          syncToUrl
          paramName="search"
          searchResults={passportPossessionsResponse.meta.total}
        />

        <ColumnVisibility defaultHiddenColumns={['stampingRemarks', 'createdAt']} />

        <ClearFilters syncToUrl />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={passportPossessionsResponse.meta.page}
        totalPages={passportPossessionsResponse.meta.pages}
        totalItems={passportPossessionsResponse.meta.total}
      />
    </TableProvider>
  );
}
