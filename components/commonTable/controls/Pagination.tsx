"use client"

import { Button } from "@/components/ui/button"
import { useTable } from "../TableProvider"

export function Pagination() {
    const { table } = useTable<any>()

    return (
        <div className="flex justify-end gap-2 py-4">
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
            >
                Previous
            </Button>
            <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
            >
                Next
            </Button>
        </div>
    )
}
