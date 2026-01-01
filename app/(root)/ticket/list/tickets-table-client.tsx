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
import { TicketsResponse } from '@/types/ticket';
import { ticketColumns } from './tickets-table-columns';

export default function TicketsTableClient({
  ticketsResponse,
}: {
  ticketsResponse: TicketsResponse;
}) {
  const tickets = ticketsResponse.data;
  return (
    <TableProvider data={tickets} columns={ticketColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch
          column="name"
          syncToUrl
          paramName="search"
          searchResults={ticketsResponse.meta.total}
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
        currentPage={ticketsResponse.meta.page}
        totalPages={ticketsResponse.meta.pages}
        totalItems={ticketsResponse.meta.total}
      />
    </TableProvider>
  );
}
