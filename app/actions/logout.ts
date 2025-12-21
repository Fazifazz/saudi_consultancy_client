'use server';

import { cookies } from 'next/headers';

export async function logoutAction() {
  const cookiesData = await cookies();
  cookiesData.set({
    name: 'token',
    value: '',
    path: '/',
    maxAge: 0,
  });

  return { success: true };
}
