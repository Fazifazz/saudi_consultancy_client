"use client"

import { Button } from "@/components/ui/button"
import { useTable } from "../TableProvider"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    ChevronsLeft,
    ChevronLeft,
    ChevronRight,
    ChevronsRight,
} from "lucide-react"

const PAGE_SIZES = [5, 10, 20, 50, 100]

export function Pagination() {
    const { table } = useTable<any>()

    const {
        pageIndex,
        pageSize,
    } = table.getState().pagination

    const totalRows = table.getFilteredRowModel().rows.length
    const totalPages = table.getPageCount()

    return (
        <div className="flex flex-wrap items-center justify-between gap-3 py-4">
            {/* LEFT: ITEMS COUNT */}
            <div className="text-sm text-muted-foreground">
                Showing{" "}
                <strong>
                    {pageIndex * pageSize + 1}
                </strong>{" "}
                –{" "}
                <strong>
                    {Math.min((pageIndex + 1) * pageSize, totalRows)}
                </strong>{" "}
                of <strong>{totalRows}</strong>
            </div>

            {/* RIGHT: PAGINATION CONTROLS */}
            <div className="flex items-center gap-2">
                {/* PAGE SIZE */}
                <Select
                    value={String(pageSize)}
                    onValueChange={(value) =>
                        table.setPageSize(Number(value))
                    }
                >
                    <SelectTrigger className="w-[90px]">
                        <SelectValue placeholder="Rows" />
                    </SelectTrigger>
                    <SelectContent>
                        {PAGE_SIZES.map((size) => (
                            <SelectItem key={size} value={String(size)}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {/* FIRST */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* PREVIOUS */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>

                {/* PAGE INFO */}
                <span className="text-sm whitespace-nowrap">
                    Page{" "}
                    <strong>{pageIndex + 1}</strong> of{" "}
                    <strong>{totalPages}</strong>
                </span>

                {/* NEXT */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>

                {/* LAST */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                        table.setPageIndex(totalPages - 1)
                    }
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    )
}
