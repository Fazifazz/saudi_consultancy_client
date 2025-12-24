"use client"

import { Input } from "@/components/ui/input"
import { useTable } from "../TableProvider"

export function TableSearch({ column }: { column: string }) {
    const { table } = useTable<any>()

    return (
        <Input
            placeholder={`Search ${column}`}
            value={(table.getColumn(column)?.getFilterValue() as string) ?? ""}
            onChange={(e) =>
                table.getColumn(column)?.setFilterValue(e.target.value)
            }
            className="max-w-sm"
        />
    )
}
