import { NextResponse } from 'next/server';
import { getToken } from '@/lib/token';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  // delete body.id; // Removed because I am not sure if it's required to remove ID. The visa-details implementation removed it. I will keep it commented out or remove it to be safe, but following the pattern implies removing it.
  // Actually, keeping the ID in the body is usually fine unless the backend strict validation forbids it.
  // In visa-details it was `delete body.id;`. I will do the same to be consistent.
  delete body.id;

  const token = await getToken();

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency-payment/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const token = await getToken();

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/agency-payment/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
