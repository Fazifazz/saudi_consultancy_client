'use client';

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from '@/components/commonTable';
import { AgencyPaymentResponse } from '@/types/agency-payment';
import { agencyPaymentColumns } from './agency-payment-table-columns';
import { ClearFilters } from '@/components/commonTable/controls/ClearFilters';

export default function AgencyPaymentTableClient({
  agencyPaymentResponse,
}: {
  agencyPaymentResponse: AgencyPaymentResponse;
}) {
  const agencyPayments = agencyPaymentResponse.data;
  return (
    <TableProvider data={agencyPayments} columns={agencyPaymentColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="agency"
          syncToUrl
          paramName="search"
          searchResults={agencyPaymentResponse.meta.total}
        />

        <ColumnVisibility />

        <ClearFilters syncToUrl />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={agencyPaymentResponse.meta.page}
        totalPages={agencyPaymentResponse.meta.pages}
        totalItems={agencyPaymentResponse.meta.total}
      />
    </TableProvider>
  );
}
