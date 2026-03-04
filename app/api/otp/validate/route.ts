import { getToken } from '@/lib/token';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();
  const token = await getToken();

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const email = process.env.OTP_EMAIL ?? 'fazzfasi7@gmail.com';

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/otp/validate`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      purpose: body.purpose,
      module: body.module,
      otp: body.otp,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
