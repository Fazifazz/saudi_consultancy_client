'use client';

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from '@/components/commonTable';

import { VisaDetailsResponse } from '@/types/visa-details';
import { visaDetailsColumns } from './visa-details-table-columns';
import { ClearFilters } from '@/components/commonTable/controls/ClearFilters';

export default function VisaDetailsTableClient({
  visaDetailsResponse,
}: {
  visaDetailsResponse: VisaDetailsResponse;
}) {
  const visaDetails = visaDetailsResponse.data;
  return (
    <TableProvider data={visaDetails} columns={visaDetailsColumns()}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="visaNumber"
          syncToUrl
          paramName="search"
          searchResults={visaDetailsResponse.meta.total}
        />

        <ColumnVisibility />

        <ClearFilters syncToUrl />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={visaDetailsResponse.meta.page}
        totalPages={visaDetailsResponse.meta.pages}
        totalItems={visaDetailsResponse.meta.total}
      />
    </TableProvider>
  );
}
