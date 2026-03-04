'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IMedicalPaymentList } from '@/types/medical-payment';
import { useState } from 'react';

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
import { OtpVerificationDialog } from '@/components/otp/OtpVerificationDialog';

export const medicalPaymentColumns = (): ColumnDef<IMedicalPaymentList>[] => {
  const router = useRouter();
  const deleteMedicalPayment = useDeleteMedicalPayment();

  return [
    {
      accessorKey: 'transactionId.name',
      header: 'Purpose',
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
        const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

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

        return (
          <>
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

                <DropdownMenuItem onClick={() => setIsOtpDialogOpen(true)}>Edit</DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onClickDelete(medicalPayment._id)}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <OtpVerificationDialog
              open={isOtpDialogOpen}
              onOpenChange={setIsOtpDialogOpen}
              onVerified={() => router.push(`/medical-payment/${medicalPayment._id}`)}
              title="Verify to Edit Medical Payment"
              description="Please verify your identity with the OTP sent to your registered email before editing this record."
              purpose="EDIT_MEDICAL_PAYMENT"
              module="medical-payment"
            />
          </>
        );
      },
    },
  ];
};
