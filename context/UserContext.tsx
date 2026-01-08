'use client';

import { logoutAction } from '@/app/actions/logout';
import { createContext, useContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { IUser } from '@/types/user';

const UserContext = createContext<IUser | null>(null);

export const UserProvider = ({ user, children }: { user: IUser | null; children: ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      logoutAction().finally(() => {
        router.replace('/login');
      });
    }
  }, [user, router]);

  if (!user) {
    return <p>Redirecting to login...</p>;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
