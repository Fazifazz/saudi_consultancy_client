import { TradeCertificateResponse } from '@/types/trade-certificate';
import { getToken } from '../token';
import { isValidDateString } from '../date';

interface FetchTradeCertificatesParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  from?: string;
  to?: string;
}

export async function fetchTradeCertificates(
  params?: FetchTradeCertificatesParams
): Promise<TradeCertificateResponse> {
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
    `${process.env.NEXT_PUBLIC_API_URL}/trade-certificate` +
    (searchParams.toString() ? `?${searchParams}` : '');

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch trade certificates: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
}

export async function fetchOneTradeCertificate(tradeCertificateId: string) {
  const token = await getToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/trade-certificate/${tradeCertificateId}`,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch trade certificate: ${response.statusText}`);
  }

  const res = await response.json();
  return res?.data;
}
