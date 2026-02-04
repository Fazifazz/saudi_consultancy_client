'use client';

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from '@/components/commonTable';
import { TableDateFilter } from '@/components/commonTable/controls/TableDateFilter';
import { ClearFilters } from '@/components/commonTable/controls/ClearFilters';
import { KsaStatusResponse } from '@/types/ksa-status';
import { ksaStatusColumns } from './ksa-status-table-columns';

export default function KsaStatusTableClient({
  ksaStatusResponse,
}: {
  ksaStatusResponse: KsaStatusResponse;
}) {
  const ksaStatuses = ksaStatusResponse.data;
  return (
    <TableProvider data={ksaStatuses} columns={ksaStatusColumns()}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="transactionId"
          syncToUrl
          paramName="search"
          searchResults={ksaStatusResponse.meta.total}
        />

        <TableDateFilter column="createdAt" mode="range" syncToUrl paramName="range_createdAt" />

        <ColumnVisibility />

        <ClearFilters syncToUrl />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={ksaStatusResponse.meta.page}
        totalPages={ksaStatusResponse.meta.pages}
        totalItems={ksaStatusResponse.meta.total}
      />
    </TableProvider>
  );
}
