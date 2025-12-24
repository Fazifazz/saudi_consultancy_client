"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useTable } from "../TableProvider"
import { Label } from "@/components/ui/label"
import { useRouter, usePathname, useSearchParams } from "next/navigation"

type DateFilterValue =
    | { type: "single"; date: string }
    | { type: "range"; from?: string; to?: string }
    | null

interface TableDateFilterProps {
    column: string
    mode?: "single" | "range"

    /**
     * When true, push selected date(s) to the page's query string.
     * For mode="single" paramName defaults to column (e.g. ?createdAt=2023-01-01)
     * For mode="range" params will be `${paramName}_from` and `${paramName}_to`.
     */
    syncToUrl?: boolean
    paramName?: string
    /**
     * When true (default) use router.replace to update the URL without
     * creating a new history entry. Set to false to use router.push.
     */
    replace?: boolean

    /**
     * Optional callback fired after value changes.
     */
    onChange?: (value?: DateFilterValue) => void
}

export function TableDateFilter({
    column,
    mode = "range",
    syncToUrl = false,
    paramName,
    replace = true,
    onChange,
}: TableDateFilterProps) {
    const { table } = useTable<any>()
    const col = table.getColumn(column)

    const [singleDate, setSingleDate] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    if (!col) return null

    // initialize from URL when syncToUrl is true
    useEffect(() => {
        if (!syncToUrl) return
        const base = paramName ?? column

        if (mode === "single") {
            const v = searchParams?.get(base) ?? ""
            setSingleDate(v)
            col.setFilterValue(
                v ? ({ type: "single", date: v } as DateFilterValue) : null
            )
        } else {
            const fromParam = searchParams?.get(`${base}_from`) ?? ""
            const toParam = searchParams?.get(`${base}_to`) ?? ""
            setFrom(fromParam)
            setTo(toParam)
            if (!fromParam && !toParam) {
                col.setFilterValue(null)
            } else {
                col.setFilterValue({
                    type: "range",
                    from: fromParam || undefined,
                    to: toParam || undefined,
                } as DateFilterValue)
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [syncToUrl, searchParams?.toString(), paramName, column, mode])

    // update URL and callback for single date
    useEffect(() => {
        if (mode !== "single") return
        // set table filter
        col.setFilterValue(
            singleDate
                ? ({ type: "single", date: singleDate } as DateFilterValue)
                : null
        )
        onChange?.(
            singleDate
                ? ({ type: "single", date: singleDate } as DateFilterValue)
                : null
        )

        if (!syncToUrl) return

        const base = paramName ?? column
        const params = new URLSearchParams(searchParams?.toString() ?? "")

        // remove existing range params too (keep URL tidy)
        params.delete(`${base}_from`)
        params.delete(`${base}_to`)
        params.delete(base)

        if (singleDate) params.set(base, singleDate)

        const url = pathname + (params.toString() ? `?${params.toString()}` : "")
        if (replace) router.replace(url)
        else router.push(url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [singleDate])

    // update URL and callback for range
    useEffect(() => {
        if (mode !== "range") return

        if (!from && !to) {
            col.setFilterValue(null)
            onChange?.(null)
        } else {
            col.setFilterValue({
                type: "range",
                from: from || undefined,
                to: to || undefined,
            } as DateFilterValue)
            onChange?.(
                { type: "range", from: from || undefined, to: to || undefined } as DateFilterValue
            )
        }

        if (!syncToUrl) return

        const base = paramName ?? column
        const params = new URLSearchParams(searchParams?.toString() ?? "")

        // remove previous values
        params.delete(base)
        params.delete(`${base}_from`)
        params.delete(`${base}_to`)

        if (from) params.set(`${base}_from`, from)
        if (to) params.set(`${base}_to`, to)

        const url = pathname + (params.toString() ? `?${params.toString()}` : "")
        if (replace) router.replace(url)
        else router.push(url)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [from, to])

    return (
        <div className="flex gap-2">
            {mode === "single" && (
                <Input
                    type="date"
                    value={singleDate}
                    onChange={(e) => setSingleDate(e.target.value)}
                />
            )}

            {mode === "range" && (
                <>
                    <Input
                        type="date"
                        placeholder="From"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                    <div className="flex items-center">
                        <Label className="text-xs text-muted-foreground">to</Label>
                    </div>
                    <Input
                        type="date"
                        placeholder="To"
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </>
            )}
        </div>
    )
}
