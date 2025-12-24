import {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
} from "@tanstack/react-table"

export interface CommonTableProps<TData> {
  data: TData[]
  columns: ColumnDef<TData, any>[]
}

export interface TableContextType<TData> {
  table: any
}
