'use client';

import { Button } from '@/components/ui/button';
import { logoutAction } from '@/app/actions/logout';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { LogOut } from 'lucide-react';

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
    <DropdownMenuItem onClick={onLogout} disabled={isPending}>
      <LogOut />
      {isPending ? 'Logging out...' : 'Log out'}
    </DropdownMenuItem>
  );
}
