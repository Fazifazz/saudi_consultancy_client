'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IMedicalPayment, MedicalPaymentList } from '@/types/medical-payment';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteMedicalPayment } from '@/lib/queries/medical-payment.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { destructiveToast } from '@/components/toast/DestructiveToast';
import { AxiosError } from 'axios';

export const medicalPaymentColumns = (): ColumnDef<MedicalPaymentList>[] => {
  const router = useRouter();
  const deleteMedicalPayment = useDeleteMedicalPayment();

  const onClickEdit = (medicalPaymentId: string) => {
    router.push(`/medical-payment/${medicalPaymentId}`);
  };

  const onClickDelete = (medicalPaymentId: string) => {
    deleteMedicalPayment.mutate(medicalPaymentId, {
      onSuccess: (res: any) => {
        successToast(res?.message || 'Medical payment deleted successfully');
        router.push('/medical-payment/list');
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
      accessorKey: 'transactionId.name',
      header: 'Transaction Name',
    },
    {
      accessorKey: 'transactionId.customerId.name',
      header: 'Customer Name',
    },
    {
      accessorKey: 'amount',
      header: 'Amount',
    },
    {
      accessorKey: 'paymentMode',
      header: 'Payment Mode',
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
    },
    {
      accessorKey: 'remarks',
      header: 'Remarks',
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const medicalPayment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(medicalPayment._id)}>
                Copy Medical Payment ID
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => onClickEdit(medicalPayment._id)}>
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => onClickDelete(medicalPayment._id)}
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
