'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IAgencyPayment } from '@/types/agency-payment';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteAgencyPayment } from '@/lib/queries/agency-payment.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { destructiveToast } from '@/components/toast/DestructiveToast';
import { AxiosError } from 'axios';

export const agencyPaymentColumns: ColumnDef<IAgencyPayment>[] = [
  {
    accessorKey: 'transactionId.name',
    header: 'Purpose',
  },
  {
    accessorKey: 'transactionId.customerId.name',
    header: 'Customer Name',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      const date = row.getValue('date') as Date;
      return date ? new Date(date).toLocaleDateString() : '-';
    },
  },
  {
    accessorKey: 'agency',
    header: 'Agency',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const router = useRouter();
      const deleteAgencyPayment = useDeleteAgencyPayment();

      const onClickEdit = (id: string) => {
        router.push(`/agency-payment/${id}`);
      };

      const onClickDelete = (id: string) => {
        deleteAgencyPayment.mutate(id, {
          onSuccess: (res: any) => {
            successToast(res?.message || 'Agency payment deleted successfully');
            router.push('/agency-payment/list');
          },
          onError: (error) => {
            const message =
              error instanceof AxiosError ? error?.response?.data?.message : 'Deletion failed';
            destructiveToast(message);
          },
        });
      };
      const payment = row.original;
      // Fallback to _id if id is not present, or vice versa
      const id = payment.id || payment._id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id || '')}>
              Copy ID
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => onClickEdit(id || '')}>Edit</DropdownMenuItem>

            <DropdownMenuItem onClick={() => onClickDelete(id || '')} className="text-destructive">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
