import {
    ColumnVisibility,
    DataTable,
    Pagination,
    TableProvider,
    TableSearch,
} from "@/components/commonTable"
import { TableFilter } from "@/components/commonTable/controls/TableFilter"
import { TableDateFilter } from "@/components/commonTable/controls/TableDateFilter"
import { userColumns } from "@/components/tables/example/ExampleTableColumns"
import { IUser } from "@/types/user"

const usersMock: IUser[] = [
    {
        _id: "1",
        username: "Admin One",
        email: "admin1@example.com",
        phone: "9876543210",
        role: "admin",
        createdAt: "2025-10-01T10:00:00Z",
    },
    {
        _id: "2",
        username: "Staff One",
        email: "staff1@example.com",
        phone: "9876543211",
        role: "staff",
        createdAt: "2025-10-02T11:00:00Z",
    },
    {
        _id: "3",
        username: "Staff Two",
        email: "staff2@example.com",
        phone: "9876543212",
        role: "staff",
        createdAt: "2025-10-03T09:30:00Z",
    },
    {
        _id: "4",
        username: "Admin Two",
        email: "admin2@example.com",
        phone: "9876543213",
        role: "admin",
        createdAt: "2025-10-04T14:20:00Z",
    },
]

const Page = () => {
    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-semibold">Users</h1>

            <TableProvider data={usersMock} columns={userColumns}>
                <div className="flex flex-wrap gap-2">
                    <TableSearch column="email" />

                    <TableFilter
                        column="role"
                        title="Role"
                        options={[
                            { label: "Admin", value: "admin" },
                            { label: "Staff", value: "staff" },
                        ]}
                    />

                    <TableDateFilter
                        column="createdAt"
                        mode="range"
                    />

                    {/* OR single date */}
                    {/* <TableDateFilter column="createdAt" mode="single" /> */}

                    <ColumnVisibility />
                </div>

                <DataTable />
                <Pagination />
            </TableProvider>
        </div>
    )
}

export default Page
