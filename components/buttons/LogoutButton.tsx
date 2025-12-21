'use client';

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/app/actions/logout';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTransition } from 'react';

export function LogoutButton() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const onLogout = () => {
    startTransition(async () => {
      await logoutAction();
      toast.success('Logged out successfully');
      router.replace('/login');
    });
  };

  return (
    <Button variant="destructive" onClick={onLogout} disabled={isPending}>
      {isPending ? 'Logging out...' : 'Logout'}
    </Button>
  );
}
