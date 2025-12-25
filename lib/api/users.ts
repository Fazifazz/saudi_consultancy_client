import { UsersResponse } from "@/types/user";
import { getToken } from "../token";
import { isValidDateString } from "../date";

interface FetchUsersParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
    search?: string;
    role?: string;
    from?: string;
    to?: string;
}

export async function getLoggedInUser() {
    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/loggedin-user`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        cache: 'no-store',
    });

    if (!res.ok) return null;
    return res.json();
}

export async function fetchUsers(params?: FetchUsersParams): Promise<UsersResponse> {
    const searchParams = new URLSearchParams();
    const token = await getToken();

    if (params) {
        if (params.page) searchParams.append("page", String(params.page));
        if (params.limit) searchParams.append("limit", String(params.limit));
        if (params.sortBy) searchParams.append("sortBy", params.sortBy);
        if (params.sortOrder) searchParams.append("sortOrder", params.sortOrder);
        if (params.search) searchParams.append("search", params.search);
        if (params.role) searchParams.append("role", params.role);
        if (isValidDateString(params.from)) {
            searchParams.set("from", new Date(params.from!).toISOString())
        }

        if (isValidDateString(params.to)) {
            searchParams.set("to", new Date(params.to!).toISOString())
        }
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/users${searchParams.toString() ? `?${searchParams}` : ""}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
    }

    return response.json();
}