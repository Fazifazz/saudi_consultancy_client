"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// dont use any in a real app, define proper IUser type for your data of backend
export const userColumns: ColumnDef<any>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
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
        accessorKey: "company.name",
        header: "Company",
        cell: ({ row }) => (
            <Badge variant="secondary">
                {row.original.company.name}
            </Badge>
        ),
    },
    {
        accessorKey: "address.city",
        header: "City",
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        enableColumnFilter: true,

        filterFn: (row, columnId, filterValue) => {
            if (!filterValue) return true

            const rowDate = new Date(row.getValue(columnId))

            if (filterValue.type === "single") {
                const selected = new Date(filterValue.date)
                return (
                    rowDate.toDateString() === selected.toDateString()
                )
            }

            const from = filterValue.from
                ? new Date(filterValue.from)
                : null
            const to = filterValue.to
                ? new Date(filterValue.to)
                : null

            if (from && to) return rowDate >= from && rowDate <= to
            if (from) return rowDate >= from
            if (to) return rowDate <= to

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
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    String(user.id)
                                )
                            }
                        >
                            Copy User ID
                        </DropdownMenuItem>
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                            Delete
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
