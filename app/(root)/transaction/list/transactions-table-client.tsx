'use client';

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from '@/components/commonTable';

import { ClearFilters } from '@/components/commonTable/controls/ClearFilters';
import { TransactionsResponse } from '@/types/transaction';
import { transactionColumns } from './transactions-table-columns';

export default function TransactionsTableClient({
  transactionsResponse,
}: {
  transactionsResponse: TransactionsResponse;
}) {
  const transactions = transactionsResponse.data;
  return (
    <TableProvider data={transactions} columns={transactionColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="name"
          syncToUrl
          paramName="search"
          searchResults={transactionsResponse.meta.total}
        />

        <ColumnVisibility />

        <ClearFilters syncToUrl />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={transactionsResponse.meta.page}
        totalPages={transactionsResponse.meta.pages}
        totalItems={transactionsResponse.meta.total}
      />
    </TableProvider>
  );
}
