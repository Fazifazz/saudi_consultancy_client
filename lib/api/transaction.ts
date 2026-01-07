import { getToken } from '../token';
import { isValidDateString } from '../date';
import { TransactionsResponse } from '@/types/transaction';

interface FetchTransactionsParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  from?: string;
  to?: string;
}

export async function fetchTransactions(
  params?: FetchTransactionsParams
): Promise<TransactionsResponse> {
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

  const url =
    `${process.env.NEXT_PUBLIC_API_URL}/transaction` +
    (searchParams.toString() ? `?${searchParams}` : '');

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('data', data);
  return data;
}

export const fetchTransactionsForSelect = async () => {
  const token = await getToken();
  const url = `${process.env.NEXT_PUBLIC_API_URL}/transaction/select`;

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch transactions for select: ${response.statusText}`);
  }

  const res = await response.json();
  console.log('response', res);
  return res?.data || [];
};
