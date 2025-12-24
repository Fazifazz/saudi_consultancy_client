"use client"

import {
  TableProvider,
  DataTable,
  Pagination,
  TableSearch,
  ColumnVisibility,
} from "@/components/commonTable"
import { TableDateFilter } from "@/components/commonTable/controls/TableDateFilter"
import { userColumns } from "@/app/(root)/example/list/from-api/ExampleAPITableColumns"
import { IUser } from "@/types/user"

export default function UsersTableClient({
  users,
}: {
  users: IUser[]
}) {
  return (
    <TableProvider data={users} columns={userColumns}>
      <div className="flex flex-wrap gap-2">
        <TableSearch column="email" />
        <TableDateFilter column="createdAt" mode="range" />
        <ColumnVisibility />
      </div>

      <DataTable />
      <Pagination />
    </TableProvider>
  )
}
