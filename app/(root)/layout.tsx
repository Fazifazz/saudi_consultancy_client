import { UserProvider } from '@/context/UserContext';
import { cookies } from 'next/headers';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { AppBreadcrumb } from '@/components/app-breadcrumb';
import QueryProvider from '../providers/QueryProvider';
import { getLoggedInUser } from '@/lib/api/users';

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getLoggedInUser();
  return (
    <QueryProvider>
      <UserProvider user={user}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
              <AppBreadcrumb />
            </header>
            <main className="bg-background p-5">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </UserProvider>
    </QueryProvider>
  );
}
