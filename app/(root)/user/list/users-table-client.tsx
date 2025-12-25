"use client"

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from "@/components/commonTable"
import { TableDateFilter } from "@/components/commonTable/controls/TableDateFilter"
import { UsersResponse } from "@/types/user"
import { userColumns } from "./user-table-columns"
import { TableFilter } from "@/components/commonTable/controls/TableFilter"

export default function UsersTableClient({
  usersResponse,
}: {
  usersResponse: UsersResponse
}) {
  const users = usersResponse.data
  return (
    <TableProvider data={users} columns={userColumns}>
      <div className="flex flex-wrap gap-2">

        <TableSearch
          column="username"
          syncToUrl
          paramName="search" />

        <TableFilter
          column="role"
          title="Role"
          options={[
            { label: "Admin", value: "admin" },
            { label: "Staff", value: "staff" },
          ]}
          syncToUrl
          paramName="role"
        />

        <TableDateFilter
          column="createdAt"
          mode="range"
          syncToUrl
          paramName="range_createdAt"
        />

        <ColumnVisibility />
      </div>

      <DataTable />
      <Pagination
        syncToUrl
        pageParam="page"
        limitParam="limit"
        currentPage={usersResponse.meta.page}
        totalPages={usersResponse.meta.pages}
        totalItems={usersResponse.meta.total}
      />
    </TableProvider>
  )
}
