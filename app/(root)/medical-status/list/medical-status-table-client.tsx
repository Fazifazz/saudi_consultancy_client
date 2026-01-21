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
import { MedicalStatusResponse } from '@/types/medical-status';
import { medicalStatusColumns } from './medical-status-table-columns';

export default function MedicalStatusTableClient({
  medicalStatusResponse,
}: {
  medicalStatusResponse: MedicalStatusResponse;
}) {
  const medicalStatuses = medicalStatusResponse.data;
  return (
    <TableProvider data={medicalStatuses} columns={medicalStatusColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="name"
          syncToUrl
          paramName="search"
          searchResults={medicalStatusResponse.meta.total}
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
        currentPage={medicalStatusResponse.meta.page}
        totalPages={medicalStatusResponse.meta.pages}
        totalItems={medicalStatusResponse.meta.total}
      />
    </TableProvider>
  );
}
