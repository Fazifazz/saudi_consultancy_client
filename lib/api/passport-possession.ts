import { PassportPossessionByIdResponse, PassportPossessionListResponse } from '@/types/passportPossessions';
import { getToken } from '../token';
import { isValidDateString } from '../date';

interface FetchPassportPossessionsParams {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    search?: string;
    from?: string;
    to?: string;
}

export async function fetchPassportPossessions(params?: FetchPassportPossessionsParams): Promise<PassportPossessionListResponse> {
    const searchParams = new URLSearchParams();
    const token = await getToken();

    if (params) {
        if (params.page) searchParams.append('page', String(params.page));
        if (params.limit) searchParams.append('limit', String(params.limit));
        if (params.sortBy) searchParams.append('sortBy', params.sortBy);
        if (params.sortOrder) searchParams.append('sortOrder', params.sortOrder);
        if (params.search) searchParams.append('search', params.search);
        if (isValidDateString(params.from)) {
            searchParams.set('from', new Date(params.from!).toISOString());
        }

        if (isValidDateString(params.to)) {
            searchParams.set('to', new Date(params.to!).toISOString());
        }
    }

    const url = `${process.env.NEXT_PUBLIC_API_URL}/passport-possession${searchParams.toString() ? `?${searchParams}` : ''}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch passport possitions: ${response.statusText}`);
    }

    return response.json();
}

export async function fetchPassportPossessionById(id: string): Promise<PassportPossessionByIdResponse> {
    const token = await getToken();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/passport-possession/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch passport possession: ${response.statusText}`);
    }

    return response.json();
}