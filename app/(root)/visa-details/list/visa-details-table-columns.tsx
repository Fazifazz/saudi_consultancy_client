'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IVisaDetail } from '@/types/visa-details';
import { useState } from 'react';

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
import { OtpVerificationDialog } from '@/components/otp/OtpVerificationDialog';

export const visaDetailsColumns = (): ColumnDef<IVisaDetail>[] => {
  const router = useRouter();
  const deleteVisaDetail = useDeleteVisaDetail();

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
        const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);

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

        return (
          <>
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

                <DropdownMenuItem onClick={() => setIsOtpDialogOpen(true)}>Edit</DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => onClickDelete(visaDetail._id)}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <OtpVerificationDialog
              open={isOtpDialogOpen}
              onOpenChange={setIsOtpDialogOpen}
              onVerified={() => router.push(`/visa-details/${visaDetail._id}`)}
              title="Verify to Edit Visa Details"
              description="Please verify your identity with the OTP sent to your registered email before editing this record."
              purpose="EDIT_VISA_DETAIL"
              module="visa-details"
            />
          </>
        );
      },
    },
  ];
};
