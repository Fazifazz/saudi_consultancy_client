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
        
        <TableSearch column="username" />

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
        />

        <ColumnVisibility />
      </div>

      <DataTable />
      <Pagination />
    </TableProvider>
  )
}
