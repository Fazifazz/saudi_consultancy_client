"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { useTable } from "../TableProvider"
import { Label } from "@/components/ui/label"

type DateFilterValue =
    | { type: "single"; date: string }
    | { type: "range"; from?: string; to?: string }
    | null

interface TableDateFilterProps {
    column: string
    mode?: "single" | "range"
}

export function TableDateFilter({
    column,
    mode = "range",
}: TableDateFilterProps) {
    const { table } = useTable<any>()
    const col = table.getColumn(column)

    const [singleDate, setSingleDate] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")

    if (!col) return null

    useEffect(() => {
        if (mode !== "single") return

        col.setFilterValue(
            singleDate
                ? ({ type: "single", date: singleDate } as DateFilterValue)
                : null
        )
    }, [singleDate])

    useEffect(() => {
        if (mode !== "range") return

        if (!from && !to) {
            col.setFilterValue(null)
            return
        }

        col.setFilterValue({
            type: "range",
            from: from || undefined,
            to: to || undefined,
        } as DateFilterValue)
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
