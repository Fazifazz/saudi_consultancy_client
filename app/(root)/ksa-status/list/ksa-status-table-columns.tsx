'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { IKsaStatus } from '@/types/ksa-status';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteKsaStatus } from '@/lib/queries/ksa-status.mutation';
import { successToast } from '@/components/toast/SuccessToast';
import { destructiveToast } from '@/components/toast/DestructiveToast';
import { AxiosError } from 'axios';
import { format } from 'date-fns';
import { useState } from 'react';
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
import { toast } from 'sonner';

export const ksaStatusColumns = (): ColumnDef<IKsaStatus>[] => {
  const router = useRouter();
  const deleteKsa = useDeleteKsaStatus();

  return [
    {
      accessorKey: 'customerName',
      header: 'Customer',
    },
    {
      accessorKey: 'saudiArrivedDate',
      header: 'Saudi Arrived',
      cell: ({ row }) => {
        const date = row.getValue('saudiArrivedDate') as Date;
        return date ? format(new Date(date), 'PPP') : '-';
      },
    },
    {
      accessorKey: 'iqamaIssuedDate',
      header: 'Iqama Issued',
      cell: ({ row }) => {
        const date = row.getValue('iqamaIssuedDate') as Date;
        return date ? format(new Date(date), 'PPP') : '-';
      },
    },
    {
      accessorKey: 'iqamaValidity',
      header: 'Iqama Validity (months)',
    },
    {
      accessorKey: 'visaTransferStatus',
      header: 'Visa Transfer Status',
    },
    {
      accessorKey: 'customerPayment',
      header: 'Customer Payment',
    },
    {
      accessorKey: 'customerPaymentDate',
      header: 'Payment Date',
      cell: ({ row }) => {
        const date = row.getValue('customerPaymentDate') as Date;
        return date ? format(new Date(date), 'PPP') : '-';
      },
    },
    {
      accessorKey: 'createdAt',
      header: 'Created At',
      cell: ({ row }) => {
        const date = row.getValue('createdAt') as Date;
        return date ? format(new Date(date), 'PPP') : '-';
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const item = row.original;
        const [isDialogOpen, setIsDialogOpen] = useState(false);

        const handleDelete = async () => {
          try {
            await deleteKsa.mutateAsync(item._id);
            router.push('/ksa-status/list');
            successToast('KSA status deleted successfully');
            setIsDialogOpen(false);
          } catch (error) {
            toast.error('Failed to delete KSA status');
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
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(item._id)}>
                  Copy KSA Status ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/ksa-status/${item._id}`)}>
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="text-destructive"
                  onClick={() => setIsDialogOpen(true)}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the KSA status.
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
};
