'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ICustomer } from '@/types/customer';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteCustomer } from '@/lib/queries/customer.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { destructiveToast } from '@/components/toast/DestructiveToast';
import { AxiosError } from 'axios';

export const customerColumns = (): ColumnDef<ICustomer>[] => {
  const router = useRouter();
  const deleteCustomer = useDeleteCustomer();

  const onClickEdit = (customerId: string) => {
    router.push(`/customer/${customerId}`);
  };

  const onClickDelete = (customerId: string) => {
    deleteCustomer.mutate(customerId, {
      onSuccess: (res: any) => {
        successToast(res?.message || 'Customer deleted successfully');
        router.push('/customer/list');
      },
      onError: (error) => {
        const message =
          error instanceof AxiosError ? error?.response?.data?.message : 'Deletion failed';
        destructiveToast(message);
      },
    });
  };

  return [
    {
      accessorKey: 'name',
      header: 'Customer',
    },
    {
      accessorKey: 'passportNumber',
      header: 'Passport No.',
    },
    {
      accessorKey: 'district',
      header: 'District',
    },
    {
      accessorKey: 'contactNumber1',
      header: 'Phone',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const customer = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customer._id)}>
                Copy Customer ID
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onClickEdit(customer._id)}>Edit</DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onClickDelete(customer._id)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
};
