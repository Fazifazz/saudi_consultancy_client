"use client"

import { useRouter, usePathname, useSearchParams } from "next/navigation"
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

    /**
     * When true, push the selected filter value to the page's query string.
     * paramName defaults to the column name.
     */
    syncToUrl?: boolean
    paramName?: string

    /**
     * When true (default) use router.replace to update the URL without
     * creating a new history entry. Set to false to use router.push.
     */
    replace?: boolean

    /**
     * Optional callback fired after the value changes.
     */
    onChange?: (value?: string) => void
}

export function TableFilter({
    column,
    title = "Filter",
    options,
    clearable = true,
    syncToUrl = false,
    paramName,
    replace = true,
    onChange,
}: TableFilterProps) {
    const { table } = useTable<any>()
    const columnInstance = table.getColumn(column)

    // next/navigation hooks (used only when syncToUrl is true)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    if (!columnInstance) return null

    const handleValueChange = (value: string | string[] | undefined) => {
        if (syncToUrl) {
            const param = paramName ?? column
            const params = new URLSearchParams(searchParams?.toString() ?? "")

            // remove existing values for the param first
            params.delete(param)

            if (value === undefined || value === "" || value === "__clear__" || (Array.isArray(value) && value.length === 0)) {
                // nothing to add - param remains removed
            } else if (Array.isArray(value)) {
                // append multiple values: ?param=val1&param=val2
                value.forEach((v) => params.append(param, v))
            } else {
                params.set(param, value)
            }

            const url = pathname + (params.toString() ? `?${params.toString()}` : "")
            if (replace) router.replace(url)
            else router.push(url)
        } else {
            // update internal filter state used by the table
            if (clearable && value === "__clear__") {
                columnInstance.setFilterValue(undefined)
                value = ""
            } else {
                columnInstance.setFilterValue(value as any)
            }

            // call external callback
            onChange?.(Array.isArray(value) ? value.join(",") : (value as string) || undefined)
        }
    }

    return (
        <Select
            value={(columnInstance.getFilterValue() as string) ?? ""}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={title} />
            </SelectTrigger>

            <SelectContent>
                {clearable && <SelectItem value="__clear__">All</SelectItem>}

                {options.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}
