import { fetchUsers } from "@/lib/api/mock-users"
import UsersTableClient from "./users-table-client"


interface PageProps {
    searchParams: {
        page?: string
        limit?: string
        from?: string
        to?: string
        search?: string
    }
}

export default async function UsersPage({
    searchParams,
}: PageProps) {
    const page = Number(searchParams.page ?? 1)
    const limit = Number(searchParams.limit ?? 10)

    const users = await fetchUsers({
        page,
        limit,
        search: searchParams.search,
        from: searchParams.from,
        to: searchParams.to,
    })

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-semibold">Users</h1>

            {/* Client table only receives data */}
            <UsersTableClient users={users} />
        </div>
    )
}
