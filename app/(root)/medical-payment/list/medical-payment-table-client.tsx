'use client';

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from '@/components/commonTable';

import { MedicalPaymentsListResponse } from '@/types/medical-payment';
import { medicalPaymentColumns } from './medical-payment-table-columns';
import { ClearFilters } from '@/components/commonTable/controls/ClearFilters';

export default function MedicalPaymentsTableClient({
  medicalPaymentsResponse,
}: {
  medicalPaymentsResponse: MedicalPaymentsListResponse;
}) {
  const medicalPayments = medicalPaymentsResponse.data;
  return (
    <TableProvider data={medicalPayments} columns={medicalPaymentColumns()}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="amount"
          syncToUrl
          paramName="search"
          searchResults={medicalPaymentsResponse.meta.total}
        />

        <ColumnVisibility />

        <ClearFilters syncToUrl />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={medicalPaymentsResponse.meta.page}
        totalPages={medicalPaymentsResponse.meta.pages}
        totalItems={medicalPaymentsResponse.meta.total}
      />
    </TableProvider>
  );
}
