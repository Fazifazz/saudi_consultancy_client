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
import { TradeCertificateResponse } from '@/types/trade-certificate';
import { tradeCertificateColumns } from './trade-certificate-table-columns';

export default function TradeCertificateTableClient({
  tradeCertificateResponse,
}: {
  tradeCertificateResponse: TradeCertificateResponse;
}) {
  const tradeCertificates = tradeCertificateResponse.data;
  return (
    <TableProvider data={tradeCertificates} columns={tradeCertificateColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="name"
          syncToUrl
          paramName="search"
          searchResults={tradeCertificateResponse.meta.total}
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
        currentPage={tradeCertificateResponse.meta.page}
        totalPages={tradeCertificateResponse.meta.pages}
        totalItems={tradeCertificateResponse.meta.total}
      />
    </TableProvider>
  );
}
