'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { ITransaction } from '@/types/transaction';
import { useRouter } from 'next/navigation';
import { useDeleteTransaction } from '@/lib/queries/transaction.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { toast } from 'sonner';
import { OtpVerificationDialog } from '@/components/otp/OtpVerificationDialog';

export const transactionColumns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'customerName',
    header: 'Customer',
  },
  {
    accessorKey: 'remarks',
    header: 'Remarks',
  },
  {
    accessorKey: 'formattedCreatedAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => <TransactionActionsCell transaction={row.original} />,
  },
];

function TransactionActionsCell({ transaction }: { transaction: ITransaction }) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const deleteMutation = useDeleteTransaction();

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(transaction._id);
      router.push('/transaction/list');
      successToast('Transaction deleted successfully');
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error('Failed to delete transaction');
    }
  };

  const handleEditClick = () => {
    setIsOtpDialogOpen(true);
  };

  const handleOtpVerified = () => {
    router.push(`/transaction/${transaction._id}`);
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
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(transaction._id)}>
            Copy Transaction ID
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleEditClick}>Edit</DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive"
            onClick={() => setIsDeleteDialogOpen(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* OTP Verification Dialog */}
      <OtpVerificationDialog
        open={isOtpDialogOpen}
        onOpenChange={setIsOtpDialogOpen}
        onVerified={handleOtpVerified}
        title="Verify to Edit Transaction"
        description="For security, please verify your identity with the OTP sent to your registered email before editing this transaction."
        purpose="EDIT_TRANSACTION"
        module="transaction"
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
