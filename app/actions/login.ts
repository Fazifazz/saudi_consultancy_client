'use server';

import { cookies } from 'next/headers';

export async function loginAction(formData: FormData) {
  const body = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!res.ok) {
    return { error: 'Invalid credentials' };
  }

  const { token } = await res.json();

  const cookiesData = await cookies();
  cookiesData.set({
    name: 'token',
    value: token,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  });

  return { success: true };
}
