'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IVisaDetail } from '@/types/visa-details';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteVisaDetail } from '@/lib/queries/visa-details.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { destructiveToast } from '@/components/toast/DestructiveToast';
import { AxiosError } from 'axios';

export const visaDetailsColumns = (): ColumnDef<IVisaDetail>[] => {
  const router = useRouter();
  const deleteVisaDetail = useDeleteVisaDetail();

  const onClickEdit = (visaDetailId: string) => {
    router.push(`/visa-details/${visaDetailId}`);
  };

  const onClickDelete = (visaDetailId: string) => {
    deleteVisaDetail.mutate(visaDetailId, {
      onSuccess: (res: any) => {
        successToast(res?.message || 'Visa detail deleted successfully');
        router.push('/visa-details/list');
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
      accessorKey: 'transactionId',
      header: 'Transaction ID',
    },
    {
      accessorKey: 'visaNumber',
      header: 'Visa Number',
    },
    {
      accessorKey: 'visaType',
      header: 'Visa Type',
    },
    {
      accessorKey: 'stampingDate',
      header: 'Stamping Date',
      cell: ({ row }) => {
        const date = row.getValue('stampingDate') as Date;
        return date ? new Date(date).toLocaleDateString() : '-';
      },
    },
    {
      accessorKey: 'paymentMode',
      header: 'Payment Mode',
    },
    {
      accessorKey: 'profession',
      header: 'Profession',
    },
    {
      accessorKey: 'agency',
      header: 'Agency',
    },
    {
      accessorKey: 'remarks',
      header: 'Remarks',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const visaDetail = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(visaDetail._id)}>
                Copy Visa Detail ID
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onClickEdit(visaDetail._id)}>Edit</DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onClickDelete(visaDetail._id)}
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
