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
import { useDeleteTransaction } from '@/lib/queries/transaction.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { toast } from 'sonner';

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
    cell: ({ row }) => {
      const transaction = row.original;
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const deleteMutation = useDeleteTransaction();

      const handleDelete = async () => {
        try {
          await deleteMutation.mutateAsync(transaction._id);
          successToast('Transaction deleted successfully');
          setIsDialogOpen(false);
        } catch (error) {
          toast.error('Failed to delete transaction');
        }
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => setIsDialogOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
    },
  },
];
