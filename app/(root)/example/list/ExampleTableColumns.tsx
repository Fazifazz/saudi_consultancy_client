"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { IUser } from "@/types/user"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export const userColumns: ColumnDef<IUser>[] = [
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Email
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.role === "admin" ? "default" : "secondary"
        }
      >
        {row.original.role}
      </Badge>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    enableColumnFilter: true,

    // 🔑 Date filter logic
    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true

      const rowDate = new Date(row.getValue(columnId))

      if (filterValue.type === "single") {
        const selected = new Date(filterValue.date)
        return (
          rowDate.toDateString() === selected.toDateString()
        )
      }

      // Date range
      const from = filterValue.from
        ? new Date(filterValue.from)
        : null
      const to = filterValue.to
        ? new Date(filterValue.to)
        : null

      if (from && to) {
        return rowDate >= from && rowDate <= to
      } else if (from) {
        return rowDate >= from
      } else if (to) {
        return rowDate <= to
      }

      return true
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Copy User ID
            </DropdownMenuItem>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
