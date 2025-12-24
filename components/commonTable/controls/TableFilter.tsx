"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useTable } from "../TableProvider"

interface TableFilterOption {
    label: string
    value: string
}

interface TableFilterProps {
    column: string
    title?: string
    options: TableFilterOption[]
    clearable?: boolean
}

export function TableFilter({
    column,
    title = "Filter",
    options,
    clearable = true,
}: TableFilterProps) {
    const { table } = useTable<any>()
    const columnInstance = table.getColumn(column)

    if (!columnInstance) return null

    return (
        <Select
            value={(columnInstance.getFilterValue() as string) ?? ""}
            onValueChange={(value) => {
                if (clearable && value === "__clear__") {
                    columnInstance.setFilterValue(undefined)
                } else {
                    columnInstance.setFilterValue(value)
                }
            }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={title} />
            </SelectTrigger>

            <SelectContent>
                {clearable && (
                    <SelectItem value="__clear__">All</SelectItem>
                )}

                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
