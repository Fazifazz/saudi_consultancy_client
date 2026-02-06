'use client';

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from '@/components/commonTable';

import { CustomersResponse } from '@/types/customer';
import { customerColumns } from './customer-table-columns';
import { TableFilter } from '@/components/commonTable/controls/TableFilter';
import { ClearFilters } from '@/components/commonTable/controls/ClearFilters';

export default function CustomersTableClient({
  customersResponse,
}: {
  customersResponse: CustomersResponse;
}) {
  const customers = customersResponse.data;
  return (
    <TableProvider data={customers} columns={customerColumns()}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="name"
          syncToUrl
          paramName="search"
          searchResults={customersResponse.meta.total}
        />

        <ColumnVisibility />

        <ClearFilters syncToUrl />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={customersResponse.meta.page}
        totalPages={customersResponse.meta.pages}
        totalItems={customersResponse.meta.total}
      />
    </TableProvider>
  );
}
